import { BaseElement, BaseElementType } from "./base";

export namespace TextElementType {
    export interface Options extends BaseElementType.Options {
        /**
         * 文本内容
         */
        value: string;
        /**
         * 文本颜色
         */
        color: string;
        /**
         * 文本大小
         */
        fontSize: number;
        /**
         * 文本粗细
         */
        fontWeight: number;
        /**
         * 文本字体
         */
        fontFamily: string;
        /**
         * 文本对齐方式
         */
        textAlign: string;
        /**
         * 文本行高
         */
        lineHeight: number;
        /**
         * 文本字间距
         */
        letterSpacing: number;
        /**
         * 文本下划线
         */
        textDecoration: string;
        /**
         * 文本阴影
         */
        textShadow: string;
    }
}

export class TextElement extends BaseElement {
    constructor(options: TextElementType.Options) {
        super(options);
        this.options = Object.assign({}, TextElement.defaultOptions, options);
    }

    /**
     * 默认配置
     */
    static defaultOptions = {
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
    }

    /**
     * 渲染
     * @param element HTMLElement
     * @returns HTMLElement
     */
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