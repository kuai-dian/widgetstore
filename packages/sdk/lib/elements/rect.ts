import { BaseElement } from "./base";

export namespace RectElementType {
    export interface Options {
        value: string; // 内容
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
    public target: HTMLElement;
    constructor(options: RectElementType.Options) {
        super(options);
    }

    public setup(element: HTMLElement) {
        const { value, background, borderRadius, border, opacity } = this.options;
        this.target = document.createElement('div');
        this.target.setAttribute('style', `
            background: ${background};
            border-radius: ${borderRadius}px;
            border: ${border};
            opacity: ${opacity};
        `);
        this.target.innerHTML = value;
        element.innerHTML = '';
        element.appendChild(this.target);
        return this.target;
    }
}