# HomeHeader

源码：[HomeHeader.vue](../../src/components/home/HomeHeader.vue)。

## 用途

展示系统标识、全屏按钮、通知、主题开关和用户头像。名称、用户及通知数量来自 [home.ts](../../src/data/home.ts) 的 `homeProfile`，不通过 Props 配置。通知和头像打开本地演示浮层。

## Props

| 名称 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `dark` | `boolean` | 是 | 无显式默认值 | 当前主题状态；`true` 为深色。调用方应显式传入 |

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:dark` | `value: boolean` | 请求父组件切换主题，可使用 `v-model:dark` |

## 状态说明

| 状态 | 初始值 | 说明 |
| --- | --- | --- |
| `fullscreen` | `false` | 挂载时及 `fullscreenchange` 后与 `document.fullscreenElement` 同步 |
| `fullscreenSupported` | `false` | 挂载后检查 `requestFullscreen` 是否存在，不支持时禁用按钮 |
| `feedback` | `''` | 全屏调用失败时显示提示，成功后清空 |

全屏监听在卸载时清理；浏览器即使提供方法，也可能因权限或策略拒绝调用。主题为受控状态，组件只发出事件，不直接应用全局主题或持久化用户选择。

角标隐藏 0，超过 99 显示 `99+`，可访问名称保留原始数量。铃铛为 22px；角标字号 10px、高 14px，并向右上偏移。开关采用 `small` 尺寸及日/月图标，轨道高 18px；实际宽度由内容布局决定。

## 使用示例

以下示例同时同步 Naive UI 主题和 Tailwind 的暗色祖先类：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NConfigProvider, darkTheme } from 'naive-ui'
import HomeHeader from './components/home/HomeHeader.vue'

const dark = ref(false)
</script>

<template>
  <NConfigProvider :theme="dark ? darkTheme : null">
    <div :class="{ dark }">
      <HomeHeader v-model:dark="dark" />
    </div>
  </NConfigProvider>
</template>
```

该示例只演示主题接线；项目实际中文、全局样式和主题覆盖配置见 `App.vue`。

## 可访问性说明

- 使用具名 `header` 和 `nav`；图标按钮提供全屏、通知、用户信息名称。
- 主题开关保留“深色模式”名称与 `aria-checked`，可通过空格键操作；日/月图标为装饰。
- 全屏失败提示使用 `role="status"`。
- 缩小的是角标与开关的视觉尺寸，通知按钮保留独立点击区域。窄屏工具栏允许换行。

## 测试说明

[HomeHeader.test.ts](../../src/components/home/HomeHeader.test.ts) 覆盖名称、全屏不支持时禁用、消息与头像浮层、0 / 32 / 99+ 通知展示，以及空格键切换、18px 轨道配置和父级受控状态。

```sh
npm run test -- src/components/home/HomeHeader.test.ts
```

通知数字使用滚动动画，测试读取当前数字而非整个角标的文本，避免把隐藏动画字符计入。角标与铃铛的遮挡、实际控件宽度、间距、主题视觉和真实全屏权限需在浏览器验证，当前单测不覆盖全部全屏异常分支。
