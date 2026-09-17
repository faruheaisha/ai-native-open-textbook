---
title: "12 Ways to Customize Claude Code — Tips from Boris Cherny"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tips/claude-boris-12-tips-12-feb-26.md"
sourceRel: "tips/claude-boris-12-tips-12-feb-26.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/tips/claude-boris-12-tips-12-feb-26.md"
sourceSha256: "648e465a79bfb214010b07152a6c03115ce75e0d73f68465a6f017e8c0c53c1a"
pageSha256: "648e465a79bfb214010b07152a6c03115ce75e0d73f68465a6f017e8c0c53c1a"
contentMode: "local-full"
zh: ""
---

# 12 Ways to Customize Claude Code — Tips from Boris Cherny

A summary of customization tips shared by Boris Cherny ([@bcherny](https://x.com/bcherny)), creator of Claude Code, on February 12, 2026.

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Context

Boris Cherny highlighted that customizability is one of the things engineers love most about Claude Code — hooks, plugins, LSPs, MCPs, skills, effort, custom agents, status lines, output styles, and more. He shared 12 practical ways developers and teams are customizing their setups.

<a href="https://x.com/bcherny/status/2021699851499798911"><img src="/mirror/35/358e9e4f0837ed3113e40219f8a53754f7a87352.webp" alt="Boris Cherny intro tweet" width="50%" /></a>

---

## 1/ Configure Your Terminal

Set up your terminal for the best Claude Code experience:

- **Theme**: Run `/config` to set light/dark mode
- **Notifications**: Enable notifications for iTerm2, or use a custom notification hook
- **Newlines**: If using Claude Code in an IDE terminal, Apple Terminal, Warp, or Alacritty, run `/terminal-setup` to enable shift+enter for newlines (so you don't need to type `\`)
- **Vim mode**: Run `/vim`

<a href="https://x.com/bcherny/status/2021699859359883608"><img src="/mirror/c7/c70ff089ccecd46497c6c53a8ff195efd424046b.webp" alt="Configure your terminal" width="50%" /></a>

---

## 2/ Adjust Effort Level

Run `/model` to pick your preferred effort level:

- **Low** — fewer tokens, faster responses
- **Medium** — balanced behavior
- **High** — more tokens, more intelligence

Boris's preference: High for everything.

<a href="https://x.com/bcherny/status/2021699860869902424"><img src="/mirror/40/402d7bec988b09fc183befd75c55aad46bc09813.webp" alt="Adjust effort level" width="50%" /></a>

---

## 3/ Install Plugins, MCPs, and Skills

Plugins let you install LSPs (available for every major language), MCPs, skills, agents, and custom hooks.

Install from the official Anthropic plugin marketplace, or create your own marketplace for your company. Check the `settings.json` into your codebase to auto-add the marketplaces for your team.

Run `/plugin` to get started.

<a href="https://x.com/bcherny/status/2021699862522364149"><img src="/mirror/2f/2f96de63626ca4a3212711aba0af04f5ea21f0e6.webp" alt="Install Plugins, MCPs, and Skills" width="50%" /></a>

---

## 4/ Create Custom Agents

Drop `.md` files in `.claude/agents` to create custom agents. Each agent can have a custom name, color, tool set, pre-allowed and pre-disallowed tools, permission mode, and model.

You can also set the default agent for the main conversation using the `"agent"` field in `settings.json` or the `--agent` flag.

Run `/agents` to get started.

<a href="https://x.com/bcherny/status/2021700144039903699"><img src="/mirror/e6/e61290259fec065639608016f8733344f15ef15c.webp" alt="Create custom agents" width="50%" /></a>

---

## 5/ Pre-approve Common Permissions

Claude Code uses a permission system combining prompt injection detection, static analysis, sandboxing, and human oversight.

Out of the box, a small set of safe commands are pre-approved. To pre-approve more, run `/permissions` and add to the allow and block lists. Check these into your team's `settings.json`.

Full wildcard syntax is supported — e.g., `Bash(bun run *)` or `Edit(/docs/**)`.

<a href="https://x.com/bcherny/status/2021700332292911228"><img src="/mirror/87/87b6f97a7bc6f9670e3a8181b21d2e70c492dff1.webp" alt="Pre-approve common permissions" width="50%" /></a>

---

## 6/ Enable Sandboxing

Opt into Claude Code's open source sandbox runtime to improve safety while reducing permission prompts.

Run `/sandbox` to enable it. Sandboxing runs on your machine and supports both file and network isolation.

<a href="https://x.com/bcherny/status/2021700506465579443"><img src="/mirror/88/8895cb158a6ce211c1b8c410981148af5f284136.webp" alt="Enable sandboxing" width="50%" /></a>

---

## 7/ Add a Status Line

Custom status lines show up right below the composer, displaying model, directory, remaining context, cost, and anything else you want to see while you work.

Every team member can have a different statusline. Use `/statusline` to have Claude generate one based on your `.bashrc`/`.zshrc`.

<a href="https://x.com/bcherny/status/2021700784019452195"><img src="/mirror/76/766894295798ca0a8b9054e58bbec09c10b6fa69.webp" alt="Add a status line" width="50%" /></a>

---

## 8/ Customize Your Keybindings

Every key binding in Claude Code is customizable. Run `/keybindings` to re-map any key. Settings live reload so you can see how it feels immediately.

<a href="https://x.com/bcherny/status/2021700883873165435"><img src="/mirror/b7/b7c6713d25cd824b2251355a000ab723b3e79be5.webp" alt="Customize your keybindings" width="50%" /></a>

---

## 9/ Set Up Hooks

Hooks let you deterministically hook into Claude's lifecycle:

- Automatically route permission requests to Slack or Opus
- Nudge Claude to keep going when it reaches the end of a turn (you can even kick off an agent or use a prompt to decide whether Claude should keep going)
- Pre-process or post-process tool calls, e.g., to add your own logging

Ask Claude to add a hook to get started.

<a href="https://x.com/bcherny/status/2021701059253874861"><img src="/mirror/26/26eff46caf973e1ee16cb111d731e24e3cbc2d3e.webp" alt="Set up hooks" width="50%" /></a>

---

## 10/ Customize Your Spinner Verbs

Customize your spinner verbs to add or replace the default list with your own verbs. Check the `settings.json` into source control to share verbs with your team.

<a href="https://x.com/bcherny/status/2021701145023197516"><img src="/mirror/2f/2fbc345f235fc9d4c6f6185583c725757b89bd71.webp" alt="Customize your spinner verbs" width="50%" /></a>

---

## 11/ Use Output Styles

Run `/config` and set an output style to have Claude respond using a different tone or format.

- **Explanatory** — recommended when getting familiar with a new codebase, to have Claude explain frameworks and code patterns as it works
- **Learning** — to have Claude coach you through making code changes
- **Custom** — create custom output styles to adjust Claude's voice

<a href="https://x.com/bcherny/status/2021701379409273093"><img src="/mirror/8e/8e2e1292f9284fa18b457ced9ea9d7594bef8d65.webp" alt="Use output styles" width="50%" /></a>

---

## 12/ Customize All the Things!

Claude Code works great out of the box, but when you do customize, check your `settings.json` into git so your team can benefit too. Configuration is supported at multiple levels:

- For your codebase
- For a sub-folder
- For just yourself
- Via enterprise-wide policies

With 37 settings and 84 environment variables (use the `"env"` field in your `settings.json` to avoid wrapper scripts), there's a good chance any behavior you want is configurable.

<a href="https://x.com/bcherny/status/2021701636075458648"><img src="/mirror/0b/0b9d59857f8c1a2b940bbd3460bbcc62708d5633.webp" alt="Customize all the things" width="50%" /></a>

---

## Sources

- [Boris Cherny (@bcherny) on X — February 12, 2026](https://x.com/bcherny)
- [Claude Code Terminal Setup Docs](https://code.claude.com/docs/en/terminal)
- [Claude Code Plugins & Discovery Docs](https://code.claude.com/docs/en/discover-plugins)
- [Claude Code Sub-agents Docs](https://code.claude.com/docs/en/sub-agents)
- [Claude Code Permissions Docs](https://code.claude.com/docs/en/permissions)
- [Claude Code Sandbox Docs](https://code.claude.com/docs/en/sandbox)
- [Claude Code Status Line Docs](https://code.claude.com/docs/en/statusline)
- [Claude Code Keyboard Shortcuts Docs](https://code.claude.com/docs/en/keybindings)
- [Claude Code Hooks Reference](https://code.claude.com/docs/en/hooks)
- [Claude Code Output Styles Docs](https://code.claude.com/docs/en/output-styles)
- [Claude Code Settings Docs](https://code.claude.com/docs/en/settings)
