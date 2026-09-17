---
title: "Local Setup 🖥️"
sourceId: "01-foundations/microsoft-generative-ai-for-beginners"
sourceTitle: "Generative AI for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/microsoft/generative-ai-for-beginners"
entryUrl: "https://github.com/microsoft/generative-ai-for-beginners/blob/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/00-course-setup/02-setup-local.md"
sourceRel: "00-course-setup/02-setup-local.md"
rawUrl: "/raw/01-foundations/microsoft-generative-ai-for-beginners/00-course-setup/02-setup-local.md"
sourceSha256: "7b2c2f8a25778410b126f674f28db3086995dc2443af9dd0f1fb77b2e08302ce"
pageSha256: "7b2c2f8a25778410b126f674f28db3086995dc2443af9dd0f1fb77b2e08302ce"
contentMode: "local-full"
zh: "on"
---

# Local Setup 🖥️

**Use this guide if you prefer to run everything on your own laptop.**   
You have two paths: **(A) native Python + virtual-env** or **(B) VS Code Dev Container with Docker**.  
Choose whichever feels easier—both lead to the same lessons.

<div class="tb-zh"><p>如果你更愿意把一切都跑在自己的笔记本上，就用这份指南。有两条路可选：(A) 原生 Python + 虚拟环境，或 (B) 配合 Docker 的 VS Code Dev Container。哪条顺眼选哪条，最终都通向同一套课程。</p></div>

## 1.  Prerequisites

| Tool               | Version / Notes                                                                      |
|--------------------|--------------------------------------------------------------------------------------|
| **Python**         | 3.10 + (get it from <https://python.org>)                                            |
| **Git**            | Latest (comes with Xcode / Git for Windows / Linux package manager)                   |
| **VS Code**        | Optional but recommended <https://code.visualstudio.com>                             |
| **Docker Desktop** | *Only* for Option B. Free install: <https://docs.docker.com/desktop/>                |

> 💡 **Tip** – Verify tools in a terminal:  
> `python --version`, `git --version`, `docker --version`, `code --version`  

<div class="tb-zh"><p>提示：在终端里用 python --version、git --version、docker --version、code --version 检查工具是否装好。</p></div>

## 2.  Option A – Native Python (quickest)

### Step 1  Clone this repo

```bash
