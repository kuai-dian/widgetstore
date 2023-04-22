import { mountCSS } from './../utils';
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
         * 如果是 google font 则需要在页面中引入，可以直接在 值做标注 GF:Open Sans
         * 如果是自定义字体，则需要在页面中引入，可以直接在 值做标注 CF:Open Sans
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
        /**
         * 文本样式
         * className
         */
        className: string;
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
        value: 'This is a text element.',
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
     * 渲染文字
     * @param element HTMLElement
     * @returns 
     */
    private drawText(element: HTMLElement) {
        const { color, className } = this.options;
        // 未来拓展文字渐变
        // 未来拓展文字图片遮罩 https://codepen.io/csbatista/pen/jMOZBQ
        // 拓展方法：文字自定义 CSS Class
        if (className) {
            element.setAttribute('class', className)
            mountCSS({
                id: className,
                url: `${this.CDNPrefix}css/${className}.css`,
                notReRender: true
            }, true)
            return '';
        }
        element.style.color = color;
    }

    /**
     * 渲染字体
     */
    private drawFont(element: HTMLElement) {
        const { fontFamily } = this.options;
        const [ fontType, fontName] = fontFamily.split(':');
        if (fontName) {
            let url = `${this.CDNPrefix}fonts/${fontName}.css`;
            if (fontType === 'GF') {
                url = `https://fonts.googleapis.com/css?family=${fontName}`;
            }
            mountCSS({
                id: fontName,
                url,
                notReRender: true
            }, true)
        } 
        element.style.fontFamily = String(fontName) || fontType;
    }

    /**
     * 渲染
     * @param element HTMLElement
     * @returns HTMLElement
     */
    public setup(element: HTMLElement) {
        const { value, fontSize, fontWeight, fontFamily, textAlign, lineHeight, letterSpacing, textDecoration, textShadow, opacity, fontColor, shadow } = this.options;
        this.drawText(element)
        this.drawFont(element)

        element.style.fontSize = `${fontSize}px`;
        element.style.fontWeight = `${fontWeight}`;
        element.style.fontFamily = `${fontFamily}`;
        element.style.textAlign = `${textAlign}`;
        element.style.lineHeight = `${lineHeight}px`;
        element.style.letterSpacing = `${letterSpacing}px`;
        element.style.textDecoration = `${textDecoration}`;
        element.style.textShadow = `${textShadow}`;
        element.style.opacity = `${opacity}`;

        element.style.color = `${fontColor}`
        if (shadow) {
            element.style.textShadow = `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
        }

        element.innerHTML = '';
        element.innerHTML = value;
        return element;
    }
}