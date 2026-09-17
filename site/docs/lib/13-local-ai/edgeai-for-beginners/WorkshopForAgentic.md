---
title: "🎙️ The AI Podcast Studio Workshop"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/WorkshopForAgentic/README.md"
sourceRel: "WorkshopForAgentic/README.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/WorkshopForAgentic/README.md"
sourceSha256: "8ff19227c8ce1d136e3c83d1f00ea8bcfcb4ddfa944722fed4b47071e0fd2e33"
pageSha256: "8ff19227c8ce1d136e3c83d1f00ea8bcfcb4ddfa944722fed4b47071e0fd2e33"
contentMode: "local-full"
zh: "on"
---

# 🎙️ The AI Podcast Studio Workshop

> 🌏 [中文版 (Chinese Version)](/lib/13-local-ai/edgeai-for-beginners/WorkshopForAgentic-translation-zh-cn)

<div class="tb-zh"><p>🌏 中文版</p></div>

![logo](/mirror/ab/ab7327b857c0861591f662141d020b169091bd0a.png)

## Your Mission

Welcome to **The AI Podcast Studio**! You're about to launch your own tech podcast called "Future Bytes" — but here's the twist: you'll build an AI-powered production team to help you create it. No more endless hours of research, scriptwriting, and audio editing. Instead, you'll code your way to becoming a podcast producer with AI superpowers.

<div class="tb-zh"><p>欢迎来到《AI 播客工作室》！你即将创办自己的科技播客《Future Bytes》——但有个转折：你会亲手搭建一支 AI 制作团队来帮你把它做出来。再也不需要花无数小时做调研、写稿和剪音频；相反，你会用写代码的方式，成为拥有 AI 超能力的播客制作人。</p></div>

## The Story

Imagine this: You and your friends want to start a podcast about the coolest tech trends, but everyone's busy with school, work, or just life. What if you could build a team of AI agents to do the heavy lifting? One agent researches topics, another writes engaging scripts, and a third turns text into natural-sounding conversations. Sound like sci-fi? Let's make it real.

<div class="tb-zh"><p>想象一下：你和朋友们想开一档聊最酷科技趋势的播客，但每个人都在忙学业、工作或者生活。如果你能搭一支 AI agent 团队来干重活呢？一个 agent 调研选题，另一个写出吸引人的脚本，第三个把文字变成听起来自然的对话。听起来像科幻？我们把它变成现实。</p></div>

## What You'll Learn

By the end of this workshop, you'll know how to:
- 🤖 Deploy your own local AI model (no API costs, no cloud dependency!)
- 🔧 Build specialized AI agents that actually work together
- 🎬 Create a complete podcast production pipeline from idea to audio

<div class="tb-zh"><p>到这场工作坊结束时，你将学会：🤖 部署自己的本地 AI 模型（没有 API 费用，也不依赖云端！）；🔧 构建真正能协同工作的专职 AI agent；🎬 打通从想法到音频的完整播客生产流水线。</p></div>

## Your Journey: Three Acts

![arch](/mirror/44/4421c01d6e2689042b26c8d06618310d563e23aa.png)

Like any good story, we've got three acts. Each one builds your AI podcast studio piece by piece:

<div class="tb-zh"><p>就像任何好故事一样，我们分三幕。每一幕都一块一块地搭起你的 AI 播客工作室：</p></div>

| Episode | Your Quest | What Happens | Skills Unlocked |
|---------|-----------|--------------|----------------|
| **Act 1** | [Meet Your AI Assistants](/lib/13-local-ai/edgeai-for-beginners/WorkshopForAgentic-md-01.BuildAIAgentWithSLM) | You discover how to create AI agents that can chat, search the web, and even solve problems. Think of them as your research interns who never sleep. | 🎯 Build your first agent<br>🛠️ Give it superpowers (tools!)<br>🧠 Teach it to think<br>🌐 Connect it to the internet |
| **Act 2** | [Assemble Your Production Team](/lib/13-local-ai/edgeai-for-beginners/WorkshopForAgentic-md-02.AIAgentOrchestrationAndWorkflows) | Now things get interesting! You'll orchestrate multiple AI agents to work together like a real podcast team. One researches, one writes, you approve — teamwork makes the dream work. | 🎭 Coordinate multiple agents<br>🔄 Build approval workflows<br>🖥️ Test with DevUI interface<br>✋ Keep humans in control |
| **Act 3** | [Bring Your Podcast to Life](/lib/13-local-ai/edgeai-for-beginners/WorkshopForAgentic-md-03.Multi-SpeakerPodcastGenerationWithVibeVoice) | The finale! Transform your text scripts into actual podcast audio with realistic voices and natural conversations. Your "Future Bytes" podcast is ready to ship! | 🎤 Text-to-speech magic<br>👥 Multiple speaker voices<br>⏱️ Long-form audio<br>🚀 Full automation |

Each act unlocks new abilities. Skip ahead if you're brave, but we recommend following the story!

<div class="tb-zh"><p>每一幕都会解锁新能力。胆子大的可以直接跳到后面，但我们建议顺着故事走！</p></div>

## Environment Requirements

This workshop supports various hardware environments:
- **CPU**: Suitable for testing and small-scale usage
- **GPU**: Recommended for production environments, significantly improves inference speed
- **NPU**: Supports next-generation neural processing unit acceleration

<div class="tb-zh"><p>这场工作坊支持多种硬件环境：CPU——适合测试和小规模使用；GPU——推荐用于生产环境，能显著提升推理速度；NPU——支持下一代神经处理单元加速。</p></div>

## What You'll Need

### Software Checklist ✅
- **Python 3.10+** (Your coding language)
- **Ollama** (Runs AI models on your machine)
- **VS Code** (Your code editor)
- **Python Extension** (Makes VS Code smarter)
- **Git** (For grabbing code)

### Hardware Check 💻
- **Can I run this?**: 8GB RAM, 10GB free space (works, but might be slow)
- **Ideal setup**: 16GB+ RAM, a decent GPU (smooth sailing!)
- **Got an NPU?**: Even better! Next-gen performance unlocked 🚀

## Setup Your Studio 🎬

### Step 1: Python Power-Up

Make sure you've got Python 3.10 or newer:

<div class="tb-zh"><p>确认你装的是 Python 3.10 或更新版本：</p></div>

```bash
python --version
# Should show Python 3.10.x or higher
```

No Python? Grab it from [python.org](https://python.org) — it's free!

<div class="tb-zh"><p>没装 Python？去 python.org 下载，它是免费的！</p></div>

### Step 2: Get Ollama (Your AI Model Runner)

Head to [ollama.ai](https://ollama.ai) and download Ollama for your OS. Think of it as the engine that runs your AI models locally.

<div class="tb-zh"><p>访问 ollama.ai，按你的操作系统下载 Ollama。把它理解成在本地运行 AI 模型的引擎。</p></div>

Check if it's ready:

<div class="tb-zh"><p>检查它是否就绪：</p></div>

```bash
ollama --version
```

### Step 3: Download Your AI Brain 🧠

Time to grab the Qwen-3-8B model (it's like hiring your first AI assistant):

<div class="tb-zh"><p>接下来获取 Qwen-3-8B 模型（相当于雇了你的第一位 AI 助理）：</p></div>

```bash
ollama pull qwen3:8b
```

*This might take a few minutes. Perfect time for a coffee break! ☕*

<div class="tb-zh"><p>这可能需要几分钟。正好去喝杯咖啡！☕</p></div>

### Step 4: Set Up VS Code

Grab [Visual Studio Code](https://code.visualstudio.com/) if you don't have it. It's the best code editor around (fight me 😄).

<div class="tb-zh"><p>如果还没装，去拿下 Visual Studio Code。它是目前最好的代码编辑器（不服来辩 😄）。</p></div>

### Step 5: Python Extension

In VS Code:
1. Hit `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac)
2. Search "Python"
3. Install the official Microsoft Python extension

<div class="tb-zh"><p>在 VS Code 里：1）按 Ctrl+Shift+X（Mac 上是 Cmd+Shift+X）；2）搜索「Python」；3）安装微软官方的 Python 扩展。</p></div>

### Step 6: You're All Set! 🎉

Seriously, you're ready to rock. Let's build some AI magic!

<div class="tb-zh"><p>说真的，你已经可以开干了。让我们造点 AI 魔法！</p></div>

### Step 7: Install Microsoft Agent Framework and Related Packages 📦

Install all required dependencies for the workshop:

<div class="tb-zh"><p>安装这场工作坊所需的全部依赖：</p></div>

```bash
pip install -r ./Installations/requirements.txt -U
```

*This will install Microsoft Agent Framework and all necessary packages. Grab a coffee — first-time setup might take a few minutes! ☕*

<div class="tb-zh"><p>这会安装 Microsoft Agent Framework 以及所有必需的包。去倒杯咖啡——首次安装可能要几分钟！☕</p></div>

## Workshop Instructions

Detailed project structure, configuration steps, and execution methods will be explained step-by-step during the workshop.

<div class="tb-zh"><p>详细的项目结构、配置步骤和执行方法，会在工作坊过程中逐步讲解。</p></div>

## Troubleshooting (When Things Go Wrong) 🔧

### "Ugh, the model download is taking forever!"
**Fix**: Use a VPN or configure Ollama with a mirror source. Sometimes the internet just hates us.

### "My computer is dying! Out of memory!"
**Fix**: Switch to a smaller model or tweak the `num_ctx` setting to use less memory. Think of it as putting your AI on a diet.

### "Can I make this faster with my GPU?"
**Fix**: Ollama auto-detects GPUs! Just make sure your GPU drivers are up to date. Free speed boost! 🏎️

## Extra Resources (For the Curious) 📚

- [Ollama Docs](https://github.com/ollama/ollama) — Deep dive into local AI models
- [Microsoft Agent Framework](https://microsoft.github.io/autogen/) — Learn more about building agent teams
- [Qwen Model Info](https://qwenlm.github.io/) — Meet your AI assistant's brain

<div class="tb-zh"><p>延伸阅读：Ollama 文档——深入了解本地 AI 模型；Microsoft Agent Framework——进一步了解如何构建 agent 团队；Qwen 模型资料——认识你 AI 助理的大脑。</p></div>
