# 关于

## 什么是 `@notionpet/filed`？

## 伪代码

```js
// 实例化一个Field
const filedManager = new Field({})

// 创建单个Field
filedManager.add([{
  key: 'name',
  type: "text",
  label: "Title",
  defaultValue: "",
}])

// 批量创建Field
filedManager.add({
  key: 'name',
  type: "text",
  label: "Title",
  defaultValue: "",
})

// 删除指定Field
filedManager.remove("key")

// 批量删除Field
filedManager.remove()

// 更新指定Field
filedManager.update("key", {
  ...
})

// 批量更新Field
filedManager.update([{
  ...
}])

// 当前Field列表更新
// change remove add update
filedManager.on("change", (field, values) => {
  // field
})

const values = filedManager.get()
const key = filedManager.get('key')

filedManager.set({
  key: 'value',
  ...
})

filedManager.set('key', 'value')

const values = filedManager.getList()
```
