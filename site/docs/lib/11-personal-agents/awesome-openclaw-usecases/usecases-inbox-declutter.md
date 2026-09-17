---
title: "Inbox De-clutter"
sourceId: "11-personal-agents/awesome-openclaw-usecases"
sourceTitle: "Awesome OpenClaw Usecases"
sourceKind: "实践案例集"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/hesamsheikh/awesome-openclaw-usecases"
entryUrl: "https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/659895e58e2105c6db8fbef39f446c8a786a480c/usecases/inbox-declutter.md"
sourceRel: "usecases/inbox-declutter.md"
rawUrl: "/raw/11-personal-agents/awesome-openclaw-usecases/usecases/inbox-declutter.md"
sourceSha256: "7051c20a721cd35774714b043d45bf16b003581a340102a6317d2fa47ee8f64b"
pageSha256: "7051c20a721cd35774714b043d45bf16b003581a340102a6317d2fa47ee8f64b"
contentMode: "local-full"
zh: ""
---

# Inbox De-clutter

Newsletters can take up the inbox like nothing else. Often times they pile-up without being opened at all. 

## Skills you Need
[Gmail OAuth Setup](https://clawhub.ai/kai-jar/gmail-oauth).

## How to Set it Up
1. [optional] Create a new gmail specifically for OpenClaw.
2. [optional] Unsubscribe from all newsletters from your main email and subscribe to them using the OpenClaw email.
3. Install the skill and make sure it works. 
4. Instruct OpenClaw:
```txt
I want you to run a cron job everyday at 8 p.m. to read all the newsletter emails of the past 24 hours and give me a digest of the most important bits along with links to read more. Then ask for my feedback on whether you picked good bits, and update your memory based on my preferences for better digests in the future jobs.
```
