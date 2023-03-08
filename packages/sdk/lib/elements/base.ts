export namespace BaseElementType {
    export interface Options {
        opacity: number; // 透明度
        [key: string]: any;
    }
}

/**
 * 矩形 容器
 */
export class BaseElement {
    public options: BaseElementType.Options;
    public target: HTMLElement;
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
        element.setAttribute('style', `
            opacity: ${opacity};
        `);
        element.innerHTML = '';
        element.innerHTML = value;
        return this.target;
    }
    
    public render(element: HTMLElement) {
        if (!element) {
            throw new Error('element is required');
        }
        return this.setup(element);
    }
    
    public update(options: BaseElementType.Options) {
        this.options = options;
        this.render && this.render(this.target);
    }

    public destroy() {
        this.target.remove();
    }
}