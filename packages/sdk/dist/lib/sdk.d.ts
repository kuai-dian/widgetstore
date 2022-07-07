export interface IRenderProps {
    options: object;
    data: object;
}
/**
 * 渲染函数
 */
declare type IRender = (IRenderProps: IRenderProps) => void;
/**
 * 定义渲染方法
 */
interface IDefineRenderOptions {
    /**
     * 是否为开发模式，立即渲染，开发阶段将其设置为true，一般传递 `process.env.NODE_ENV === 'development'`
     */
    isDevMode?: boolean;
    /**
     * 是否首次渲染和二次更新同方法，默认分离方法
     */
    isSingle?: boolean;
}
/**
 * 定义渲染方法
 * @param render {IRender} 渲染函数
 * @param options {IDefineRenderOptions} 参数
 */
export declare const defineRender: (render: IRender, options: IDefineRenderOptions) => void;
/**
 * 定义更新方法
 * @param update {IRender} 更新函数
 */
export declare const defineUpdate: (update: IRender) => void;
export {};
//# sourceMappingURL=sdk.d.ts.map