---
title: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceId: "07-coding/ai-coding-guide-zh"
sourceTitle: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh"
entryUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/05-Hooks系统完整指南.md"
sourceRel: "docs/claude-code/05-Hooks系统完整指南.md"
rawUrl: "/raw/07-coding/ai-coding-guide-zh/docs/claude-code/05-Hooks系统完整指南.md"
sourceSha256: "7b0bd7f3a4ad8cdcc94aedf3052a858bc659431ad678c54ca6ffbcf9ade8276f"
pageSha256: "c7532522ac95c1d9eb784540211d7c8e2851ab7300ab532c0dcca851e4043ecc"
contentMode: "local-full"
zh: ""
---

## 第一部分：Hooks简介（5分钟理解）

### 1.1 Hooks是什么

> **一句话理解**：Hooks是Claude Code的"自动化传感器"，在特定事件发生时自动执行你的脚本，实现可靠的自动化。

#### 为什么需要Hooks？

**没有Hooks之前（靠AI"记住"）**：

```
问题：AI有时会"忘记"你的要求

你：每次写代码后帮我运行格式化
Claude：好的！（这次记住了）

...10分钟后...

Claude：代码写好了！
你：等等，你忘了格式化！
Claude：抱歉，我忘了...
```

**有了Hooks之后（100%自动执行）**：

```
解决方案：不依赖AI记忆，配置Hook后自动执行

配置PostToolUse Hook → 监听Write工具 → 自动运行格式化脚本

Claude：代码写好了！
[Hook自动触发：运行 prettier --write xxx.js]
结果：代码已自动格式化，100%不会忘记
```

> **生活类比**：
> - **没有Hooks**：靠人记住每次开车前检查轮胎（经常忘）
> - **有Hooks后**：汽车传感器自动检测胎压，异常自动报警（更可靠）

#### Hooks的核心价值

| 对比维度 | 提示词方式 | Hooks方式 |
|----------|-----------|-----------|
| **可靠性** | 不确定（AI可能忘记） | 100%执行（确定性） |
| **一致性** | 每次可能不同 | 每次完全相同 |
| **自动化** | 需要AI主动执行 | 事件触发自动执行 |
| **团队协作** | 每人都要提醒AI | 配置一次，全员生效 |
| **适用场景** | 灵活建议 | 强制规则 |

### 1.2 Hooks能做什么（6个实际案例）

**案例1：文件保护（PreToolUse）**
```
场景：禁止Claude修改production目录下的文件

Hook触发：Claude尝试Write(file_path="production/config.js")
Hook检查：路径包含"production/"
Hook决策：deny（拒绝）
结果：Claude收到错误提示，文件未被修改
```

**案例2：代码格式化（PostToolUse）**
```
场景：每次保存代码后自动格式化

Hook触发：Claude成功执行Write(file_path="src/app.js")
Hook执行：运行 prettier --write src/app.js
结果：代码自动格式化，无需手动操作
```

**案例3：提示词优化（UserPromptSubmit）**
```
场景：自动在写作任务后追加写作规范

用户输入："帮我写一篇关于AI的文章"
Hook检测：包含"写"和"文章"关键词
Hook追加："\n\n## 写作规范\n1. 风格：接地气\n2. 字数：1500字"
Claude收到：原始输入 + 写作规范
```

**案例4：Git提交检查（PreToolUse + Bash）**
```
场景：提交前自动检查代码质量

Hook触发：Claude执行Bash(command="git commit -m xxx")
Hook执行：运行lint检查、测试、敏感信息扫描
Hook决策：全部通过 → allow；有问题 → deny
结果：低质量代码无法提交
```

**案例5：会话初始化（SessionStart）**
```
场景：启动Claude Code时自动加载项目配置

Hook触发：Claude Code启动
Hook执行：检查Python依赖是否安装
结果：缺少依赖时自动提示安装命令
```

**案例6：桌面通知（Notification）**
```
场景：Claude需要用户确认时发送桌面通知

Hook触发：Claude发送通知请求用户确认
Hook执行：调用系统通知API
结果：用户收到桌面弹窗，不会错过重要确认
```

### 1.3 Hooks执行流程

**完整生命周期图**：

```
用户输入
    ↓
[UserPromptSubmit Hook] ← 可以修改/增强提示词
    ↓
Claude处理提示词
    ↓
决定调用工具（如Write）
    ↓
[PreToolUse Hook] ← 可以允许/拒绝/询问
    ↓
执行工具（如Write）
    ↓
[PostToolUse Hook] ← 可以执行后处理
    ↓
返回结果给用户
```

**当前常见 Hook 事件族与触发时机（概念快照，不等于完整清单）**：

| Hook类型 | 触发时机 | 典型用途 | 可否阻止后续操作 |
|----------|----------|----------|-----------------|
| **UserPromptSubmit** | 用户输入提交后 | 提示词优化、敏感词过滤 | ✅ 是 |
| **PreToolUse** | 工具调用前 | 权限校验、参数验证 | ✅ 是 |
| **PostToolUse / PostToolUseFailure** | 工具调用成功后 / 失败后 | 格式修复、自动测试、失败告警 | ❌ 否 |
| **Notification** | 通知发送时 | 日志记录、桌面通知 | ❌ 否 |
| **SessionStart** | 会话开始时 | 环境初始化 | ❌ 否 |
| **SessionEnd** | 会话结束时 | 清理临时文件 | ❌ 否 |
| **Stop / StopFailure** | AI 正常停止 / 异常停止时 | 保存状态、错误告警 | ❌ 否 |
| **TaskCreated / TaskCompleted** | 子任务创建 / 完成时 | 子代理日志、任务收集 | ❌ 否 |
| **PermissionDenied** | 权限被拒绝时 | 审计、自动补救提示 | ❌ 否 |
| **PreCompact / PostCompact** | 上下文压缩前 / 后 | 保存关键上下文、记录 token 变化 | ❌ 否 |
| **CwdChanged / FileChanged** | 工作目录切换 / 文件变化时 | 同步环境、触发检查 | ❌ 否 |
| **Elicitation** | MCP 请求额外交互输入时 | 记录交互日志、输入校验 | ❌ 否 |

> 💡 **记忆方式**：先记三大高频入口 `UserPromptSubmit`、`PreToolUse`、`PostToolUse`，再按“失败 / 任务 / 文件 / 压缩 / 交互”五个补充事件族扩展。

### 1.4 安全警告（重要！）

> ⚠️ **严重警告**：Hooks可以执行**任意Shell命令**，这意味着配置不当可能导致：
> - 文件被删除或修改
> - 敏感信息泄露
> - 系统被恶意脚本攻击

**安全最佳实践**：

| 风险 | 防护措施 |
|------|---------|
| **恶意脚本** | 只运行你信任的脚本，不要从不明来源复制配置 |
| **权限过大** | 脚本只请求必要的权限，避免使用sudo |
| **敏感信息** | 不要在脚本中硬编码密码/Token |
| **无限循环** | 设置合理的timeout，避免脚本卡死 |
| **团队配置** | 代码审查.claude/settings.json变更 |

**配置检查清单**：

```
□ 脚本来源可信吗？（自己写的/官方示例/信任的开源）
□ 脚本权限最小化了吗？（不需要sudo就不用）
□ 敏感信息用环境变量了吗？（不硬编码）
□ 设置了合理的timeout吗？（防止卡死）
□ 团队成员都知道这个Hook吗？（透明度）
```

---

> **v2.1.139→v2.1.158 关键更新**：Hook exec form 支持 `args: string[]`，避免路径占位符被 shell quoting 破坏；`PostToolUse` 支持 `continueOnBlock`；Hook JSON 输出新增 `terminalSequence`；`Stop` / `SubagentStop` 输入可包含 `background_tasks` 与 `session_crons`。v2.1.152 又补充了 `SessionStart.reloadSkills`、`hookSpecificOutput.sessionTitle` 和 `MessageDisplay` hook，适合在会话启动时安装/刷新 Skills、设置标题，或在展示阶段隐藏/转换助手消息文本。
