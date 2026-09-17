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
sourceRel: "en/cloud-environments.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/cloud-environments.md"
sourceSha256: "29998b3dc2a851eaf60b64058c4be0d382bad76c81ed9bdb2cdcdfd5aca7b178"
pageSha256: "842370b67035e5db86886e2d11764fac4bd6b552a57b00258962c81175be26d3"
contentMode: "local-full"
zh: ""
---

## The Default environment

If you don't have an environment yet, onboarding sets up the **Default** environment. How depends on where you onboard:

* **CLI flows such as `/web-setup`**: create **Default** for you
* **Web onboarding on Pro and Max**: creates **Default** for you
* **Web onboarding on Team and Enterprise**: shows a **Create your first cloud environment** form unless an Owner has turned on [Quick web setup](https://code.claude.com/docs/en/claude-code-on-the-web#github-authentication-options); keep the form's defaults and click **Create & finish** to get the same **Default** environment

**Default** carries no configuration of its own:

* [**Trusted** network access](#access-levels): sessions reach package registries and other [allowlisted domains](#default-allowed-domains), and nothing else through the session's network.
* No other configuration: **Default** defines no environment variables or setup script, so sessions start with just the [pre-installed tools](#installed-tools).

With only **Default** available, every session runs in it. When you have more than one environment, sessions choose one per surface:

* On the web, the Desktop app, and the mobile app, sessions use the environment shown in the [selector](#configure-your-environment). An [organization default](#organization-shared-environments) set by an Owner fills the selection when you haven't picked one.
