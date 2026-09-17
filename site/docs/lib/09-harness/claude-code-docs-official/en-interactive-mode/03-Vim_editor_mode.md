---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/interactive-mode.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/interactive-mode.md"
sourceSha256: "a43f4a145320ecff8da141c321f3220246884acb226285095ad0ff123ceb2b60"
pageSha256: "372b579983ac0c82907252a6c368ea5a3b417aaab01c0cfdf4a39bea06875723"
contentMode: "local-full"
zh: ""
---

## Vim editor mode

Enable vim-style editing via `/config` → Editor mode.

Claude Code keeps your vim mode and cursor position when you toggle the [transcript viewer](#transcript-viewer) with `Ctrl+O` or open and close a panel such as `/config`. If you leave the prompt in NORMAL mode, it's still in NORMAL mode when you return, with the cursor where you left it.

### Mode switching

| Command           | Action                                                                                                    | From mode      |
| :---------------- | :-------------------------------------------------------------------------------------------------------- | :------------- |
| `Esc` or `Ctrl+[` | Enter NORMAL mode. In terminals that use the Kitty keyboard protocol, `Ctrl+[` requires v2.1.242 or later | INSERT, VISUAL |
| `i`               | Insert before cursor                                                                                      | NORMAL         |
| `I`               | Insert at beginning of line                                                                               | NORMAL         |
| `a`               | Insert after cursor                                                                                       | NORMAL         |
| `A`               | Insert at end of line                                                                                     | NORMAL         |
| `o`               | Open line below                                                                                           | NORMAL         |
| `O`               | Open line above                                                                                           | NORMAL         |
| `v`               | Start character-wise visual selection                                                                     | NORMAL         |
| `V`               | Start line-wise visual selection                                                                          | NORMAL         |

### Remap INSERT-mode key sequences

The [`vimInsertModeRemaps`](https://code.claude.com/docs/en/settings-reference#viminsertmoderemaps) setting maps a two-key INSERT-mode sequence to Escape, so a mapping like `jj` returns you to NORMAL mode. Requires Claude Code v2.1.208 or later.

The following `~/.claude/settings.json` example turns on vim mode and maps `jj` to Escape:

```json theme={null}
{
  "editorMode": "vim",
  "vimInsertModeRemaps": { "jj": "<Esc>" }
}
```

Each key is exactly two printable characters typed in sequence, and `"<Esc>"` is the only supported target. Entries with a different length or target are ignored.

Typing the first character of a sequence inserts it normally. Pressing the second character within one second removes that pending character and switches to NORMAL mode, leaving neither character in your input. After the one-second window, or if a different key follows, both characters stay as literal text, so you can still type a word containing the sequence by pausing between the two keys.

Claude Code reads this setting from your user settings file, the `--settings` flag, and [managed settings](https://code.claude.com/docs/en/managed-settings) only. Entries in a project's `.claude/settings.json` or `.claude/settings.local.json` are ignored, so a checked-out repository can't remap your keystrokes.

### Navigation (NORMAL mode)

| Command         | Action                                                                                                                                              |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `h`/`j`/`k`/`l` | Move left/down/up/right                                                                                                                             |
| `Space`         | Move right                                                                                                                                          |
| `w`             | Next word                                                                                                                                           |
| `e`             | End of word                                                                                                                                         |
| `b`             | Previous word                                                                                                                                       |
| `0`             | Beginning of line                                                                                                                                   |
| `$`             | End of line                                                                                                                                         |
| `^`             | First non-blank character                                                                                                                           |
| `gg`            | Beginning of input                                                                                                                                  |
| `G`             | End of input                                                                                                                                        |
| `f\{char\}`       | Jump to next occurrence of character                                                                                                                |
| `F\{char\}`       | Jump to previous occurrence of character                                                                                                            |
| `t\{char\}`       | Jump to just before next occurrence of character                                                                                                    |
| `T\{char\}`       | Jump to just after previous occurrence of character                                                                                                 |
| `;`             | Repeat last f/F/t/T motion                                                                                                                          |
| `,`             | Repeat last f/F/t/T motion in reverse                                                                                                               |
| `/`             | Open reverse history search, same as `Ctrl+R`. The empty search prompt shows a hint: press `Esc` then `i` then `/` to open the command menu instead |

  In vim NORMAL mode, if the cursor is at the beginning or end of input and can't move further, `j`/`k` and `↑`/`↓` navigate command history instead. `←` on an empty prompt opens [agent view](https://code.claude.com/docs/en/agent-view) from NORMAL mode as well as INSERT; before v2.1.219, `←` on an empty prompt did nothing in NORMAL mode.

### Editing (NORMAL mode)

| Command               | Action                                                                                                                    |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `x`                   | Delete character                                                                                                          |
| `dd`                  | Delete line                                                                                                               |
| `D`                   | Delete to end of line                                                                                                     |
| `dw`/`de`/`db`        | Delete word/to end/back                                                                                                   |
| `df\{char\}`/`dt\{char\}` | Delete to and including, or up to, the next occurrence of a character                                                     |
| `cc`                  | Change line                                                                                                               |
| `C`                   | Change to end of line                                                                                                     |
| `cw`/`ce`/`cb`        | Change word/to end/back                                                                                                   |
| `s`                   | Substitute character: delete the character under the cursor and enter INSERT mode. Requires Claude Code v2.1.211 or later |
| `S`                   | Substitute line: clear the line and enter INSERT mode. Requires Claude Code v2.1.211 or later                             |
| `yy`/`Y`              | Yank (copy) line                                                                                                          |
| `yw`/`ye`/`yb`        | Yank word/to end/back                                                                                                     |
| `p`                   | Paste after cursor                                                                                                        |
| `P`                   | Paste before cursor                                                                                                       |
| `>>`                  | Indent line                                                                                                               |
| `<<`                  | Dedent line                                                                                                               |
| `J`                   | Join lines                                                                                                                |
| `u`                   | Undo                                                                                                                      |
| `.`                   | Repeat last change                                                                                                        |

### Text objects (NORMAL mode)

Text objects work with operators like `d`, `c`, and `y`:

| Command   | Action                                   |
| :-------- | :--------------------------------------- |
| `iw`/`aw` | Inner/around word                        |
| `iW`/`aW` | Inner/around WORD (whitespace-delimited) |
| `i"`/`a"` | Inner/around double quotes               |
| `i'`/`a'` | Inner/around single quotes               |
| `i(`/`a(` | Inner/around parentheses                 |
| `i[`/`a[` | Inner/around brackets                    |
| `i\{`/`a\{` | Inner/around braces                      |

### Visual mode

Press `v` for character-wise selection or `V` for line-wise selection. Motions extend the selection, and operators act on it directly.

| Command          | Action                                               |
| :--------------- | :--------------------------------------------------- |
| `d`/`x`          | Delete selection                                     |
| `y`              | Yank selection                                       |
| `c`/`s`          | Change selection                                     |
| `p`              | Replace selection with register contents             |
| `r\{char\}`        | Replace every selected character with `\{char\}`       |
| `~`/`u`/`U`      | Toggle, lowercase, or uppercase selection            |
| `>`/`<`          | Indent or dedent selected lines                      |
| `J`              | Join selected lines                                  |
| `o`              | Swap cursor and anchor                               |
| `iw`/`aw`/`i"`/… | Select a text object                                 |
| `v`/`V`          | Toggle between character-wise and line-wise, or exit |

Block-wise visual mode with `Ctrl+V` is not supported.
