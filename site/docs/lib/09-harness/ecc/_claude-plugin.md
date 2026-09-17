---
title: "ECC —— Harness 性能优化系统"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.claude-plugin/README.md"
sourceRel: ".claude-plugin/README.md"
rawUrl: "/raw/09-harness/ecc/.claude-plugin/README.md"
sourceSha256: "7b97d88640ca5f32facdb8ce00f2b5a62a7a00148ab2f91c8cbfaa919318cd27"
pageSha256: "7b97d88640ca5f32facdb8ce00f2b5a62a7a00148ab2f91c8cbfaa919318cd27"
contentMode: "local-full"
zh: ""
---

# ECC —— Harness 性能优化系统

### Plugin Manifest Gotchas

If you plan to edit `.claude-plugin/plugin.json`, be aware that the Claude plugin validator enforces several **undocumented but strict constraints** that can cause installs to fail with vague errors (for example, `agents: Invalid input`). In particular, component fields must be arrays, `agents` is not a supported manifest field and must not be included in plugin.json, and a `version` field is required for reliable validation and installation.

These constraints are not obvious from public examples and have caused repeated installation failures in the past. They are documented in detail in `.claude-plugin/PLUGIN_SCHEMA_NOTES.md`, which should be reviewed before making any changes to the plugin manifest.

### Custom Endpoints and Gateways

ECC does not override Claude Code transport settings. If Claude Code is configured to run through an official LLM gateway or a compatible custom endpoint, the plugin continues to work because hooks, skills, and any retained legacy command shims execute locally after the CLI starts successfully.

Use Claude Code's own environment/configuration for transport selection, for example:

```bash
export ANTHROPIC_BASE_URL=https://your-gateway.example.com
export ANTHROPIC_AUTH_TOKEN=your-token
claude
```

Run or self-host any open-source model behind that endpoint. Itô is ECC's preferred compute sponsor: [open the Itô dashboard to sign in and rent or manage GPUs](https://compute.itomarkets.com). Any GPU provider works. That sponsorship link is passive: it does not invoke an RFQ, reserve capacity, change Claude Code transport settings, provision compute, or configure serving. Separately, the opt-in `ecc ito find` bridge invokes the explicitly configured canonical Itô CLI and submits a live authenticated RFQ; it does not reserve capacity. Managed inference through Itô is not live yet.
