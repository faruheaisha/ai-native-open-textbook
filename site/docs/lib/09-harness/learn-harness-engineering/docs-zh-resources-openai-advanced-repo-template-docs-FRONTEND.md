---
title: "FRONTEND.md"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/resources/openai-advanced/repo-template/docs/FRONTEND.md"
sourceRel: "docs/zh/resources/openai-advanced/repo-template/docs/FRONTEND.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/docs/zh/resources/openai-advanced/repo-template/docs/FRONTEND.md"
sourceSha256: "e2ebc43db6aa67ca705deb9c36657958038a4d2fef1e9076a3b46e1e6ff9cb1f"
pageSha256: "e2ebc43db6aa67ca705deb9c36657958038a4d2fef1e9076a3b46e1e6ff9cb1f"
contentMode: "local-full"
zh: ""
---

# FRONTEND.md

这份文件定义稳定的前端预期，避免 agent 每次都临场发明一套 UI 模式。

## UI 原则

- 先保证清晰，再追求新鲜感。
- 交互流程要可发现、可重走、可重启。
- 优先沉淀少量可复用组件，而不是到处长一次性变体。
- 可访问性检查属于正常验证，不是最后的美化工作。

## 护栏

- 把设计系统或组件库参考材料放进 `docs/references/`。
- 显式记录关键用户状态：empty、loading、success、error、retry。
- 在不同流程里保持文案、键盘行为、视觉层级一致。
- 修复 UI bug 后，顺手补上对应验证步骤。

## 验证要求

- 为关键用户旅程留下证据。
- 把浏览器或运行时验证步骤写进相关 plan。
- 如果视觉回归常见，就标准化截图或 DOM 检查。
