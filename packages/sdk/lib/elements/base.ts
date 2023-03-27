export namespace BaseElementType {
    export interface Options {
        /**
         * 透明度
         */
        opacity: number;
        [key: string]: any;
    }
}

/**
 * 元素基类
 */
export class BaseElement {
    public options: BaseElementType.Options;
    public target: HTMLElement;
    /**
     * CDN 前缀 需要以 / 结尾
     * @description 用于加载资源, 比如CSS、图片等
     * @example window.CDNPrefix = 'https://cdn.notion.pet/'
     */
    public CDNPrefix: string = window.CDNPrefix || '/';
    constructor(options: BaseElementType.Options) {
        this.options = Object.assign({}, BaseElement.defaultOptions, options);
    }

    static defaultOptions = {
        opacity: 1,
    }

    // 待子类实现的方法 setup
    public setup(element: HTMLElement) {
        const { value, opacity } = this.options;
        element = document.createElement('div');
        // todo 设置样式 兼容历史已有样式列表
        element.style.opacity = `${opacity}`;
        element.innerHTML = '';
        element.innerHTML = value;
        return this.target;
    }
    
    /**
     * 渲染
     * @param element HTMLElement
     * @returns 
     */
    public render(element: HTMLElement) {
        if (!element) {
            throw new Error('element is required');
        }
        return this.setup(element);
    }
    
    /**
     * 更新
     * @param options 
     */
    public update(options: BaseElementType.Options) {
        this.options = options;
        this.render && this.render(this.target);
    }

    /**
     * 销毁
     */
    public destroy() {
        this.target.remove();
    }
}