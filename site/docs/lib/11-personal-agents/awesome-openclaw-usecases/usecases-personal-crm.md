---
title: "Personal CRM with Automatic Contact Discovery"
sourceId: "11-personal-agents/awesome-openclaw-usecases"
sourceTitle: "Awesome OpenClaw Usecases"
sourceKind: "实践案例集"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/hesamsheikh/awesome-openclaw-usecases"
entryUrl: "https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/659895e58e2105c6db8fbef39f446c8a786a480c/usecases/personal-crm.md"
sourceRel: "usecases/personal-crm.md"
rawUrl: "/raw/11-personal-agents/awesome-openclaw-usecases/usecases/personal-crm.md"
sourceSha256: "0bee3367294b3db6ca8e0afab2f54da7ebc4b683199a4a84c706c65cc1232587"
pageSha256: "0bee3367294b3db6ca8e0afab2f54da7ebc4b683199a4a84c706c65cc1232587"
contentMode: "local-full"
zh: ""
---

# Personal CRM with Automatic Contact Discovery

Keeping track of who you've met, when, and what you discussed is impossible to do manually. Important follow-ups slip through the cracks, and you forget context before important meetings.

This workflow builds and maintains a personal CRM automatically:

• Daily cron job scans email and calendar for new contacts and interactions
• Stores contacts in a structured database with relationship context
• Natural language queries: "What do I know about [person]?", "Who needs follow-up?", "When did I last talk to [person]?"
• Daily meeting prep briefing: before each day's meetings, researches external attendees via CRM + email history and delivers a briefing

## Skills you Need

- `gog` CLI (for Gmail and Google Calendar)
- Custom CRM database (SQLite or similar) or use the [crm-query](https://clawhub.ai) skill if available
- Telegram topic for CRM queries

## How to Set it Up

1. Create a CRM database:
```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT,
  first_seen TEXT,
  last_contact TEXT,
  interaction_count INTEGER,
  notes TEXT
);
```
2. Set up a Telegram topic called "personal-crm" for queries.
3. Prompt OpenClaw:
```text
Run a daily cron job at 6 AM to:
1. Scan my Gmail and Calendar for the past 24 hours
2. Extract new contacts and update existing ones
3. Log interactions (meetings, emails) with timestamps and context

Also, every morning at 7 AM:
1. Check my calendar for today's meetings
2. For each external attendee, search my CRM and email history
3. Deliver a briefing to Telegram with: who they are, when we last spoke, what we discussed, and any follow-up items

When I ask about a contact in the personal-crm topic, search the database and give me everything you know.
```
