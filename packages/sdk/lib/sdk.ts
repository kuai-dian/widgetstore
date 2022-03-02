import { useSubscribe } from './subscribe';

interface IRenderProps {
  options: object
  data: object
}

type IRender = (IRenderProps) => void

/**
 * 定义渲染方法
 * @param render {IRender} 渲染函数
 */
export const defineRender = (render: IRender) => {
  const {bind, call} = useSubscribe()
  bind('onRenderWidget', render)
  call('onWidgetsRenderDone')
}

/**
 * 定义更新方法
 * @param update {IRender} 更新函数
 */
export const defineUpdate = (update: IRender) => {
  const {bind} = useSubscribe()
  bind('onRenderWidget', update)
}
