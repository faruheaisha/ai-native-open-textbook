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
entryUrl: "https://github.com/microsoft/generative-ai-for-beginners/blob/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/README.md"
zh: ""
---

# Getting Started with this course

We are very excited for you to start this course and see what you get inspired to build with Generative AI!

To ensure your success, this page outlines setup steps, technical requirements, and where to get help if needed.

## Setup Steps

To start taking this course, you will need to complete the following steps.

### 1. Fork this Repo

[Fork this entire repo](https://github.com/microsoft/generative-ai-for-beginners/fork?WT.mc_id=academic-105485-koreyst) to your own GitHub account to be able to change any code and complete the challenges. You can also [star (🌟) this repo](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars?WT.mc_id=academic-105485-koreyst) to find it and related repos easier.

### 2. Create a codespace

To avoid any dependency issues when running the code, we recommend running this course in a [GitHub Codespaces](https://github.com/features/codespaces?WT.mc_id=academic-105485-koreyst).

In your fork: **Code -> Codespaces -> New on main**

![Dialog showing buttons to create a codespace](https://raw.githubusercontent.com/microsoft/generative-ai-for-beginners/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/00-course-setup/images/who-will-pay.webp)

#### 2.1 Add a secret

1. ⚙️ Gear icon -> Command Pallete-> Codespaces : Manage user secret -> Add a new secret.
2. Name OPENAI_API_KEY, paste your key, Save.

### 3.  What’s next?

| I want to…          | Go to…                                                                  |
|---------------------|-------------------------------------------------------------------------|
| Start Lesson 1      | [`01-introduction-to-genai`](/lib/01-foundations/microsoft-generative-ai-for-beginners/01-introduction-to-genai-README)     |
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

   ```bash
   touch .env
   ```

   Windows:

   ```cmd
   echo . > .env
   ```

3. **Edit the `.env` File**: Open the `.env` file in a text editor (e.g., VS Code, Notepad++, or any other editor). Add the following lines to the file, replacing the placeholders with your actual Microsoft Foundry Models endpoint and key (see [`providers.md`](/lib/01-foundations/microsoft-generative-ai-for-beginners/00-course-setup-03-providers) for how to get these):

   > **Note:** GitHub Models (and its `GITHUB_TOKEN` variable) is retiring at the end of July 2026. Use [Microsoft Foundry Models](https://ai.azure.com/catalog/models?WT.mc_id=academic-105485-koreyst) instead.

   ```env
   AZURE_INFERENCE_ENDPOINT=your_foundry_endpoint_here
   AZURE_INFERENCE_CREDENTIAL=your_foundry_api_key_here
   ```

4. **Save the File**: Save the changes and close the text editor.

5. **Install `python-dotenv`**: If you haven't already, you'll need to install the `python-dotenv` package to load environment variables from the `.env` file into your Python application. You can install it using `pip`:

   ```bash
   pip install python-dotenv
   ```

6. **Load Environment Variables in Your Python Script**: In your Python script, use the `python-dotenv` package to load the environment variables from the `.env` file:

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

## How to Run locally on your computer

To run the code locally on your computer, you would need to have some version of [Python installed](https://www.python.org/downloads/?WT.mc_id=academic-105485-koreyst).

To then use the repository, you need to clone it:

```shell
git clone https://github.com/microsoft/generative-ai-for-beginners
cd generative-ai-for-beginners
```

Once you have everything checked out, you can get started!

## Optional Steps

### Installing Miniconda

[Miniconda](https://conda.io/en/latest/miniconda.html?WT.mc_id=academic-105485-koreyst) is a lightweight installer for installing [Conda](https://docs.conda.io/en/latest?WT.mc_id=academic-105485-koreyst), Python, as well as a few packages.
Conda itself is a package manager, that makes it easy to setup and switch between different Python [**virtual environments**](https://docs.python.org/3/tutorial/venv.html?WT.mc_id=academic-105485-koreyst) and packages. It also comes in handy for installing packages that are not available via `pip`.

You can follow the [MiniConda installation guide](https://docs.anaconda.com/free/miniconda/#quick-command-line-install?WT.mc_id=academic-105485-koreyst) to set it up.

With Miniconda installed, you need to clone the [repository](https://github.com/microsoft/generative-ai-for-beginners/fork?WT.mc_id=academic-105485-koreyst) (if you haven't already)

Next, you need to create a virtual environment. To do this with Conda, go ahead and create a new environment file (_environment.yml_). If you are following along using Codespaces, create this within the `.devcontainer` directory, thus `.devcontainer/environment.yml`.

Go ahead and populate your environment file with the snippet below:

```yml
