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
const application = require('jssupport/app');

app = application("hello全局配置");
app.use(require('jssupport/plugin/demo01'), "传给demo01插件的参数");

app.use(
  async () => {
    // 初始化 todo
    console.log(app.demo01)
    console.log(app.globalCfg);
    app.onGracefullyShutdown(async (sig) => {
        console.log("触发信号：", sig);
    });

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
