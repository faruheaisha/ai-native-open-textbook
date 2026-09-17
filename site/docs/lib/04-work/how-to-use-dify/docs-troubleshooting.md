---
title: "Dify 常见问题排查"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/docs/troubleshooting.md"
sourceRel: "docs/troubleshooting.md"
rawUrl: "/raw/04-work/how-to-use-dify/docs/troubleshooting.md"
sourceSha256: "63d63c4a9b60706fbf05eb6e929089d4772e115c2041e8f02db59c70da8d3475"
pageSha256: "63d63c4a9b60706fbf05eb6e929089d4772e115c2041e8f02db59c70da8d3475"
contentMode: "local-full"
zh: ""
---

# Dify 常见问题排查

## 知识库答不准

优先检查：

1. 文档是否过期或混乱。
2. 知识库描述是否太短。
3. 是否召回了正确片段。
4. Prompt 是否要求基于资料回答。
5. Top K 和阈值是否合适。

不要一开始就换模型。很多 RAG 问题来自资料质量。

## 资料外问题乱编

处理方式：

- 在 Prompt 中明确“资料中没有答案就说无法确认”。
- 在知识库描述中写明不包含范围。
- 增加资料外测试集。
- 对高风险问题增加人工转接。

## Workflow 下游节点拿不到结果

检查：

- 上游输出字段名是否正确。
- 输出是否为稳定 JSON。
- 是否有空值。
- 分支条件是否走到了预期路径。
- 节点名称和变量引用是否混淆。

## Agent 不调用工具

可能原因：

- 工具描述太模糊。
- Prompt 没说明什么时候用工具。
- 用户问题不需要工具。
- 工具鉴权没有配置。
- 最大迭代次数太低。

## Agent 乱调用工具

处理方式：

- 明确工具使用条件。
- 给危险操作增加确认步骤。
- 降低最大迭代次数。
- 把固定流程改成 Workflow。
- 将工具拆分成更小权限。

## 自部署启动失败

检查：

- Docker 是否运行。
- Docker Compose 版本是否满足要求。
- 内存是否足够。
- `.env` 是否存在。
- 端口是否被占用。
- 日志中哪个容器先失败。

## API 调用失败

检查：

- 应用是否发布。
- API Key 是否正确。
- 请求地址是否正确。
- 输入字段是否和应用变量一致。
- 是否超过调用限制。
- 服务端是否能访问 Dify 实例。
