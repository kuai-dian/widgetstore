import {mountCloudbase} from '../lib/cloudbase'

const cloudbaseContext = mountCloudbase({
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


// 请求模块
// 第一个参数为模块命名空间，
// 第二个参数为当前模块所使用的数据集，
// 第三个参数为请求所封装的方法，每个方法默认含有 get、set、remove、update、count方法。
cloudbaseContext.ioCreate('example', 'databaseName', {
  thread: {
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
})


test('测试1', () => {
  const io = cloudbaseContext.io.example.thread
  expect(io.get).toBe(true)
})