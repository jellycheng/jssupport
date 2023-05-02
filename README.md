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
