---
title: "代码审查检查清单"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/03-skills/code-review-specialist/templates/review-checklist.md"
sourceRel: "zh/03-skills/code-review-specialist/templates/review-checklist.md"
rawUrl: "/raw/09-harness/claude-howto/zh/03-skills/code-review-specialist/templates/review-checklist.md"
sourceSha256: "d0c5c71b7d4afba4141204d78514b1f24fa9179a515970ad4aa710dd49993916"
pageSha256: "d0c5c71b7d4afba4141204d78514b1f24fa9179a515970ad4aa710dd49993916"
contentMode: "local-full"
zh: ""
---

# 代码审查检查清单

## 安全检查
- [ ] 没有硬编码的凭据或密钥
- [ ] 所有用户输入都做了校验
- [ ] 使用参数化查询，防止 SQL 注入
- [ ] 所有会修改状态的操作都有 CSRF 防护
- [ ] 使用正确的转义，防止 XSS
- [ ] 受保护的端点有身份验证检查
- [ ] 资源访问有授权检查
- [ ] 密码使用安全哈希算法（bcrypt、argon2）
- [ ] 日志中没有敏感数据
- [ ] 强制使用 HTTPS

## 性能检查
- [ ] 没有 N+1 查询
- [ ] 索引使用合理
- [ ] 在有价值的地方做了缓存
- [ ] 主线程上没有阻塞操作
- [ ] 正确使用 async/await
- [ ] 大数据集已经分页
- [ ] 数据库连接已做连接池
- [ ] 正则表达式已优化
- [ ] 没有不必要的对象创建
- [ ] 没有内存泄漏

## 质量检查
- [ ] 函数少于 50 行
- [ ] 变量命名清晰
- [ ] 没有重复代码
- [ ] 错误处理合理
- [ ] 注释解释的是 WHY，而不是 WHAT
- [ ] 生产环境中没有 console.log
- [ ] 有类型检查（TypeScript / JSDoc）
- [ ] 遵循 SOLID 原则
- [ ] 正确应用设计模式
- [ ] 代码具备自解释性

## 测试检查
- [ ] 已编写单元测试
- [ ] 覆盖了边界情况
- [ ] 测试了错误场景
- [ ] 有集成测试
- [ ] 覆盖率大于 80%
- [ ] 没有不稳定测试
- [ ] 外部依赖已做 mock
- [ ] 测试名称清晰
