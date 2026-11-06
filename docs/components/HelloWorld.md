# HelloWorld

源码：[HelloWorld.vue](../../src/components/HelloWorld.vue)。

## 用途

保留的 Vite / Vue 起始示例，展示项目插画、技术文档和社区链接，以及一个本地计数按钮。当前首页不使用此组件。

## Props

| 名称 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| 无 | — | — | — | 未声明 Props |

未声明对外事件。

## 状态说明

| 状态 | 类型 | 初始值 | 变化与作用 |
| --- | --- | --- | --- |
| `count` | `number` | `0` | 每点击一次按钮增加 1；为 0 时显示“还没有点击”，大于 0 时隐藏 |

计数仅保存在当前实例中，重新挂载会归零；未提供重置方法或持久化能力。

## 使用示例

```vue
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld />
</template>
```

组件依赖本地图片、`public/icons.svg` 及 `src/style.css` 中保留的示例页样式；仅复制 Vue 文件不足以复现原有视觉。

## 可访问性说明

- 计数操作为 `type="button"`，可见文本包含当前数值，支持原生键盘激活。
- 装饰主插画采用空 `alt`，Vue / Vite Logo 有文字替代；文档和社区区 SVG 标记为装饰。
- 技术文档与社区使用真实链接，在新标签页打开。
- 组件自身包含 `h1`，集成时需检查整个页面的标题层级。
- 使用 `center`、`next-steps`、`docs`、`social`、`spacer` 等固定 ID，同一页面不应重复挂载多个实例。

## 测试说明

[HelloWorld.test.ts](../../src/components/HelloWorld.test.ts) 覆盖初始空状态、按钮类型和名称、连续点击计数及空状态隐藏。

```sh
npm run test -- src/components/HelloWorld.test.ts
```

现有测试不检查外部网站可用性和图片渲染，相关视觉与链接目标需单独验收。
