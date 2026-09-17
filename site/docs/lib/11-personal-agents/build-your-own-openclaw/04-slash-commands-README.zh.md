---
title: "步骤 04：斜杠命令"
sourceId: "11-personal-agents/build-your-own-openclaw"
sourceTitle: "Build Your Own OpenClaw"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/czl9707/build-your-own-openclaw"
entryUrl: "https://github.com/czl9707/build-your-own-openclaw/blob/37ae5dd255a0451609e67ad6d6a51fa5de80523c/04-slash-commands/README.zh.md"
sourceRel: "04-slash-commands/README.zh.md"
rawUrl: "/raw/11-personal-agents/build-your-own-openclaw/04-slash-commands/README.zh.md"
sourceSha256: "62c6879b8a3b9b9c5a1afd6fb4de9b9f72fc9e6a417d9b8ea153cf77cf948337"
pageSha256: "62c6879b8a3b9b9c5a1afd6fb4de9b9f72fc9e6a417d9b8ea153cf77cf948337"
contentMode: "local-full"
zh: ""
---

# 步骤 04：斜杠命令

> 直接控制会话。

## 前置条件

与步骤 00 相同 - 复制配置文件并添加你的 API 密钥：

```bash
cp default_workspace/config.example.yaml default_workspace/config.user.yaml
# 编辑 config.user.yaml 添加你的 API 密钥
```

## 这节做什么

在聊天里输入 `/help`、`/skills`、`/session` 这类命令，直接执行确定性的功能。

### 架构

<img src="/mirror/7d/7d2f0afc179e31961f02c46fb03f05a2425190ce.svg" align="center" width="100%" />

## 关键组件

- **Command**：斜杠命令的基类（异步 execute 方法）
- **CommandRegistry**：注册和派发命令
- **Commands**：`/help`、`/skills`、`/session`

[src/mybot/core/commands/base.py](https://github.com/czl9707/build-your-own-openclaw/blob/37ae5dd255a0451609e67ad6d6a51fa5de80523c/04-slash-commands/src/mybot/core/commands/base.py) - 新文件

```python
class Command(ABC):
    """Base class for slash commands."""

    name: str
    aliases: list[str] = []
    description: str = ""

    @abstractmethod
    async def execute(self, args: str, session: "AgentSession") -> str:
        """Execute the command and return response string."""
        pass
```

[src/mybot/core/commands/registry.py](https://github.com/czl9707/build-your-own-openclaw/blob/37ae5dd255a0451609e67ad6d6a51fa5de80523c/04-slash-commands/src/mybot/core/commands/registry.py) - 新文件

```python
class CommandRegistry:
    def register(self, cmd: Command) -> None:
        """Register a command and its aliases."""

    async def dispatch(self, input: str, session: "AgentSession") -> str | None:
        """Parse and execute a slash command. Returns None if not a command."""
```

[src/mybot/cli/chat.py](https://github.com/czl9707/build-your-own-openclaw/blob/37ae5dd255a0451609e67ad6d6a51fa5de80523c/04-slash-commands/src/mybot/cli/chat.py) - 添加命令分发

```python
 async def run(self) -> None:
        # ... Say Hello
        while True:
            # ... Get user input

            # Check for slash commands
            cmd_response = await self.session.command_registry.dispatch(
                user_input, self.session
            )
            if cmd_response is not None:
                self.console.print(cmd_response)
                continue

            # Normal chat
            response = await self.session.chat(user_input)
            self.display_agent_response(response)

```

## 设计选择

斜杠命令要不要写进会话历史？两种都行：
- 不写：命令是控制，不是对话
- 写：方便回溯做了什么操作

看你的场景选。

## 试一试

```bash
cd 04-slash-commands
uv run my-bot chat

# Try the commands:
# You: /help
# **Available Commands:**
# /help, /? - Show available commands
# /skills - List all skills or show skill details
# /session - Show current session details

# You: /session
# **Session ID:** `abc123...`
# **Agent:** Pickle (pickle)
# **Created:** 2026-03-08T12:00:00
# **Messages:** 0
```

## 下一步

[步骤 05：压缩](/lib/11-personal-agents/build-your-own-openclaw/05-compaction) - 继续聊天...
