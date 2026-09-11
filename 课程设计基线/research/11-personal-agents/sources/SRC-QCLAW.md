---
source_id: SRC-QCLAW
title: Qclaw（OpenClaw 图形化客户端）
publisher: 个人（秋芝2046）
author: 秋芝2046
source_tier: T3
source_type: oss_project
canonical_url: https://github.com/qiuzhi2046/Qclaw
published_at: null
retrieved_at: 2026-09-10
last_verified: 2026-09-10
version: commit c494768977f4e48b8eacbfae7ae390af11fc015f（2026-04-30）
status: accepted
license: Apache-2.0
rights_status: code=apache-2.0; media=unverified
language: zh-CN / en
---

# Source Record：Qclaw

## 身份核验

- 官方/原始身份依据：作者署名“秋芝2046”的开源项目，GitHub `qiuzhi2046/Qclaw`，站点 qclawai.com。
- 版本或发布日期：commit `c494768`（2026-04-30）。
- 是否仍维护：快照时点最近提交为 2026-04-30；需按季度复核。
- 替代/迁移关系：OpenClaw 的图形化前端封装之一，与命令行原版形成“同一能力、两种入口”的对照。

## 本地快照

- 本地路径：`upstream/11-personal-agents/qclaw/`
- 迁入范围：整仓（576 文件，含 TypeScript 应用与文档）
- 迁入方式：`gh api` tarball 整仓下载；`README.md` Git blob 校验通过
- 台账：`upstream/11-personal-agents/上游资源台账.md`

## 内容范围

- 解决的问题：让不会命令行的用户也能安装、配置并使用 OpenClaw 这类长期在线的个人 Agent。
- 主要概念：Gateway、Channel、会话、配置管理、权限、图形化封装。
- 项目结构：TypeScript 应用（前端 + 服务）与文档。
- 真实案例与资产：面向真实使用场景的配置流程与截图。
- 不覆盖的内容：不深入 Agent 内部机制（卷 08）；不覆盖安全治理（卷 12）。

## 权利与复用

- 正文/代码许可：Apache-2.0。
- 图片/GIF/视频许可：未单独核验。
- Attribution 要求：保留版权、许可与 NOTICE（如适用）。
- Share-alike / Noncommercial：无。
- 允许操作：Link / Quote / Adapt / Fork。

## 教材价值

- 映射卷册：11（主）、09、12。
- 映射 Concepts：Gateway、Channel、Session、Permission、Self-hosting。
- 结构复用 S1：中——作为“降低上手门槛”的产品设计样本。
- 知识复用 S2：低——实现型项目，主要用于对照而非知识综合。
- 案例/资产复用 S3：低——媒体逐项核权。
- 建议处理：CURATE。

## 质量与风险

- Authority：个人开源项目，非官方。
- Freshness：依赖上游 OpenClaw 的接口，兼容性随上游变化。
- Educational Value：中高——补足“非命令行用户”的完整路径。
- Reproducibility：中——可本地运行，但依赖 OpenClaw 环境。
- Maintenance：不确定。
- 已知错误/过时项：未核验。
- 厂商 Claim 与独立证据的区别：README 中的能力宣称需回原始来源验证。

## 提取的 Claims

1. 项目为 OpenClaw 的图形化客户端，面向非命令行用户。位置：仓库 README。
2. 许可为 Apache-2.0。位置：仓库 `LICENSE`。

