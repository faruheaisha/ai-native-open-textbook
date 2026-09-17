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
sourceRel: "en/skills.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/skills.md"
sourceSha256: "6cb66d6c1ab6b06eda6dd6854f4133901c8daef8fc447f59fe65ac4038ec8043"
pageSha256: "c97299aa535ee3c203030e2320ffc3ac1e6f21f49ad30abdb10b7615aad3dd62"
contentMode: "local-full"
zh: ""
---

## Getting started

### Create your first skill

This example creates a skill that summarizes the uncommitted changes in your git repository and flags anything risky. It pulls the live diff into the prompt before Claude reads it, so the response is grounded in your actual working tree rather than what Claude can guess from open files. Claude loads the skill automatically when you ask about your changes, or you can invoke it directly with `/summarize-changes`.

    Create a directory for the skill in your personal skills folder. Personal skills are available across all your projects.

    ```bash theme=\{null\}
    mkdir -p ~/.claude/skills/summarize-changes
    ```

    Every skill needs a `SKILL.md` file with two parts: YAML frontmatter between `---` markers that tells Claude when to use the skill, and markdown content with the instructions Claude follows when the skill runs. The directory name becomes the command you type, and the `description` helps Claude decide when to load the skill automatically.

    Save this to `~/.claude/skills/summarize-changes/SKILL.md`:

    ```yaml theme=\{null\}
    ---
    description: Summarizes uncommitted changes and flags anything risky. Use when the user asks what changed, wants a commit message, or asks to review their diff.
    ---

    ## Current changes

    !`git diff HEAD`

    ## Instructions

    Summarize the changes above in two or three bullet points, then list any risks you notice such as missing error handling, hardcoded values, or tests that need updating. If the diff is empty, say there are no uncommitted changes.
    ```

    The `` !`git diff HEAD` `` line uses [dynamic context injection](#inject-dynamic-context): Claude Code runs the command and replaces the line with its output before Claude sees the skill content, so the instructions arrive with the current diff already inlined.

    Open a git project, make a small edit to any file, and start Claude Code by running `claude`. You can test the skill two ways.

    **Let Claude invoke it automatically** by asking something that matches the description:

    ```text theme=\{null\}
    What did I change?
    ```

    **Or invoke it directly** with the skill name:

    ```text theme=\{null\}
    /summarize-changes
    ```

    Either way, Claude should respond with a short summary of your edit and a list of risks.

<h2 id="where-skills-live">
  Choose where skills load
</h2>

Where you save a skill decides which sessions load it. Save it under your home directory to get it in every project, commit it to a repository to share it with everyone who works there, or distribute it through a plugin or managed settings to reach a whole team.

| Location             | Path                                                                                                                 | Loads in                                                                                                                                                                                                |
| :------------------- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
