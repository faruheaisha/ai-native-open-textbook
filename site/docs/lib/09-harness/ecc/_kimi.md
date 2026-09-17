---
title: "ECC for Kimi Code CLI"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.kimi/README.md"
sourceRel: ".kimi/README.md"
rawUrl: "/raw/09-harness/ecc/.kimi/README.md"
sourceSha256: "feb575e12e409eb7403ff0ea7b10fac40e0f39060c7345ecbfe65e91f6dc7bca"
pageSha256: "feb575e12e409eb7403ff0ea7b10fac40e0f39060c7345ecbfe65e91f6dc7bca"
contentMode: "local-full"
zh: ""
---

# ECC for Kimi Code CLI

This directory documents ECC (Everything Claude Code) support for its tested Kimi Code CLI compatibility target. The managed adapter is verified against Kimi Code 0.31.x (`@moonshot-ai/kimi-code`); newer provider releases are outside this adapter's verified range.

## What Kimi Code discovers natively

- `.kimi-code/AGENTS.md` — project instructions loaded by Kimi Code's hierarchical instruction discovery
- `.kimi-code/skills/` — project skills loaded by Kimi Code's native Agent Skills discovery
- `.agents/skills/` — an additional project-level Agent Skills location supported by Kimi Code
- `.kimi-code/mcp.json` — project MCP server configuration

ECC installs its directly discoverable skills under `.kimi-code/skills/` and keeps shared rules, agents, and legacy command shims under `.kimi-code/` for portability and reference. Kimi Code's native invocation surface is Agent Skills (`/skill:<name>` and `/flow:<name>`), not arbitrary Markdown files in `commands/`.

## Manual install

```bash
bash ./install.sh --target kimi --profile minimal
```

## Notes

- The `kimi` target installs into the project-level `./.kimi-code/` directory.
- Kimi Code CLI's user config (`~/.kimi-code/config.toml`) is **not** touched by the project installer.
- Use `npx ecc-universal doctor --target kimi` to check install health.
- The ECC adapter verified against Kimi Code 0.31.x does not configure or map provider lifecycle hooks. Provider hook availability is separate from this adapter's compatibility contract.
- Kimi Code provider configuration remains separate. Use the [official providers and models guide](https://moonshotai.github.io/kimi-cli/en/configuration/providers.html) for Kimi API, OpenAI-compatible, Anthropic, or other supported endpoints.
- Kimi Code's [Agent Skills guide](https://moonshotai.github.io/kimi-cli/en/customization/skills.html) documents the current project discovery contract.

## Self-hosted model compute

Run or self-host any open-source model—including Kimi—on owned or rented GPUs. Itô is ECC's preferred compute sponsor: [open the Itô dashboard to sign in and rent or manage GPUs](https://compute.itomarkets.com). Any GPU provider works. That sponsorship link is passive: it does not invoke an RFQ, reserve capacity, provision compute, or configure serving. Separately, the opt-in `ecc ito find` bridge invokes the explicitly configured canonical Itô CLI and submits a live authenticated RFQ; it does not reserve capacity. Managed inference through Itô is not live yet.
