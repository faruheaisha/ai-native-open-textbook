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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/09-rag-retrieval/index.md"
sourceRel: "learn-agent-interview/09-rag-retrieval/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/09-rag-retrieval/index.md"
sourceSha256: "0cd6a985cc678497a9698fc04c329c40038e03ec115e709643165c1ce39ab3ee"
pageSha256: "64963b4a27afdaf554f86dd6372d9f4782d88eca64fa6fddd7a78b51dded4607"
contentMode: "local-full"
zh: ""
---

## Q：RAG 过程中如何处理文件里的图片？

> 来源：字节暑期agent实习二面【[PDD Agent三面](https://www.nowcoder.com/feed/main/detail/9908477cdd4041fabacbfbf02febb13c)追问：RAG如果存在图片类非文本内容，如何处理？】

**新手答**：“把图片转成文字再检索。”

**高手答**：

RAG 中图片处理是多模态 RAG 的核心问题，主流方案：
1. **图片→文本描述（OCR + Caption）**：用 OCR 提取图中文字，用多模态模型（如 GPT-4V/Qwen-VL）生成图片描述，将描述文本一起做 Embedding 索引
2. **多模态 Embedding 直接索引**：用 CLIP 等模型直接将图片编码为向量，和文本向量放同一向量空间，支持跨模态检索
3. **图文联合分块**：在 chunk 切分时保持图片与其上下文段落的关联——图片属于哪个段落，chunk 就包含“段落文本 + 图片描述/图片引用”
4. **Layout-Aware 解析**：用 PDF 解析工具（如 Unstructured、Marker）识别图片在文档中的位置和语义角色（图表？示意图？截图？），不同类型用不同处理策略
5. **延迟处理**：检索阶段只用文本索引，召回相关 chunk 后发现有关联图片时，再把图片和文本一起送多模态模型做最终回答

**差距在哪**：面试官关注你对“多模态信息如何融入检索链路”的工程思考——不是有 OCR 就够了，要考虑检索效果和成本的平衡。
