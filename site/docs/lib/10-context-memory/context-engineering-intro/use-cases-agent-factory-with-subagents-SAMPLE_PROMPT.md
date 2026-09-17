---
title: "Context Engineering Intro"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/use-cases/agent-factory-with-subagents/SAMPLE_PROMPT.md"
sourceRel: "use-cases/agent-factory-with-subagents/SAMPLE_PROMPT.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/use-cases/agent-factory-with-subagents/SAMPLE_PROMPT.md"
sourceSha256: "a2ada81b71342854094cdb59ed8b1ca57813799beaa63f043ab1ee87808f91f9"
pageSha256: "a2ada81b71342854094cdb59ed8b1ca57813799beaa63f043ab1ee87808f91f9"
contentMode: "local-full"
zh: "on"
---

# Context Engineering Intro

I want to build a Pydantic AI agent that has the ability to perform semantic similarity search with PGVector and hybrid search. You'll need to copy over (with the cp command, you have to actually copy over everything and keep the same folder structure) everything in examples/rag_pipeline because the RAG pipeline is already set up. Look at sql/schema.sql to understand the database structure and the functions for regular and hybrid search. You'll want to use asyncpg to create the database connection and have an environment variable in .env.example for the DATABASE_URL. Build a nice CLI for the agent as well like we have in main_agent_reference. Use Archon for the Pydantic AI documentation + main_agent_reference to guide your implementation. Keep the agent simple - minimal tools, a single LLM determined by an environment variable you put in .env.example, include just the functionality that is crucial for the agent to be powerful but concise.

<div class="tb-zh"><p>我想构建一个 Pydantic AI agent，具备用 PGVector 做语义相似度检索以及混合检索的能力。你需要（用 cp 命令，必须把全部内容真正复制过去，并保持相同的目录结构）把 examples/rag_pipeline 里的所有内容复制过来，因为 RAG 流水线已经搭好了。查看 sql/schema.sql 以了解数据库结构以及常规检索与混合检索的函数。你要用 asyncpg 建立数据库连接，并在 .env.example 中为 DATABASE_URL 提供一个环境变量。还要像 main_agent_reference 那样为这个 agent 构建一个好用的 CLI。用 Archon 查阅 Pydantic AI 文档，并结合 main_agent_reference 来指导你的实现。保持 agent 简单——工具尽量少，只用一个由你写进 .env.example 的环境变量决定的 LLM，只包含让 agent 强大所必需的功能，做到精炼。</p></div>
