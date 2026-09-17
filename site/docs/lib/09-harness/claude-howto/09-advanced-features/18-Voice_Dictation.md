---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "79cd0907cae101810840073ab7c9e1056fea5bc262c1e216c72ad14ba35cca4d"
contentMode: "local-full"
zh: ""
---

## Voice Dictation

Voice Dictation provides push-to-talk voice input for Claude Code, allowing you to speak your prompts instead of typing them.

### Activating Voice Dictation

```
/voice
```

### Features

| Feature | Description |
|---------|-------------|
| **Push-to-talk** | Hold a key to record, release to send |
| **20 languages** | Speech-to-text supports 20 languages |
| **Custom keybinding** | Configure the push-to-talk key via `/keybindings` |
| **Account requirement** | Requires a Claude.ai account for STT processing |

### Configuration

Customize the push-to-talk keybinding in your keybindings file (`/keybindings`). Voice dictation uses your Claude.ai account for speech-to-text processing.
