type IPetApi = {
  when: boolean | (() => boolean)
  api: string
}

type IApis = string | IPetApi[]
type IUseApiKey = number | undefined

type IPetApis = {
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
  public apis: IApis = ''
  public useApiKey: IUseApiKey
  constructor(options: IPetApis) {
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