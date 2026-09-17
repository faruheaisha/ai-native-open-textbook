---
title: "1.3 Browser and Server Basics"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/en/Advanced/01-environment-setup/03-browser-server.md"
sourceRel: "docs/en/Advanced/01-environment-setup/03-browser-server.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/en/Advanced/01-environment-setup/03-browser-server.md"
sourceSha256: "d3fa3d6c22db67d75c5ce1dd32f3fe3cf57ef67dc108381cd277ad25f82de343"
pageSha256: "d3fa3d6c22db67d75c5ce1dd32f3fe3cf57ef67dc108381cd277ad25f82de343"
contentMode: "local-full"
zh: ""
---

# 1.3 Browser and Server Basics

> **After reading this section, you will gain:**
>
> - An understanding of the basic responsibilities of browsers and servers, and how they work together
> - A grasp of the differences between development environments (localhost) and production environments
> - An understanding of why TypeScript needs to be compiled and the role of Node.js
> - The ability to distinguish where client-side code and server-side code run

> The introduction mentioned that "browsers can't understand TypeScript" because browsers and servers have different responsibilities.

## Basic Concepts

**Browsers** (Chrome, Firefox, Safari) run on users' computers and can only understand HTML, CSS, and JavaScript.

**Servers** are remote computers that run Web server software (such as Nginx and Apache), respond to browser requests, and return data.

**Client-side** = user devices (browsers, mobile apps), **server-side** = the service provider (servers, APIs).

## How a Web Application Works

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Enter URL
    Browser->>Server: Send request
    Server->>Browser: Return HTML/data
    Browser->>User: Display page
```

::: details 🌐 Click to explore: Browser and server interaction

> 💡 **Exercise**: Click "Play Demo" to watch the complete request-response flow, then click the browser or server to see what each one can do.
>
> 🎯 **Core concept**: The browser sends a request, the server processes it and returns data, and then the browser renders it into a page.
:::

## Browser vs Server

| | Browser (Client-side) | Server (Server-side) |
|---|-----------------|-----------------|
| **Responsibilities** | Render pages, handle interactions, request data | Process business logic, query databases, return results |
| **Storage** | Cookie, LocalStorage | File system, database |
| **Can run** | HTML, CSS, JavaScript | Node.js, Python, Go |
| **Cannot run** | TypeScript, backend languages | Browser APIs |

## Why Node.js Is Needed

TypeScript code must be compiled before it can run in the browser, and this compilation process requires a runtime environment:

```mermaid
graph LR
    A[TypeScript code] --> B[Node.js runtime environment]
    B --> C[Build tools]
    C --> D[JavaScript code]
    D --> E[Browser execution]
```

**What Node.js does**:

- Runs build tools on your computer
- Compiles TypeScript into JavaScript
- Bundles code
- Starts the development server

::: tip Modern frontend development requires Node.js

You must install it in the following cases:

- TypeScript projects (compilation required)
- Using npm packages (dependency management required)
- Running build tools (Vite, Webpack, Next.js)
- Local development (starting a development server)

:::

## Development Environment vs Production Environment

| | Development Environment (Localhost) | Production Environment (Public Internet) |
|---|---------------------|-----------------|
| **Location** | Your computer | Remote server |
| **Address** | `localhost:3000` | `https://example.com` |
| **Code** | Uncompressed, with debugging information | Compressed, obfuscated |
| **Errors** | Shows detailed stacks | Shows only necessary information |
| **Updates** | Hot reload (automatic refresh) | Requires redeployment |

## Runtime Environment Differences

**Servers can access**: file systems, databases, environment variables, all network requests

**Browsers can only access**: page content, user devices (with limited permissions), same-origin requests

::: tip Where does the code run?

When writing code, you should be clear about where it executes:

- **Frontend code**: runs in the browser and is visible to users
- **Backend code**: runs on the server and is not visible to users
- **API routes**: special in Next.js, they can both access server resources and respond to frontend requests

:::

## Related Content

- See: [1.1 The Evolution of Code Formats](/lib/07-coding/vibe-vibe/docs-en-Advanced-01-environment-setup-01-code-formats)
- See: [1.2 Technology Stack Concepts](/lib/07-coding/vibe-vibe/docs-en-Advanced-01-environment-setup-02-tech-stack)
- Up next: [1.5 Package Management and Project Configuration](/lib/07-coding/vibe-vibe/docs-en-Advanced-01-environment-setup-05-package-manager-and-config)
- See: [Chapter 10 Localhost and Public Internet Access](https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/en/Advanced/10-localhost-public-access/README.md)
