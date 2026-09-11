---
title: "Building an End-to-End MCP Application"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/README.md"
zh: "on"
---

# Building an End-to-End MCP Application

Welcome to Unit 2 of the MCP Course! 

<div class="tb-zh"><p>欢迎来到 MCP 课程的第二单元！</p></div>

In this unit, we'll build a complete MCP application from scratch, focusing on creating a server with Gradio and connecting it with multiple clients. This hands-on approach will give you practical experience with the entire MCP ecosystem.

<div class="tb-zh"><p>在这一单元里，我们会从零构建一个完整的 MCP 应用，重点是用 Gradio 创建服务端，并把它与多个客户端连接起来。这种动手方式会让你对整个 MCP 生态获得实际经验。</p></div>

> [!TIP]
> In this unit, we're going to build a simple MCP server and client using Gradio and the HuggingFace hub. In the next unit, we'll build a more complex server that tackles a real-world use case.

<div class="tb-zh"><p>本单元我们将用 Gradio 和 Hugging Face Hub 构建一个简单的 MCP 服务端与客户端。下一个单元再构建一个更复杂、面向真实用例的服务端。</p></div>

## What You'll Learn

In this unit, you will:

<div class="tb-zh"><p>在本单元中，你将：</p></div>

- Create an MCP Server using Gradio's built-in MCP support
- Build a sentiment analysis tool that can be used by AI models
- Connect to the server using different client implementations:
  - A HuggingFace.js-based client
  - A SmolAgents-based client for Python
- Deploy your MCP Server to Hugging Face Spaces
- Test and debug the complete system

<div class="tb-zh"><p>用 Gradio 内置的 MCP 支持创建 MCP 服务端；构建一个可供 AI 模型调用的情感分析工具；用不同的客户端实现连接该服务端：基于 HuggingFace.js 的客户端，以及基于 SmolAgents 的 Python 客户端；把 MCP 服务端部署到 Hugging Face Spaces；测试并调试整套系统。</p></div>

By the end of this unit, you'll have a working MCP application that demonstrates the power and flexibility of the protocol.

<div class="tb-zh"><p>学完本单元，你会得到一个可运行的 MCP 应用，它展示了这一协议的能力与灵活性。</p></div>

## Prerequisites

Before proceeding with this unit, make sure you:

<div class="tb-zh"><p>在进入本单元之前，请确认你已：</p></div>

- Have completed Unit 1 or have a basic understanding of MCP concepts
- Are comfortable with both Python and JavaScript/TypeScript
- Have a basic understanding of APIs and client-server architecture
- Have a development environment with:
  - Python 3.10+
  - Node.js 18+
  - A Hugging Face account (for deployment)

<div class="tb-zh"><p>已完成第一单元，或对 MCP 概念有基本了解；能熟练使用 Python 与 JavaScript/TypeScript；对 API 与客户端—服务端架构有基本认识；具备开发环境：Python 3.10+、Node.js 18+，以及一个 Hugging Face 账号（用于部署）。</p></div>

## Our End-to-End Project

We'll build a sentiment analysis application that consists of three main parts: the server, the client, and the deployment.

<div class="tb-zh"><p>我们要构建一个情感分析应用，它由三个主要部分组成：服务端、客户端和部署。</p></div>

![sentiment analysis application](https://huggingface.co/datasets/mcp-course/images/resolve/main/unit2/1.png)

### Server Side

- Uses Gradio to create a web interface and MCP server via `gr.Interface`
- Implements a sentiment analysis tool using TextBlob
- Exposes the tool through both HTTP and MCP protocols

<div class="tb-zh"><p>用 Gradio 通过 gr.Interface 创建网页界面与 MCP 服务端；用 TextBlob 实现一个情感分析工具；通过 HTTP 与 MCP 两种协议暴露该工具。</p></div>

### Client Side

- Implements a HuggingFace.js client
- Or, creates a smolagents Python client
- Demonstrates how to use the same server with different client implementations

<div class="tb-zh"><p>实现一个 HuggingFace.js 客户端；或者用 smolagents 写一个 Python 客户端；演示如何用同一套服务端搭配不同客户端实现。</p></div>

### Deployment

- Deploys the server to Hugging Face Spaces
- Configures the clients to work with the deployed server

<div class="tb-zh"><p>把服务端部署到 Hugging Face Spaces；把客户端配置为连接已部署的服务端。</p></div>

## Let's Get Started!

Are you ready to build your first end-to-end MCP application? Let's begin by setting up the development environment and creating our Gradio MCP server.

<div class="tb-zh"><p>准备好构建你的第一个端到端 MCP 应用了吗？我们先从搭建开发环境、创建 Gradio MCP 服务端开始。</p></div>
