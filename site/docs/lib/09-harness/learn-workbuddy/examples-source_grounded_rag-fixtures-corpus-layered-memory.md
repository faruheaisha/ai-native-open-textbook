---
title: "分层 Memory 约定"
sourceId: "09-harness/learn-workbuddy"
sourceTitle: "Learn WorkBuddy（从 0 复刻桌面 Agent Harness）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/adongwanai/learn-workbuddy"
entryUrl: "https://github.com/adongwanai/learn-workbuddy/blob/d8c2a32614555196e405f20c67e23ed84f2f2239/examples/source_grounded_rag/fixtures/corpus/layered-memory.md"
sourceRel: "examples/source_grounded_rag/fixtures/corpus/layered-memory.md"
rawUrl: "/raw/09-harness/learn-workbuddy/examples/source_grounded_rag/fixtures/corpus/layered-memory.md"
sourceSha256: "9dc1ccb70471a635890171cbd2f3012bbed17500714afa05a4fbdbacc8b6353a"
pageSha256: "9dc1ccb70471a635890171cbd2f3012bbed17500714afa05a4fbdbacc8b6353a"
contentMode: "local-full"
zh: ""
---

# 分层 Memory 约定

## Workspace Memory

项目事实属于 workspace scope。原始证据追加写入日志，经过验证的稳定事实才进入 curated view；检索命中本身不能自动写回长期记忆。

## User Memory

用户偏好必须按 user scope 隔离，并使用稳定 key 更新。相同 key 和 value 的重复写入应返回 unchanged，而不是制造重复记录。

## Compaction

会话摘要允许有损压缩，但 pending task、来源引用和已确认事实必须走 durable state 旁路，不能由摘要擅自关闭或改写。
