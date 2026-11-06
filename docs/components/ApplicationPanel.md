# ApplicationPanel

源码：[ApplicationPanel.vue](../../src/components/home/ApplicationPanel.vue)。

## 用途

组合运营驾驶舱横幅、业务应用和数字底座入口。当前从 [home.ts](../../src/data/home.ts) 读取 10 个业务应用和 8 个数字底座入口，使用 [AppEntryCard](AppEntryCard.md) 展示。横幅图片位于 `src/assets/home/cockpit-banner.svg`。

## Props

| 名称 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| 无 | — | — | — | 未声明 Props；分组、驾驶舱文案和入口数据在组件及数据模块中定义 |

未声明对外事件。外部无法通过业务 Props 替换入口列表。

## 状态说明

| 状态 | 类型 | 初始值 | 变化与作用 |
| --- | --- | --- | --- |
| `selected` | `{ title: string; description: string } \| null` | `null` | 点击驾驶舱或入口后保存对应内容，非空时打开弹窗；关闭按钮或 `NModal` 关闭通知将其清空 |

弹窗仅展示本地演示说明，不执行真实应用跳转。网格根据容器可用宽度自动排布：每列目标最小宽度 280px，容器更窄时以 100% 宽度为下限，不固定绑定某个视口下的列数。

## 使用示例

```vue
<script setup lang="ts">
import ApplicationPanel from './components/home/ApplicationPanel.vue'
</script>

<template>
  <main class="mx-auto max-w-6xl p-4">
    <ApplicationPanel />
  </main>
</template>
```

以上使用项目上层已有的 Naive UI 主题配置；如独立集成，请同时引入项目样式并提供相应主题环境。

## 可访问性说明

- 外层为具名 `section`，应用中心标题以 `sr-only` 保留给辅助技术。
- 驾驶舱、业务应用、数字底座各有标题和关联的 `aria-labelledby`。
- 装饰横幅使用空 `alt`，不接收指针事件。
- 应用入口是具名按钮，驾驶舱操作使用 `NButton`；弹窗采用 `NModal` 的焦点管理和关闭能力。
- 标题使用固定 ID（如 `applications-heading`、`business-heading`）；同一页面应只渲染一个实例，避免重复 ID。

## 测试说明

[ApplicationPanel.test.ts](../../src/components/home/ApplicationPanel.test.ts) 覆盖两个分组的数量与顺序、横幅装饰属性、应用与驾驶舱弹窗、关闭行为。

```sh
npm run test -- src/components/home/ApplicationPanel.test.ts
```

响应式列数、完整单行文字、弹窗尺寸及 Enter / Escape 的浏览器行为仍需真实浏览器验证。
