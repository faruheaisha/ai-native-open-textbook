---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/09-rag-retrieval.md"
sourceRel: "publish-pdf/staging/09-rag-retrieval.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/09-rag-retrieval.md"
sourceSha256: "485baf2769b08dc4dbf6e4e54a35aeaaaf17f440f97e08141fd1a36f491b9f46"
pageSha256: "8377951f57ead43746d34bc810a099798b307df26498e2b120bc04494e699ff0"
contentMode: "local-full"
zh: ""
---

## Q：RAG 前端如何展示长文档，并让引用稳定跳转到原文证据？

> 来源：商汤 AI Agent 开发面经（2026-03-05）

**新手答**：“答案旁边显示引用编号，点击后用页码跳到 PDF 对应页面并高亮关键词。”

**高手答**：

稳定跳转不能依赖模型生成的页码、标题文字或浏览器搜索。后端在解析文档时就要为证据建立稳定定位协议，例如：

```json
{
  "citation_id": "cit_01J...",
  "document_id": "doc_123",
  "version_id": "v7",
  "section_path": ["3", "3.2"],
  "page": 18,
  "block_id": "blk_8f2a",
  "char_range": [142, 286],
  "content_hash": "sha256:...",
  "quote": "用于校验和降级展示的短证据文本"
}
```

`block_id` 应在同一文档版本内绑定解析后的内容块；页码、字符区间或 PDF bounding box 作为渲染定位信息，`quote` 和内容哈希用于核验。不能只存字符偏移，因为 PDF 解析器升级、OCR 修正或空白归一化都会让偏移漂移。文档更新后生成新 `version_id`，历史答案继续打开旧快照；若旧版本已归档，则明确提示版本差异并展示引用快照，不能悄悄跳到新版本的近似段落。

前端适合采用“答案 + 证据阅读器”的双栏布局。长 HTML 文档使用虚拟列表按块渲染，PDF 按页懒加载；点击引用后先解析 `document/version/block`，再加载目标页或目标块、滚动到锚点并高亮精确范围。URL 保存 citation ID，支持刷新、复制深链和浏览器前进后退。多个引用可在侧栏形成证据列表，用户能在答案 claim 与原文之间来回切换。

还要处理降级路径：精确 range 校验失败时退到 block，再退到 page + quote 搜索，并显示“定位可能偏移”，不能无提示地高亮错误内容。服务端在返回正文前重新检查租户和 ACL，下载地址使用短期授权；前端不可因为持有 citation ID 就绕过文档权限。埋点应区分引用点击、定位成功、版本不匹配和用户反馈，用来持续发现解析漂移。

**差距在哪**：新手把引用当一个页码链接。高手把引用设计成带版本、内容身份和多级定位器的协议，再用虚拟化阅读器、深链、校验和降级机制保证长文档中的证据真正可达、可审计。
