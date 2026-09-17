---
title: "00 · Day Zero: Account, Workspace & CLI"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/reference/platforms/databricks/00-day-zero-setup.md"
sourceRel: "reference/platforms/databricks/00-day-zero-setup.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/reference/platforms/databricks/00-day-zero-setup.md"
sourceSha256: "bc7f62a52f71a0cd5d364782a81111e57078e57729467e1c935f2261b184c3e2"
pageSha256: "bc7f62a52f71a0cd5d364782a81111e57078e57729467e1c935f2261b184c3e2"
contentMode: "local-full"
zh: ""
---

# 00 · Day Zero: Account, Workspace & CLI

> **Find the Signal. Act with Intelligence.** · Databricks Module · Week 21, Day 0

This file is your first two hours on Databricks. By the end you will have: a free-trial
account, a mental model of the workspace UI, the **Databricks CLI** authenticated with
**OAuth U2M**, a working first notebook, a file uploaded to a **volume**, and a checklist
to prove it all works. Everything else in this module builds on these muscles.

The running case study is **ZoroLogistics**, a fictional freight company. Day 0 is about
getting the *platform* ready; Day 1 (file 01) starts building the lakehouse for it.

By the end of Day 0 you will be able to:

- Name the two planes (control vs. compute) and the two URL spaces (workspace vs. account).
- Install and authenticate the CLI with **OAuth U2M**, and switch profiles.
- Run a Python **and** a SQL cell in one notebook on serverless compute.
- Create a catalog/schema/**volume** and upload a file two different ways.
- Explain, in one sentence, how `catalog.schema.table` will govern everything that follows.
- State the day-zero cost reflex: "turn the meter off when idle" (file 17 makes it precise).

> **⚠️ Verify against live docs.** Trial offers, free credits, UI labels, and CLI command
> names change. Re-check the links in [Sources](#sources) if a button or flag isn't where
> this file says it is.

---

## 1. Create the account (free trial)

Databricks offers a **free trial** with a credit that covers serverless SQL and notebooks,
enough for the entire first week. There is no credit card required for the trial tier in
most regions; you will be asked to sign in with or create a cloud identity.

**Steps (conceptual: follow the live flow):**

1. Go to `databricks.com` and choose **Try Databricks free** / **Start for free**.
2. Pick your cloud (**AWS**, **Azure**, or **Google Cloud**) and region. Any works; if you
   are in Zorost's Databricks Modernization Practice mindset, pick the cloud your clients
   actually use, the concepts are cloud-portable.
3. Authenticate with your cloud account (this links Databricks to your cloud subscription
   for classic compute and storage).
4. Wait for the **workspace** to provision. You land in the workspace home screen.

You now have a **Databricks account** (the top-level entity) containing **one workspace**
(a single deployment). Bookmark both URLs:

| Thing | URL | What it's for |
|---|---|---|
