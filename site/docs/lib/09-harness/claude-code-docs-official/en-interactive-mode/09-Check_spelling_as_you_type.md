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
pageSha256: "7a2b310abcb9f143b79994d3d1ae5a8447162a857ea137d4e45794f674b92657"
contentMode: "local-full"
zh: ""
---

## Check spelling as you type

Claude Code can underline misspelled words in the prompt input while you type. It checks only the text in the input box, never Claude's replies or your files. It also checks nothing while the input box is in [shell mode](#shell-mode-with-prefix), `Ctrl+R` history search, or [voice dictation](https://code.claude.com/docs/en/voice-dictation).

Spell checking is off by default, and Claude Code checks nothing in [screen reader mode](https://code.claude.com/docs/en/accessibility). Requires Claude Code v2.1.235 or later.

### Prerequisites

* Install [aspell](https://github.com/GNUAspell/aspell), [hunspell](https://github.com/hunspell/hunspell), or [ispell](https://en.wikipedia.org/wiki/Ispell) and make sure it's on your `PATH`. Claude Code runs the first of the three it finds, in that order, on every platform, including a `.cmd` shim a package manager installs on Windows.
* To check that the program is on your `PATH`, run `aspell --version`, `hunspell --version`, or `ispell -v` in your terminal. A "command not found" error means it isn't on your `PATH` yet.

### Turn spell checking on or off

Claude Code reads the [`spellcheck`](https://code.claude.com/docs/en/settings-reference#spellcheck) setting from three places, and ignores it in a project's `.claude/settings.json` and `.claude/settings.local.json`. Turn it on from whichever one you use:

    Add `spellcheck` to `~/.claude/settings.json`. It applies in every project you open, like the rest of your [user settings](https://code.claude.com/docs/en/settings#where-settings-live):

    ```json theme=\{null\}
    \{
      "spellcheck": \{ "enabled": true \}
    \}
    ```

    Save `spellcheck` in a JSON file, such as `spellcheck.json`:

    ```json theme=\{null\}
    \{
      "spellcheck": \{ "enabled": true \}
    \}
    ```

    Then pass the file to `--settings`. It applies to that session only:

    ```bash theme=\{null\}
    claude --settings spellcheck.json
    ```

    Add `spellcheck` to one of your organization's [managed settings sources](https://code.claude.com/docs/en/permissions#managed-settings). It applies to every user who receives those settings, and they can't turn it off:

    ```json theme=\{null\}
    \{
      "spellcheck": \{ "enabled": true \}
    \}
    ```

To check that spell checking is on, type a misspelled word and a space. Claude Code underlines the word. If it doesn't, see [When Claude Code underlines nothing](#when-claude-code-underlines-nothing). To turn spell checking off again, set `enabled` to `false` in the same place, or remove `spellcheck`.

To choose which of the three programs Claude Code runs, which dictionary it uses, or the underline color, add any of these fields next to `enabled`, in the same place:

* `checker`: `aspell`, `hunspell`, or `ispell`. Claude Code doesn't fall back from a checker you name, and treats any other value as `auto`.
* `language`: a dictionary name in your checker's form, such as `en_GB`. Claude Code ignores any value that isn't a plain dictionary name, such as a path or a name with spaces, and the checker uses its default dictionary.
* `color`: a color name such as `yellow`, or a `#rrggbb`, `#rgb`, `rgb(r,g,b)`, `ansi256(n)`, or `ansi:<name>` value. Claude Code uses your theme's error color by default and for any value it doesn't recognize.

For example, this `spellcheck` setting runs hunspell with its `en_GB` dictionary and underlines words in yellow. It works the same in `~/.claude/settings.json`, in the file you pass to `--settings`, and in managed settings:

```json theme={null}
{
  "spellcheck": {
    "enabled": true,
    "checker": "hunspell",
    "language": "en_GB",
    "color": "yellow"
  }
}
```

If more than one of the three places has a `spellcheck` setting, Claude Code uses only one of them: managed settings first, then `--settings`, then user settings. It doesn't combine fields from two places. For example, when `--settings` sets `spellcheck`, a `language` in your user settings has no effect.

### What Claude Code underlines

Shortly after you pause typing, Claude Code underlines the words the dictionary doesn't know. It leaves the word you're still typing alone until you move past it, and it never changes your text. It also skips text that looks like code:

* Commands such as `/help`, `@` mentions, URLs, file paths, and flags such as `--verbose`
* Words with digits, underscores, or a capital letter after the first, and text in backticks

Claude Code also skips Chinese, Japanese, Korean, Thai, Lao, Khmer, and Myanmar text.

Claude Code has no word list of its own: a word is misspelled when your checker says so. To stop Claude Code from underlining a word, add the word to your checker's personal dictionary, following the checker's own documentation. Claude Code picks up the new word after you restart it.

### When Claude Code underlines nothing

Claude Code underlines nothing when it can't keep a checker running:

* No checker is installed, or the one you named in `checker` is missing
* The checker fails twice in a row, at startup or later in the session. Claude Code restarts it after the first failure and stops checking after the second, until you restart Claude Code
* The checker takes more than 15 seconds to answer, three times. Each time, Claude Code leaves the words it was waiting on unmarked; after the third, it stops checking until you restart Claude Code
