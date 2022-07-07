/**
 * 批量替换字符串
 * @param str {string} 字符串
 * @param find  {string} 查找字符串
 * @param replace {string} 替换字符串
 */
export const replaceAll = (str: string, find: string, replace: string) => {
  return str.replace(new RegExp(find, 'g'), replace)
}

/**
 * 返回一个随机字符串
 * @returns {string} 返回一个随机字符串 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
 */
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 返回一个唯一的定时器
 * @returns {string} 返回一个唯一的定时器
 * @example
 * const timer = uniqueTimer()
 * timer(() => {
 * }, 1000)
 */
export const uniqueTimeout = () => {
  let timeout: any
  /**
   * 返回一个唯一的定时器
   */
  return (fn: any, delay: number) => {
    clearTimeout(timeout)
    timeout = setTimeout(fn, delay)
  }
}

/**
 * 返回一个唯一的定时器
 * @returns {string} 返回一个唯一的定时器
 * @example
 * const timer = uniqueInterval()
 * timer(() => {
 * }, 1000)
 */
export const uniqueInterval = () => {
  let interval: any
  /**
   * 返回一个唯一的定时器
   */
  return (fn: any, delay: number) => {
    clearInterval(interval)
    interval = setInterval(fn, delay)
  }
}

