---
nav:
  title: 配置
  order: 2
toc: 'menu'
---
# 全局配置
在实例化全局配置时，有一些可配置项。[实例化](../guide/base#实例化cloudbase-context)
## 环境配置
环境默认支持`开发环境`和`生产环境`两套配置信息，如果只有一套环境，你们可开启`isSingle`，如果开启，则均适用 development 内部配置。

如果您使用的是webpack，那么可以放心使用我们的环境自动切换功能，如果是别的类型或者不支持 `process.env.NODE_ENV === 'development'` 来判断当前是否是开发环境的，可以独立配置 `isDev<boolean>` 属性
```js
mountCloudbase({
  // 是否生产开发同环境，如果开启，则均适用 development 内部配置
  isSingle: false,
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
})
```

## 自定义环境配置
除默认`开发环境`和`生产环境`两套配置信息外，你还可以随意自定义配置信息。
```js
mountCloudbase({
  // 是否自定义当前环境配置信息，useEnvironment的值需要在本配置信息中定义
  useEnvironment: 'custom1',
  custom1: {
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
  custom2: {
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
})
```

## 文件上传配置
```js
mountCloudbase({
  // 全局文件上传路径
  cloudPath: {
    enable: true, // 是否启用
    proFix: 'dirname'
    // 🍠 ! 待实现 支持的文件类型，类型检查
    // https://www.w3school.com.cn/media/media_mimeref.asp
    // mineType: ['image/gif', 'image/jpeg'],
  },
})
```