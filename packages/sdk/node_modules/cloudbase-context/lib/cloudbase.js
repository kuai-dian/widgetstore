import cloudbase from '@cloudbase/js-sdk'
import {checkCollection} from './utils'
import login from './login'

/**
 * 返回当前所含有的触发请求集合
 */
const checkType = types => {
  const type = [
    'skip',
    'doc',
    'orderBy',
    'limit',
    'field',
    'where',
    'watch',
    'filePath',
  ]
  return Object.keys(types).filter(v => type.includes(v))
}

/**
 * 通用处理函数
 * @param {*} type
 * @param {*} global
 * @param {*} current
 * @param {*} result
 */
const processer = ({type, global, current, result}) => {
  // 执行全局处理函数
  global[type] && (result = global[type](result) || result)

  // 执行局部处理函数
  current[type] && (result = current[type](result) || result)

  return result
}

// 云开发实例
let cloudbaseApp = {}
// io组
const ioArray = {}

/**
 * 挂载云开发入口方法
 */
export const mountCloudbase = config => {
  const {development, production, isSingle} = config

  let environment = development
  // 如果非开发且非单一环境，则环境切换为生产环境
  if (!isSingle && !config.isDev) {
    environment = production
  }

  // 初始化
  cloudbaseApp = cloudbase.init(environment)

  /**
   * 没找到这个方法会报错，十分奇葩
   */
  try {
    // eslint-disable-next-line no-undef
    wx.getAccountInfoSync = wx.getAccountInfoSync || (() => {})
  // eslint-disable-next-line no-empty
  } catch (error) {}

  const auth = cloudbaseApp.auth({
    // 登录状态的持久保留
    // session 在 SessionStorage 中保留登录状态，当前页面关闭后会被清除。
    // local 在本地存储中长期地保留登录状态。
    // none 在内存中保留登录状态，当前页面刷新、重定向之后会被清除。
    persistence: 'local',
  })

  // 应用初始化时,避免重复登录
  if (auth.hasLoginState()) {
    // 此时已经登录
  } else {
    // 此时未登录，执行您的登录流程
  }

  cloudbaseApp.authInstance = auth

  /**
   * 用户登录
   * @param {*} loginSchema
   */
  cloudbaseApp.login = loginSchema => {
    const {type} = loginSchema
    const loginInstance = login(auth)[type](loginSchema)
    return loginInstance
  }

  cloudbaseApp.ioCreate = (path = 'default', collection = 'test', ioObject) => {
    // 判断当前 path 是否为对象，如果为对象，此时使用新版根模块
    const useRoot = typeof path === 'object'
    if (useRoot) {
      ioObject = {common: path}
      collection = path.databaseName
    }

    const io = {}

    Object.entries(ioObject).forEach(([k, v], i) => {
      io[k] = {}

      Array(
        {
          method: 'get',
        },
        {
          method: 'add',
          // 表示无需自动添加where条件
          noWhere: true,
        },
        {
          method: 'set',
        },
        {
          method: 'update',
        },
        {
          method: 'count',
        },
        {
          method: 'remove',
        },
        // 文件上传
        {
          method: 'uploadFile',
          noWhere: true,
        }
      ).forEach(({method, noWhere}) => {
        io[k][method] = (params = {}) => {
          if (typeof params !== 'object') {
            return console.error(`io.${k}.${method}()方法的参数必须传递对象！`)
          }
          // 前置处理
          params = processer({
            type: 'processFix',
            global: config,
            current: v,
            result: params,
          })

          return new Promise((resolve, reject) => {
            // 获取到当前环境下请求所需要的 collection
            let requestCollection = cloudbaseApp.database().collection(checkCollection({
              ...v,
              collection,
            }))

            // 如果啥也没有，默认传一个空的where
            !noWhere && (params.where = params.where || {})

            // 按当前所需构建请求方法
            checkType(params).forEach(type => {
              requestCollection = requestCollection[type](params[type])
            })

            switch (method) {
              case 'uploadFile':
                // 加上文件上传前缀
                params.cloudPath = `${config.cloudPathProFix}/${params.cloudPath}`
              case 'default':
            }

            // 真正的请求
            requestCollection[method](params.data || (method === 'add' ? params : '')).then(result => {
              // 后置处理
              try {
                resolve({...processer({
                  type: 'complateFix',
                  global: config,
                  current: v,
                  result,
                }),
                collection: io[k]})
              } catch (error) {
                // 错误处理
                reject({...processer({
                  type: 'fail',
                  global: config,
                  current: v,
                  result: error,
                }),
                collection: io[k]})
              }
            }).catch(error => {
              // 错误处理
              reject({...processer({
                type: 'fail',
                global: config,
                current: v,
                result: error,
              }),
              collection: io[k]})
            })
          })
        }
      })
    })

    if (useRoot) {
      ioArray[path.moduleName] = io.common
    } else {
      ioArray[path] = io
    }
  }
  cloudbaseApp.io = ioArray
  return cloudbaseApp
}

export default mountCloudbase
