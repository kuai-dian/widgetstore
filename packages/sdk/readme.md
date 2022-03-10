# 关于

## 什么是 `@notionpet/sdk`？

`@notionpet/sdk` 是开发组件用的工具包, 结合 Notion.pet 平台，开发好后的组件可以发布到该平台然后通过 embed 嵌入notion软件中。

## 🏄‍♀️  组件渲染流程

- 🌏  渲染：用户访问组件渲染器 -> 判定找到组件资源(index.js) -> 执行 `defineRender` 方法 并传入配置项信息、组件数据信息，此时需要执行组件真正的渲染方法。
- 🆚  更新：编辑器配置更新配置内容 -> 执行 `defineUpdate` 方法 并传入配置项信息、组件数据信息，此时开发者可以通过自身逻辑控制组件视图更新。
- 💻  组件数据：每个组件被创建都会拥有一定的数据储存空间，类似于 `localStorage`，开发者可以根据业务在合适的时机保存较为重要的信息，以备下次进入组件保持目标效果。保存、更新数据只需要调用 `api.update` 方法来控制。

## 🎮  API

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

update 更新方法

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

get 获取数据方法

```ts
import { api } from '@notion-pet/sdk';
import { useState } from 'preact/hooks';

export default () => {
  const [state, setState] = useState({value: 1})

  const onClick = async () => {
    try {
      const {data} = await api.get()
      setState({value: data.value})
    } catch(error) {
      console.error(error)
    }
  }

  return <div onClick={onClick}>
    {state.value}
  </div>
}
```

# 资料
## 组件开发模板

- [Vue3模板](https://github.com/kuai-dian/notionpet-vue3-starter)
- [React模板](https://github.com/kuai-dian/notionpet-react-starter)
- [PReact模板](https://github.com/kuai-dian/notionpet-preact-starter)
- [Lit模板 不推荐](https://github.com/kuai-dian/notionpet-lit-starter)