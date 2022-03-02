# cloudbase-context
腾讯云开发云数据库统一管理工具包，之前全局前、后置处理请求所携带的信息，分离业务以及请求代码相关。方便后续开发容错，随时做处理。

## 名称空间支持
在大型项目中会经常碰见一种情况，不同的业务模块有着很多非常相似(甚至相同)的数据接口。`cloudbase-context`在名称空间方面做了一定的设计，书写十分灵活。

## 数据请求参数/返回值处理
在`cloudbase-context`中支持前置处理、后置处理、错误处理三个处理节点，类似于MVC开发模式下组件生命周期的概念。当一个数据请求发起之前，可以先走前置处理函数做一次校验，发起之后拿到返回值可以走后置处理函数再做一次处理，当发生错误时，会调用错误处理函数，在多接口的情况下会显得十分方便。
> 仅仅如此吗？

当然不是，`cloudbase-context`的值处理还分为全局、模块两个级别。设想，当你写一个小程序，接口报错你是一概不知的，这是如果有一个全局处理的钩子来抓取每一次获取数据所返回的错误并作出友好的提示，那岂不是很香？刚好`cloudbase-context`就做了这件事！

# 安装方法
## npm
```
npm install cloudbase-context -S
```
## yarn
```
yarn add cloudbase-context
```

# 使用方法
建议创建一个单独的文件 `common/io.js` 来管理所有的io请求。
## 引入
```js
import mountCloudbase from 'cloudbase-context';
```
然后准备相关`配置项`后执行方法
```js
mountCloudbase({
  // 是否生产开发同环境，如果开启，则均适用 development 内部配置
  isSingle: false,
  // 是否自定义当前环境配置信息，useEnvironment的值需要在本配置信息中定义
  // useEnvironment: 'custom',
  // custom: {
  //   env: '',
  //   .....
  // },
  // 如果不支持 process.env.NODE_ENV === 'development' 来判断当前是否是开发环境的，可以独立配置 isDev 属性
  // isDev: false,
  // 开发环境
  development: {
    // 环境id
    env: '',
    // app标识
    appSign: '',
    appSecret: {
      // 版本
      appAccessKeyId: '',
      // 密钥
      appAccessKey: '',
    },
  },
  // 生产环境
  production: {
    // 环境id
    env: '',
    // app标识
    appSign: '',
    appSecret: {
      // 版本
      appAccessKeyId: '',
      // 密钥
      appAccessKey: '',
    },
  },
  // 全局文件上传路径
  // cloudPath: {
  //   enable: true, // 是否启用
  //   proFix: 'dirname'
  // },
  // 全局统一的前置处理
  processFix: v => v,
  // 全局统一的后置处理
  complateFix: v => v,
  // 全局统一的错误处理
  fail: v => v,
})
```
方法执行完成后，可以通过调用`ioCreate`api来创建模块
> 注意：前置、后置、错误处理函数，一但没有拿到返回值，将使用原始值。
```js
// 请求模块
// 第一个参数为模块命名空间，
// 第二个参数为当前模块所使用的数据集，
// 第三个参数为请求所封装的方法，每个方法默认含有 get、set、remove、update、count方法。
cloudbaseContext.ioCreate('example', 'databaseName', {
  thread: {
    // 开发连接名称
    // devCollection = '',
    // 是否使用开发连接
    // useDev = false,
    // 局部文件上传路径前缀,如果定义了，则优先使用本配置
    cloudPath: {
      enable: true, // 是否启用
      proFix: 'dirname', // 前缀，如果定义了前缀，则忽略全局的前缀配置
      path: '/path', // 路径前缀，如果定义了，则 proFix + path
      // 支持的文件类型，类型检查
      // https://www.w3school.com.cn/media/media_mimeref.asp
      mineType: ['image/gif', 'image/jpeg'],
      // 文件检查错误处理
      mineTypeError: error => {

      }
    },
    // 前置处理
    processFix: params => {
      return params
    },
    // 后置处理
    complateFix: response => {
      return response
    },
    // 错误处理
    fail: error => {
      return error
    },
  },
  thread2: {
    ....
  }
})
```
最后将`cloudbaseContext`实例返回
```js
export default cloudbaseContext;
```

此时已经准备好了 `cloudbaseContext`实例，我们要把它挂载到vue原型上，进入 `main.js` 中
```js
Vue.prototype.$cloudbase = cloudbaseContext;
Vue.prototype.$io = cloudbaseContext.io;
```

## 查询条件
- where	通过指定条件筛选出匹配的文档，可搭配查询指令（eq, gt, in, ...）使用
- skip	跳过指定数量的文档，常用于分页，传入 offset
- orderBy	排序方式
- limit	返回的结果集(文档数量)的限制，有默认值和上限值
- field	指定需要返回的字段
- watch	可建立监听
## GET

```js
this.$io.example.thread.get({
  where: {
    userId: +userId,
    date: _.and(_.gte(now - 2592000),_.lte(now)),
  },
  field: {
    id: true,
  },
  ...查询条件
})
.then(response => {})
.catch(error => {});
```

## Count

```js
this.$io.example.thread.count()
.then(response => {})
.catch(error => {});
```

## add

```js
this.$io.example.thread.add({
  a: '',
  b: '',
})
.then(response => {})
.catch(error => {});
```
## remove

```js
this.$io.example.thread.remove({
  where: {
    userId: 1,
  }
})
.then(response => {})
.catch(error => {});
```

## update/set

```js
this.$io.example.thread.update({
  where: {
    userId: 1,
  },
  data: {
    a: '2021',
    a: '新年好',
  }
})
.then(response => {})
.catch(error => {});
```

针对于模块管理某些特殊情况会存在无需在模块下划分子模块的需求，此时只需要不传递第三个参数即可
```js
// 请求模块
cloudbaseContext.ioCreate({
  // 模块名称
  moduleName: 'moduleName',
  // 数据库名称
  databaseName: 'databaseName',
  // 前置处理
  processFix: params => {
    return params
  },
  // 后置处理
  complateFix: response => {
    return response
  },
  // 错误处理
  fail: error => {
    return error
  },
  // ........
})
```
使用上述方式可以直接得到一个基于根的请求集合
```js
// 请求示例
this.$io.moduleName.update({
  where: {
    userId: 1,
  },
  data: {
    a: '2021',
    a: '新年好',
  }
})
.then(response => {})
.catch(error => {});
```
## 持续操作
在所有的`response`中，都外后暴露了当前`collection`，你可以继续做`get`,`count`等操作！
# 文档
[cloudbase-context使用文档](http://cloudbase-context.github.gold/)

# 维护支持&联系作者
- 邮箱：`pingxi8@dingtalk.com`
- 微信：`SouWinds`
- 哔哩哔哩：`全栈知识库`



# License
MIT

Copyright (c) 2020-present, Junping (SouWind) Hu