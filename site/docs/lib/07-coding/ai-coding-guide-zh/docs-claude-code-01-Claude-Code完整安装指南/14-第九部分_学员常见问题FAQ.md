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
entryUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/01-Claude-Code完整安装指南.md"
sourceRel: "docs/claude-code/01-Claude-Code完整安装指南.md"
rawUrl: "/raw/07-coding/ai-coding-guide-zh/docs/claude-code/01-Claude-Code完整安装指南.md"
sourceSha256: "faa9c4a018405b1408c9cd9bbe81590453531a86b5e3100f6dba6afafac0f4bf"
pageSha256: "71e4f273691374da9fd0f38e06cb21ae3132b41eedc98e6dc6996144703490a9"
contentMode: "local-full"
zh: ""
---

## 第九部分：学员常见问题FAQ

> 💡 **本节收录**：直播课程中学员最常问的20个问题，帮你避开90%的坑！

### 9.1 安装与配置类

#### Q1：运行 `code --version` 报错说找不到命令？

**A1：你可能在Cursor里运行的！**

- `code` 是 **VS Code** 的命令
- `cursor` 是 **Cursor** 的命令

**正确做法：**

- 在Cursor里运行：`cursor --version`
- 在VS Code里运行：`code --version`
- 查看Claude Code版本：`claude --version`

#### Q2：找不到settings.json文件在哪儿？

**A2：不同编辑器位置不同！**

**Cursor位置：**

- Windows: `C:\Users\你的用户名\AppData\Roaming\Cursor\User\settings.json`
- Mac: `~/Library/Application Support/Cursor/User/settings.json`

**VS Code位置：**

- Windows: `C:\Users\你的用户名\AppData\Roaming\Code\User\settings.json`
- Mac: `~/Library/Application Support/Code/User/settings.json`

**快速打开方法：**

1. 按 `Ctrl/Cmd + Shift + P`
2. 输入：`open user settings json`
3. 选择：`Preferences: Open User Settings (JSON)`

#### Q3：配置后还是报错，怎么办？

**A3：按照这个检查清单逐项排查：**

```
□ settings.json文件保存了吗？（看文件名有没有*号）
□ JSON格式正确吗？（大括号、逗号、引号都对吗）
□ 重启了终端吗？（配置需要重启终端才生效）
□ 重启了编辑器吗？（有时需要完全重启）
```

**还是不行？** 把错误信息截图，群里问老金！

#### Q4：zsh、PowerShell、bash 有什么区别？我该用哪个？

**A4：它们都是Shell（命令行翻译器），选对应你系统的就行！**

| 操作系统          | 推荐Shell  | 为什么             |
| ----------------- | ---------- | ------------------ |
| **Windows** | PowerShell | 系统自带，功能强大 |
| **Mac**     | zsh        | 2019年后的系统默认 |
| **Linux**   | bash       | 通用标准           |

**你不用手动选**，按照第7.1节配置后，编辑器会自动选对的！

#### Q5：怎么知道我现在用的是哪个Shell？

**A5：打开终端运行这个命令：**

```bash
echo $SHELL
```

**看输出：**

- 显示 `/bin/zsh` → 你在用zsh
- 显示 `/bin/bash` → 你在用bash
- Windows显示 `powershell` → 你在用PowerShell

---

### 9.2 启动与使用类

#### Q6：怎么启动Claude Code？

**A6：有2种方式，推荐第1种！**

**方式1：终端命令启动（推荐）**

```bash
# 进入项目目录
cd /你的项目路径

# 启动Claude Code
claude
```

**方式2：IDE快捷键启动**

- 配置tasks.json（见第7.1节）
- 按 `Ctrl/Cmd + Shift + P` → 选 `Tasks: Run Task` → 选 `Claude Code: 启动交互模式`

#### Q7：启动后看到什么才算成功？

**A7：看到这个界面就成功了：**

```
╭─────────────────────────────────────────╮
│  Welcome to Claude Code v2.1           │
│  • Type /help to see available commands │
╰─────────────────────────────────────────╯

You: █
```

关键要素：

- ✅ 显示欢迎信息
- ✅ 显示版本号（v2.1+）
- ✅ 显示工作目录
- ✅ 有输入光标 `█`

#### Q8：`--dangerously-skip-permissions` 是什么？我该用吗？

**A8：这个参数跳过权限询问，新手别用！**

**通俗解释：**

- 不加参数 = AI做事前都问你"可以吗？"
- 加参数 = AI直接干，不问你

**老金建议：**

- 🟢 **新手（前2周）**：别加！让AI问你，你能学到它在做什么
- 🟡 **熟练后**：自己的小项目可以加，省时间
- 🔴 **重要项目**：永远别加！安全第一

详细说明见第6.5.2节。

#### Q9：启动Claude Code后怎么退出？

**A9：两种方法：**

**方法1：命令退出**

```bash
/exit
```

**方法2：快捷键退出**

- 按 `Ctrl + C` 两次
- 或 `Ctrl + D`

#### Q10：能同时打开多个Claude Code吗？

**A10：可以！每个终端窗口都能启动一个Claude Code实例。**

**使用场景：**

- 窗口1：处理前端代码
- 窗口2：处理后端代码
- 窗口3：运行测试

---

### 9.3 配置文件类

#### Q11：tasks.json文件放在哪里？

**A11：放在项目根目录的 `.vscode` 文件夹里！**

**完整路径示例：**

```
你的项目/
├── .vscode/
│   └── tasks.json  ← 放这里
├── src/
└── package.json
```

**创建步骤：**

1. 在项目根目录创建 `.vscode` 文件夹（如果没有）
2. 在 `.vscode` 里创建 `tasks.json` 文件
3. 复制第7.1节的配置粘贴进去
4. 保存

#### Q12：配置后快捷键不生效？

**A12：检查这些：**

```
□ keybindings.json保存了吗？
□ 快捷键有冲突吗？（换个组合试试）
□ 重启编辑器了吗？
```

**查看快捷键冲突：**

1. 按 `Ctrl/Cmd + K, Ctrl/Cmd + S`（打开快捷键设置）
2. 搜索你配置的快捷键
3. 看是否有其他命令占用

#### Q13：粘贴配置后报JSON错误？

**A13：大多数情况是格式问题！**

**常见错误：**

| 错误                  | 原因          | 解决                         |
| --------------------- | ------------- | ---------------------------- |
| `Unexpected token`  | 多了/少了逗号 | 最后一项配置不要逗号         |
| `Invalid character` | 中文引号      | 把 `""` 改成 `""`        |
| `Unexpected end`    | 大括号不匹配  | 数数 `\{` 和 `\}` 是否相等 |

**快速检查：**

- 用在线工具检查JSON格式：https://jsonlint.com/
- 复制你的配置粘贴进去，它会告诉你哪里错了

---

### 9.4 权限与安全类

#### Q14：Claude Code会偷偷上传我的代码吗？

**A14：不会！Claude Code只上传你让它处理的内容。**

**工作原理：**

1. 你问问题 → Claude Code读取相关文件
2. 把文件内容发给Anthropic API处理
3. 收到AI回复后显示给你

**隐私保护：**

- ✅ 只上传你明确要求处理的文件
- ✅ 你可以通过权限控制它能访问什么
- ✅ 不会后台扫描或上传整个项目

#### Q15：我不想让Claude Code访问某些文件，怎么办？

**A15：用 `.gitignore` 或 `.claudeignore` 排除！**

**方法1：.gitignore（推荐）**
Claude Code默认会忽略 `.gitignore` 里的文件。

**方法2：.claudeignore**
在项目根目录创建 `.claudeignore` 文件：

```
# 不让Claude访问的文件
.env
*.key
secrets/
config/production.json
```

---

### 9.5 网络与性能类

#### Q16：Claude Code响应很慢，怎么优化？

**A16：检查网络和上下文大小！**

**网络检查：**

```bash
# 测试到Anthropic的延迟
ping api.anthropic.com
# 延迟<500ms = 正常，>1000ms = 慢
```

**优化方法：**

1. ✅ 使用代理（国内用户必需）
2. ✅ 减少上下文（不要让AI读太多文件）
3. ✅ 使用 `.claudeignore` 排除无关文件

#### Q17：国内网络访问Anthropic API很慢？

**A17：配置代理！**

**临时代理（当前终端生效）：**

```bash
# macOS/Linux
export HTTPS_PROXY=http://127.0.0.1:7890

# Windows PowerShell
$env:HTTPS_PROXY="http://127.0.0.1:7890"
```

**永久代理（推荐）：**
在 `~/.zshrc` 或 `~/.bashrc` 添加：

```bash
export HTTPS_PROXY=http://127.0.0.1:7890
export HTTP_PROXY=http://127.0.0.1:7890
```

---

### 9.6 错误信息类

#### Q18：启动时报错 `claude: command not found`？

**A18：Claude Code没安装或PATH未配置！**

**解决步骤：**

1. 检查是否安装：

   ```bash
   claude --version
   ```

2. 如果提示命令找不到：

   **macOS/Linux:**

   ```bash
   # 检查安装位置
   ls ~/.local/bin/claude

   # 如果存在，添加到PATH
   echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

   **Windows:**

   ```powershell
   # 检查安装位置
   Test-Path "$env:USERPROFILE\.local\bin\claude.exe"

   # 如果返回 True，手动添加到 PATH
   # 系统设置 → 环境变量 → 用户变量的 Path → 添加：
   # %USERPROFILE%\.local\bin
   ```

3. 如果确实没安装：

   **macOS/Linux:**

   ```bash
   curl -fsSL https://claude.ai/install.sh | bash
   ```

   **Windows:**

   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```

#### Q19：启动时报错 `API key not found`？

**A19：没配置ANTHROPIC_API_KEY环境变量！**

**快速检查：**

```bash
# 查看环境变量是否存在
echo $ANTHROPIC_API_KEY  # macOS/Linux
echo $env:ANTHROPIC_API_KEY  # Windows
```

**如果显示空 → 没配置，回到第四部分重新配置。**

#### Q20：我之前用npm安装过Claude Code，怎么办？

**A20：官方提供了迁移命令！**

```bash
# 一键迁移到原生版本
claude install
```

这个命令会：
1. 下载并安装原生版本
2. 保留你的所有配置
3. 自动卸载旧的npm版本

**验证迁移成功：**

```bash
claude --version
# 应显示：Claude Code v2.1.x (native)
# 而不是：(npm)
```

**如果迁移失败，手动卸载npm版本：**

```bash
npm uninstall -g @anthropic-ai/claude-code
# 然后重新运行原生安装
```

#### Q21：原生安装和npm安装有什么区别？

**A21：简单来说，原生安装更省心；npm 安装仍然是官方支持的标准路径。**

| -------------- | ----------- | ----------------- |
| 需要Node.js    | ❌ 不需要    | ✅ 需要 18+      |
| 安装时间       | ⏱️ 3-5分钟  | ⏱️ 30-40分钟    |
| 自动更新       | ✅ 更接近官方默认体验  | ⚠️ 通常需你手动更新 |
| PATH配置       | ✅ 自动完成  | ⚠️ 经常出错     |
| 稳定性         | ✅ 生产级    | ⚠️ 依赖环境     |

#### Q22：原生安装可以离线使用吗？

**A22：可以！安装后只需要网络访问API即可。**

- ✅ 安装时需要网络（下载安装包）
- ✅ 安装后可以离线使用（但需要能访问Anthropic API）
- ✅ 配合本地模型（如Ollama）可以完全离线

#### Q23：原生安装会占用多少空间？

**A23：大约100-200MB。**

- Windows: `~150MB` 在 `C:\Users\你的用户名\.local\bin\`
- macOS/Linux: `~100MB` 在 `~/.local/bin/` 和 `~/.claude/`

相比npm安装节省约50%空间。

#### Q24：我电脑上已经有Node.js了，还需要卸载吗？

**A24：不需要！可以共存。**

- ✅ Node.js可以继续用于其他项目
- ✅ Claude Code原生安装不影响Node.js
- ✅ 如果你不用Node.js做开发，可以考虑卸载节省空间

#### Q25：原生安装会自动更新吗？可以关闭吗？

**A25：默认自动更新，可以关闭。**

**查看更新状态：**

```bash
claude --version
# 查看当前版本
```

**禁用自动更新：**

```bash
# macOS/Linux
export CLAUDE_AUTO_UPDATE=false

# Windows PowerShell
$env:CLAUDE_AUTO_UPDATE="false"
```

**手动更新：**

```bash
claude install
# 重新运行安装命令即可更新
```

#### Q26：公司电脑安装需要管理员权限吗？

**A26：Windows需要，Mac/Linux不需要！**

**Windows：**
- ⚠️ 建议以管理员身份运行PowerShell
- 原因：需要写入 `AppData` 目录

**macOS/Linux：**
- ✅ 不需要sudo
- 安装到用户目录 `~/.local/bin/`

#### Q27：安装脚本安全吗？会不会有病毒？

**A27：官方脚本，经过签名和验证！**

**安全验证：**

1. 官方域名：`claude.ai/install.sh` 和 `claude.ai/install.ps1`
2. 代码签名：由Anthropic PBC签名
3. 开源透明：脚本内容可在GitHub公开查看

**如果你担心，可以先查看脚本：**

```bash
# 只下载不执行
curl -fsSL https://claude.ai/install.sh
# 阅读后觉得安全再执行
curl -fsSL https://claude.ai/install.sh | bash
```

#### Q28：我的问题不在这里，怎么办？

**A20：这样做：**

1. ✅ 运行 `claude --help` 查看官方帮助
2. ✅ 查看日志文件：`~/.claude/logs/` 找错误信息
3. ✅ 访问官方文档：https://docs.claude.ai/code
4. ✅ GitHub搜索类似问题：https://github.com/anthropics/claude-code/issues
5. ✅ 把错误信息截图，在学习群里问老金！

**提问时请提供：**

- 操作系统和版本
- Claude Code版本（`claude --version`）
- 完整错误信息（截图或复制文字）
- 你做了什么操作
