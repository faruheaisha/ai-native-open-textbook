---
title: "Quiz 2: Building and Distributing Plugins"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/units/en/unit3/quiz2.mdx"
sourceRel: "units/en/unit3/quiz2.mdx"
rawUrl: "/raw/10-context-memory/hf-context-course/units/en/unit3/quiz2.mdx"
sourceSha256: "4511352717f2bcd14d7040ba86f80b2f4d7f3299edcd58a86806c61f8b391bd4"
pageSha256: "4511352717f2bcd14d7040ba86f80b2f4d7f3299edcd58a86806c61f8b391bd4"
contentMode: "local-full"
zh: ""
---

# Quiz 2: Building and Distributing Plugins

Test your understanding of plugin development, distribution, and best practices.

## Question 1: Where does `plugin.json` belong?

**选项**

- A. Claude Code and Codex use the same plugin.json schema
- B. OpenCode also uses plugin.json to load local plugins
- C. In Claude Code and Codex, plugin.json defines the plugin's identity and tells the agent where to find bundled components
- D. The plugin.json should be placed at the root of the plugin directory

**答案解析**

- **A** — No. Claude Code's plugin.json (in .claude-plugin/) has a different schema from Codex's (in .codex-plugin/). Codex includes fields like 'skills', 'mcpServers', 'apps', and 'interface'.
- **B** — No. OpenCode plugins are JS/TS modules loaded from `.opencode/plugins/` or from package names in `opencode.json`.
- **C（正确答案）** — Correct! On manifest-first platforms, the manifest identifies the plugin and points to bundled components such as skills, MCP config, or app integrations.
- **D** — Not quite. It goes inside a platform-specific directory: .claude-plugin/plugin.json for Claude Code, .codex-plugin/plugin.json for Codex.

## Question 2: What does the manifest-first plugin structure look like?

**选项**

- A. A directory with .claude-plugin/ or .codex-plugin/ manifest directory, skills/ folder, optional .mcp.json, and README
- B. Just a skills/ folder with SKILL.md files — no manifest needed
- C. A single file named manifest.json containing everything
- D. A root manifest.json with an openapi.json spec defining all endpoints

**答案解析**

- **A（正确答案）** — Correct! That's the manifest-first structure used by Claude Code and Codex.
- **B** — That's a skill library, not the documented manifest-first plugin structure used by Claude Code and Codex.
- **C** — Plugins are directories, not single files. They have discrete skills, optional MCP servers, docs, etc.
- **D** — This is the legacy ChatGPT plugin format, not the current Codex or Claude Code plugin structure.

## Question 3: How should plugin permissions be designed?

**选项**

- A. Request only the permissions you actually need; document why each is needed; follow the principle of least privilege
- B. Request all possible permissions upfront to maximize future flexibility
- C. Hide permission details in the README so users don't worry about them
- D. Permissions don't matter much; focus only on functionality

**答案解析**

- **A（正确答案）** — Correct! Minimal, documented permissions build user trust. Both platforms emphasize security-conscious plugin design.
- **B** — Bad practice. Users will be wary of plugins asking for too much access.
- **C** — Terrible idea. Transparency builds trust. Be clear about what your plugin accesses.
- **D** — Wrong. Security-conscious users care deeply about what plugins can access. Be respectful.

## Question 4: How do you test plugins locally?

**选项**

- A. Test with claude --plugin-dir for Claude Code; create a local marketplace.json entry for Codex
- B. You must publish to the marketplace before you can test your plugin
- C. Run /plugin validate to check your plugin structure
- D. Testing isn't necessary; just publish and fix issues later

**答案解析**

- **A（正确答案）** — Correct! Claude Code uses `--plugin-dir` for local development. Codex uses local marketplace entries for unpublished plugins.
- **B** — False. Both platforms support local development. Claude Code has --plugin-dir; Codex has local marketplace entries.
- **C** — This isn't a standard command on either platform. Use --plugin-dir (Claude Code) or local marketplace (Codex) to test.
- **D** — Always test locally first. Both platforms provide local testing mechanisms before marketplace submission.

## Question 5: How should secrets be handled?

**选项**

- A. Always hardcode API keys in the manifest for convenience
- B. Use environment variables for secrets, reference them from plugin or MCP config when supported, and document how to set them
- C. Prompt users for API keys at runtime
- D. Store API keys in a config file that users commit to git

**答案解析**

- **A** — Never! That's a security disaster. Always use environment variables.
- **B（正确答案）** — Correct! This is the secure approach. Environment variables keep secrets out of version control and plugin code.
- **C** — Awkward and not standard. Environment variables are the established pattern.
- **D** — Terrible idea. This risks exposing secrets to version control.

---

## Summary

If you got 4-5 correct, you're ready to build and distribute plugins responsibly. If not, review the build and usage lessons before publishing anything.

## Key Takeaways

- Keep plugin structure explicit: manifest, bundled components, and documentation each have a clear place
- Ask for the minimum permissions you need and explain why
- Test locally before publishing, and keep secrets in environment variables rather than plugin files

## Next Steps

You've finished Unit 3: Plugins. You now know how to package reusable agent behavior and distribute it safely. Next up is Unit 4, where those components become building blocks for multi-agent workflows.
