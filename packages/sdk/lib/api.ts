import { useSubscribe } from './subscribe';

/**
 * 更新方法
 * @param props {any} 参数
 */
export const update = (props: any) => {
  const {call} = useSubscribe()
  call('onSaveWidgetData', props)
}
