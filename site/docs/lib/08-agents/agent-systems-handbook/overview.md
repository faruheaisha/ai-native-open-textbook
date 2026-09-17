---
title: "Agent Systems Handbook（智能体系统手册）"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
sourceRel: "README.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/README.md"
sourceSha256: "44649b9ab94d5f84cc94d9d105c44bb8404d71ef07fba37e65e9da57e953bb34"
pageSha256: "44649b9ab94d5f84cc94d9d105c44bb8404d71ef07fba37e65e9da57e953bb34"
contentMode: "local-full"
zh: ""
---

# Agent Systems Handbook（智能体系统手册）

<h1>Agent Systems Handbook by Prompthon</h1>

  
    
  
  <p><strong>AI-agent demos are easy to find. Production-ready agent systems are harder to understand.</strong> This handbook maps the workflows, tools, memory systems, context engineering, MCP/A2A interoperability, evaluation, observability, and multi-agent architecture behind real-world AI agents.</p>

  <p>Use it to understand, design, build, and operate production-minded AI agents — from first principles to framework choices and implementation patterns.</p>

  <p>
    <img src="https://gh-proxy.com/https://raw.githubusercontent.com/Prompthon-IO/agent-systems-handbook/5b71cfa598701a34834f33b42be5f8a422138a3c/assets/agentic-ai-blueprint.png" alt="Blueprint-style agentic AI system map showing core agent loop concepts" width="100%" />
  </p>
  
  <p>
    <a href="https://labs.prompthon.io/"><strong>labs.prompthon.io</strong></a>
  </p>

  <p>
    <a href="https://github.com/Prompthon-IO"><strong>Organization</strong></a>
    ·
    <a href="https://github.com/Prompthon-IO/agent-systems-handbook"><strong>Repository</strong></a>
    ·
    <a href="https://github.com/Prompthon-IO/agent-systems-handbook"><strong>Star</strong></a>
    ·
    <a href="https://github.com/Prompthon-IO/agent-systems-handbook/subscription"><strong>Watch updates</strong></a>
    ·
    <a href="https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/CONTRIBUTING.md"><strong>Contribute source</strong></a>
    ·
    <a href="https://github.com/Prompthon-IO/agent-systems-handbook/issues"><strong>Issues</strong></a>
    ·
    <a href="https://discord.gg/sDE2HhGTg4"><strong>Discord</strong></a>
  </p>

  <p>
    
    
    
    
  </p>


---

## Overview

Prompthon Agentic Labs publishes the Agent Systems Handbook by Prompthon: an AI-native field guide for students, practitioners, and builders exploring modern agent systems from different angles.

Built on **learn, question, and innovate**, the lab is shaped by learners and grounded in real industry practice. It helps readers understand the space, apply AI effectively, or build real systems through parallel paths rather than a single track.

## Why This Lab Fits AI-Native Learners, Practitioners, And Builders

### Built on learn, question, and innovate

This repository encourages active learning, critical thinking, and experimentation rather than passive consumption.

### Built by learners, not only for learners

Many contributors are learners themselves. That keeps the material close to the questions, habits, and learning paths that students, new grads, and next-generation AI-native builders actually have.

### Guided by real industry practice

Through Prompthon programs and industry-facing guidance, the lab remains connected to how frontier teams think, build, iterate, and evaluate in real settings.

### AI-native by design

The content is created through an AI-native workflow that combines AI-assisted drafting, synthesis, iteration, and refinement with expert guidance and review.

### Designed for different paths, not a single track

The lab is organized for different kinds of learners and different intentions. Some people want broad understanding and trend awareness. Some want to apply AI tools to daily work and study. Some want to build real systems and applications. This repository supports all three without forcing one sequence.

## What This Handbook Covers

- AI agent foundations and agent-system mental models
- Agentic workflows, planning, reflection, tool use, and function calling
- Agent memory, retrieval, context engineering, and agentic RAG
- MCP, A2A, protocol interoperability, and agent communication boundaries
- LangGraph, agent frameworks, hosted builders, and low-code platforms
- Multi-agent orchestration, evaluation, observability, reliability, and safety
- Deep research agents, customer-support agents, source projects, and starter examples

## Start Here

Choose the path that best matches what you want from AI right now. These are parallel tracks for different types of learners and builders, not a required sequence.

<table>
  <tr>
    <td valign="top" width="50%">
      <h3>Explorer</h3>
      <p>For students, newcomers, and curious AI-native readers who want a broad view of AI, agents, trends, and foundational ideas without needing to become engineers.</p>
      <p><strong>What you get:</strong> a curated set of high-signal reads that help you learn core concepts, follow important shifts, test ideas with your own thinking, and build a grounded first-hand understanding of the space.</p>
      <p><a href="/lib/08-agents/agent-systems-handbook/reading-paths-explorer"><strong>Open the Explorer guide</strong></a></p>
    </td>
    <td valign="top" width="50%">
      <h3>Practitioner</h3>
      <p>For people who want to use AI tools, agents, and workflows to enhance daily life, study, and real work without needing to become full-time engineers.</p>
      <p><strong>What you get:</strong> a practical path for learning how to apply AI effectively, choose the right tools and workflows, and operate with leverage in real scenarios, including one-person-company style use cases where AI expands what one person can do without requiring full builder depth.</p>
      <p><a href="/lib/08-agents/agent-systems-handbook/reading-paths-practitioner"><strong>Open the Practitioner guide</strong></a></p>
    </td>
  </tr>
  <tr>
    <td valign="top" width="50%">
      <h3>Builder</h3>
      <p>For engineering-minded learners, new grads, and developers who want to build with AI more directly, from agent applications and workflows to startup-style products and technically deeper implementations.</p>
      <p><strong>What you get:</strong> a build-oriented path through concepts, patterns, systems, architecture choices, technical details, and concrete examples for people who want to create their own applications and go deeper into implementation.</p>
      <p><a href="/lib/08-agents/agent-systems-handbook/reading-paths-builder"><strong>Open the Builder guide</strong></a></p>
    </td>
    <td valign="top" width="50%">
      <h3>Contributor</h3>
      <p>For people who want to shape the lab by adding, revising, curating, or maintaining pages, notes, examples, and outward-facing extensions.</p>
      <p><strong>What you get:</strong> a public path into the editorial workflow, templates, review rules, placement standards, and portfolio-relevant open-source contribution.</p>
      <p><a href="/lib/08-agents/agent-systems-handbook/reading-paths-contributor"><strong>Open the Contributor guide</strong></a></p>
    </td>
  </tr>
</table>

## Contributor Guide

Public contributions in this repository currently fit into these paths:

- lab articles in `foundations/`, `patterns/`, `systems/`, `ecosystem/`, or
  `case-studies/`
- radar notes in [`radar/`](/lib/08-agents/agent-systems-handbook/radar-2)
- source projects in lane-local `examples/` folders
- practitioner skill packages in [`skills/`](/lib/08-agents/agent-systems-handbook/skills)
- curated reference notes in
  [`contributor-kit/reference-notes/`](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/contributor-kit/reference-notes/README.md)
- publication extensions in [`publications/`](/lib/08-agents/agent-systems-handbook/publications-2) once a
  lab page is ready for an outward-facing article or distribution surface

Start with [Contributing](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/CONTRIBUTING.md) and the [Contributor Kit](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/contributor-kit/index.mdx). Those pages define the public workflow, templates, review standards, and placement rules for lab articles, notes, and code that belong in this repository.
