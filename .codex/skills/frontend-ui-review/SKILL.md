---
name: frontend-ui-review
description: Review Vue 3 components for UI quality, states, accessibility, and responsive layout. Use before commits; do not use to generate new components.
---

# Frontend UI Review

## Steps
1. 只读检查组件结构与 Props。
2. 检查 loading、empty、error、success 四态。
3. 检查响应式布局与最小点击区域（44px）。
4. 检查语义化标签和可访问名称。
5. 输出 P0/P1/建议清单，不修改文件。

## Rules
- 只读审查，不改代码。
- 每个问题必须给出位置和修复建议。