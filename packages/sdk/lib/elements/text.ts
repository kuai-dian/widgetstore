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
    constructor(options: TextElementType.Options) {
        super(options);
    }

    public get defaultOptions(): TextElementType.Options {
        return {
            value: 'Hello World! This is a text element.',
            color: '#000000',
            fontSize: 16,
            fontWeight: 400,
            fontFamily: 'sans-serif',
            textAlign: 'left',
            lineHeight: 20,
            letterSpacing: 0,
            textDecoration: 'none',
            textShadow: 'none',
            opacity: 1,
        };
    }

    public setup(element: HTMLElement) {
        const { value, color, fontSize, fontWeight, fontFamily, textAlign, lineHeight, letterSpacing, textDecoration, textShadow, opacity } = this.options;
        element.setAttribute('style', `
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
        element.innerHTML = '';
        element.innerHTML = value;
        return element;
    }
}