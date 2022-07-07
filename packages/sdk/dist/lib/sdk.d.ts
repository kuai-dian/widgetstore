export interface IRenderProps {
    options: object;
    data: object;
}
declare type IRender = (IRenderProps: IRenderProps) => void;
/**
 * 定义渲染方法
 * @param render {IRender} 渲染函数
 * @param isRenderingNow {boolean} 是否立即渲染，建议生产不使用，开发阶段将其设置为true
 * @param isSingle {boolean} 是否首次渲染和二次更新同方法，默认分离方法
 */
export declare const defineRender: (render: IRender, isRenderingNow?: boolean, isSingle?: boolean) => void;
/**
 * 定义更新方法
 * @param update {IRender} 更新函数
 */
export declare const defineUpdate: (update: IRender) => void;
export {};
//# sourceMappingURL=sdk.d.ts.map