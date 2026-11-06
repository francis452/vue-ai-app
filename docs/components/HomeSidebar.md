# HomeSidebar

源码：[HomeSidebar.vue](../../src/components/home/HomeSidebar.vue)。

## 用途

展示用户头像、姓名与 ID、个人信息入口、工单空状态和联系说明。用户与联系文案来自 [home.ts](../../src/data/home.ts)，插画为本地 `src/assets/home/contact.svg`。不加载真实工单，不提供真实客服渠道。

## Props

| 名称 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| 无 | — | — | — | 未声明 Props；用户和联系内容来自本地数据 |

未声明对外事件。

## 状态说明

| `dialog` 值 | 展示内容 | 触发方式 |
| --- | --- | --- |
| `null` | 弹窗关闭，初始状态 | 关闭按钮或 `NModal` 发出关闭通知 |
| `'profile'` | 个人信息，包含姓名和用户 ID | 点击“个人信息” |
| `'contact'` | 本地演示联系方式说明 | 点击“联系我们” |

工单区域固定显示“暂无我的工单”，没有加载、失败、分页等状态。同一时刻只通过一个 `NModal` 展示一种说明。

## 使用示例

```vue
<script setup lang="ts">
import HomeSidebar from './components/home/HomeSidebar.vue'
</script>

<template>
  <div class="max-w-sm">
    <HomeSidebar />
  </div>
</template>
```

1024px 及以上组件带有跨两行、共享父级行轨道的网格定位类。要复现首页对齐，应使用 `Home.vue` 的双栏、两行布局；独立容器示例只展示侧栏本身，不承诺与其他模块对齐。

## 可访问性说明

- 根节点是 `aside`，名称为“用户与服务”；各卡片通过标题关联为具名 `section`。
- 个人信息、联系操作采用具名按钮。
- 头像、工单 SVG 为装饰；联系插画采用空 `alt`，不遮挡操作。
- 个人信息弹窗使用 `dl` / `dt` / `dd` 表达字段和值。
- 焦点管理和 Escape 关闭交由 Naive UI 弹窗处理。
- `profile-heading`、`work-orders-heading`、`contact-heading` 为固定 ID，页面应只包含一个实例。

## 测试说明

[HomeServices.test.ts](../../src/components/home/HomeServices.test.ts) 覆盖工单空状态、打开个人信息、关闭状态和联系说明内容。

```sh
npm run test -- src/components/home/HomeServices.test.ts
```

真实浏览器需复核侧栏与主区对齐、插画遮挡、窄屏内容以及弹窗焦点。自动测试没有模拟真实工单 API。
