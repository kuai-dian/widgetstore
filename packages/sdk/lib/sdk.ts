import { useSubscribe } from './subscribe';

export interface IRenderProps {
  options: object
  data: object
}

enum renderEvents {
  onRenderWidget = "onRenderWidget",
  onWidgetsRenderDone = "onWidgetsRenderDone",
  onWeightUpdate = "onWeightUpdate",
}

/**
 * 渲染函数
 */
type IRender = (IRenderProps: IRenderProps) => void

/**
 * 定义渲染方法
 */
interface IDefineRenderOptions {
  /**
   * 是否为开发模式，立即渲染，开发阶段将其设置为true，一般传递 `process.env.NODE_ENV === 'development'`
   */
  isDevMode?: boolean
  /**
   * 是否首次渲染和二次更新同方法，默认分离方法
   */
  isSingle?: boolean
}

/**
 * 定义渲染方法
 * @param render {IRender} 渲染函数
 * @param options {IDefineRenderOptions} 参数
 */
export const defineRender = (render: IRender, options: IDefineRenderOptions) => {
  const {isDevMode = false, isSingle = false} = options
  const {bind, call} = useSubscribe()
  bind(renderEvents.onRenderWidget, render)
  isDevMode && render({options: undefined, data: undefined})
  call(renderEvents.onWidgetsRenderDone)
  if (isSingle) {
    bind(renderEvents.onWeightUpdate, render)
  }
}

/**
 * 定义更新方法
 * @param update {IRender} 更新函数
 */
export const defineUpdate = (update: IRender) => {
  const {bind} = useSubscribe()
  bind(renderEvents.onWeightUpdate, update)
}
