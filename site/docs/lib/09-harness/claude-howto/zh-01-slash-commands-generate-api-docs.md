---
title: "API 文档生成器"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/01-slash-commands/generate-api-docs.md"
sourceRel: "zh/01-slash-commands/generate-api-docs.md"
rawUrl: "/raw/09-harness/claude-howto/zh/01-slash-commands/generate-api-docs.md"
sourceSha256: "5b080eec05d513513ee8737cdeb0eee756052c4c90db43059fa9f6f5641fe6c6"
pageSha256: "5b080eec05d513513ee8737cdeb0eee756052c4c90db43059fa9f6f5641fe6c6"
contentMode: "local-full"
zh: ""
---

# API 文档生成器

按以下步骤生成 API 文档：

1. 扫描 `/src/api/` 下的所有文件
2. 提取函数签名和 JSDoc 注释
3. 按端点/模块进行组织
4. 生成带示例的 Markdown
5. 包含请求/响应 Schema
6. 添加错误文档

输出格式：
- 输出为 `/docs/api.md` 中的 Markdown 文件
- 为所有端点加入 curl 示例
- 添加 TypeScript 类型
