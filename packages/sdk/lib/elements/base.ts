export namespace BaseElementType {
    export interface Options {
        value: string; // 内容
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
        this.options = options;
    }

    // 待子类实现的方法 setup
    public setup(element: HTMLElement) {
        const { value, opacity } = this.options;
        this.target = document.createElement('div');
        this.target.setAttribute('style', `
            opacity: ${opacity};
        `);
        this.target.innerHTML = value;
        element.innerHTML = '';
        element.appendChild(this.target);
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