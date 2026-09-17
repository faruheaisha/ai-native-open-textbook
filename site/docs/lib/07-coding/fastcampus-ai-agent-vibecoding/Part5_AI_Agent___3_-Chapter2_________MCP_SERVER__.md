---
title: "Seoul Cultural Events MCP Server"
sourceId: "07-coding/fastcampus-ai-agent-vibecoding"
sourceTitle: "FastCampus AI Agent 바이브코딩 강의"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding"
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part5_AI_Agent_프로젝트_3개/Chapter2_바이브코딩으로_서울시_문화행사_조회하는_MCP_SERVER_만들기/README.md"
sourceRel: "Part5_AI_Agent_프로젝트_3개/Chapter2_바이브코딩으로_서울시_문화행사_조회하는_MCP_SERVER_만들기/README.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part5_AI_Agent_프로젝트_3개/Chapter2_바이브코딩으로_서울시_문화행사_조회하는_MCP_SERVER_만들기/README.md"
sourceSha256: "2c4999b06b2c2c5fe3f5d5d58817a87fd5b642c0e36efb8d2ad6e0b9389725d8"
pageSha256: "2c4999b06b2c2c5fe3f5d5d58817a87fd5b642c0e36efb8d2ad6e0b9389725d8"
contentMode: "local-full"
zh: ""
---

# Seoul Cultural Events MCP Server

MCP (Model Context Protocol) server providing access to Seoul's cultural events through the Seoul Open Data Plaza API.

## Overview

This MCP server enables LLMs (like Claude) to search and retrieve information about cultural events in Seoul, Korea. It wraps the Seoul Open Data Plaza's cultural events API into a simple, easy-to-use MCP interface.

## Features

- 🔍 Search cultural events by category, date, or title
- 🎭 Support for multiple event types (Exhibition, Concert, Theater, Classical)
- 📍 Access to Seoul's 25 district information
- 🚀 Built with FastMCP for simple, fast development
- 🔄 Asynchronous API calls using httpx

## Tech Stack

- **Language**: Python 3.11+
- **Framework**: FastMCP 2.0
- **Package Manager**: uv
- **Communication**: STDIO
- **HTTP Client**: httpx (async)

## Quick Start

### 1. Installation

```bash
# Clone the repository
