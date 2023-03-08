import { BaseElement } from "./base";

export namespace TextElementType {
    export interface Options {
        value: string; // 文本内容
        color: string; // 文本颜色
        fontSize: number; // 文本大小
        fontWeight: number; // 文本粗细
        fontFamily: string; // 文本字体
        textAlign: string; // 文本对齐方式
        lineHeight: number; // 文本行高
        letterSpacing: number; // 文本字间距
        textDecoration: string; // 文本下划线
        textShadow: string; // 文本阴影
        opacity: number; // 透明度
    }
}

export class TextElement extends BaseElement {
    public target: HTMLElement;
    constructor(options: TextElementType.Options) {
        super(options);
    }

    public setup(element: HTMLElement) {
        const { value, color, fontSize, fontWeight, fontFamily, textAlign, lineHeight, letterSpacing, textDecoration, textShadow, opacity } = this.options;
        this.target = document.createElement('span');
        this.target.setAttribute('style', `
            color: ${color}; 
            font-size: ${fontSize}px; 
            font-weight: ${fontWeight}; 
            font-family: ${fontFamily}; 
            text-align: ${textAlign}; 
            line-height: ${lineHeight}px; 
            letter-spacing: ${letterSpacing}px; 
            text-decoration: ${textDecoration}; 
            text-shadow: ${textShadow}; 
            opacity: ${opacity};
        `);
        this.target.innerText = value;
        element.innerHTML = '';
        element.appendChild(this.target);
        return this.target;
    }
}