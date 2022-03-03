# 关于

## 什么是 `@notion-pet/sdk`？

`@notion-pet/sdk` 是开发组件用的工具包，内置组件级别接口请求、发布订阅事件等通用工具。

## API

### defineRender

定义渲染方法

**使用示例**

defineRender(render, 是否立刻渲染) 定义渲染函数
 * @param render {IRender} 渲染函数
 * @param isRenderingNow {boolean} 是否立即渲染，建议生产不使用，开发阶段将其设置为true

```ts
import { defineRender } from '@notion-pet/sdk';
import { render } from 'preact';

const isDev = process.env.NODE_ENV === 'development'

defineRender(({options: {}, data: {}}) => {
  render(<App options={options} data={data} />)
}, isDev)
```

### defineUpdate

定义更新

**使用示例**

defineUpdate

```ts
import { defineUpdate } from '@notion-pet/sdk';
import { useState } from 'preact/hooks';

export default () => {
  const [state, setState] = useState({value: 1})
  defineUpdate(({options: {}, data: {}}) => {
    setState({
      value: data.value
    })
  })

  return <div>
    {state.value}
  </div>
}
```

### api

组件数据交互-接口请求

**使用示例**

update

```ts
import { api } from '@notion-pet/sdk';
import { useState } from 'preact/hooks';

export default () => {
  const [state, setState] = useState({value: 1})

  const onClick = () => {
    setState({value: ++state.value})
    api.update(state)
  }

  return <div onClick={onClick}>
    {state.value}
  </div>
}
```