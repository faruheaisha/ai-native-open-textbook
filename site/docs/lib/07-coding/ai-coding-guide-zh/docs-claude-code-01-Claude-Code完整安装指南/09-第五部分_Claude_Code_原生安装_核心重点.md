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
pageSha256: "92ae0998dacb3f0ad393f101d115f089249a61cdeb7f9ab339aa294205a6efb4"
contentMode: "local-full"
zh: ""
---

> 💡 **本部分目标**：一行命令完成安装，5分钟搞定！
> ⏱️ **预计时间**：3-5分钟

### 5.1 安装方式概览

**原生安装提供3种方式**，任选其一即可：

| 安装方式       | 适用平台           | 命令                          | 推荐度 |
| -------------- | ------------------ | ----------------------------- | ------ |

> 💡 **推荐**：
> - **Windows用户**：用PowerShell（最简单）
> - **Mac用户**：用脚本安装或Homebrew（都很快）
> - **Linux用户**：用脚本安装
> - **原生安装失败？**：试试 NPM 方式（见方式4），虽然官方标记为废弃，但仍然可以正常使用

---

### 5.2 方式1：脚本安装（推荐 - 跨平台）

#### macOS / Linux / WSL 安装

**打开终端，复制粘贴以下命令：**

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**一行命令解释：**

| 部分                      | 作用                                   |
| ------------------------- | -------------------------------------- |
| `curl -fsSL`             | 下载安装脚本（-f失败继续，-s静默，-S显示错误，-L跟随重定向） |
| `https://claude.ai/install.sh` | Anthropic官方安装脚本地址              |
| `| bash`                 | 把下载的内容直接传给bash执行           |

**安装过程：**

```
[终端显示]
Downloading Claude Code...
Installing to /home/你的用户名/.local/bin/claude
✓ Installation complete!
✓ Added to PATH

Run 'claude --version' to verify.
```

**验证安装：**

```bash
claude --version
# 预期输出：Claude Code v2.1.x (native)
```

#### Windows PowerShell 安装

**步骤1：打开PowerShell**

- 按 `Win` 键
- 输入 `PowerShell`
- 按 `Ctrl + Shift + Enter`（以管理员身份运行）

**步骤2：执行安装命令**

```powershell
irm https://claude.ai/install.ps1 | iex
```

**命令解释：**

| 部分                        | 作用                           |
| --------------------------- | ------------------------------ |
| `irm`                       | `Invoke-RestMethod` 的别名，下载内容 |
| `https://claude.ai/install.ps1` | Windows安装脚本地址           |
| `| iex`                     | `| Invoke-Expression`，执行下载的脚本 |

**安装过程：**

```
[PowerShell显示]
Downloading Claude Code...
Installing to C:\Users\你的用户名\.local\bin\
✓ Installation complete!

Run 'claude --version' to verify.
```

> ⚠️ **重要提醒**：PowerShell 脚本安装完成后，**不会自动配置 PATH 环境变量**！你需要手动配置 PATH 才能在终端中直接使用 `claude` 命令。请继续阅读下方的 **PATH 环境变量配置** 章节。

---

### 5.3 方式2：Homebrew安装（macOS/Linux）

如果你是Mac用户且已经安装了Homebrew，这是最简单的方式：

```bash
brew install --cask claude-code
```

**优势：**
- ✅ Homebrew自动管理依赖
- ✅ 方便更新：`brew upgrade claude-code`
- ✅ 方便卸载：`brew uninstall claude-code`

**注意：** Homebrew安装**不会自动更新**，需要手动运行更新命令。

---

### 5.4 方式3：WinGet安装（Windows）

Windows 10/11用户可以使用WinGet包管理器：

```powershell
winget install Anthropic.ClaudeCode
```

**优势：**
- ✅ Windows原生包管理器
- ✅ 系统级安装
- ✅ 方便更新：`winget upgrade Anthropic.ClaudeCode`

---

### 5.5 方式4：NPM安装（标准兼容路径）

> ⚠️ **重要说明**：当前官方文档仍保留 `npm install -g @anthropic-ai/claude-code` 这条标准安装路径，只是对新环境更鼓励优先尝试原生安装。你可以把 npm 安装理解成“兼容性更广的标准入口”，而不是“已经不能用的旧方式”。

**前提条件**：需要先安装 [Node.js](https://nodejs.org/) 18 或更高版本。

```bash
# 检查 Node.js 版本（需要 18+）
node --version

# 通过 NPM 全局安装 Claude Code
npm install -g @anthropic-ai/claude-code
```

**各平台安装细节：**

**Windows（CMD 或 PowerShell）：**

```powershell
# 直接全局安装
npm install -g @anthropic-ai/claude-code

# 验证
claude --version
# 预期输出：Claude Code v2.1.x (npm)  ← 注意这里显示 npm 而非 native
```

**macOS/Linux：**

```bash
# 全局安装（不要用 sudo！）
npm install -g @anthropic-ai/claude-code

# 如果提示权限错误，修复 npm 全局目录权限
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc

# 然后重新安装
npm install -g @anthropic-ai/claude-code
```

**NPM 安装 vs 原生安装的区别：**

|--------|------------|-------------|
| 需要 Node.js | ❌ 不需要 | ✅ 需要 18+ |
| 自动更新 | ✅ 内置 | ❌ 需手动 `npm update -g` |
| 安装大小 | ~80MB | ~80MB + Node.js |
| 官方支持 | ✅ 当前更推荐 | ✅ 仍受支持 |
| 适合场景 | 所有用户 | 原生安装失败时的备选 |

> 💡 **建议**：如果你是全新环境，优先试原生安装；如果你本来就有稳定的 Node 18+ 环境，或者原生安装在你机器上受阻，npm 仍然是完全合理的选择。装好之后也可以随时通过 `claude install` 迁移到原生版本。

---

### 5.6 配置 PATH 环境变量（Windows 必读）

> 💡 **为什么需要配置 PATH？** Claude Code 通过 PowerShell 脚本安装后，可执行文件位于 `C:\Users\你的用户名\.local\bin\`，但该目录可能不在系统的 PATH 环境变量中。不配置 PATH，终端就找不到 `claude` 命令，会报 `'claude' 不是内部或外部命令` 的错误。

#### 方法1：PowerShell 命令配置（推荐）

```powershell
# 将 Claude Code 安装目录添加到用户 PATH 环境变量
[System.Environment]::SetEnvironmentVariable(
    'Path',
    [System.Environment]::GetEnvironmentVariable('Path', 'User') + ';' + "$env:USERPROFILE\.local\bin",
    'User'
)
```

> ⚠️ 配置完成后，**必须重启 PowerShell / CMD 窗口**才能生效！

**验证 PATH 是否配置成功：**

```powershell
# 重启终端后执行
claude --version
# 如果显示版本号（如 Claude Code v2.1.x (native)），说明配置成功
```

#### 方法2：通过系统设置（图形界面）

1. 按下 `Win + R` 打开"运行"对话框
2. 输入 `sysdm.cpl`，按回车，打开"系统属性"
3. 点击 **"高级"** 选项卡
4. 点击底部的 **"环境变量"** 按钮
5. 在 **"用户变量"** 区域找到 `Path`，双击编辑
6. 点击 **"新建"**，添加：`%USERPROFILE%\.local\bin`
7. 点击 **"确定"** 保存所有对话框
8. **重启所有终端窗口**

#### macOS / Linux 用户

脚本安装通常会自动将 `~/.local/bin` 添加到 PATH。如果安装后 `claude` 命令不可用，手动添加：

```bash
# 添加到 shell 配置文件（zsh 用户）
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# bash 用户
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

---

### 5.7 验证安装成功

**无论用哪种方式，安装完成后验证：**

```bash
# 检查版本
claude --version
# 预期输出：Claude Code v2.1.x (native)

# 检查帮助
claude --help
# 应该显示完整帮助信息

# 检查安装位置
where claude     # Windows
which claude     # macOS/Linux
```

**成功的标志：**
- ✅ 显示版本号（带 `native` 标识）
- ✅ 命令可以直接运行（不提示找不到命令）
- ✅ `--help` 能显示帮助信息

---

### 5.8 安装失败排查

#### 问题1：检查 PATH 环境变量配置是否正确

```
claude: command not found
# 或 Windows 上的：
'claude' 不是内部或外部命令
```

**原因**：PATH 环境变量未包含 Claude Code 安装目录

**排查步骤：**

```powershell
# 第一步：确认 claude 可执行文件存在
# Windows:
Test-Path "$env:USERPROFILE\.local\bin\claude.exe"
# 如果返回 True，说明安装成功，只是 PATH 没配

# macOS/Linux:
ls ~/.local/bin/claude
```

```powershell
# 第二步：检查 PATH 是否包含安装目录
# Windows:
$env:Path -split ';' | Select-String '.local'
# 如果没有输出，说明 PATH 未配置

# macOS/Linux:
echo $PATH | tr ':' '\n' | grep '.local'
```

**解决方案：** 按照上方 **5.6 配置 PATH 环境变量** 章节进行配置，然后**重启终端窗口**。

#### 问题2：权限被拒绝

```bash
Error: EACCES: permission denied
```

**解决方案：**

```bash
# macOS/Linux: 不需要sudo了！原生安装会安装到用户目录
# 如果还是提示权限，检查目录所有权
ls -la ~/.local/bin

# Windows: 以管理员身份运行PowerShell
```

#### 问题3：网络连接失败

```
Error: Failed to download
```

**解决方案：**

```bash
# 配置代理（如果使用代理）
export https_proxy=http://127.0.0.1:7890
export http_proxy=http://127.0.0.1:7890

# 然后重新运行安装命令
curl -fsSL https://claude.ai/install.sh | bash
```

#### 问题4：Windows SmartScreen拦截

```
Windows已保护你的电脑
```

**解决方案：**

1. 点击"更多信息"
2. 点击"仍要运行"
3. 原因：原生安装器由Anthropic签名，SmartScreen可能不认识新签名

---

### 5.9 卸载 Claude Code

**如果你需要卸载：**

**macOS/Linux:**

```bash
# 删除可执行文件
rm ~/.local/bin/claude

# 删除配置和数据（可选）
rm -rf ~/.claude
```

**Windows:**

```powershell
# 删除可执行文件
Remove-Item -Force "$env:USERPROFILE\.local\bin\claude.exe"

# 删除配置和数据（可选）
Remove-Item -Recurse -Force "$env:USERPROFILE\.claude"

# 从 PATH 中移除安装目录（可选）
# 通过 系统属性 → 环境变量 → 用户变量 Path → 删除 %USERPROFILE%\.local\bin
```

**Homebrew卸载：**

```bash
brew uninstall --cask claude-code
```

**WinGet卸载：**

```powershell
winget uninstall Anthropic.ClaudeCode
```
