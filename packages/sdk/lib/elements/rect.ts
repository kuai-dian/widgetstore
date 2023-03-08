import { BaseElement } from "./base";

export namespace RectElementType {
    export interface Options {
        background: string; // 背景
        borderRadius: number; // 圆角
        border: string; // 边框
        opacity: number; // 透明度
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

    static defaultOptions = {
        background: '#ffffff',
        borderRadius: 0,
        border: 'none',
        opacity: 1,
    }

    public setup(element: HTMLElement) {
        const { background, borderRadius, border, opacity } = this.options;
        element.setAttribute('style', `
            background: ${background};
            border-radius: ${borderRadius}px;
            border: ${border};
            opacity: ${opacity};
        `);
        return element;
    }
}