/**
 * 批量替换字符串
 * @param str {string} 字符串
 * @param find  {string} 查找字符串
 * @param replace {string} 替换字符串
 */
export const replaceAll = (str: string, find: string, replace: string) => {
  return str.replace(new RegExp(find, "g"), replace);
};

/**
 * 返回一个随机字符串
 * @returns {string} 返回一个随机字符串 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
 */
export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * 返回一个唯一的定时器
 * @returns {string} 返回一个唯一的定时器
 * @example
 * const timer = uniqueTimer()
 * timer(() => {
 * }, 1000)
 */
export const uniqueTimeout = () => {
  let timeout: any;
  /**
   * 返回一个唯一的定时器
   */
  return (fn: any, delay: number) => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
};

/**
 * 返回一个唯一的定时器
 * @returns {string} 返回一个唯一的定时器
 * @example
 * const timer = uniqueInterval()
 * timer(() => {
 * }, 1000)
 */
export const uniqueInterval = () => {
  let interval: any;
  /**
   * 返回一个唯一的定时器
   */
  return (fn: any, delay: number) => {
    clearInterval(interval);
    interval = setInterval(fn, delay);
  };
};

const elementTypeMapping = {
  script: "text/javascript",
  style: "text/css",
  link: "text/css",
};

interface MountElementOptions {
  id: string;
  content?: string;
  url?: string;
  notReRender?: boolean;
}
/**
 * 挂载一个元素
 * @param element {any} 元素类型 script或style
 * @param param1 元素内容
 */
export const mountElement = (
  element: "script" | "link" | 'style' = "script",
  { id, content, url, notReRender }: MountElementOptions
) => {
  const el = document.getElementById(`#${id}`);
  // 如果存在元素，且不需要重新渲染，则直接返回
  if (el && !notReRender) {
    el.remove();
  } else if (el) {
    return;
  }
  const instance = document.createElement(element);
  instance.setAttribute("id", id);
  instance.setAttribute("type", elementTypeMapping[element]);
  switch (element) {
    case 'link':
      instance.setAttribute("rel", "stylesheet");
      instance.setAttribute("href", url);
      break;
    case 'script':
      url && instance.setAttribute("src", url);
      content && (instance.innerHTML = content);
      break;
    case 'style':
      instance.innerHTML = content;
      break;
    default:
      break;
  }
  document.head.appendChild(instance);
};

/**
 * 挂载CSS元素
 * @param id {string} 元素id
 * @param param1 元素内容
 */
export const mountCSS = ({id = 'rootCSS',  ...options }: MountElementOptions, isLink?: boolean) => {
  mountElement(isLink ? "link" : 'style', {
    id,
    ...options,
  });
};

/**
 * 挂载CSS元素
 * @param id {string} 元素id
 * @param param1 元素内容
 */
export const mountJS = ({id = 'rootJS',  ...options }: MountElementOptions) => {
  mountElement("script", {
    id,
    ...options
  });
};

