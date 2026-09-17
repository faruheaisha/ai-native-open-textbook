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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/08-prompt-engineering/index.md"
sourceRel: "learn-agent-interview/08-prompt-engineering/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/08-prompt-engineering/index.md"
sourceSha256: "d742947505870bddb5c387683d51215ba6095898b0fc5efb77e32ec65ffd84c1"
pageSha256: "acdb9c280a1dc4da6b345c849e83cb6e5f614693c7665851a7d71d2c59afda81"
contentMode: "local-full"
zh: ""
---

## Skill 与框架原理

### Q：Skills 的原理有没有了解过？怎么实现的？

> 来源：抖音基础架构 Agent 一面 【小红书AI应用开发同题：Skills了解+如何管理各个Skills】【CVTE AI应用工程师一面追问：怎么理解 Skill？能解决什么问题？怎么写 MCP？】

**新手答**：“就是预定义的 Prompt 模板。”

**高手答**：

Skills 是 Agent 系统中**可复用的能力单元**，比 Prompt 模板更完整。一个 Skill 通常包含：

```text
Skill = {
    触发条件:  意图匹配规则 / 关键词 / 正则,
    Prompt 模板:  针对这个能力的专用提示词,
    工具集合:  这个 Skill 能调用哪些工具,
    输出约束:  输出格式和校验规则,
    上下文策略:  需要注入哪些额外信息
}
```

**实现机制**：

1. **Skill 注册表**：所有 Skill 以文件形式存储（比如 `SKILL.md`），包含名称、描述、触发条件、完整的 Prompt 指令。系统启动时加载到内存
2. **触发匹配**：用户输入或 Agent 行为触发时，先做意图匹配——可以是关键词匹配（“整理面经” → 触发 `new-article` Skill）、正则匹配，或者用 embedding 做语义匹配
3. **动态 Prompt 组装**：匹配到 Skill 后，把 Skill 的 Prompt 模板展开，注入当前上下文（用户消息、项目状态等），形成完整的 Prompt 发给模型
4. **工具权限隔离**：不同 Skill 可以访问不同的工具子集——代码生成 Skill 能调文件读写工具，但搜索 Skill 只能调检索工具

**和普通 Prompt 模板的区别**：Prompt 模板是静态文本，Skill 是**一个完整的执行上下文**——它不只定义了“说什么”，还定义了“能做什么”和“在什么条件下触发”。

**怎么理解 Skill 的本质**：

Skill 本质上是**可复用的、领域特定的上下文注入模块**。理解 Skill 有三个层次：

**第一层：Skill 是结构化的 Prompt 模板**
- 每个 Skill 是一个 Markdown 文件，包含任务描述、执行步骤、注意事项
- 当 Skill 被触发时，其内容被注入到模型的上下文中，指导模型的行为

**第二层：Skill 是领域知识的封装**
- 不只是指令，还包含领域专业知识（如“面试题分类应该怎么做”、“代码审查应该检查什么”）
- 把专家经验固化成可执行的流程，让模型在特定领域表现得像专家

**第三层：Skill 是 Agent 的“职业技能树”**
- 每个 Skill 让 Agent 获得一项专业能力
- Skill 之间可以组合——一个复杂任务可能触发多个 Skill 协同工作
- 和 MCP 的区别：MCP 给 Agent 提供**工具**（能做什么），Skill 给 Agent 提供**知识和方法论**（怎么做、为什么这样做）

| 对比维度 | Skill | MCP Tool |
|---------|-------|----------|
| 本质 | 领域知识 + 执行流程 | 外部能力接口 |
| 注入方式 | 加载到上下文 | 注册为可调用工具 |
| 作用 | 指导模型“怎么思考和行动” | 让模型“能调用外部服务” |
| 类比 | 教科书/操作手册 | 工具箱里的工具 |

理解了这三层，就能回答“为什么 Claude Code 能在不同项目中表现不同”——因为不同项目配置了不同的 Skill，Agent 的“专业能力”随 Skill 配置动态变化。

**差距在哪**：新手只看到了 Skill 的表面（Prompt 模板），高手看到了完整的执行上下文——触发条件、工具权限、上下文策略。面试官考的是你对 Agent 框架的理解深度——不只是用框架，还理解框架怎么设计的。

**追问：创建 Skill 有哪些方式？除了自然语言描述，还有什么？**

> 来源：蚂蚁 Agent 开发一面

Skill 的创建方式不止一种，按自动化程度从低到高：

| 方式 | 描述 | 适用场景 |
|------|------|---------|
| **手写 Markdown** | 直接在 `.claude/skills/` 下创建 `.md` 文件，写 frontmatter + 正文 | 复杂领域 Skill，需要精细控制 |
| **自然语言描述** | 告诉 Agent「帮我创建一个做 X 的 Skill」，Agent 自动生成 .md 文件 | 快速原型，让 AI 帮你写 Skill |
| **Skill Creator 工具** | 用专门的 skill-creator 元 Skill，引导式创建、测试和优化 Skill | 标准化流程，带评测验证 |
| **从已有 Skill 派生** | 复制一个相似 Skill 后修改触发条件和内容 | 同类 Skill 批量创建 |
| **CLAUDE.md 内联** | 在项目 CLAUDE.md 中直接写行为指令（非独立文件） | 简单的项目级约束，不值得独立成 Skill |

关键认知：Skill 本质是 Markdown 文件，所以创建方式的区别不在于「用什么工具创建」，而在于**内容质量**——触发条件是否精准、执行步骤是否清晰、边界条件是否覆盖。

---

### Q：Claude Code 的架构有什么比较创新的设计？

> 来源：腾讯 Agent 应用开发一面

**新手答**：“它很强，能直接改代码。”

**高手答**：

Claude Code 在架构上有几个值得关注的设计：

1. **System Prompt 即规则引擎**：把项目约定、编码规范、安全约束全部写进 System Prompt（通过 CLAUDE.md），让模型在每次决策时都受约束。这比在代码里硬编码规则更灵活——改一个文件就能改变 Agent 行为，不需要重新部署
2. **工具调用的权限分级**：不同工具有不同的权限级别——读文件可以自动执行，写文件需要用户确认，危险操作（删除、push）需要显式授权。这个分级机制在安全和效率之间取得了平衡
3. **上下文自动压缩**：对话过长时自动做上下文压缩（summary），保留关键信息丢弃冗余。用户无感知，但解决了长会话的 token 限制问题
4. **Hooks 机制**：允许用户在工具调用前后插入自定义的 shell 命令（pre/post hooks），实现自动化的 lint、测试、格式化——把 Agent 行为嵌入到已有的开发工作流中

创新的核心不是某个单点技术，而是**把 Agent 当作开发者工作流的一部分来设计**——不是替代开发者，而是嵌入开发者的工具链。

**从源码角度看 Claude Code 的设计哲学**：

Claude Code 的开源让我们能直接看到生产级 Code Agent 的设计选择，有几个特别值得学习的理念：

**1. 上下文工程优先于 Prompt 工程**

Claude Code 不是靠一个精心调教的 System Prompt 来驱动的，而是通过**多层上下文注入**构建 Agent 的认知：

| 上下文层级 | 来源 | 作用 |
|-----------|------|------|
| 系统层 | 内置 System Prompt | 定义 Agent 身份和基本行为规范 |
| 项目层 | CLAUDE.md 文件 | 项目特定的规则、约定、架构信息 |
| 技能层 | Skills 目录 | 可复用的领域知识和操作流程 |
| 会话层 | 对话历史 + 工具结果 | 当前任务的动态上下文 |
| 环境层 | git status、文件内容、终端输出 | 实时的代码库状态 |

这五层上下文的动态组装，比任何静态 Prompt 都强大——Agent 的能力上限取决于上下文质量，不是 Prompt 技巧。

**2. 渐进式信息披露（Progressive Disclosure）**

Claude Code 不会一次性把整个项目塞进上下文。而是按需加载——先读目录结构，需要时再读具体文件，用 grep 定位再精读。这种“先粗后细”的策略：
- 节省 token：只加载真正需要的信息
- 减少噪声：避免无关代码干扰模型判断
- 更像人类开发者的工作方式

**3. 工具即能力边界**

Claude Code 通过工具定义（Read、Edit、Bash、Agent 等）严格限定了 Agent 能做什么。模型不能“自由发挥”——它只能通过预定义的工具与环境交互。这个设计把模型的不确定性限制在了工具调用的粒度内，而每个工具调用都可以做权限控制和审计。

**4. Hooks 机制实现行为可定制**

用户可以通过 hooks 在工具调用前后注入自定义逻辑（如自动格式化、安全检查），而不需要修改 Agent 本身。这是一种**开放-封闭原则**的体现——Agent 行为对扩展开放，对修改封闭。

**差距在哪**：新手只感受到了“强”。高手从 System Prompt 规则引擎、权限分级、上下文压缩、Hooks 四个具体设计点分析了创新。面试官考的是你对 Agent 框架的拆解和分析能力。
