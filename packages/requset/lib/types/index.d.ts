
interface IApi {
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

interface IPetRequestOptions {
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
  api: string | Array<IApi>;
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