'use strict';

// 是否捕获监听信号
let received = false;

module.exports = (app, options, next) => {
  if (app.root) {
    const signals = options && options.signals ? options.signals : ['SIGINT', 'SIGTERM'];
    // 挂载静态方法
    app.onGracefullyShutdown = hook => app.addHook('gracefullyShutdown', hook);
    // 设置监听信号
    for (const signal of signals) {
      process.once(signal, async () => {
        if(app.log) {
          app.log.info({signal}, 'received signal');
        }
        if (!received) {
          received = true;//标记已捕获信号
          if(app.log) {
            app.log.info('signal close');
          }
          // 执行gracefullyShutdown事件钩子
          await app.runHooks('gracefullyShutdown', signal);
          await app.close();
        }
      });
    }
  }

  next();
};
