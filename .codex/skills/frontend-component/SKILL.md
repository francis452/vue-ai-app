---
name: frontend-component
description: Generate Vue3 SFC components with TypeScript for this project. Use for presentational, form, and page-section components; do not use for backend APIs, databases, or CI configuration.
---

# Frontend Component Generator

## Steps
1. 确认组件名称、用途、Props 和防止目录。
2. 检查现有组件风格和项目样式方案（如已配置 Tailwind 则遵循其类名约定）。
3. 生成 SFC 组件：`<script setup lang="ts">` + `defineProps` 类型声明。
4. 覆盖 loading、empty、error、success 状态。
5. 生成同目录测试文件。
6. 运行 lint、typecheck、test。
7. 输出使用示例。

## Rules
- 不新增依赖。
- 不直接操作 DOM。
- 测试不访问真实网络。