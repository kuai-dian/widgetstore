---
nav:
  title: API
  order: 3
toc: 'menu'
---
# API
## GET

```js
this.$io.example.thread.get({
  where: {
    userId: +userId,
    date: _.and(_.gte(now - 2592000),_.lte(now)),
  },
  field: {
    id: true,
  },
  ...查询条件
})
.then(response => {})
.catch(error => {});
```

## Count

```js
this.$io.example.thread.count()
.then(response => {})
.catch(error => {});
```

## add

```js
this.$io.example.thread.add({
  a: '',
  b: '',
})
.then(response => {})
.catch(error => {});
```
## remove

```js
this.$io.example.thread.remove({
  where: {
    userId: 1,
  }
})
.then(response => {})
.catch(error => {});
```

## update/set

```js
this.$io.example.thread.update({
  where: {
    userId: 1,
  },
  data: {
    a: '2021',
    a: '新年好',
  }
})
.then(response => {})
.catch(error => {});
```

## upload