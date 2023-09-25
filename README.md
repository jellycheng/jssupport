# jssupport
```
封装nodejs库，算法，无第三方js库依赖

```

## 项目引入包
```
配置package.json文件的dependencies依赖
vi package.json
{
  ...
  "dependencies": {
    ...
    "jssupport": "git+ssh://git@github.com:jellycheng/jssupport.git"
  }
  
}

```

## welcome
```
const jssupport = require('jssupport')
jssupport.hi(''); //welcome to jssupport

```

## 获取计数器
```
const Counter = require("jssupport/counter");
counter = new Counter();
let nextid = 0
while(nextid<10){
    let id = counter.nextId();//从0开始递增
    console.log(id);
    ++nextid;
}

```

## 解析.env文件
```
vi .env
  app_name=cart-service
  app_env=dev

示例1:
  vi cjs.js
  const Env = require('jssupport/env')('./.env');

  console.log(Env.getEnvData().app_env); //dev
  console.log(Env.getEnvData().app_name); //cart-service

示例2:
  vi cjs2.js
  const LoadEnv = require('jssupport/env');
  const Env = LoadEnv('./.env');

  console.log(Env.getEnvData().app_env); //dev
  console.log(Env.getEnvData().app_name); //cart-service
  console.log(Env.getEnvData()['app_name']); //cart-service

```

## app使用示例1
```
app生命周期：
  1、获取app对象：执行app方法并传入全局配置
    app = application({}); 或者 app = application("hello全局配置");
  2、初始化：
    添加中间件 app.use()

  3、开始执行： await app.run() 
    执行初始化: 中间件-》插件-》上下文
    触发 ready 事件钩子
  4、收到信号-释放资源: 上下文-》onClose事件钩子

const application = require('jssupport/app');
// 执行app方法
app = application("hello全局配置");
// 添加中间件
app.use(require('jssupport/plugin/demo01'), "传给demo01插件的参数");

// 添加中间件
app.use(
  async () => {
    // 当前中间件-初始化
    console.log(app.demo01) // 获取中间件注入的静态对象
    console.log(app.globalCfg); // 获取全局对象
    // 添加gracefullyShutdown事件钩子
    app.onGracefullyShutdown(async (sig) => {
        console.log("捕获退出信号，触发gracefullyShutdown事件：", sig);
    });
    // 添加ready事件钩子
    app.addHook('ready', async () => {
      console.log("这里编写业务逻辑");
    });

  });

(async () => {
  await app.run();
})();

```

## cache示例
```
const cache = require('jssupport/cache')();

// 设置cache值
cache.set("abc", 123);
// 获取cache值
console.log(cache.get("abc")); //123
// 设置cache值并设置过期时间，秒
cache.set("userinfo", "用户信息", {expire:5000});
cache.set("userinfo", "用户信息6", {expire:6000});
// 清除cache
cache.clear("abc");
console.log(cache.get("userinfo")) //用户信息6
console.log(cache.get("abc"));//undefined

```

## 时间方法
```
const timeObj = require('jssupport/time');
console.log(timeObj.getTimeNow()); //时间戳-秒
console.log(timeObj.getMilliseconds()); //时间戳-毫秒

```

## other
```
const pinDir = require('jssupport/f');
console.log(pinDir.pinPath("abc/demo01")); // 拼接目录


```
