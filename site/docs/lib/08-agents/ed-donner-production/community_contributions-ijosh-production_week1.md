---
title: "AI in Production"
sourceId: "08-agents/ed-donner-production"
sourceTitle: "AI in Production"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/production"
entryUrl: "https://github.com/ed-donner/production/blob/daeb3dae34be3287842ea7faa3e6f4cba467028b/README.md"
zh: ""
---

# AI in Production

## MediNotes Consultation Studio

I modificed the healthcare SaaS application into a solution that helps clinicians reduce documentation overhead while maintaining professional, consistent, and patient-friendly communication:

Production App - https://myziq7veyx.eu-west-1.awsapprunner.com/

<br />

## Core Features

- AI consultation report generation using OpenAI.
- Structured output with three sections:
  - Summary for clinical records.
  - Next steps for provider action.
  - Draft patient email in plain language.
- Live streaming response (Server-Sent Events) for fast feedback.
- Authentication and protected workspace using Clerk.
- Subscription/paywall enforcement with Clerk `Protect` + `PricingTable`.
- Consultation history persisted in SQLite.
- Favorite (pin) important consultations for quick access.
- Search and filter history by patient, email, or visit date.
- Optional notifications via Pushover.
- Optional outbound email delivery via SendGrid.

## Repository

The complete application is available at:
https://github.com/iJoshy/saas

See the README.md in the repository for detailed information about implementation, setup, and usage.
