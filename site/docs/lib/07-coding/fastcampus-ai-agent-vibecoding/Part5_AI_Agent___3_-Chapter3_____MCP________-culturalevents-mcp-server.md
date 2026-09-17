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
entryUrl: "https://github.com/Koomook/fastcampus-ai-agent-vibecoding/blob/b24208b48c3945769327dbcafc2d632189369520/Part5_AI_Agent_프로젝트_3개/Chapter3_바이브코딩으로_공공_MCP_자동_생성하고_에이전트_연결하기/culturalevents-mcp-server/README.md"
sourceRel: "Part5_AI_Agent_프로젝트_3개/Chapter3_바이브코딩으로_공공_MCP_자동_생성하고_에이전트_연결하기/culturalevents-mcp-server/README.md"
rawUrl: "/raw/07-coding/fastcampus-ai-agent-vibecoding/Part5_AI_Agent_프로젝트_3개/Chapter3_바이브코딩으로_공공_MCP_자동_생성하고_에이전트_연결하기/culturalevents-mcp-server/README.md"
sourceSha256: "6b4f5b0ff6e0505c0fc4b02de684764855be57abf58458668d948a351452def1"
pageSha256: "6b4f5b0ff6e0505c0fc4b02de684764855be57abf58458668d948a351452def1"
contentMode: "local-full"
zh: ""
---

# Seoul Cultural Events MCP Server

A Model Context Protocol (MCP) server that provides access to Seoul's cultural events data through the Seoul Open Data API.

## Overview

This MCP server enables AI assistants like Claude to search and retrieve real-time information about cultural events in Seoul, including:

- 🎭 Performances (concerts, theater, musicals)
- 🎨 Exhibitions and art events
- 🎪 Cultural festivals
- 📍 Event locations and venues
- 💰 Ticket prices and booking information
- 📅 Event schedules and dates

**Data Source:** Seoul Open Data Portal - 서울시 문화행사 정보 (culturalEventInfo)
**Update Frequency:** Daily

## Features

- ✅ **23 Data Fields**: Comprehensive event information including title, venue, dates, fees, performers, and more
- ✅ **Flexible Filtering**: Search by category, title, or date
- ✅ **Pagination Support**: Handle large result sets efficiently (up to 1000 records per request)
- ✅ **Error Handling**: Graceful handling of API errors and validation
- ✅ **Type Safety**: Full Pydantic models for data validation
- ✅ **Async Support**: Built with async/await for optimal performance

## Installation

### Prerequisites

- Python 3.10 or higher
- [uv](https://github.com/astral-sh/uv) package manager
- Seoul Open Data API key (free registration)

### Quick Start

   ```bash
