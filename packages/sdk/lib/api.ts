import { useSubscribe } from './subscribe';

/**
 * 更新方法
 * @param props {any} 参数
 */
export const update = (props: any) => {
  const {call} = useSubscribe()
  call('onSaveWidgetData', props)
}

/**
 * 获取数据方法
 * @param props {any} 参数
 */
export const get = () => new Promise((resolve, reject) => {
  const {call} = useSubscribe()
  call('onGetWidgetData', resolve, reject)
})