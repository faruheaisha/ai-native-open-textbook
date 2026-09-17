---
title: "Getting Started with this course"
sourceId: "01-foundations/microsoft-generative-ai-for-beginners"
sourceTitle: "Generative AI for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/microsoft/generative-ai-for-beginners"
entryUrl: "https://github.com/microsoft/generative-ai-for-beginners/blob/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/00-course-setup/README.md"
sourceRel: "00-course-setup/README.md"
rawUrl: "/raw/01-foundations/microsoft-generative-ai-for-beginners/00-course-setup/README.md"
sourceSha256: "e9ab566374e2e39e8778812159d62c04b1c0baf44173229c30262290ae1b0836"
pageSha256: "e9ab566374e2e39e8778812159d62c04b1c0baf44173229c30262290ae1b0836"
contentMode: "local-full"
zh: "on"
---

# Getting Started with this course

We are very excited for you to start this course and see what you get inspired to build with Generative AI!

<div class="tb-zh"><p>非常期待你开始这门课程，看看生成式 AI 会启发你做出什么。</p></div>

To ensure your success, this page outlines setup steps, technical requirements, and where to get help if needed.

<div class="tb-zh"><p>为帮助你顺利学完，本页列出环境配置步骤、技术要求，以及遇到问题时可以去哪里求助。</p></div>

## Setup Steps

To start taking this course, you will need to complete the following steps.

<div class="tb-zh"><p>开始这门课之前，需要完成以下步骤。</p></div>

### 1. Fork this Repo

[Fork this entire repo](https://github.com/microsoft/generative-ai-for-beginners/fork?WT.mc_id=academic-105485-koreyst) to your own GitHub account to be able to change any code and complete the challenges. You can also [star (🌟) this repo](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars?WT.mc_id=academic-105485-koreyst) to find it and related repos easier.

<div class="tb-zh"><p>把整个仓库 fork 到自己的 GitHub 账号，这样才能修改代码、完成挑战；也可以给仓库加星标（🌟），方便日后找到它和相关仓库。</p></div>

### 2. Create a codespace

To avoid any dependency issues when running the code, we recommend running this course in a [GitHub Codespaces](https://github.com/features/codespaces?WT.mc_id=academic-105485-koreyst).

<div class="tb-zh"><p>为了避免运行代码时出现依赖问题，建议在 GitHub Codespaces 中学习本课程。</p></div>

In your fork: **Code -> Codespaces -> New on main**

<div class="tb-zh"><p>在自己的 fork 中依次点击：Code -&gt; Codespaces -&gt; New on main。</p></div>

![Dialog showing buttons to create a codespace](/mirror/58/58e2166bdda561f9f08a85924ced9c80acc9da87.webp)

#### 2.1 Add a secret

1. ⚙️ Gear icon -> Command Pallete-> Codespaces : Manage user secret -> Add a new secret.
2. Name OPENAI_API_KEY, paste your key, Save.

<div class="tb-zh"><p>1. 齿轮图标 → Command Palette → Codespaces: Manage user secret → Add a new secret；2. 名称填 OPENAI_API_KEY，粘贴你的 key，保存。</p></div>

### 3.  What’s next?

| I want to…          | Go to…                                                                  |
|---------------------|-------------------------------------------------------------------------|
| Start Lesson 1      | [`01-introduction-to-genai`](/lib/01-foundations/microsoft-generative-ai-for-beginners/01-introduction-to-genai)     |
| Work offline        | [`setup-local.md`](/lib/01-foundations/microsoft-generative-ai-for-beginners/00-course-setup-02-setup-local)                                   |
| Setup an LLM Provider | [`providers.md`](/lib/01-foundations/microsoft-generative-ai-for-beginners/00-course-setup-03-providers)                                        |
| Meet other learners | [Join our Discord](https://aka.ms/genai-discord?WT.mc_id=academic-105485-koreyst)   |

## Troubleshooting

| Symptom                                   | Fix                                                             |
|-------------------------------------------|-----------------------------------------------------------------|
| Container build stuck > 10 min            | **Codespaces ➜ “Rebuild Container”**                            |
| `python: command not found`               | Terminal didn’t attach; click **+** ➜ *bash*                    |
| `401 Unauthorized` from OpenAI            | Wrong / expired `OPENAI_API_KEY`                                |
| VS Code shows “Dev container mounting…”   | Refresh the browser tab—Codespaces sometimes loses connection   |
| Notebook kernel missing                   | Notebook menu ➜ **Kernel ▸ Select Kernel ▸ Python 3**           |

   Unix-based systems:

<div class="tb-zh"><p>基于 Unix 的系统：</p></div>

   ```bash
   touch .env
   ```

   Windows:

<div class="tb-zh"><p>Windows：</p></div>

   ```cmd
   echo . > .env
   ```

3. **Edit the `.env` File**: Open the `.env` file in a text editor (e.g., VS Code, Notepad++, or any other editor). Add the following lines to the file, replacing the placeholders with your actual Microsoft Foundry Models endpoint and key (see [`providers.md`](/lib/01-foundations/microsoft-generative-ai-for-beginners/00-course-setup-03-providers) for how to get these):

<div class="tb-zh"><p>3. 编辑 .env 文件：用文本编辑器（VS Code、Notepad++ 或其他均可）打开 .env，写入下面几行，把占位符替换成你自己的 Microsoft Foundry Models endpoint 和 key（获取方式见 providers.md）：</p></div>

   > **Note:** GitHub Models (and its `GITHUB_TOKEN` variable) is retiring at the end of July 2026. Use [Microsoft Foundry Models](https://ai.azure.com/catalog/models?WT.mc_id=academic-105485-koreyst) instead.

<div class="tb-zh"><p>注意：GitHub Models 及其 GITHUB_TOKEN 变量将于 2026 年 7 月底退役，请改用 Microsoft Foundry Models。</p></div>

   ```env
   AZURE_INFERENCE_ENDPOINT=your_foundry_endpoint_here
   AZURE_INFERENCE_CREDENTIAL=your_foundry_api_key_here
   ```

4. **Save the File**: Save the changes and close the text editor.

<div class="tb-zh"><p>4. 保存文件：保存修改并关闭编辑器。</p></div>

5. **Install `python-dotenv`**: If you haven't already, you'll need to install the `python-dotenv` package to load environment variables from the `.env` file into your Python application. You can install it using `pip`:

<div class="tb-zh"><p>5. 安装 python-dotenv：如果还没安装，需要先装上 python-dotenv，才能把 .env 中的环境变量载入 Python 应用；用 pip 即可安装。</p></div>

   ```bash
   pip install python-dotenv
   ```

6. **Load Environment Variables in Your Python Script**: In your Python script, use the `python-dotenv` package to load the environment variables from the `.env` file:

<div class="tb-zh"><p>6. 在 Python 脚本中加载环境变量：在脚本里用 python-dotenv 把 .env 中的变量读进来。</p></div>

   ```python
   from dotenv import load_dotenv
   import os

   # Load environment variables from .env file
   load_dotenv()

   # Access the Microsoft Foundry Models variables
   endpoint = os.getenv("AZURE_INFERENCE_ENDPOINT")
   token = os.getenv("AZURE_INFERENCE_CREDENTIAL")

   print(endpoint)
   ```

That's it! You've successfully created a `.env` file, added your Microsoft Foundry Models credentials, and loaded them into your Python application.

<div class="tb-zh"><p>至此，你已经建好 .env 文件、填入了 Microsoft Foundry Models 凭据，并成功加载到 Python 应用里。</p></div>

## How to Run locally on your computer

To run the code locally on your computer, you would need to have some version of [Python installed](https://www.python.org/downloads/?WT.mc_id=academic-105485-koreyst).

<div class="tb-zh"><p>要在自己的电脑上本地运行代码，需要先安装某个版本的 Python。</p></div>

To then use the repository, you need to clone it:

<div class="tb-zh"><p>接下来克隆仓库，然后才能使用：</p></div>

```shell
git clone https://github.com/microsoft/generative-ai-for-beginners
cd generative-ai-for-beginners
```

Once you have everything checked out, you can get started!

<div class="tb-zh"><p>一切就绪之后就可以开始了。</p></div>

## Optional Steps

### Installing Miniconda

[Miniconda](https://conda.io/en/latest/miniconda.html?WT.mc_id=academic-105485-koreyst) is a lightweight installer for installing [Conda](https://docs.conda.io/en/latest?WT.mc_id=academic-105485-koreyst), Python, as well as a few packages.
Conda itself is a package manager, that makes it easy to setup and switch between different Python [**virtual environments**](https://docs.python.org/3/tutorial/venv.html?WT.mc_id=academic-105485-koreyst) and packages. It also comes in handy for installing packages that are not available via `pip`.

<div class="tb-zh"><p>Miniconda 是一个轻量安装器，用来安装 Conda、Python 以及少量常用包。Conda 本身是包管理器，方便创建和切换不同的 Python 虚拟环境与依赖组合，也适合安装无法通过 pip 获取的包。</p></div>

You can follow the [MiniConda installation guide](https://docs.anaconda.com/free/miniconda/#quick-command-line-install?WT.mc_id=academic-105485-koreyst) to set it up.

<div class="tb-zh"><p>按 Miniconda 官方安装指南完成安装即可。</p></div>

With Miniconda installed, you need to clone the [repository](https://github.com/microsoft/generative-ai-for-beginners/fork?WT.mc_id=academic-105485-koreyst) (if you haven't already)

<div class="tb-zh"><p>装好 Miniconda 后，克隆仓库（如果还没有克隆的话）。</p></div>

Next, you need to create a virtual environment. To do this with Conda, go ahead and create a new environment file (_environment.yml_). If you are following along using Codespaces, create this within the `.devcontainer` directory, thus `.devcontainer/environment.yml`.

<div class="tb-zh"><p>接下来创建虚拟环境。用 Conda 的话，新建一个环境文件 environment.yml。如果是在 Codespaces 里跟做，就把它建在 .devcontainer 目录下，即 .devcontainer/environment.yml。</p></div>

Go ahead and populate your environment file with the snippet below:

<div class="tb-zh"><p>把下面的片段填进环境文件：</p></div>

```yml
