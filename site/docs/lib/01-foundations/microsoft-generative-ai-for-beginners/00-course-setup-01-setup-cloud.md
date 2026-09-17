---
title: "Cloud Setup ☁️ – GitHub Codespaces"
sourceId: "01-foundations/microsoft-generative-ai-for-beginners"
sourceTitle: "Generative AI for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/microsoft/generative-ai-for-beginners"
entryUrl: "https://github.com/microsoft/generative-ai-for-beginners/blob/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/00-course-setup/01-setup-cloud.md"
sourceRel: "00-course-setup/01-setup-cloud.md"
rawUrl: "/raw/01-foundations/microsoft-generative-ai-for-beginners/00-course-setup/01-setup-cloud.md"
sourceSha256: "6dceb5f93621c707f2a5a8cbc034d4e68bc91c7700b35dafe6cd88218a97cafb"
pageSha256: "6dceb5f93621c707f2a5a8cbc034d4e68bc91c7700b35dafe6cd88218a97cafb"
contentMode: "local-full"
zh: "on"
---

# Cloud Setup ☁️ – GitHub Codespaces

**Use this guide if you don’t want to install anything locally.**  
Codespaces gives you a free, browser-based VS Code instance with all dependencies pre-installed.

<div class="tb-zh"><p>如果你不想在本地安装任何东西，就照这份指南做。Codespaces 会给出一个免费的浏览器版 VS Code 实例，所有依赖都已预装。</p></div>

---

## 1.  Why Codespaces?

| Benefit | What it means for you |
|---------|----------------------|
| ✅ Zero installs | Works on Chromebook, iPad, school lab PCs… |
| ✅ Pre-built dev container | Python 3, Node.js, .NET, Java already inside |
| ✅ Free quota | Personal accounts get **120 core-hours / 60 GB-hours per month** |

> 💡 **Tip**  
> Keep your quota healthy by **stopping** or **deleting** idle codespaces  
> (View ▸ Command Palette ▸ *Codespaces: Stop Codespace*).

<div class="tb-zh"><p>提示：闲置的 codespace 要及时停止或删除，以免浪费配额（菜单 View ▸ Command Palette ▸ Codespaces: Stop Codespace）。</p></div>

---

## 2.  Create a Codespace (one click)

1. **Fork** this repo (top-right **Fork** button).  
2. In your fork, click **Code ▸ Codespaces ▸ Create codespace on main**.  
   ![Dialog showing buttons to create a codespace](/mirror/58/58e2166bdda561f9f08a85924ced9c80acc9da87.webp)

<div class="tb-zh"><p>1. fork 本仓库（右上角的 Fork 按钮）；2. 在自己的 fork 里点击 Code ▸ Codespaces ▸ Create codespace on main。</p></div>

✅ A browser VS Code window opens and the dev container starts building.
This takes **~2 minutes** the first time.

<div class="tb-zh"><p>浏览器里会打开一个 VS Code 窗口，开发容器随即开始构建；首次构建大约需要 2 分钟。</p></div>

## 3. Add your API key (the safe way)

### Option A Codespaces Secrets — Recommended

1. ⚙️ Gear icon -> Command Pallete-> Codespaces : Manage user secret -> Add a new secret.
2. Name: OPENAI_API_KEY
3. Value: paste your key → Add secret

<div class="tb-zh"><p>1. 点击齿轮图标 → Command Palette → Codespaces: Manage user secret → Add a new secret；2. 名称填 OPENAI_API_KEY；3. 值粘贴你的 key，再点 Add secret。</p></div>

That’s it—our code will pick it up automatically.

<div class="tb-zh"><p>就这样，我们的代码会自动读取这个密钥。</p></div>

### Option B .env file (if you really need one)

```bash
cp .env.copy .env
code .env         # fill in OPENAI_API_KEY=your_key_here
```
