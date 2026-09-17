---
title: "Dify 生产检查清单"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/docs/reference/production-checklist.md"
sourceRel: "docs/reference/production-checklist.md"
rawUrl: "/raw/04-work/how-to-use-dify/docs/reference/production-checklist.md"
sourceSha256: "e6c84b4a29c3af56b345923295c9b7b42690d999ff4fe9800ea87d466af273c0"
pageSha256: "e6c84b4a29c3af56b345923295c9b7b42690d999ff4fe9800ea87d466af273c0"
contentMode: "local-full"
zh: ""
---

# Dify 生产检查清单

## 应用设计

- [ ] 应用目标清楚。
- [ ] 用户范围清楚。
- [ ] 应用类型选择合理。
- [ ] 输入变量有说明和示例。
- [ ] 输出格式稳定。

## Prompt

- [ ] 角色明确。
- [ ] 任务明确。
- [ ] 禁止编造。
- [ ] 资料不足时有处理方式。
- [ ] 敏感问题有转人工或拒答策略。

## 知识库

- [ ] 资料来源可信。
- [ ] 资料已去重。
- [ ] 资料没有明显过期内容。
- [ ] 知识库描述清楚。
- [ ] 测试过资料外问题。

## Workflow / Agent

- [ ] 每个节点职责单一。
- [ ] 关键输出结构化。
- [ ] 有错误路径。
- [ ] 工具权限最小化。
- [ ] 危险操作需要确认。

## 发布和 API

- [ ] API Key 没有放到前端。
- [ ] 有调用错误处理。
- [ ] 有超时处理。
- [ ] 有日志记录。
- [ ] 有成本控制。

## 自部署

- [ ] HTTPS 已配置。
- [ ] 管理入口有限制。
- [ ] 数据库和文件有备份。
- [ ] 升级前有回滚方案。
- [ ] 记录当前版本和环境变量。
