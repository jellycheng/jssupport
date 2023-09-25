'use strict';

const EventEmitter = require('events');

class Application extends EventEmitter {
  constructor() {
    super();

    this.contexts_    = [];// 上下文 []，上下文必须有ready、close方法
    this.hooks_       = [];// 事件钩子 [事件1=>[钩子1,钩子n],事件2=>[钩子1,钩子n]]
    this.middlewares_ = [];// 中间件, [[middleware, options], [middleware, options]]
    this.plugins_     = [];// 插件,[[plugin, options],  [plugin, options]]
    
  }

  async newContext_() {
    const newContext = Object.create(this);
    newContext.contexts_    = [];
    newContext.hooks_       = [];
    newContext.middlewares_ = [];
    newContext.plugins_     = [];
    return newContext;
  }

  // 添加事件钩子
  addHook(event, hook) {
    if (!this.hooks_[event]) {
      this.hooks_[event] = [];
    }
    this.hooks_[event].push(hook);
  }

  // 先进先出执行事件钩子： 事件名，传给钩子的参数
  async runHooks(event, ...args) {
    for (const hook of this.hooks_[event] || []) {
      await new Promise((resolve, reject) => {
        const promise = hook(...args, err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });

        if (promise && promise.then) {
          promise.then(resolve).catch(reject);
        }
      });
    }
  }
  // 后进先出执行事件钩子
  async runHooksR(event, ...args) {
    for (const hook of (this.hooks_[event] || []).reverse()) {
      await new Promise((resolve, reject) => {
        const promise = hook(...args, err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });

        if (promise && promise.then) {
          promise.then(resolve).catch(reject);
        }
      });
    }
  }
  // app添加属性
  decorate(name, value) {
    Object.defineProperty(this, name, {
      value: value,
      writable: false,
      configurable: false
    });
  }

  // 添加插件
  addPlugin(plugin, options) {
    this.plugins_.push([plugin, options]);
  }
  // 添加插件
  register(plugin, options) {
    this.addPlugin(plugin, options);
  }

  // 添加中间件
  addMiddleware(middleware, options) {
    this.use(middleware, options);
  }
  // 添加中间件
  async use(middleware, options) {
    this.middlewares_.push([middleware, options]);
  }

  // 释放资源：上下文-》onClose 事件钩子
  async close(cb) {
    try {
      for (const context of this.contexts_) {
        await context.close();
      }
      // 触发onClose事件钩子
      await this.runHooksR('onClose');
      cb && cb();
    } catch (err) {
      if (cb) {
        cb(err);
      } else {
        throw err;
      }
    }
  }

  // 执行初始化：中间件-》插件-》上下文
  async ready(cb) {
    try {
      for (const [middleware, options] of this.middlewares_) {
        await new Promise((resolve, reject) => {
          const promise = middleware(this, options, err => {
            if (err) {
              return reject(err);
            }
            resolve();
          });

          if (promise && promise.then) {
            promise.then(resolve).catch(reject);
          }
        });
      }

      for (const [plugin, options] of this.plugins_) {
        await new Promise(async (resolve, reject) => {
          const newContext = await this.newContext_();
          const promise = plugin(newContext, options, err => {
            if (err) {
              return reject(err);
            }
            resolve();
          });

          if (promise && promise.then) {
            promise.then(resolve).catch(reject);
          }
        });
      }

      for (const context of this.contexts_) {
        await context.ready();
      }

      cb && cb();
    } catch (err) {
      if (cb) {
        cb(err);
      } else {
        throw err;
      }
    }
  }
}

function myapp(cfg) {
  const app = new Application();

  app.decorate('root', true);
  app.decorate('globalCfg', cfg);//全局配置
  // 添加中间件-全局中间件
  app.use(require('./plugin/gracefullyShutdown'));

  let running = false;
  // 定义静态入口方法
  app.run = async () => {
    await app.ready();
    if (running) {
      throw new Error('already running');
    }
    // 触发 ready 事件钩子
    await app.runHooks('ready');
    running = true;
  };

  return app;
}

module.exports = myapp;
