import { BaseElement, BaseElementType } from "./base";

export namespace RectElementType {
    export interface Options extends BaseElementType.Options {
        /**
         * 背景
         */
        background: string;
        /**
         * 圆角
         */
        borderRadius: number;
        /**
         * 边框
         */
        border: string;
        /**
         * 阴影
         */
        boxShadow: string;
    }
}

/**
 * 矩形 容器
 */
export class RectElement extends BaseElement {
    constructor(options: RectElementType.Options) {
        super(options);
        this.options = Object.assign({}, RectElement.defaultOptions, options);
    }

    /**
     * 默认配置
     */
    static defaultOptions = {
        background: '#ffffff',
        borderRadius: 0,
        border: 'none',
        opacity: 1,
        boxShadow: 'none',
    }

    /**
     * 渲染
     * @param element HTMLElement
     * @returns HTMLElement
     */
    public setup(element: HTMLElement) {
        const { background, borderRadius, border, opacity, boxShadow } = this.options;
        element.setAttribute('style', `
            background: ${background};
            border-radius: ${borderRadius}px;
            border: ${border};
            opacity: ${opacity};
            box-shadow: ${boxShadow};
        `);
        return element;
    }
}