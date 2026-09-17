---
title: "Step 04: Slash Commands"
sourceId: "11-personal-agents/build-your-own-openclaw"
sourceTitle: "Build Your Own OpenClaw"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/czl9707/build-your-own-openclaw"
entryUrl: "https://github.com/czl9707/build-your-own-openclaw/blob/37ae5dd255a0451609e67ad6d6a51fa5de80523c/04-slash-commands/README.md"
sourceRel: "04-slash-commands/README.md"
rawUrl: "/raw/11-personal-agents/build-your-own-openclaw/04-slash-commands/README.md"
sourceSha256: "6c6e8428b6715f7a614af208ff28bc3eb4a6196148d29b5f7330282b310bffa1"
pageSha256: "6c6e8428b6715f7a614af208ff28bc3eb4a6196148d29b5f7330282b310bffa1"
contentMode: "local-full"
zh: ""
---

# Step 04: Slash Commands

> Direct user control over sessions.

## Prerequisites

Same as Step 00 - copy the config file and add your API key:

```bash
cp default_workspace/config.example.yaml default_workspace/config.user.yaml
# Edit config.user.yaml to add your API key
```

## What We will Build?

Deterministic functionality invoked in chat, such as `/help`, `/skills`, and `/session` .

### Architecture

<img src="/mirror/7d/7d2f0afc179e31961f02c46fb03f05a2425190ce.svg" align="center" width="100%" />

## Key Components

- **Command**: Base class for slash commands (async execute method)
- **CommandRegistry**: Registers and dispatches commands
- **Commands**: `/help`, `/skills`, `/session`

[src/mybot/core/commands/base.py](https://github.com/czl9707/build-your-own-openclaw/blob/37ae5dd255a0451609e67ad6d6a51fa5de80523c/04-slash-commands/src/mybot/core/commands/base.py) - New file

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

[src/mybot/core/commands/registry.py](https://github.com/czl9707/build-your-own-openclaw/blob/37ae5dd255a0451609e67ad6d6a51fa5de80523c/04-slash-commands/src/mybot/core/commands/registry.py) - New file

```python
class CommandRegistry:
    def register(self, cmd: Command) -> None:
        """Register a command and its aliases."""

    async def dispatch(self, input: str, session: "AgentSession") -> str | None:
        """Parse and execute a slash command. Returns None if not a command."""
```

[src/mybot/cli/chat.py](https://github.com/czl9707/build-your-own-openclaw/blob/37ae5dd255a0451609e67ad6d6a51fa5de80523c/04-slash-commands/src/mybot/cli/chat.py) - Add command dispatch

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

## Notes

Slash commands may or may not be added to the session history (message log sent to the LLM). This is a design decision — commands are user controls, not conversation content. Either approach is valid. The choice depends on your use case.

## Try it out

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

## What's Next

[Step 05: Compaction](/lib/11-personal-agents/build-your-own-openclaw/05-compaction) - Keep Talking...
