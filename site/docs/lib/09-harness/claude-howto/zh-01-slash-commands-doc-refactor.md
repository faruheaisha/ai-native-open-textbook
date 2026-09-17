---
title: "文档重构"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/01-slash-commands/doc-refactor.md"
sourceRel: "zh/01-slash-commands/doc-refactor.md"
rawUrl: "/raw/09-harness/claude-howto/zh/01-slash-commands/doc-refactor.md"
sourceSha256: "d5cae0fcf08202af0c01daf425410c127e9cb07f38539635124373e15c368b40"
pageSha256: "d5cae0fcf08202af0c01daf425410c127e9cb07f38539635124373e15c368b40"
contentMode: "local-full"
zh: ""
---

# 文档重构

根据项目类型重构项目文档结构：

1. **分析项目**：识别类型（库/API/Web 应用/CLI/微服务）、架构和用户角色
2. **集中管理文档**：将技术文档迁移到 `docs/`，并保留正确的交叉引用
3. **整理根目录 README.md**：将其精简为入口页，包含概览、快速开始、模块/组件摘要、许可证和联系方式
4. **为组件补充文档**：添加模块/包/服务级别的 README 文件，包含安装和测试说明
5. **按主题组织 `docs/`**：
   - 架构、API Reference、数据库、设计、故障排查、部署、贡献（根据项目需要调整）
6. **创建指南**（按需选择）：
   - 用户指南：面向应用最终用户的文档
   - API 文档：API 的端点、认证和示例
   - 开发指南：环境搭建、测试、贡献流程
   - 部署指南：服务/应用的生产部署
7. **所有图表都使用 Mermaid**（架构图、流程图、Schema 图）

保持文档简洁、易扫读，并与项目类型保持上下文一致。
