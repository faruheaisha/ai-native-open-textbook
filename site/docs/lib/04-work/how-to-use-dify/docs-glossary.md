---
title: "Dify 术语表"
sourceId: "04-work/how-to-use-dify"
sourceTitle: "Dify 中文系统教程（How-to-use-dify）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/hijasonxu1/How-to-use-dify"
entryUrl: "https://github.com/hijasonxu1/How-to-use-dify/blob/8d32c2067bfeab108a9646fe0371319f6c1d5134/docs/glossary.md"
sourceRel: "docs/glossary.md"
rawUrl: "/raw/04-work/how-to-use-dify/docs/glossary.md"
sourceSha256: "f0210fd3a346ed32a2713a08921fe75fb32e1efc707083424d6df77f02fe7c62"
pageSha256: "f0210fd3a346ed32a2713a08921fe75fb32e1efc707083424d6df77f02fe7c62"
contentMode: "local-full"
zh: ""
---

# Dify 术语表

## App

用户最终使用的 AI 应用，可以是聊天、工作流、Agent 或文本生成器。

## Chatflow

面向多轮对话的流程，每轮用户输入都会触发流程，适合客服、顾问、知识库助手。

## Workflow

面向单轮任务的流程，适合总结、抽取、分类、批处理和 API 调用。

## Agent

让模型根据目标自主选择工具和行动的应用形态，适合工具调用和多步探索任务。

## Knowledge / Knowledge Base

知识库。用于存放文档资料，让模型回答时可以检索相关内容。

## RAG

Retrieval-Augmented Generation，检索增强生成。先从资料中找相关内容，再让模型基于内容回答。

## Prompt

给模型的指令，包括角色、任务、规则、输入和输出格式。

## Variable

变量。用于保存用户输入、节点输出、系统信息或外部 API 返回值。

## Tool

工具。让 Dify 应用可以调用外部能力，例如搜索、数据库、API、插件、MCP 服务。

## DSL

Dify 的应用导出格式，通常是 YAML 文件，可用于迁移和分享应用。

## Rerank

重排。对检索结果重新排序，提高最终提供给模型的资料相关性。

## Top K

检索返回的候选片段数量。

## Score Threshold

最低相似度阈值。低于阈值的结果会被排除。
