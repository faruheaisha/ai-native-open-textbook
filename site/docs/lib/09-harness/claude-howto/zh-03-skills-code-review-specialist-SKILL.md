---
title: "代码审查 Skill"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/03-skills/code-review-specialist/SKILL.md"
sourceRel: "zh/03-skills/code-review-specialist/SKILL.md"
rawUrl: "/raw/09-harness/claude-howto/zh/03-skills/code-review-specialist/SKILL.md"
sourceSha256: "a540c10957fab43b53c0da5f9c96b1cd12da0746cf0f5580c5189039ddd8a858"
pageSha256: "a540c10957fab43b53c0da5f9c96b1cd12da0746cf0f5580c5189039ddd8a858"
contentMode: "local-full"
zh: ""
---

# 代码审查 Skill

这个 skill 提供全面的代码审查能力，重点关注：

1. **安全分析**
   - 身份验证 / 授权问题
   - 数据泄露风险
   - 注入漏洞
   - 密码学弱点
   - 敏感数据日志记录

2. **性能审查**
   - 算法效率（Big O 分析）
   - 内存优化
   - 数据库查询优化
   - 缓存机会
   - 并发问题

3. **代码质量**
   - SOLID 原则
   - 设计模式
   - 命名规范
   - 文档
   - 测试覆盖率

4. **可维护性**
   - 代码可读性
   - 函数长度（建议少于 50 行）
   - 圈复杂度
   - 依赖管理
   - 类型安全

## 审查模板

对每一段被审查的代码，请提供：

### 摘要
- 整体质量评分（1-5）
- 关键发现数量
- 建议优先关注的区域

### 关键问题（如有）
- **问题**：清晰描述
- **位置**：文件和行号
- **影响**：为什么这很重要
- **严重性**：Critical / High / Medium
- **修复**：代码示例

### 按类别列出发现

#### 安全性（如有问题）
列出安全漏洞及示例

#### 性能（如有问题）
列出性能问题，并说明复杂度

#### 质量（如有问题）
列出代码质量问题，并给出重构建议

#### 可维护性（如有问题）
列出可维护性问题，并给出改进建议

## 版本历史

- v1.0.0 (2024-12-10)：首次发布，包含安全、性能、质量和可维护性分析
