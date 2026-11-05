# Vue AI App

基于 Vue 3、Vue Router、Pinia 和 Vite 的 JavaScript 单页应用。

## 环境与启动

- Node.js：推荐使用 `.node-version` 中的 22.23.3。
- pnpm：12.10.1，由 `package.json` 的 `packageManager` 固定。

安装匹配版本的 pnpm 后运行：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## 目录

```text
src/main.js        应用初始化、注册 Pinia 和路由
src/App.vue        根组件、路由出口
src/router/        路由定义，使用 History 模式
src/stores/        全局状态
src/views/         页面组件
src/components/    通用组件和模板示例
src/assets/        模块导入的静态资源
src/style.css      全局样式
public/            原样发布的静态资源
tests/             回归测试
.github/workflows/ CI 质量检查
```

## 开发与质量命令

| 命令                                        | 说明                                        |
| ------------------------------------------- | ------------------------------------------- |
| `pnpm dev`                                  | 启动开发服务                                |
| `pnpm build`                                | 构建生产资源到 `dist/`                      |
| `pnpm preview`                              | 本地预览已构建资源                          |
| `pnpm lint`                                 | 检查 JavaScript 和 Vue 代码，警告也视为失败 |
| `pnpm lint:fix`                             | 自动修复可处理的规范问题，会修改文件        |
| `pnpm format:check`                         | 检查格式                                    |
| `pnpm format`                               | 格式化文件，会修改文件                      |
| `pnpm test`                                 | 单次运行回归测试                            |
| `pnpm test:watch`                           | 持续运行测试                                |
| `pnpm test:coverage`                        | 生成终端、HTML 和 LCOV 覆盖率报告           |
| `pnpm check`                                | 依次执行 lint、格式检查、测试和生产构建     |
| `pnpm lint:commits --from HEAD~1 --to HEAD` | 检查指定范围的提交信息                      |

项目使用 JavaScript，不默认运行 TypeScript 类型检查。测试使用 Vitest、Vue Test Utils 和 jsdom，覆盖路由出口及首页状态行为；覆盖率 HTML 位于 `coverage/index.html`，当前未设置覆盖率门槛。

## 配置约定

- ESLint 使用 flat config，组合 JavaScript、Vue 推荐规则和 Prettier 兼容配置。
- Prettier 使用单引号、无分号和 LF 换行；EditorConfig、Git 属性同步约束换行。
- 当前没有必需的环境变量；`.env.example` 作为后续变量说明模板。
- 本地环境变量可放在 `.env.local`，不要提交真实密钥。`VITE_` 前缀变量会暴露给浏览器，不能保存服务端秘密。
- GitHub Actions 在 push 和 PR 时执行 `pnpm check`，PR 额外检查提交信息。
- 提交使用 Conventional Commits，例如 `feat: add home page`、`chore: configure quality checks`。

## 构建与部署

运行 `pnpm build` 后，将 `dist/` 部署到静态托管服务。`pnpm preview` 仅用于本地预览。

应用使用 History 路由，服务器需将不存在的页面路径回退到 `index.html`。Nginx 根路径部署示例：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

当前默认部署在域名根路径。部署到子目录时，需要同时配置 Vite `base` 和 Vue Router 的 history base，并按实际托管平台调整回退规则。
