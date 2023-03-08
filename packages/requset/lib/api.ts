import PetRequest from "./index"

export type IPetApi = {
  /**
   * when的值为false的api将会被过滤不用
   * @example when: () => import.meta.env.DEV
   * @example when: import.meta.env.DEV
   * @example when: process.env.NODE_ENV === 'development'
   */
  when: boolean | (() => boolean)
  /**
   * API地址
   * @example url: 'https://localhost:8080'
   */
  api: string
}

export type IApis = string | IPetApi[]
export type IUseApiKey = number | undefined

export type IPetApis = {
  /**
   * API信息配置，支持使用单API或模块化多API
   * @description 模块化API时，将采用第一个when满足条件的API项作为项目运行所需要的API
   * @example apis: 'https://localhost:8080'
   * @example ```javascript
apis: [{
  url: 'https://localhost:8080',
  when: process.env.NODE_ENV === 'development'
}, {
  url: 'https://api.bblog.cc',
  when: process.env.NODE_ENV === 'production'
}]
```
   */
  apis: string | IPetApi[]
  /**
   * 强制使用API Key
   */
  useApiKey?: IUseApiKey
}

/**
 * PetRequestApiManager
 */
export default class PetRequestApiManager {
  public root: PetRequest
  public apis: IApis = ''
  public useApiKey: IUseApiKey
  constructor(options: IPetApis, root: PetRequest) {
    this.root = root
    this.apis = options.apis
    this.useApiKey = options.useApiKey
  }

  get current() {
    if (typeof this.apis === 'string') return this.apis
    if (this.useApiKey && this.apis[this.useApiKey]) return this.apis[this.useApiKey]
    return this.apis.reduce((p, c) => {
      if (p) return p
      if (typeof c.when === 'function' && c.when()) return c
      if (typeof c.when === 'boolean' && c.when) {
        return c
      }
      return p
    }, false)
  }

  public getApi(useApiKey: IUseApiKey) {
    return this.apis[useApiKey] ? this.apis[useApiKey] : this.current
  }
}