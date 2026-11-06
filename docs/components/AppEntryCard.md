# AppEntryCard

源码：[AppEntryCard.vue](../../src/components/home/AppEntryCard.vue)。

## 用途

展示一个应用的图标、标题及说明。整个卡片是按钮，点击后将原始应用对象交给父组件处理；组件自身不导航，也不打开弹窗。

## Props

| 名称 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `entry` | `HomeEntry` | 是 | 无 | 要展示并在选择事件中返回的应用对象 |

`HomeEntry` 定义于 [home.ts](../../src/data/home.ts)，字段均为必填：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `string` | 应用标识，列表渲染时用于稳定的 key |
| `title` | `string` | 标题，同时用于按钮的可访问名称 |
| `description` | `string` | 应用说明 |
| `iconPath` | `string` | 24 × 24 SVG 视口中的 path 数据，不是图片 URL |

## 状态说明

没有内部业务状态。悬停、聚焦和光标提示由 CSS 控制；640px 及以上标题与说明各自单行，较窄屏幕允许换行。组件不会自行保证父容器宽度，建议配合 `ApplicationPanel` 的最小卡片宽度网格使用。

| 事件 | 参数 | 触发时机 |
| --- | --- | --- |
| `select` | `entry: HomeEntry` | 激活卡片按钮时，传出当前 `entry` 对象 |

## 使用示例

```vue
<script setup lang="ts">
import { ref } from 'vue'
import AppEntryCard from './components/home/AppEntryCard.vue'
import { businessApps } from './data/home'
import type { HomeEntry } from './data/home'

const entry = businessApps[0]!
const selected = ref<HomeEntry | null>(null)
</script>

<template>
  <div class="max-w-sm">
    <AppEntryCard :entry="entry" @select="selected = $event" />
    <p v-if="selected" role="status">已选择：{{ selected.title }}</p>
  </div>
</template>
```

## 可访问性说明

- 使用 `type="button"`，不会意外提交外层表单；支持原生按钮键盘操作。
- `aria-label` 为“查看 + 应用标题”。
- 图标容器为 `aria-hidden="true"`，避免重复播报。
- 卡片有 `cursor-pointer`、悬停反馈及 `focus-visible` 轮廓。
- 父组件仍需提供足够空间，避免单行文字超出卡片。

## 测试说明

- [ClickableCursor.test.ts](../../src/components/home/ClickableCursor.test.ts)：通过现有 Tailwind 编译光标规则，验证按钮计算样式为 `pointer`，点击传出原始 `entry`。
- [ApplicationPanel.test.ts](../../src/components/home/ApplicationPanel.test.ts)：集成验证入口顺序及选择后打开演示弹窗。
- 图标、文字的光标继承，长文案完整性和焦点视觉需在真实浏览器验收。

```sh
npm run test -- src/components/home/ClickableCursor.test.ts src/components/home/ApplicationPanel.test.ts
```
