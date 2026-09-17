---
title: "Qclaw（秋芝2046）"
sourceId: "11-personal-agents/qclaw"
sourceTitle: "Qclaw（秋芝2046）"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "11-personal-agents"
sourceUrl: "https://github.com/qiuzhi2046/Qclaw"
entryUrl: "https://github.com/qiuzhi2046/Qclaw/blob/c494768977f4e48b8eacbfae7ae390af11fc015f/README.en.md"
sourceRel: "README.en.md"
rawUrl: "/raw/11-personal-agents/qclaw/README.en.md"
sourceSha256: "98742e3a105c4798e1de7a49b01300089ad3b34ae347e496a7c2dedce6b147e1"
pageSha256: "98742e3a105c4798e1de7a49b01300089ad3b34ae347e496a7c2dedce6b147e1"
contentMode: "local-full"
zh: ""
---

# Qclaw（秋芝2046）

<br />
    <img src="/mirror/97/97961f369179a4927a262631a41665569f9bb6ab.webp" alt="Qclaw Logo" width="128" height="128">

  <h1 align="center" style="margin-top: 0.2em;">Qclaw</h1>

    <h3>OpenClaw for everyone, without touching the command line</h3>
    <br />
    <br />
    <br />
[简体中文](https://github.com/qiuzhi2046/Qclaw/blob/main/README.md)
    &middot;
[Report Bug](https://github.com/qiuzhi2046/Qclaw/issues/new?labels=bug)
    &middot;
[Request Feature](https://github.com/qiuzhi2046/Qclaw/issues/new?labels=enhancement)

<details>
  <summary>Contents</summary>
  <ol>
    <li><a href="#features">Features</a></li>
    <li><a href="#why-this-project-exists">Why This Project Exists</a></li>
    <li><a href="#quick-start">Quick Start</a></li>
    <li><a href="#development">Development</a></li>
    <li><a href="#known-issues">Known Issues</a></li>
    <li><a href="#supported-platforms">Supported Platforms</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#community">Community</a></li>
    <li><a href="#join-us">Join Us</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## Features

  <img src="/mirror/cc/cc4ea3b483e53ddeeedc0ff7f1a2666af93fceb7.webp" alt="Visual configuration" width="280">
  <img src="/mirror/2e/2ecbf40f455b5b6ee22eba2ed9e5bfd6eb28c2a0.webp" alt="Multi-channel access" width="280">
  <img src="/mirror/6b/6ba70287b8f7513fa26d5b0aa7ac40f1ee5cf1e7.webp" alt="State management" width="280">
  <img src="/mirror/7c/7c55977417ca16286c7fb670775fd842357d49b3.webp" alt="Safety and backup" width="280">
  <img src="/mirror/2c/2c73e97c78de55dd873434c29ad30cfe2c954a02.webp" alt="Skills management" width="280">

- **Environment check** — Detects Node.js and OpenClaw CLI automatically and installs missing dependencies when needed
- **Full OpenClaw model support** — Works with the complete OpenClaw model catalog and also supports custom model entries
- **Latest IM integrations** — Connect Feishu, WeChat, WeCom, DingTalk, and QQ with QR-code-driven setup, then install official plugins and write config automatically
- **Guided onboarding** — Beginner-friendly workflow with step-by-step guidance and safety reminders
- **Operations dashboard** — Monitor gateway status in real time, restart services, and repair runtime issues in one place
- **Skills management** — Manage skills from different sources
- **Backup support** — Includes automatic backup and manual backup flows
- **Cross-platform direction** — Supports macOS today, Windows is in progress, and Linux is planned
- **Update support** — Supports the latest OpenClaw releases

## Why This Project Exists

Qclaw started with a simple goal: build a practical desktop companion for OpenClaw so everyone can install it, configure it, and actually use it with confidence.

- Lower the barrier by turning complex CLI and config steps into simple desktop interactions
- Make powerful AI tooling more accessible to everyone
- Help first-time users learn by doing, with setup steps that double as a tutorial

## Quick Start

### Step 1: Download and install

- Download and open the Qclaw Lite client
  - Website: https://qclawai.com/
  - GitHub Releases: [Download the latest version](https://github.com/qiuzhi2046/Qclaw/releases)
- Read the safety notice and confirm before continuing

### Step 2: Prepare the environment

- Run the environment check
  - If an existing OpenClaw setup is detected, Qclaw can import it directly
- Follow the on-screen guidance to begin configuration

### Step 3: Configure models

- Open the AI provider page and wait for the model list to load
- Choose the models you want to use
  - Supports the full OpenClaw model catalog, and some models also support OAuth authorization

### Step 4: Connect IM channels (optional)

- Open the IM channels page
- Choose the platform you use most often, such as Feishu, DingTalk, QQ, or WeCom
- Follow the in-app guide to complete setup for each platform
  - [Feishu setup guide](https://my.feishu.cn/wiki/WAfWw1bqriZP02kqdNycHlvnnHb)
  - [DingTalk setup guide](https://my.feishu.cn/wiki/NUJew2DzaipVsukUvPmcZ2yvnYb)
  - [QQ setup guide](https://my.feishu.cn/wiki/AvuSwchqviAO6dkwiZycmZeInPf)
  - [WeCom setup guide](https://my.feishu.cn/wiki/TsLTwplveiqbW8kH5XOclgvYn1d)

### Step 5: Start using it

- Start conversations directly in the desktop client
- Or test your AI assistant inside the IM tools you just connected

> 💡 Closing the Qclaw Lite window does not stop OpenClaw in the background. Your IM channels continue to work normally.

## Development

### Recommended development environment

- macOS
- Qclaw (OpenClaw)
- [Codex](https://github.com/openai/codex) or [Claude Code](https://claude.ai/code)
- Node.js 24, with 22 as the minimum supported version for local development

### Install from source

```bash
# Clone the repository
git clone https://github.com/qiuzhi2046/Qclaw.git
cd Qclaw

# Install dependencies
npm install

# Start the development environment
npm run dev

# Build the production version
npm run build
```

### Common commands

| Command | Description |
|------|------|
| `npm run dev` | Start the development server |
| `npm run build` | Build and package the application |
| `npm test` | Run the test suite |
| `npm run typecheck` | Run TypeScript type checks |

### Project structure

```text
electron/
  main/             Main process: window management, CLI calls, IPC handlers
  preload/          Preload scripts and secure bridge
src/
  pages/            Page-level components: wizard steps, dashboard, chat, and more
  components/       UI components
  lib/              Business logic: channel registry, provider registry, and utilities
  shared/           Shared modules: config flow, gateway diagnostics, and policies
  assets/           Icons and static assets
docs/               Project documents, architecture notes, and changelogs
scripts/            Build and release scripts, signing, versioning, and COS publishing
build/              App icons and packaging resources
```

### Tech stack and architecture

| Layer | Technology |
|----|------|
| Desktop framework | [Electron](https://www.electronjs.org/) |
| Frontend | [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) |
| Build tooling | [Vite](https://vitejs.dev/) + vite-plugin-electron |
| UI | [Mantine](https://mantine.dev/) + [Tailwind CSS](https://tailwindcss.com/) |
| Packaging | electron-builder |

```text
┌─────────────────────────────────────────────────────────┐
│                           Qclaw                         │
│                                                         │
│  ┌──────────────────┐         ┌──────────────────────┐  │
│  │   Main Process   │         │  Renderer Process    │  │
│  │   (Node.js)      │   IPC   │  (Chromium)          │  │
│  │                  │◄───────►│                      │  │
│  │  ┌────────────┐  │         │  ┌────────────────┐  │  │
│  │  │  cli.ts    │  │         │  │  React + Vite  │  │  │
│  │  │  OpenClaw  │  │         │  │  Mantine + TW  │  │  │
│  │  │  CLI calls │  │         │  │                │  │  │
│  │  └─────┬──────┘  │         │  │  Wizard pages  │  │  │
│  │        │         │         │  │  Dashboard     │  │  │
│  │  ┌─────▼──────┐  │         │  └────────────────┘  │  │
│  │  │ System     │  │         │                      │  │
│  │  │ file I/O   │  │         └──────────────────────┘  │
│  │  │ processes  │  │                                   │
│  │  └────────────┘  │                                   │
│  └──────────────────┘                                   │
│                                                         │
│           │                                             │
│           ▼                                             │
│  ┌──────────────────┐                                   │
│  │  OpenClaw CLI    │                                   │
│  │  ~/.openclaw/    │                                   │
│  └──────────────────┘                                   │
└─────────────────────────────────────────────────────────┘
```

## Known Issues

- This document tracks the current known limitations and bugs
- Please check [Issues](https://github.com/qiuzhi2046/Qclaw/issues) for specific bug reports and feature requests

## Supported Platforms

- macOS 11 (Big Sur)+
- Windows 10+ (x64), currently in active development
- Linux, planned
