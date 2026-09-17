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
pageSha256: "069d02e3b0f3e4f0bb7f996830e1b15c6943d6ea5129b4a6b98ef367768d6baa"
contentMode: "local-full"
zh: ""
---

## Interactive Features

### Keyboard Shortcuts

Claude Code supports keyboard shortcuts for efficiency. Here's the complete reference from official docs:

| Shortcut | Description |
|----------|-------------|
| `Ctrl+C` | Cancel current input/generation |
| `Ctrl+D` | Exit Claude Code |
| `Ctrl+G` | Edit plan in external editor |
| `Ctrl+L` | Redraw the screen (repaint only — the double-press `/clear` shortcut was removed in v2.1.238) |
| `Ctrl+O` | Toggle verbose output (view reasoning) |
| `Ctrl+R` | Reverse search history. Defaults to **all prompts across all projects** (v2.1.129+); press `Ctrl+S` inside the picker to narrow to the current project. Earlier versions defaulted to project-only. |
| `Ctrl+T` | Toggle task list view |
| `Ctrl+B` | Background running tasks |
| `Esc+Esc` | Rewind code/conversation |
| `Shift+Tab` / `Alt+M` | Toggle permission modes |
| `Option+P` / `Alt+P` | Switch model |
| `Option+T` / `Alt+T` | Toggle extended thinking |
| `Option+O` / `Alt+O` | Toggle fast mode (`/fast`) |
| `Ctrl+X` `Ctrl+K` | Stop all background subagents |
| `Ctrl+S` | Stash the current prompt; press again to restore it |
| `Ctrl+_` | Undo the last edit to the prompt input |
| `:` | Type `:` at the start of a word to open emoji shortcode completion, e.g. `:heart:` (v2.1.217+) |

**Line Editing (standard readline shortcuts):**

| Shortcut | Action |
|----------|--------|
| `Ctrl + A` | Move to line start |
| `Ctrl + E` | Move to line end |
| `Ctrl + K` | Cut to end of line |
| `Ctrl + U` | Cut to start of line |
| `Ctrl + W` | Delete word backward |
| `Ctrl + Y` | Paste (yank) |
| `Tab` | Autocomplete |
| `↑ / ↓` | Command history |

### Accessibility

Screen reader mode (v2.1.208+) switches the CLI to a plain-text rendering mode designed for screen readers. Enable it with the CLI flag, an environment variable, or a settings key:

```bash
claude --ax-screen-reader
```

```bash
export CLAUDE_AX_SCREEN_READER=1
```

```json
{
  "axScreenReader": true
}
```

### Customizing keybindings

Create custom keyboard shortcuts by running `/keybindings`, which opens `~/.claude/keybindings.json` for editing (v2.1.18+).

**Configuration format**:

```json
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor",
        "ctrl+u": null,
        "ctrl+k ctrl+s": "chat:stash"
      }
    },
    {
      "context": "Confirmation",
      "bindings": {
        "ctrl+a": "confirmation:yes"
      }
    }
  ]
}
```

Set a binding to `null` to unbind a default shortcut.

### Available contexts

Keybindings are scoped to specific UI contexts:

| Context | Key Actions |
|---------|-------------|
| **Chat** | `submit`, `cancel`, `cycleMode`, `modelPicker`, `thinkingToggle`, `undo`, `externalEditor`, `stash`, `imagePaste` |
| **Confirmation** | `yes`, `no`, `previous`, `next`, `nextField`, `cycleMode`, `toggleExplanation` |
| **Global** | `interrupt`, `exit`, `toggleTodos`, `toggleTranscript` |
| **Autocomplete** | `accept`, `dismiss`, `next`, `previous` |
| **HistorySearch** | `search`, `previous`, `next` |
| **Settings** | Context-specific settings navigation |
| **Tabs** | Tab switching and management |
| **Help** | Help panel navigation |

There are 18 contexts total including `Transcript`, `Task`, `ThemePicker`, `Attachments`, `Footer`, `MessageSelector`, `DiffDialog`, `ModelPicker`, and `Select`.

### Chord support

Keybindings support chord sequences (multi-key combinations):

```
"ctrl+k ctrl+s"   → Two-key sequence: press ctrl+k, then ctrl+s
"ctrl+shift+p"    → Simultaneous modifier keys
```

**Keystroke syntax**:
- **Modifiers**: `ctrl`, `alt` (or `opt`), `shift`, `meta` (or `cmd`)
- **Uppercase implies Shift**: `K` is equivalent to `shift+k`
- **Special keys**: `escape`, `enter`, `return`, `tab`, `space`, `backspace`, `delete`, arrow keys

### Reserved and conflicting keys

| Key | Status | Notes |
|-----|--------|-------|
| `Ctrl+C` | Reserved | Cannot be rebound (interrupt) |
| `Ctrl+D` | Reserved | Cannot be rebound (exit) |
| `Ctrl+B` | Terminal conflict | tmux prefix key |
| `Ctrl+A` | Terminal conflict | GNU Screen prefix key |
| `Ctrl+Z` | Terminal conflict | Process suspend |

> **Tip**: If a shortcut does not work, check for conflicts with your terminal emulator or multiplexer.

### Tab Completion

Claude Code provides intelligent tab completion:

```
User: /rew<TAB>
→ /rewind

User: /plu<TAB>
→ /plugin

User: /plugin <TAB>
→ /plugin install
→ /plugin enable
→ /plugin disable
```

### Command History

Access previous commands:

```
User: <↑>  # Previous command
User: <↓>  # Next command
User: Ctrl+R  # Search history

(reverse-i-search)`test': run all tests
```

### Multi-line Input

For complex queries, use multi-line mode:

```bash
User: \
> Long complex prompt
> spanning multiple lines
> \end
```

**Example:**

```
User: \
> Implement a user authentication system
> with the following requirements:
> - JWT tokens
> - Email verification
> - Password reset
> - 2FA support
> \end

Claude: [Processes the multi-line request]
```

### Inline Editing

Edit commands before sending:

```
User: Deploy to prodcution<Backspace><Backspace>uction

[Edit in-place before sending]
```

### Vim Mode

Enable Vi/Vim keybindings for text editing:

**Activation**:
- Enable via `/config` (toggle "Editor / Vim mode") or in `~/.claude/settings.json` under `editorMode: "vim"`. The standalone `/vim` slash command was removed (see [issue #43370](https://github.com/anthropics/claude-code/issues/43370)); vim mode is now configuration-driven.
- Mode switching with `Esc` for NORMAL, `i/a/o` for INSERT, `v` for VISUAL, `V` for VISUAL-LINE (v2.1.118+)

**Navigation keys**:
- `h` / `l` - Move left/right
- `j` / `k` - Move down/up
- `w` / `b` / `e` - Move by word
- `0` / `$` - Move to line start/end
- `gg` / `G` - Jump to start/end of text

**Text objects**:
- `iw` / `aw` - Inner/around word
- `i"` / `a"` - Inner/around quoted string
- `i(` / `a(` - Inner/around parentheses

**Visual modes (v2.1.118+)**:

| Key | Mode | Behavior |
|-----|------|----------|
| `v` | Visual | Character-wise selection with visual feedback; extend with motion keys |
| `V` | Visual-line | Line-wise selection; always selects whole lines |
| `y` | Yank | Copy the current visual selection |
| `d` / `x` | Delete | Delete the current visual selection |
| `c` | Change | Delete selection and enter INSERT mode |
| `Esc` | Exit | Return to NORMAL mode |

Visual selections are highlighted in the input field so you can see exactly what will be yanked, deleted, or changed before you commit the operator.

### Bash Mode

Execute shell commands directly with `!` prefix:

```bash
! npm test
! git status
! cat src/index.js
```

Use this for quick command execution without switching contexts.

**Since v2.1.193:** bash mode (`!`) has live file-path autocomplete, so paths complete as you type your shell command without leaving the prompt.

**Since v2.1.186:** the output of a `!` command is now automatically sent to Claude, which responds to it. To keep the previous behavior where the output is only added to context without a response, set `"respondToBashCommands": false` in `settings.json`.
