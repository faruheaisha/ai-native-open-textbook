---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/claude-code-guide/references/README.md"
sourceRel: "i18n/zh/skills/claude-code-guide/references/README.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/claude-code-guide/references/README.md"
sourceSha256: "0c4f6b41406effc977fe7e18af5e564c48b822bf38aaf59045d5bdc58ab2ef06"
pageSha256: "49dfbab9d9b8214dd0ff07b5a6b32f506b5de779af67dcb116a67ad06006354e"
contentMode: "local-full"
zh: ""
---

## Development Workflows

> **🏆 Best Practice**: These workflows become exponentially more powerful when combined with Kernel Architecture + Meta-Todo System for intelligent automation.

[↑ Back to Top](#quick-navigation)

### Core Development Approach
The fundamental pattern for any development task:

```bash
# Phase 1: Understand
"Examine existing system, understand constraints"
→ No changes yet, just learning

# Phase 2: Plan
"Create approach for the task"
→ Break down steps, identify risks

# Phase 3: Implement
"Execute the plan incrementally"
→ Small steps with validation

# Phase 4: Verify
"Ensure requirements are met"
→ Test, review, document
```

**Key Patterns**:
- **Explore-Plan-Code**: Understand → Design → Implement
- **Incremental Progress**: Small, validated steps
- **Continuous Validation**: Check work at each stage

### Task Management Patterns
Organize complex work effectively:

```bash
# Breaking down complex tasks
Large Feature → Multiple subtasks → Track progress → Complete systematically

# Progress tracking
- Identify all required steps
- Work on one thing at a time
- Mark completed immediately
- Add discovered tasks as found

# Parallel vs Sequential
Independent tasks → Work in parallel
Dependent tasks → Work sequentially
Mixed tasks → Identify dependencies first
```

**Key Understanding**: Good task management maintains clarity and ensures nothing is missed.

### Quality Assurance Patterns
Ensure high-quality output:
```bash
# 自动化验证
1. 格式和风格一致性
2. 静态分析和代码检查
3. 适用时的类型检查
4. 测试覆盖率验证
5. 安全漏洞扫描
6. 文档更新

# 手动审查视角
- 功能性：是否按预期工作？
- 性能：是否高效？
- 安全性：是否存在漏洞？
- 可维护性：是否干净清晰？
- 可访问性：是否所有人都可以使用？

**关键理解**：质量源于每个阶段的系统验证。

## 错误恢复

> **🔥 智能恢复**：结合错误模式与后台自愈环境，实现90%的自主问题解决。

[↑ 返回顶部](#快速导航)

### 常见模式
```bash
# 网络错误 → 重试
任务因“连接错误”失败
→ 重新执行相同的命令（90%成功）

# 上下文溢出 → 压缩
上下文积累过多
→ /compact “专注于当前任务”

# 构建失败 → 查看日志
钩子显示构建错误
→ 检查特定错误，修复根本原因

# 会话丢失 → 重建
会话断开
→ 分析当前状态并重建上下文
```

**关键理解**：大多数错误是可以恢复的。识别模式，应用适当的恢复方法。

## 实践示例

> **🎯 实战准备**：这些示例展示了工具协同工作的实际效果。注意如何结合多种Claude Code功能以达到最佳效果。

[↑ 返回顶部](#快速导航)

### 示例 1：添加认证
```bash
# 1. 理解现有系统
“探索当前的认证实现”

# 2. 规划增强
“计划在现有系统中添加OAuth2认证”

# 3. 必要时进行研究
“研究OAuth2的最佳实践和安全性”

# 4. 逐步实施
“实现带有适当错误处理的OAuth2认证”

# 5. 质量保证
“审查OAuth实现的安全漏洞”
```

### 示例 2：性能优化
```bash
# 1. 识别问题
“分析组件的性能瓶颈”

# 2. 创建优化计划
TodoWrite([
  {id: "1", content: "为已识别的组件添加React.memo"},
  {id: "2", content: "实现代码分割"},
  {id: "3", content: "优化包大小"},
  {id: "4", content: "添加懒加载"}
])

# 3. 执行优化
“实现已识别的性能优化”

# 4. 验证改进
“运行性能测试并比较指标”
```
### 示例 3：批量组件创建
```bash
# 1. 确定所需组件
"列出需要创建的 10 个 UI 组件"

# 2. 并行创建
"创建所有 UI 组件：Button, Input, Select, Checkbox, Radio, Toggle, Slider, DatePicker, TimePicker, ColorPicker"

# 3. 确保一致性
"审查所有组件以确保 API 和样式的一致性"

# 4. 如有必要进行优化
"如果组件包大小过大，则进行优化"
```

### 示例 4：调试生产问题
```bash
# 1. 收集上下文
"分析错误日志以识别模式"

# 2. 本地复现
"设置环境以复现问题"

# 3. 深入调查
"使用错误堆栈跟踪和可用日志调试问题"

# 4. 修复和测试
"根据根本原因实施修复"
"审查修复以确保边缘情况和副作用"

# 5. 防止再次发生
"添加测试以防止回归"
"更新监控以捕获类似问题"
```

### 示例 5：API 迁移
```bash
# 1. 分析当前 API
"映射所有当前 API 端点及其使用模式"

# 2. 规划迁移
TodoWrite([
  {id: "1", content: "设计新的 API 结构"},
  {id: "2", content: "创建兼容层"},
  {id: "3", content: "实现新端点"},
  {id: "4", content: "逐步迁移消费者"},
  {id: "5", content: "弃用旧端点"}
])

# 3. 实施
"创建新的 API 端点同时保持向后兼容性"

# 4. 测试策略
"创建全面的 API 测试"
"测试旧端点和新端点"
```

### 示例 6：重构遗留代码
```bash
# 1. 理解当前实现
"探索遗留模块结构和依赖关系"

# 2. 创建安全网
"在重构前为遗留代码添加测试"

# 3. 逐步重构
"逐模块重构，确保功能保持不变"

# 4. 验证每一步
每次重构后：
- 运行现有测试
- 检查功能
- 审查代码质量
```

### 示例 7：设置 CI/CD
```bash
# 1. 研究项目需求
"分析项目对 CI/CD 管道的需求"

# 2. 创建管道配置
"设计 GitHub Actions 工作流以进行测试和部署"

# 3. 实施阶段
TodoWrite([
  {id: "1", content: "设置测试自动化"},
  {id: "2", content: "添加代码风格和格式检查"},
  {id: "3", content: "配置构建过程"},
  {id: "4", content: "添加部署步骤"},
  {id: "5", content: "设置通知"}
])

# 4. 测试和优化
"使用功能分支测试管道"
"优化速度和可靠性"
```
### 示例 8：后台开发工作流（新）
```bash
# 1. 在后台启动所有服务
npm run dev &                    # 前端开发服务器
(cd ../api && npm run dev &)     # 后端 API 服务器
npm run test:watch &             # 持续测试

# 2. 设置信息状态
/statusline "🚀 全栈开发 | 🎯 所有系统运行中"

# 3. 同时监控所有服务
"监控所有服务的错误"
# Claude 监控所有后台进程

# 4. 不停止地修复问题
"前端构建错误" → Claude 检查日志 → 修复问题
"API 超时" → Claude 识别原因 → 调整配置
"测试失败" → Claude 更新代码 → 测试通过

# 5. 完成后优雅关闭
/bashes                          # 列出所有进程
/kill-bash all                   # 停止一切
```

### 示例 9：多仓库同步（新）
```bash
# 1. 添加所有相关仓库
/add-dir ../shared-types
/add-dir ../frontend
/add-dir ../backend
/add-dir ../mobile

# 2. 同步类型定义
"更新所有项目中的 TypeScript 类型"
@architect "确保类型一致性"

# 3. 并行验证
(cd ../frontend && npm run typecheck &)
(cd ../backend && npm run typecheck &)
(cd ../mobile && npm run typecheck &)

# 4. 监控并修复类型错误
"修复所有项目中的类型不匹配"
# Claude 检查所有后台类型检查并修复问题
```

### 示例 10：以安全为先的功能开发（新）
```bash
# 1. 以安全为前提进行规划
@architect @security "设计用户输入处理"

# 2. 实现持续扫描
"实现表单验证"
/security-review                 # 立即检查

# 3. 主动修复漏洞
"修复第 42 行的 XSS 漏洞"
@security "验证修复是否完成"

# 4. 设置持续监控
# 每个 PR 的 GitHub Action
"为 PR 设置自动安全扫描"

# 5. 记录安全考虑事项
"在 SECURITY.md 中更新输入验证模式"
```

### 示例 11：智能上下文的长时间会话（新）
```bash
# 1. 开始主要功能开发
"构建完整的认证系统"

# 2. 工作进展，上下文建立
# ... 多次操作后 ...
# 上下文达到 6000 个 token

# 3. 智能压缩
/microcompact                    # 清除旧的操作
# 保留：当前认证工作、模式、最近的更改
# 清除：旧文件读取、已完成的搜索

# 4. 无缝继续
"添加密码重置功能"
# 当前工作的完整上下文可用

# 5. 切换到新功能
/compact "支付集成"   # 新上下文的完全重置
"实现 Stripe 支付流程"
```

## 高级模式

> **🧙‍♂️ 大师级别**：这些模式代表了 Claude Code 协同工作的巅峰——所有系统作为一个统一的智能体协同工作。

[↑ 返回顶部](#快速导航)

### 协同功能组合（新）
通过组合新功能最大化生产力：
```bash
# 最终的开发设置
# 结合：后台任务 + 状态行 + 多目录 + 子代理

# 1. 初始化多项目工作区
/add-dir ../backend
/add-dir ../frontend
/add-dir ../shared

# 2. 在后台启动所有任务
npm run dev &                    # 前端
(cd ../backend && npm run dev &) # 后端
npm run test:watch &             # 测试
npm run storybook &              # 组件库

# 3. 设置信息状态
/statusline "🚀 $(git branch --show-current) | 📍 $(basename $(pwd)) | ✅ 所有系统正常运行"

# 4. 部署代理团队
@architect "审查整体系统设计"
@security "监控漏洞"
@performance "监控瓶颈"

# 5. 实时监控工作
"构建结账流程"
# Claude 监控所有服务，捕获错误，建议修复
# 代理提供持续的专项反馈
```

### 智能后台调试模式
```bash
# 自愈开发环境

# 1. 从监控开始
npm run dev & --verbose          # 额外的日志记录
/bash-output <id> "ERROR|WARN"   # 过滤问题

# 2. 设置自动恢复
"如果服务器崩溃，自动重启"
# Claude 监控，检测崩溃，修复原因，重启

# 3. 从失败中学习
"导致最近3次崩溃的原因是什么？"
# Claude 分析后台日志中的模式
# 更新 CLAUDE.md 以提供预防策略

# 4. 预测性干预
"监控内存泄漏"
# Claude 监控内存使用趋势
# 在崩溃前发出警报，建议垃圾回收点
```

### 跨项目智能网络
```bash
# 项目间的共享学习

# 1. 连接知识库
/add-dir ~/.claude/global-patterns
/add-dir ./project-a
/add-dir ./project-b

# 2. 提取成功模式
"哪些模式可以从 project-a 转移到 project-b？"
@architect "识别可重用的架构"

# 3. 应用学习成果
"应用 project-a 的错误处理模式"
# Claude 适应新上下文

# 4. 更新全局知识
"将此解决方案保存到全局模式"
# 供所有未来项目使用
```

### 智能研究系统（多阶段）
通过协调的代理进行复杂的资料收集：

```bash
# 第1阶段：分布式搜索（10个代理）
/research:smart-research "主题"
→ 代理搜索：主题，最佳实践，教程，文档等
→ 输出：.claude/research-output/ 中的去重 URL

# 第2阶段：并行内容提取
→ 10个 WebFetch 代理批次
→ 从每个 URL 提取内容
→ 输出：单独的内容文件

# 第3阶段：成对合并
→ 递归合并：20→10→5→3→2→1
→ 最终输出：全面的研究报告

# 命令
/research:smart-research [主题]
/research:research-status [主题]
/research:research-help
```

**质量指标**：

```
- 15+ 独特的高质量 URL
- 90%+ 成功提取率
- 逐步文件缩减
- 没有重复信息

[NOTE: 以下部分描述了第三方或概念系统，不是官方 Claude Code 功能]

### 智能流程架构（第三方/概念）
高级多代理协调概念：

```bash
# 概念架构组件
# 这些描述了理论或第三方实现
# 不是官方 Claude Code 的一部分

Queen Agent → 主协调器概念
Worker Agents → 专业代理角色
Memory System → 持久存储模式
MCP Tools → 扩展工具集成

# 理论操作模式
Swarm Mode → 快速任务协调
Hive-Mind Mode → 复杂项目会话

# 概念功能
- 模式识别
- 自组织架构
- 集体决策
- 自适应学习循环
```

**关键理解**：这些描述了可能通过第三方工具或未来功能实现的高级概念。

[NOTE: 本部分描述了一个第三方 NPM 包，不是官方 Claude Code 功能]

### 子代理系统（第三方 NPM 包）
通过外部工具扩展专业领域：

```bash
# 第三方包安装（非官方）
npm install -g @webdevtoday/claude-agents

# 在项目中初始化
claude-agents init

# 具有特定领域的专业代理类型
claude-agents run code-quality --task "Review codebase"
  → 专业领域：代码标准、最佳实践、重构
  
claude-agents run testing --task "Generate test suite"
  → 专业领域：单元测试、集成测试、TDD
  
claude-agents run development --task "Build feature"
  → 专业领域：功能实现、架构
  
claude-agents run documentation --task "Generate docs"
  → 专业领域：API 文档、README、技术写作
  
claude-agents run management --task "Project planning"
  → 专业领域：任务分解、估算、路线图

# 与斜杠命令的集成
/agents:code-quality "analyze performance"
/agents:testing "create unit tests"
```

**关键功能**：
- 每个代理的独立上下文管理
- 专业领域知识
- 与斜杠命令和钩子的集成
- 跨会话的持久学习

**关键理解**：子代理提供了超出内置代理的专业领域知识。每个代理都有深厚的专业知识。

### 认知方法
让智能引导而不是僵化的规则：

```bash
# 而不是机械的步骤
"We need to implement feature X. What approach makes sense given our constraints?"

# 信任模式识别
"This feels like it might have security implications. Let me investigate."

# 自适应执行
"The simple approach isn't working. Let me try a different strategy."
```

### 智能研究流程
由好奇心驱动的研究：

```bash
# 研究 [主题] 遵循自然智能：
# - 追踪对重要模式的好奇心
# - 信任对来源质量的判断
# - 让见解自然涌现
# - 达到真正理解时停止
```
### 上下文感知决策
根据项目状态进行调整：

```bash
# 项目早期 → 关注架构
# 项目中期 → 关注功能
# 项目后期 → 关注优化
# 维护阶段 → 关注可靠性

# 让上下文指导方法
"鉴于我们正处于早期开发阶段，我们应该现在就进行优化还是专注于功能开发？"
```

### 动态视角调试
动态生成相关的调查角度：

```bash
# 第一步：生成视角
# 问题：[应用程序在大文件上传时崩溃]
# 哪三个最相关的视角需要调查？

# 示例视角：
# A. 内存管理视角
# B. 网络/基础设施视角
# C. 并发/竞态条件视角

# 第二步：并行调查
# - 调查内存：检查内存泄漏、缓冲区、内存不足
# - 调查网络：超时、代理、限制
# - 调查并发：竞态条件、状态

# 第三步：综合发现
# 基于所有视角：
# 1. 根本原因是什么？
# 2. 最小修复方案是什么？
# 3. 如果不修复会有哪些风险？
```

### 认知验证模式
使用深思熟虑的验证而不是机械检查：

```bash
# 完成后：[任务描述]
# 结果：[创建或更改了什么]
# 
# 批判性验证：
# 1. 这是否完全解决了原始请求？
# 2. 我们可能遗漏或误解了什么？
# 3. 是否有未处理的边缘情况？
# 4. 开发者会对这个结果满意吗？
# 5. 质量是否符合项目标准？
# 
# 怀疑态度 - 积极寻找问题
```

### 通过反思学习
通过认知反思建立知识：

```bash
# 完成复杂任务后
[NOTE: /reflect 命令是概念性的 - 验证是否可用]
# 完成复杂任务后
"从实现 [功能] 中我们学到了什么？"

# 解决bug后
"根本原因是什么，如何防止类似问题的发生？"

# 每周元反思
"我们如何改进开发过程本身？"

# 系统通过思考自身表现来学习
```

### 风险沟通模式
始终明确量化和沟通风险：

```bash
"⚠️ 警告如果你跳过速率限制修复：
频率：当超过100个用户同时在线时触发（每天高峰时段）
影响：API服务器崩溃，影响所有用户约5分钟
严重性：高（完全中断）
解决方法：将服务器扩展到两倍容量（每月额外花费+$500）
时间线：安全两周内，营销活动前为关键时期"
```

### 多角度需求捕获
确保没有任何遗漏：

```bash
# 从多个角度分析请求：
# - 列出用户消息中的所有功能性需求
# - 列出所有非功能性需求（性能、安全性）
# - 列出所有隐含需求和最佳实践

# 综合步骤：
# 合并所有需求列表并对照原始请求进行验证：
# 1. 合并所有识别的需求
# 2. 检查原始请求中的每个词是否都已考虑
# 3. 创建最终全面的需求列表
```
