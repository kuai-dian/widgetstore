import { useSubscribe } from './subscribe';

enum apiEvents {
  onSaveWidgetData = "onSaveWidgetData",
  onGetWidgetData = "onGetWidgetData",
  onRequestWithAxios = "onRequestWithAxios",
}

/**
 * 更新方法
 * @param props {any} 参数
 */
export const update = (props: any) => {
  const {call} = useSubscribe()
  call(apiEvents.onSaveWidgetData, props)
}

/**
 * 获取数据方法
 * @param props {any} 参数
 */
export const get = () => new Promise((resolve, reject) => {
  const {call} = useSubscribe()
  call(apiEvents.onGetWidgetData, {resolve, reject})
})

/**
 * 代理axios请求方法
 * @param config {any} axios配置
 */
export const axios = (config: any = {}) => new Promise((resolve, reject) => {
  const {call} = useSubscribe()
  if (process.env.NODE_ENV === 'development') {
    axios(config).then(resolve).catch(reject)
  } else {
    call(apiEvents.onRequestWithAxios, {config, callback: (params) => {
      if (params.success) {
        resolve(params)
      } else {
        reject(params)
      }
    }})
  }
})