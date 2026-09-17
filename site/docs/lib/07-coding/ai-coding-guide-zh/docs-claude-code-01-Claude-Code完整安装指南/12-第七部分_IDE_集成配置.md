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
pageSha256: "5727a4663e6b982a114121dca079f94a0ed31d406052ed060a10e1a790fd571d"
contentMode: "local-full"
zh: ""
---

## 第七部分：IDE 集成配置

> ⚠️ **重要提示**：这部分是**可选的高级配置**！
>
> **前置条件**：第6部分的Hello World验证必须成功，否则别急着配置IDE！
>
> **适合人群**：
> - ✅ 已经成功启动Claude Code并完成Hello World测试
> - ✅ 想在VS Code/Cursor里更方便地使用Claude Code
> - ✅ 愿意花30分钟配置快捷键和任务
>
> **如果你只想用终端命令**：可以跳过这部分，直接用 `claude` 命令就够了！

### 7.1 VS Code 完整集成方案

> 💡 **这一节讲什么**：配置VS Code/Cursor编辑器，让它能完美运行Claude Code命令。配置后你就能在编辑器里一键调用AI助手了。

#### 步骤1：VS Code基础配置

首先确保VS Code已安装最新版本：

```bash
# 检查VS Code版本
code --version

# 如果未安装，访问：https://code.visualstudio.com/
```

> ⚠️ **Cursor用户注意**：Cursor是基于VS Code魔改的编辑器，所有VS Code的配置在Cursor里都能用！如果你用Cursor，把下面的"VS Code"理解成"Cursor"就行。

#### 步骤2：配置集成终端

**这是什么？**
"集成终端"就是编辑器下方那个黑框框（或白框框），用来运行命令的地方。配置它就是告诉编辑器："用哪个翻译器来执行我的命令"。

**为什么要配置？**
不配置的话，编辑器可能用错误的"翻译器"（Shell），导致命令运行失败或报错。

**操作方法：**
打开设置（`Ctrl/Cmd + ,`），点击右上角"打开设置(JSON)"，添加：

```json
{
  // ==========================================
  // 终端配置（告诉编辑器用哪个"翻译器"）
  // ==========================================

  // Windows用户 → 用PowerShell（Windows推荐的命令行工具）
  "terminal.integrated.defaultProfile.windows": "PowerShell",

  // Mac用户 → 用zsh（Mac 2019年后的默认Shell，比bash更现代）
  "terminal.integrated.defaultProfile.osx": "zsh",

  // Linux用户 → 用bash（Linux通用Shell）
  "terminal.integrated.defaultProfile.linux": "bash",

  // ==========================================
  // PowerShell 7配置（Windows推荐）
  // ==========================================
  // 指定用PowerShell 7而不是老版PowerShell 5.1
  // PowerShell 7功能更强大，跨平台，推荐使用
  "terminal.integrated.profiles.windows": {
    "PowerShell": {
      "source": "PowerShell",
      "icon": "terminal-powershell",
      "path": "pwsh.exe"  // pwsh.exe = PowerShell 7
    }
  },

  // ==========================================
  // 终端外观配置（让终端更好看）
  // ==========================================
  "terminal.integrated.fontFamily": "Menlo, Monaco, 'Courier New', monospace",
  "terminal.integrated.fontSize": 13,  // 13号字体，比默认稍大，更舒适

  // ==========================================
  // Claude Code专用配置
  // ==========================================
  // 让CLAUDE.md文件有Markdown语法高亮
  "files.associations": {
    "CLAUDE.md": "markdown"
  },

  // ==========================================
  // 自动保存（强烈推荐！）
  // ==========================================
  "files.autoSave": "afterDelay",  // 编辑后自动保存，不怕忘记保存丢失改动
  "files.autoSaveDelay": 1000      // 延迟1秒（1000毫秒）保存
}
```

> 💡 **配置说明（小白版）**：
>
> | 配置项                     | 人话翻译            | 为啥要配               |
> | -------------------------- | ------------------- | ---------------------- |
> | `defaultProfile.windows` | Windows用PowerShell | 确保命令能正常运行     |
> | `defaultProfile.osx`     | Mac用zsh            | Mac最新系统的默认Shell |
> | `defaultProfile.linux`   | Linux用bash         | Linux通用Shell         |
> | `profiles.windows`       | 用PowerShell 7      | 比老版更强大           |
> | `fontSize: 13`           | 终端字体13号        | 比默认大一点，看着舒服 |
> | `CLAUDE.md`              | 识别Claude配置文件  | 有语法高亮，好编辑     |
> | `autoSave`               | 自动保存            | 不怕忘记保存丢失改动   |
>
> **生活类比**：把电脑想象成一家国际餐厅
>
> - **中文服务员** = zsh（Mac专用）
> - **英文服务员** = PowerShell（Windows专用）
> - **通用服务员** = bash（大家都能用）
>
> 这个配置就是在告诉餐厅："我需要中文服务员/英文服务员来服务"。

**验证配置是否生效：**

1. 按 ``Ctrl + ` ``（Esc键下面那个键）打开终端
2. 运行验证命令：

**Windows用户：**

```powershell
# 查看PowerShell版本
$PSVersionTable.PSVersion
# 预期输出：显示版本号，比如 7.4.0
```

**Mac/Linux用户：**

```bash
# 查看当前Shell类型
echo $SHELL
# 预期输出Mac：/bin/zsh
# 预期输出Linux：/bin/bash
```

如果显示正确 → ✅ 配置成功！

#### 步骤3：创建VS Code任务（可选但推荐）

**这是什么？**
"任务（Task）"就是把常用命令做成一键按钮。比如"启动Claude Code"、"审查当前文件"这些操作，不用每次手敲命令，点一下就能执行。

**为什么要创建？**
类比：不用任务 = 每次都要手动打开微信；用任务 = 桌面有微信图标，一键打开。

**操作方法：**
在项目根目录创建 `.vscode/tasks.json`：

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Claude Code: 启动交互模式",
      "type": "shell",
      "command": "claude",
      "problemMatcher": [],
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": true,
        "panel": "dedicated",
        "clear": true
      }
    },
    {
      "label": "Claude Code: 审查当前文件",
      "type": "shell",
      "command": "claude \"Review ${relativeFile} and suggest improvements\"",
      "problemMatcher": []
    },
    {
      "label": "Claude Code: 解释当前文件",
      "type": "shell",
      "command": "claude \"Explain what ${relativeFile} does\"",
      "problemMatcher": []
    },
    {
      "label": "Claude Code: 生成测试",
      "type": "shell",
      "command": "claude \"Generate unit tests for ${relativeFile}\"",
      "problemMatcher": []
    }
  ]
}
```

**使用任务：**

**方法1：命令面板（推荐）**

1. 按 `Ctrl/Cmd + Shift + P`（打开命令面板）
2. 输入：`Tasks: Run Task`
3. 选择你要运行的任务，比如"Claude Code: 启动交互模式"

**方法2：菜单操作**
点击菜单 `Terminal → Run Task...`

> 💡 **任务说明**：
>
> | 任务名称     | 作用                 | 使用场景         |
> | ------------ | -------------------- | ---------------- |
> | 启动交互模式 | 一键启动Claude Code  | 开始编程前       |
> | 审查当前文件 | 让Claude检查代码质量 | 写完代码想优化时 |
> | 解释当前文件 | 让Claude解释代码逻辑 | 看不懂别人代码时 |
> | 生成测试     | 自动生成单元测试     | 需要写测试时     |

#### 步骤4：配置快捷键（可选）

**这是什么？**
给刚才创建的"任务"绑定键盘快捷键，比如按 `Ctrl+Shift+C` 就能启动Claude Code，连菜单都不用点。

**为什么要配置？**
更快！按一个键盘快捷键 vs 打开菜单找任务，哪个快？当然是快捷键！

**操作方法：**
创建或编辑 `.vscode/keybindings.json`：

```json
[
  {
    "key": "ctrl+shift+c",  // 快捷键：Ctrl+Shift+C
    "command": "workbench.action.tasks.runTask",
    "args": "Claude Code: 启动交互模式"  // 执行哪个任务
  },
  {
    "key": "ctrl+shift+r",  // 快捷键：Ctrl+Shift+R
    "command": "workbench.action.tasks.runTask",
    "args": "Claude Code: 审查当前文件"
  },
  {
    "key": "ctrl+shift+e",  // 快捷键：Ctrl+Shift+E
    "command": "workbench.action.tasks.runTask",
    "args": "Claude Code: 解释当前文件"
  }
]
```

> 💡 **快捷键说明**：
>
> | 快捷键           | 执行任务        | 记忆方法    |
> | ---------------- | --------------- | ----------- |
> | `Ctrl+Shift+C` | 启动Claude Code | C = Claude  |
> | `Ctrl+Shift+R` | 审查当前文件    | R = Review  |
> | `Ctrl+Shift+E` | 解释当前文件    | E = Explain |
>
> ⚠️ **Mac用户**：把 `ctrl` 改成 `cmd` 即可

### 7.2 Cursor 编辑器集成

**Cursor是什么？**
Cursor是基于VS Code魔改的AI编辑器，自带AI助手。和Claude Code配合使用，效果更好！

**Cursor独特优势：**

- ✓ 内置AI对话面板（不用切换工具）
- ✓ AI代码补全（边写边提示）
- ✓ 与Claude Code互补而非冲突（两个AI工具不打架）

> 💡 **重要提示**：Cursor的所有配置和VS Code**完全相同**！上面第7.1节的配置，在Cursor里一字不差地照搬就行。

**唯一不同：打开设置文件的方法**

Cursor界面和VS Code略有不同，打开设置JSON文件的方法如下：

#### 方法 A：用命令面板打开（最推荐）

**步骤：**

1. 在 Cursor 按 `Ctrl + Shift + P`（打开命令面板）
2. 输入：`open user settings`（不区分大小写）
3. 选择：**Preferences: Open User Settings (JSON)** 或中文：**首选项: 打开用户设置(JSON)**
4. 自动打开 `settings.json` 文件

**打开快捷键配置同理：**

- 输入：`open keyboard shortcuts`
- 选择：**Preferences: Open Keyboard Shortcuts (JSON)** 或中文：**首选项: 打开键盘快捷方式(JSON)**

---

#### 方法 B：直接打开文件路径（万能方法）

如果方法A找不到菜单（Cursor版本不同可能有差异），用这个方法**通常有效**：

**步骤：**

1. 在 Cursor 按 `Ctrl + P`（快速打开文件）
2. 粘贴下面对应你系统的路径，按回车：

**Windows系统：**

```
C:\Users\你的用户名\AppData\Roaming\Cursor\User\settings.json
```

**Mac系统：**

```
~/Library/Application Support/Cursor/User/settings.json
```

> ⚠️ **注意**：把"你的用户名"改成你电脑的实际用户名！比如你的用户名是 `admin`，路径就是 `C:\Users\admin\AppData\...`

---

**配置完成后，Cursor就能完美运行Claude Code了！**

Cursor的配置与VS Code完全相同，如果上面VSCode中配置过，可以直接复用上面的配置：

```bash
# 将VS Code配置复制到Cursor
# macOS/Linux:
cp -r ~/project/.vscode ~/project/.cursor

# Windows:
xcopy /E /I %USERPROFILE%\project\.vscode %USERPROFILE%\project\.cursor
```

**推荐工作流：**

| 场景         | 使用工具     | 原因             |
| ------------ | ------------ | ---------------- |
| 快速代码补全 | Cursor内置AI | 快速，无需切换   |
| 复杂逻辑重构 | Claude Code  | 更强推理能力     |
| 代码审查     | Claude Code  | 更全面上下文理解 |
| 生成测试     | Claude Code  | 更完整测试覆盖   |

### 7.3 JetBrains IDEs 集成

适用于WebStorm、PyCharm、IntelliJ IDEA等。

#### 步骤1：配置External Tools

1. 打开设置：

   - Windows/Linux: `File → Settings → Tools → External Tools`
   - macOS: `Preferences → Tools → External Tools`
2. 点击 `+` 添加新工具：

**Tool 1：Claude Code交互模式**

| 字段              | 值                   |
| ----------------- | -------------------- |
| Name              | Claude Code          |
| Program           | claude               |
| Arguments         | （留空）             |
| Working directory | `$ProjectFileDir$` |

**Tool 2：审查当前文件**

| 字段              | 值                                               |
| ----------------- | ------------------------------------------------ |
| Name              | Claude: Review File                              |
| Program           | claude                                           |
| Arguments         | `"Review $FilePath$ and suggest improvements"` |
| Working directory | `$ProjectFileDir$`                             |

#### 步骤2：配置快捷键

1. `Settings → Keymap`
2. 搜索 `External Tools`
3. 右键 → `Add Keyboard Shortcut`
4. 设置快捷键（如 `Ctrl+Shift+C`）
