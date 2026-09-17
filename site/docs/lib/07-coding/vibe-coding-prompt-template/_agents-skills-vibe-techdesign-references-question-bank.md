---
title: "Optional planning questions"
sourceId: "07-coding/vibe-coding-prompt-template"
sourceTitle: "Vibe Coding 提示词模板"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KhazP/vibe-coding-prompt-template"
entryUrl: "https://github.com/KhazP/vibe-coding-prompt-template/blob/db481763c24e2b66b919f9d40aa42b16409a62d7/.agents/skills/vibe-techdesign/references/question-bank.md"
sourceRel: ".agents/skills/vibe-techdesign/references/question-bank.md"
rawUrl: "/raw/07-coding/vibe-coding-prompt-template/.agents/skills/vibe-techdesign/references/question-bank.md"
sourceSha256: "6ca9ac2e670f830a427678a124837ddd64f1b8f7ea464d865ad2d8e8ab33d0c5"
pageSha256: "6ca9ac2e670f830a427678a124837ddd64f1b8f7ea464d865ad2d8e8ab33d0c5"
contentMode: "local-full"
zh: ""
---

# Optional planning questions

Choose only questions whose answers affect the current decision. Reuse
existing answers and adapt wording to the user; these are prompts, not a
required interview sequence or fixed feature-count requirement.

### Level A (Vibe-coder):

- "Based on your PRD, where should people use it? Web, Mobile app, Desktop, or Not sure?"

- "What's your coding situation? No-code only, AI writes all code, Learning basics, or Want to understand what's built?"

- "Budget for tools? Free only, up to $50/month, up to $200/month, or Flexible?"

- "How quickly to launch? ASAP (1-2 weeks), 1 month, 2-3 months, or No rush?"

- "What worries you most? Getting stuck, costs, security, wrong choices, or breaking things?"

- "Have you tried any tools yet? Name any and what you liked/disliked"

- "For your main feature, what's most important? Simple to build, works perfectly, looks amazing, or scales well?"

- "Do you want AI-powered features (chat, summarization)? If yes, list them and privacy constraints"

- "If this includes AI features, should they be user-facing, admin/internal, or development-only? Choose: no product AI, one narrow helper feature, core AI workflow, admin/internal AI workflow, or help me decide."

### Level B (Developer):

- "Platform strategy and why?"

- "Preferred tech stack? Frontend, Backend, Database, Infrastructure, AI Integration"

- "Architecture pattern? Monolithic, Microservices, Serverless, Jamstack, or Full-stack framework"

- "Service choices? Auth, File storage, Payments, Email, Analytics"

- "AI coding tool preference? Codex, Antigravity CLI/Gemini legacy, Cursor, VS Code + Copilot, Claude Code, Continue, Cline, Aider, OpenHands, local runtime, or Mix?"

- "Development workflow? Git strategy, CI/CD, Testing priority, Environments"

- "Performance/scaling? Expected load, data volume, geographic distribution, real-time needs"

- "Security/compliance? Data sensitivity, compliance needs, auth method, API security"

- "AI/LLM features? Use cases, latency/cost constraints, data sensitivity"

- "AI architecture? Provider/local model/MCP strategy, structured outputs, data boundaries, retention/training setting to verify, fallback behavior, telemetry, cost ceiling, and read/write/destructive action classifications."

- "Agent orchestration? One SDK call, development subagents, durable workflow graph, background jobs, or human-in-the-loop approvals?"

- "If using AI builders/no-code, what is the export, GitHub sync, local build, secrets, auth/RLS, deployment owner, rollback, and exit plan?"

### Level C (In-Between):

- "Where should your app run? Web (easiest), Mobile, Both, or Help me decide?"

- "Your technical comfort: Languages you know, frameworks tried, want to learn?"

- "Building approach? No-code (fastest), Low-code with AI, Learn by doing, or Hire out?"

- "Feature complexity? Simple CRUD, real-time, file uploads, integrations, complex logic?"

- "Budget: Development tools, hosting, services - can you spend $X total?"

- "AI assistance preference? AI does everything, AI explains, AI helps when stuck, or Mix?"

- "Timeline reality: Hours/week available, launch date, beta test size?"

- "AI-powered features? List them and privacy constraints if yes"

- "Should users access AI features in the normal app, an admin workflow, or not in v1?"
