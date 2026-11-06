# HelpPanel

源码：[HelpPanel.vue](../../src/components/home/HelpPanel.vue)。

## 用途

展示新手文档列表，点击条目后在本地弹窗中阅读演示内容。数据来自 [home.ts](../../src/data/home.ts) 的 `helpDocuments`；当前将同一组 3 条文档重复展示为 3 组，共 9 个按钮，与现有首页排列一致。

## Props

| 名称 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| 无 | — | — | — | 未声明 Props；文档列表来自本地数据模块 |

未声明对外事件。当前文档字段为 `id`、`title`、`content`，均为字符串。

## 状态说明

| 状态 | 类型 | 初始值 | 变化与作用 |
| --- | --- | --- | --- |
| `selected` | `(typeof helpDocuments)[number] \| null` | `null` | 点击文档后记录对应对象；非空时显示标题与正文；关闭后恢复 `null` |

768px 及以上文档分组横向三列，更窄屏幕为一列。条目不会跳转外部页面，也不会请求远程文档。

## 使用示例

```vue
<script setup lang="ts">
import HelpPanel from './components/home/HelpPanel.vue'
</script>

<template>
  <HelpPanel />
</template>
```

## 可访问性说明

- 使用关联 `help-heading` 的 `section`，每组列表有独立可访问名称。
- 条目使用 `type="button"`，按钮文本就是文档标题。
- 悬停显示手形并提供颜色、下划线反馈；键盘聚焦时有轮廓提示。
- 手机端条目最小高度为 44px，768px 及以上为 32px；文案可自然换行。
- 阅读弹窗使用 `NModal`；关闭操作恢复组件的未选择状态。
- `help-heading` 为固定 ID，同一页面应只渲染一个实例。

## 测试说明

- [HomeServices.test.ts](../../src/components/home/HomeServices.test.ts)：验证 3 组、9 个文档按钮，选择后展示对应正文，以及关闭状态。
- [ClickableCursor.test.ts](../../src/components/home/ClickableCursor.test.ts)：验证全部文档按钮的计算光标为 `pointer`，普通标题不采用手形。

```sh
npm run test -- src/components/home/HomeServices.test.ts src/components/home/ClickableCursor.test.ts
```

长标题换行、焦点轮廓、手机弹窗布局和实际键盘焦点恢复需通过浏览器检查。
