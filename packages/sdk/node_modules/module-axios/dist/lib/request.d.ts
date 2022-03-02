interface api {
    url: string;
    when: Function | Boolean;
}
interface options {
    api: string | Array<api>;
    useApiIndex?: number;
    axiosOptions?: object;
    authOptions?: any;
    prefix?: Function;
    processFix?: Function;
    fail?: Function;
}
export declare type method = 'get' | 'post' | 'delete' | 'opinion' | 'put';
interface createModules {
    name?: string;
    method: method;
    url: string;
    useApiIndex?: number;
    prefix?: Function;
    processFix?: Function;
    fail?: Function;
    config?: options;
}
/**
 * 请求模块
```
const request = new Request({
    // 可以传字符串或者对象,按api类型变更当前全局api地址，具体条件按传输（可以用于通过环境控制api地址）
    api: [{
        url: 'http://',
        when: () => {},
    }],
});
```
 */
declare class Request {
    #private;
    io: any;
    constructor({ api, // 可以传字符串或者对象
    axiosOptions, prefix, // 前置处理函数
    processFix, // 过程处理函数
    fail, // 错误处理函数
    authOptions, // 权限内容
    useApiIndex, }: options);
    /**
     * 创建API
     */
    create(name: string, modules: createModules | Array<createModules>): void;
}
export default Request;
//# sourceMappingURL=request.d.ts.map