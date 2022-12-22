import axios from 'axios';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import { hex_md5 } from '@/utils/md5';
/**
 * 接口请求模块
 * todo：
 *  1. 全局接口请求配置：支持多套环境配置 已完成
 *  2. 模块化定义接口，单个入口导出所有接口 已完成
 *  3. 全局/局部支持前、后置处理函数，应变应急数据结构变更、数据结构处理问题 已完成
 *  4. 支持接口数据缓存，并可以设置接口更新时间周期
 *  5. 支持自定义接口请求载入
 *
 *  全局配置伪代码
 *  import gdIo from 'gd-io'
 *  gdIo.init({
 *    api: 'http://xxxxxx',
 *    prefix: '',
 *  })
 */

function splitNames(name: string) {
    return name.split('.');
}

function getDomain(webUrl: string){
  const urlReg=/http:\/\/([^\/]+)/i;
  let domain = webUrl.match(urlReg);
  return ((domain != null && domain.length>0)? domain : "");
}

interface api {
    /**
     * API地址
     * @example url: 'https://localhost:8080'
     */
    url: string;
    /**
     * when的值为false的api将会被过滤不用
     * @example when: () => import.meta.env.DEV
     * @example when: import.meta.env.DEV
     * @example when: process.env.NODE_ENV === 'development'
     */
    when: Function | Boolean;
}

interface options {
    /**
     * API信息配置，支持使用单API或模块化多API
     * @description 模块化API时，将采用第一个when满足条件的API项作为项目运行所需要的API
     * @example api: 'https://localhost:8080'
     * @example ```javascript
api: [{
    url: 'https://localhost:8080',
    when: process.env.NODE_ENV === 'development'
}, {
    url: 'https://api.bblog.cc',
    when: process.env.NODE_ENV === 'production'
}]
```
     */
    api: string | Array<api>;
    /**
     * 当前使用API的下标 最高优先级 将无视when条件
     */
    useApiIndex?: number;
    /**
     * 自定义axios config 配置
     */
    axiosOptions?: object;
    /**
     * 自定义权限校验数据配置 将在 prefix 中被传入判断鉴权逻辑
     */
    authOptions?: any;
    /**
     * 前置处理函数，在接口发请求之前调用 在这里可以做拦截接口请求操作
     */
    prefix?: Function;
    /**
     * 后置处理函数，在接口拿到数据之后数据给到项目之前调用，在这里可以做数据转换处理操作
     */
    processFix?: Function;
    /**
     * 错误拦截处理函数，在这里可以抓取到错误信息
     */
    fail?: Function;
    /**
     * 最大缓存数量限制，当接口定义使用cache时可用
     */
    maxCacheCount?: number;
}

/**
 * 请求方法
 */
export enum method {
    'get' = 'get',
    'post' = 'post',
    'delete' = 'delete',
    'opinion' = 'opinion',
    'put' = 'put',
}

interface createModules {
    name?: string;
    method: method;
    url: string;
    useApiIndex?: number;
    prefix?: Function;
    processFix?: Function;
    fail?: Function;
    config?: options;
    /**
     * 是否需要缓存
     * 持久化缓存 直接传递时间
     */
    cache?: number | Function;
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
class Request {
    #api = ''; //

    #apis: Array<any> = []; // 全局api地址

    #axiosOptions: any = {}; // headers

    #prefix?: Function; // 全局前置处理函数

    #processFix?: Function; // 全局过程处理函数

    #fail?: Function; // 全局过程处理函数

    io: any = {}; // 全局io模块汇聚

    maxCacheCount = 10;

    #axios: any = {};

    #getAuthOptions: any = {}; // 全局权限信息

    constructor({
        api = '', // 可以传字符串或者对象
        axiosOptions = {},
        prefix, // 前置处理函数
        processFix, // 过程处理函数
        fail, // 错误处理函数
        authOptions = () => {}, // 权限内容
        useApiIndex,
        maxCacheCount = 10,
    }: options) {
        this.#axiosOptions = axiosOptions;
        this.#prefix = prefix;
        this.#processFix = processFix;
        this.#fail = fail;
        this.#getAuthOptions = isFunction(authOptions) ? authOptions : () => authOptions;
        this.maxCacheCount = maxCacheCount;
        // 按api类型变更当前全局api地址，具体条件按传输（可以用于）
        this.#apis = Array.isArray(api) ? api : [{ url: api, when: () => true }];
        if (!isUndefined(useApiIndex)) {
            this.#api = this.#apis[useApiIndex!].url;
        } else {
            Array.isArray(api)
                ? [...api].reverse().forEach((o) => {
                      o.when instanceof Function
                          ? o.when() && (this.#api = o.url)
                          : o.when && (this.#api = o.url);
                  })
                : (this.#api = api);
        }
        // 创建axios
        this.#axios = axios.create({
            baseURL: this.#api,
            ...this.#axiosOptions,
        });
        this.#axios = this.#createAxios();
    }

    /**
     * 创建API
     */
    create(name: string, modules: createModules | Array<createModules>) {
        const hasModules = Array.isArray(modules);
        if (!name && !hasModules && !modules.name) {
            throw Error('name、modules.name 不能同时不定义');
        }

        (!hasModules ? [modules] : modules).forEach((module) => {
            let path = this.io;
            const names = splitNames(name);
            names.forEach((o, i) => {
                if (!path[o]) {
                    path = path[o] =
                        names.length - 1 === i && !module.name ? this.#getAxios(module) : {};
                } else {
                    path = path[o];
                }
            });
            if (module.name) {
                const moduleNames = splitNames(module.name);
                moduleNames.forEach((o, i) => {
                    if (!path[o]) {
                        path = path[o] = moduleNames.length - 1 === i ? this.#getAxios(module) : {};
                    } else {
                        path = path[o];
                    }
                });
            }
        });
    }

    /**
     * 请求体构建器
     * @param module
     * @returns
     */
    #getAxios(module: createModules) {
        return async (data: any, configs: any) => {
            let content: any;
            try {
                // 权限拦截
                const throwError = (error: string, hideMessage = false) => {
                    throw Error(!hideMessage ? error || 'Permission denied' : '');
                };
                // 全局前置处理函数
                data =
                    (this.#prefix
                        ? this.#prefix(data, {
                              data,
                              reject: throwError,
                              global: this,
                              module,
                              authOptions: this.#getAuthOptions(),
                          })
                        : data) || data;
                // 如果有url参数
                let paramUrl: string = module.url;

                // 如果URL中含Http那么直接使用Http完整地址作为请求地址，并且支持:
                const hasHttp = paramUrl.includes('https://') || paramUrl.includes('http://')
                let httpApi = ''
                if (hasHttp) {
                    const [domain] = getDomain(paramUrl)
                    httpApi = domain
                    paramUrl = paramUrl.replace(domain,'')
                }


                if (module.url.indexOf('/:') !== -1) {
                    paramUrl = paramUrl
                        .split('/')
                        .map((o: any) => {
                            if (o.indexOf(':') !== -1) {
                                return data[o];
                            } else {
                                return o;
                            }
                        })
                        .join('/');
                }

                // url组合
                let api = this.#api;
                if (!isUndefined(module.useApiIndex)) {
                api = this.#apis[module.useApiIndex].url;
                }

                const url = `${hasHttp ? httpApi : api}${paramUrl}`;
                // url组合
                // 模块前置处理函数
                data =
                    (module.prefix
                        ? module.prefix(data, {
                              data,
                              reject: throwError,
                              global: this,
                              module,
                              authOptions: this.#getAuthOptions(),
                              url,
                          })
                        : data) || data;

                // 真正的请求
                Object.assign({}, module?.config, configs)
                if (module.method === "get") {
                    content = await this.#axios.get(url, {
                        params: data,
                        ...configs,
                    });
                } else {
                    content = await this.#axios[method[module.method]](url, data, Object.assign({}, module?.config, configs));
                }
                // this.#axios[method[module.method]](url, data, {
                //     ...(module.config || {}),
                //     ...(configs || {}),
                // });
                // 全局后置处理函数
                content.data = module.processFix
                    ? module.processFix(content.data, content)
                    : content.data;
                // 模块后置处理函数
                content.data = this.#processFix
                    ? this.#processFix(content.data, content)
                    : content.data;
            } catch (error: any) {
                content = module.fail ? module.fail(error) : error;
                // 模块错误拦截函数
                content = this.#fail ? this.#fail(error, content) : error;
                // 错误抛出
                throw Error(content);
            }
            return content?.data;
        };
    }

    /**
     * 创建接口请求
     * @param props
     * @param config
     */
    #createAxios(config: any = {}) {
        return axios.create({
            baseURL: this.#api,
            ...this.#axiosOptions,
            ...config,
        });
    }

    async #cacheRequest({module, configs, url, data}: {module: createModules, configs: any, url: string, data: any}) {
        if (module.cache) {
            if (module.cache instanceof Function) {
                return module.cache(data, configs);
            } else {
                const cacheKey = hex_md5(url + JSON.stringify(data));
                const cache = JSON.parse(localStorage.getItem('cache') || '{}');
                const cacheTime = JSON.parse(localStorage.getItem('cacheTime') || '{}');
                if (cache[cacheKey] && cacheTime[cacheKey] && cacheTime[cacheKey] > Date.now()) {
                    return cache[cacheKey];
                } else {
                    const content = await await this.#axios[method[module.method]](url, data, {
                        ...(module.config || {}),
                        ...(configs || {}),
                    });
                    if (Object.keys(cache).length > this.maxCacheCount) {
                        const cacheKey = Object.keys(cache)[0]
                        delete cache[cacheKey];
                        delete cacheTime[cacheKey];
                    }
                    localStorage.setItem('cache', JSON.stringify({
                        ...cache,
                        [cacheKey]: content,
                    }))
                    localStorage.setItem('cacheTime', JSON.stringify({
                        ...cacheTime,
                        [cacheKey]: Date.now() + module.cache,
                    }))
                    return content;
                }
            }
        } else {
            const content = await this.#axios[method[module.method]](url, data, {
                ...(module.config || {}),
                ...(configs || {}),
            });
            return content;
        }
    }

    /**
     * 获取当前环境API
     * @returns
     */
    getApi() {
        return this.#api;
    }
}

export default Request;
