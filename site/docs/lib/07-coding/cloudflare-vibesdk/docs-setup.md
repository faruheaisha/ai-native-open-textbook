---
title: "VibeSDK Setup Guide"
sourceId: "07-coding/cloudflare-vibesdk"
sourceTitle: "Cloudflare VibeSDK"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/cloudflare/vibesdk"
entryUrl: "https://github.com/cloudflare/vibesdk/blob/9da158d82c597a0e8f4bf033cdccd1053fb6fb15/docs/setup.md"
sourceRel: "docs/setup.md"
rawUrl: "/raw/07-coding/cloudflare-vibesdk/docs/setup.md"
sourceSha256: "3d0a9e729959b98244bff791f008b220e4f856bbb3787538f1b8fb7f6b6888aa"
pageSha256: "3d0a9e729959b98244bff791f008b220e4f856bbb3787538f1b8fb7f6b6888aa"
contentMode: "local-full"
zh: ""
---

# VibeSDK Setup Guide

Set up VibeSDK for local development and production deployment.

**Make sure to read through the entire guide for important notes, and have all the required information ready before starting.**

Current generated-app previews use SpaceDO, a Worker Loader binding, and Dynamic Workers. Cloudflare Artifacts is optional behind `ENABLE_ARTIFACTS`; it is not required for the default SQLite workspace filesystem. Previews do not require a sandbox container or persistent preview server.

## Prerequisites

Before getting started, make sure you have:

### Required
- **Node.js** (v22 or later)
- **Cloudflare account** with API access  
- **Cloudflare API Token** with appropriate permissions

### Recommended
- **Bun**
- **Custom domain** configured in Cloudflare (for production deployment)

### For Production Features
- **Workers Paid Plan** (for remote Cloudflare resources)
- **Workers for Platforms** subscription (for app deployment features)
- **Advanced Certificate Manager** (if using first-level subdomains)

## Quick Start

The fastest way to get VibeSDK running is with our automated setup script:

```bash
# Bun is recommended. Install it first if needed.
curl -fsSL https://bun.sh/install | bash
# Then install dependencies and run setup
bun install
bun run setup
```

This interactive script will guide you through the entire setup process, including:

- **Package manager setup** (installs Bun automatically for better performance)
- **Cloudflare credentials** collection (Account ID and API Token)
- **Domain configuration** (custom domain or localhost for development)
- **Remote setup** (optional production deployment configuration)
- **AI Gateway configuration** (Cloudflare AI Gateway recommended)
- **API key collection** (OpenAI, Anthropic, Google AI Studio, etc.)
- **OAuth setup** (Google, GitHub login - optional)
- **Resource creation** (KV namespaces, D1 databases, R2 buckets, AI Gateway)
- **File generation** (`.dev.vars` and optionally `.prod.vars`)
- **Configuration updates** (`wrangler.jsonc` and `vite.config.ts`)
- **Database setup** (schema generation and migrations)
- **Template deployment** (example app templates to R2)
- **Readiness report** (comprehensive status and next steps)

## What You'll Need During Setup

The setup script will ask you for the following information:

### Cloudflare Account Information

1. **Account ID**: Found in your Cloudflare dashboard sidebar
2. **API Token**: In you Cloudflare dashboard under "My Profile" > "API Tokens", create a token (Using the "Edit Cloudflare Workers" template is recommended) with the following configurations:
   - Your Account - Workers KV Storage:Edit, Workers Scripts:Edit, Account Settings:Read, Workers Tail:Read, Workers R2 Storage:Edit, Cloudflare Pages:Edit, Workers Builds Configuration:Edit, Workers Agents Configuration:Edit, Workers Observability:Edit, Containers:Edit, D1:Edit, AI Gateway:Read, AI Gateway:Edit, AI Gateway:Run, Cloudchamber:Edit, Browser Rendering:Edit
   - All zones - Workers Routes:Edit
   - All users - User Details:Read, Memberships:Read

   **If using the `Edit Cloudflare Workers` template, make sure to add the missing permissions above manually.**

   **Important**: Some features like D1 databases and R2 may require a paid Cloudflare plan.

### Domain Configuration

**With Custom Domain:**
```bash
Enter your custom domain (or press Enter to skip): myapp.com
✅ Custom domain set: myapp.com
Use remote Cloudflare resources (KV, D1, R2, etc.)? (Y/n): 
Configure for production deployment? (Y/n): 
```

**Without Custom Domain:**
```bash
Enter your custom domain (or press Enter to skip): [press Enter]
⚠️  No custom domain provided.
   • Remote Cloudflare resources: Not available
   • Production deployment: Not available
   • Only local development will be configured

Continue with local-only setup? (Y/n): 
```

### AI Gateway Configuration

**Cloudflare AI Gateway (Recommended)**
- **Automatic token setup**: When selected, `CLOUDFLARE_AI_GATEWAY_TOKEN` is automatically set to your API token
- **No manual configuration**: The script handles all AI Gateway authentication
- **Better performance**: Caching, rate limiting, and monitoring included

**Custom OpenAI URL (Alternative)**
- For users with existing OpenAI-compatible endpoints
- Requires manual model configuration in `worker/agents/inferutils/config.ts`

### AI Provider Selection

The setup script offers multiple AI providers with intelligent multi-selection:

**Available Providers:**
1. **OpenAI** (for GPT models)
2. **Anthropic** (for Claude models)  
3. **Google AI Studio** (for Gemini models) - **Default & Recommended**
4. **Cerebras** (for open source models)
5. **OpenRouter** (for various models)
6. **Custom provider** (for any other provider)

**Provider Selection:**
- Select multiple providers with comma-separated numbers (e.g., `1,2,3`)
- Each selected provider will prompt for its API key
- Custom providers automatically generate `PROVIDER_NAME_API_KEY` variables
- Custom providers are automatically added to `worker-configuration.d.ts`

### Important Model Configuration Notes

**Google AI Studio (Recommended):**
- Default model configurations use Gemini models
- No additional `worker/agents/inferutils/config.ts` editing required
- Best compatibility - This is the model used in the official deployment at https://build.cloudflare.dev
- You can get a free API key from https://aistudio.google.com/

**Other Providers:**
- **Strong warning**: You MUST edit `worker/agents/inferutils/config.ts` 
- Change default model configurations from Gemini to your selected providers
