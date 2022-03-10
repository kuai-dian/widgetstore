function underline(str, link = '-'){
  return str.replace(/\B([A-Z])/g, link + '$1').toLowerCase()
}

interface IAttributes {
  class?: string | Object | Array<string>
  style?: Object | string
  id?: string

  src?: string
}

interface IEvent {
  click?: (e: Event) => any
}

type IChildren = [string, string | object | IElement, [IChildren] | string]

interface IElement extends IAttributes, IEvent  {}

/**
 * 创建dom
 * @param type dom类型
 * @param attributes 属性
 * @param actions 方法
 * @returns
 */
export const createElement = (type: string = 'div', attributes: string | object | IElement = {}, childrens?: [IChildren] | string) => {
  const element = document.createElement(type)

  if (typeof attributes === 'string') {
    element.innerHTML = attributes
  }

  Object.entries(attributes).forEach(([k, v]: any) => {
    if (typeof v === 'function') {
      element.addEventListener(k, v)
    } else {
      // 特殊处理style
      if (k === 'style' && typeof v === 'object') {
        v = Object.entries(v).map(([c, o]: any) => `${underline(c)}: ${o};`).join('')
      }
      // 特殊处理class
      if (k === 'class' && typeof v === 'object') {
        v = Object.entries(v).map(([c, o]: any) => o ? c : '').join(' ')
      }
      if (k === 'class' && Array.isArray(v)) {
        v = v.join(' ')
      }

      element.setAttribute(k, typeof v === 'object' ? JSON.stringify(v) : v)
    }
  })

  if (typeof childrens === 'string') {
    element.innerHTML = childrens
  } else {
    childrens.forEach((children: Node | string | IChildren) => {
      if (children instanceof Node) {
        element.append(children)
      } else if (Array.isArray(children)) {
        children.forEach((c: IChildren) => element.append(createElement(...c)))
      }
      if (typeof children === 'string') {
        element.innerHTML = children
      }
    })
  }
  return element
}

export const Div = (attributes: IElement | string = {}, childrens?): Node => createElement('div', attributes, childrens)
export const I = (attributes: IElement | string = {}, childrens?): Node => createElement('i', attributes, childrens)
export const P = (attributes: IElement | string = {}, childrens?): Node => createElement('p', attributes, childrens)
export const A = (attributes: IElement | string = {}, childrens?): Node => createElement('a', attributes, childrens)
export const Span = (attributes: IElement | string = {}, childrens?): Node => createElement('span', attributes, childrens)
export const Img = (attributes: IElement | string = {}, childrens?): Node => createElement('img', attributes, childrens)
export const Link = (attributes: IElement | string = {}, childrens?): Node => createElement('link', attributes, childrens)
export const Style = (attributes: IElement | string = {}, childrens?): Node => createElement('style', attributes, childrens)
export const Script = (attributes: IElement | string = {}, childrens?): Node => createElement('script', attributes, childrens)

// // 纯文本基础用法
// Div('海哥')

// // 支持配置class等属性
// Div({class: 'haiGe'}, '海哥')

// // 事件、嵌套用法
// Div({id: 'haiGe', class: 'hai niu bi', click: e => {
//   console.log(e);
// }}, [
//   Span('海哥二号'),
//   Span('海哥3号'),
//   Span({class: ['lao4', 'song-da-lao']}, '海哥4号'),
//   P({class: 'lao5'}, [
//     Div('海哥5号'),
//     Img({src: '', style: {
//       background: 'red'
//     }})
//   ]),
// ])

// // 插入html
// Div(`
//   <div>海哥的骚操作</div>
// `)