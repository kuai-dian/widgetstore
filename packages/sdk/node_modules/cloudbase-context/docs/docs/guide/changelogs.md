---
title: 更新日志
toc: false
timeline: true
---

`cloudbase-context` 严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：每月发布一个带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性，不在发布周期内。

---

#### 图形描述

- 🛠  重构
- 🐞  修复bug
- ⚡️  新功能
- 💄  加深
- 🆕  补充
---

## 1.0.11

`2021-02-24`
以下是参考案例
- 🛠 使用 React hooks 重构 Drawer。[#29229](https://github.com/ant-design/ant-design/pull/29229)
- 🐞 修复 Table 的 `pagination. position` 为 `['none', 'none']`时分页器仍然展示的问题。[#29256](https://github.com/ant-design/ant-design/pull/29256) [@mumiao](https://github.com/mumiao)
- 🐞 修复 TextArea `showCount` 字数会遮挡 Form.Item `extra` 的问题。[#29245](https://github.com/ant-design/ant-design/pull/29245)
- 🐞 修复多选 Select 在暗黑模式下禁用的背景颜色异常的问题。[#29242](https://github.com/ant-design/ant-design/pull/29242)
- ⚡️ 优化 Slider 提示的对齐性能。[#29308](https://github.com/ant-design/ant-design/pull/29308) [@kerm1it](https://github.com/kerm1it)
- ⚡️ 升级 `@ant-design/colors` 依赖到 6.x，减少 gzipped 包体积 `1KB`。[#29307](https://github.com/ant-design/ant-design/pull/29307) [@07akioni](https://github.com/07akioni)

## 早期版本
不记录