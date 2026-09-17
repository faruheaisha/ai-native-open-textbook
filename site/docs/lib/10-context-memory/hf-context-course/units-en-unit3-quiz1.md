---
title: "Quiz 1: Plugin Fundamentals"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/units/en/unit3/quiz1.mdx"
sourceRel: "units/en/unit3/quiz1.mdx"
rawUrl: "/raw/10-context-memory/hf-context-course/units/en/unit3/quiz1.mdx"
sourceSha256: "8d891c1902e354fdc0e8b7c9c89c7a07d5b89c7de1b791284bd722149a92bc4b"
pageSha256: "8d891c1902e354fdc0e8b7c9c89c7a07d5b89c7de1b791284bd722149a92bc4b"
contentMode: "local-full"
zh: ""
---

# Quiz 1: Plugin Fundamentals

Test your understanding of plugins, their anatomy, and how they differ across platforms.

## Question 1: What is a plugin?

**选项**

- A. A plugin is a single reusable workflow, like calculating ROI
- B. A plugin is a collection of tools that provides standardized access to external APIs
- C. A plugin is a reusable extension surface; Claude Code and Codex use plugin bundles, while OpenCode plugins are code modules loaded from files or npm
- D. A plugin is a text file that describes how to use an agent tool

**答案解析**

- **A** — That's a skill, not a plugin. A plugin is the larger extension surface around reusable behavior.
- **B** — That's an MCP server. Plugins are a broader extension surface than MCP alone.
- **C（正确答案）** — Correct! The exact shape depends on the platform. Claude Code and Codex are manifest-first, while OpenCode plugins are code-first.
- **D** — That sounds like documentation, not a plugin. Plugins are actual packages with executable components.

## Question 2: What does `plugin.json` do?

**选项**

- A. For Claude Code and Codex, plugin.json tells the agent the plugin's identity and where to find bundled components
- B. plugin.json is just documentation describing what's in the plugin
- C. plugin.json is a list of all the API endpoints the plugin can access
- D. plugin.json is automatically generated and doesn't need to be written manually

**答案解析**

- **A（正确答案）** — Correct! On manifest-first platforms, plugin.json identifies the plugin and points to skills, MCP config, or app integrations. OpenCode does not use this manifest model.
- **B** — It's more than documentation — it's structured metadata that agents parse to discover and load plugin components.
- **C** — No, that would be part of an MCP server definition or app integration config, not the plugin manifest.
- **D** — You write the manifest to define your plugin's identity. Some tools (like Codex's $plugin-creator) can scaffold it for you, but the file still matters.

## Question 3: How do manifest-first plugins differ by platform?

**选项**

- A. Claude Code uses .claude-plugin/plugin.json; Codex uses .codex-plugin/plugin.json; both place skills/ at the plugin root
- B. All platforms use the exact same manifest.json format at the plugin root
- C. Only Codex supports plugin marketplaces
- D. Claude Code and Codex plugins are fully interchangeable

**答案解析**

- **A（正确答案）** — Correct! Both platforms use a similar pattern (manifest in a hidden directory, skills at root) but with platform-specific directory names.
- **B** — False. Claude Code uses .claude-plugin/plugin.json, Codex uses .codex-plugin/plugin.json. The schemas also differ.
- **C** — False. Both Claude Code and Codex support marketplace distribution. Claude Code uses the Anthropic marketplace; Codex uses .agents/plugins/marketplace.json.
- **D** — Not directly. While both can bundle skills and MCP servers, the manifest schemas and installation mechanisms differ.

## Question 4: How do skills and MCP servers fit inside a plugin?

**选项**

- A. In Claude Code and Codex, a plugin can only contain skills OR MCP servers, not both
- B. In Claude Code and Codex, skills are human-readable workflows; MCP servers provide programmatic tool access
- C. Skills and MCP servers do the same thing; you only need one
- D. Only Claude Code plugins use skills; Codex plugins only use MCP servers

**答案解析**

- **A** — False. Manifest-first plugins can combine skills, MCP servers, and other components.
- **B（正确答案）** — Correct! Skills describe how to accomplish tasks; MCP servers provide standardized tool interfaces for agents to call.
- **C** — False. Skills describe *how* to do something; MCP servers provide *what* you can do — they're complementary.
- **D** — False. Both platforms support skills. Codex also supports MCP servers and app integrations.

## Question 5: What can a Codex plugin reference?

**选项**

- A. The plugin manifest directory is always named .claude-plugin/ regardless of platform
- B. Codex plugins can reference MCP servers and app integrations via paths in plugin.json
- C. OpenCode uses a formal plugin manifest like Claude Code and Codex
- D. All plugins must have an MCP server to be useful

**答案解析**

- **A** — False. Claude Code uses .claude-plugin/, Codex uses .codex-plugin/. Each platform has its own directory name.
- **B（正确答案）** — Correct! Codex plugin.json uses fields like 'mcpServers': './.mcp.json' and 'apps': './.app.json' to reference bundled configuration files.
- **C** — False. OpenCode has native plugins, but they are JS/TS modules loaded from `.opencode/plugins/` or npm packages listed in `opencode.json`, not manifest directories like `.claude-plugin/` or `.codex-plugin/`.
- **D** — False. A plugin can contain just skills, or just configuration — MCP servers are optional.

---

## Summary

If you got 4-5 correct, you have a solid grasp of plugin anatomy. If you missed several, reread the introduction and anatomy lessons before moving on.

## Key Takeaways

- Plugins are a packaging surface, not the same thing as a skill or an MCP server
- Claude Code and Codex use manifest-first plugins, while OpenCode uses code-first modules
- On manifest-first platforms, `plugin.json` tells the agent where bundled components live

## Next Steps

Next, use plugins in a real workflow and see how installation and activation differ by platform.
