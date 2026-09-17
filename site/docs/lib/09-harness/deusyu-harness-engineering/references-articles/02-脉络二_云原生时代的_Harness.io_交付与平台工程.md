---
title: "Harness Engineering 学习指南"
sourceId: "09-harness/deusyu-harness-engineering"
sourceTitle: "Harness Engineering 学习指南"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deusyu/harness-engineering"
entryUrl: "https://github.com/deusyu/harness-engineering/blob/858c0da6570aad32947c09c7e83fb04f46d22ebe/references/articles.md"
sourceRel: "references/articles.md"
rawUrl: "/raw/09-harness/deusyu-harness-engineering/references/articles.md"
sourceSha256: "e0b4a1fe27234013dff277852f40a7d3fd5851a257c53e424e16d4b2dd7b1509"
pageSha256: "5fb4e91b501ef643e47a057e6f4b3a0019176ff49b851a7bb5ef61c57d6048c1"
contentMode: "local-full"
zh: ""
---

## 脉络二：云原生时代的 Harness.io（交付与平台工程）

### 76. Harness.io 官方 — 全局架构

- **标题：** Understanding CI/CD Platforms: The backbone of modern DevOps
- **链接：** [harness.io](https://www.harness.io/blog/understanding-ci-cd-platforms-the-backbone-of-modern-devops)
- **作者：** Harness.io 官方博客 | **日期：** 2026-05-22
- **核心：** 标准 CI/CD 平台介绍。8 大组件：SCM → Build → Test → Code Quality → Security Scan → Artifact → Deploy → Monitor
- **Harness 差异化：** 统一管线、Test Intelligence 智能测试、最少脚本、Policy-as-Code 治理

### 77. Google Cloud Architecture — 前沿场景结合

- **标题：** Harness CI/CD pipeline for RAG applications
- **链接：** [docs.cloud.google.com](https://docs.cloud.google.com/architecture/partners/harness-cicd-pipeline-for-rag-app)
- **作者：** Martin Ansong (Harness) | **日期：** 2025-04-11
- **核心：** 参考架构，Harness 全家桶（CI/CD/STO/SCS/CCM/FME）+ Google Cloud Run 部署 RAG 应用
- **9 步工作流：** Trigger → Compile & Test → Package → Dev Deploy → Staging → Approval → Production Canary → Feature Validation → Cost Tracking
- **附带 Terraform 模板：** [harness-community/harness-rag-ci-cd](https://github.com/harness-community/harness-rag-ci-cd)
