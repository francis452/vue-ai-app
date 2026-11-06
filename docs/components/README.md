# 组件文档

本目录覆盖 `src/components` 下全部 6 个 Vue 组件，以当前工作区源码和测试为准。

| 组件 | 用途 |
| --- | --- |
| [HelloWorld](HelloWorld.md) | Vite / Vue 示例与点击计数 |
| [HomeHeader](HomeHeader.md) | 首页顶部工具栏 |
| [ApplicationPanel](ApplicationPanel.md) | 驾驶舱横幅与应用分组 |
| [AppEntryCard](AppEntryCard.md) | 单个应用入口 |
| [HelpPanel](HelpPanel.md) | 新手文档与阅读弹窗 |
| [HomeSidebar](HomeSidebar.md) | 用户信息、工单空状态及联系说明 |

## 使用约定

- 示例中的相对导入路径以代码放置于 `src/App.vue` 为例。
- 沿用项目已有的 Vue 3、TypeScript、Naive UI 和 Tailwind CSS；样式由 `src/main.ts` 引入 `src/style.css`。
- 首页业务组件使用 `src/data/home.ts` 的本地演示数据，不发起业务 API 请求。
- Naive UI 的语言、主题由上层 `NConfigProvider` 提供；Tailwind 的 `dark:` 工具类依赖祖先的 `.dark` 类。两者需要保持一致，不能只改变开关状态。
- 首页中的白色卡片覆盖由 `Home.vue` 的局部 `NConfigProvider` 提供；单独使用子组件时不会自动复制这层配置。
- 各组件均未通过 `defineExpose` 暴露实例方法，也未定义对外业务插槽。内部使用 Naive UI 的插槽不等于组件对外开放同名插槽。

## 验证命令

各文档列出对应的定向测试命令。全项目验证使用：

```sh
npm run check
```

该命令依次执行 lint、typecheck、test 和 build。测试运行于 Vitest、Vue Test Utils 和 jsdom；jsdom 的样式断言不能代替真实浏览器中的布局、遮挡、鼠标继承和主题视觉检查。
