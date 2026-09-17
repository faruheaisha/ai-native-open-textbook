---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/installation.md"
sourceRel: "i18n/zh/skills/timescaledb/references/installation.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/installation.md"
sourceSha256: "4a7b57ccaa9a9f7e4c22cc7a4a1dcd5ddf03b101b4f1914bcb18219176632044"
pageSha256: "bb0596cf6f8c1c2a2042423e05ab98dbcbf089135f5a59c7ea139166b9213309"
contentMode: "local-full"
zh: ""
---

## Integrate Kubernetes with Tiger

**URL:** llms-txt#integrate-kubernetes-with-tiger

**Contents:**
- Prerequisites
- Integrate TimescaleDB in a Kubernetes cluster

[Kubernetes][kubernetes] is an open-source container orchestration system that automates the deployment, scaling, and management of containerized applications. You can connect Kubernetes to Tiger Cloud, and deploy TimescaleDB within your Kubernetes clusters.

This guide explains how to connect a Kubernetes cluster to Tiger Cloud, configure persistent storage, and deploy TimescaleDB in your kubernetes cluster.

To follow the steps on this page:

- Install [self-managed Kubernetes][kubernetes-install] or sign up for a Kubernetes [Turnkey Cloud Solution][kubernetes-managed].
- Install [kubectl][kubectl] for command-line interaction with your cluster.
