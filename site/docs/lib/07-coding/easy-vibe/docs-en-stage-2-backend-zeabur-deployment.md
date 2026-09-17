---
title: "Put Your Website Online (Easy): One-Click PaaS Deployment"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-2/backend/zeabur-deployment/index.md"
sourceRel: "docs/en/stage-2/backend/zeabur-deployment/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/en/stage-2/backend/zeabur-deployment/index.md"
sourceSha256: "c84dcb81c769df9a2ec3a5de4e1505596ed1472904869ed9e67782d8e1c026e2"
pageSha256: "c84dcb81c769df9a2ec3a5de4e1505596ed1472904869ed9e67782d8e1c026e2"
contentMode: "local-full"
zh: ""
---

# Put Your Website Online (Easy): One-Click PaaS Deployment

> 💡 **What does "putting a website online" mean?** Also called "going live" or "deploying/publishing". A website you built on your own computer can only be opened by you. **Putting it online means placing it on a server that runs 24/7, so anyone can type a URL in their browser and visit it** — just like a Word doc only you can read becomes visible to everyone once you post it to a blog; the difference is that this time you're publishing a full website.

In this tutorial, we'll walk through the **easiest way to get a site online — no server to buy, no DevOps to learn**. Just connect your GitHub repo, click a few buttons, and your site is live. We cover four popular platforms: **Tencent Cloud CloudBase**, **Vercel**, **Netlify**, and **Zeabur**.

# Why use a PaaS platform instead of setting up your own server?

You might wonder: if everything ends up "on a server," why not just buy your own server and deploy there? The answer: **platforms handle all the messy parts for you**.

If you deploy everything manually, a project usually involves many steps:

1. **Prepare a server**
   You first need to buy or rent a cloud server from a provider such as Alibaba Cloud, Tencent Cloud, or AWS EC2. Then you choose its region, CPU, memory, and storage, and learn how to connect to it remotely, often through SSH.
   ![](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/zh-cn/stage-2/backend/zeabur-deployment/images/image2.png)

2. **Configure the runtime environment**
   Web apps only run under the correct environment. A Node.js project needs Node installed. A Python project needs Python and its dependencies. If the versions do not match, the app may fail to start.

3. **Upload your files**
   You need to move your local code and assets to the server, often via Git or file-transfer tools. Large projects can make this step frustrating if uploads break halfway through.

![](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/zh-cn/stage-2/backend/zeabur-deployment/images/image3.png)

4. **Start the service and test it**
   After upload, you need to start the app and check whether the assigned address works. If not, the problem may be a firewall-blocked port, or it may be an application bug. In that case, you need to inspect logs.

5. **Maintain and update**
   Every code update usually means another upload and restart. If the server crashes, you may need to restart services manually or configure a process manager to keep them alive.

Platforms such as CloudBase, Vercel, Netlify, and Zeabur exist to eliminate much of that complexity. They automate the boring parts:

- buying and provisioning servers
- configuring runtimes
- pulling code
- starting services
- monitoring uptime

In many cases, you just connect a GitHub repository or upload your code, and the platform does the rest.

![](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/zh-cn/stage-2/backend/zeabur-deployment/images/image4.png)

---

# Deployment platform comparison

| Platform | Main strengths | Best for | Free tier |
|------|------|----------|----------|
| **Tencent Cloud CloudBase** | Fast access within mainland China, strong WeChat ecosystem integration | China-focused users, WeChat Mini Program support | Yes |
| **Vercel** | Excellent support for frontend frameworks, tight GitHub integration | Modern React/Vue/Next.js frontend projects | Yes |
| **Netlify** | Broad feature set, great Git workflow, form handling, auth support | Static sites that also need forms or auth | Yes |
| **Zeabur** | Flexible service combinations and many templates | More complex projects, including tools like Dify and n8n | About $5/month in free quota |

---

# 1. Tencent Cloud CloudBase

Tencent Cloud CloudBase is Tencent's integrated cloud backend platform and is especially friendly for developers targeting domestic Chinese users.

Its advantages include:

- **Fast domestic access**
- **WeChat ecosystem integration**
- **An all-in-one backend solution** including static hosting, cloud functions, databases, and storage
- **A practical free tier**

## Deploy a web app with CloudBase

### Step 1: Register and log in

Visit the [Tencent Cloud CloudBase Console](https://console.cloud.tencent.com/tcb) and log in with WeChat or QQ.

### Step 2: Create an environment

Click `Create Environment` and choose an environment name such as `my-web-app`.

> ⚠️ **Note**: the free trial version of CloudBase often requires a redemption code. You usually need to follow the CloudBase official account and obtain a code there.

### Step 3: Enable static website hosting

Inside the environment management screen, enable the `Static Website Hosting` feature. Once enabled, you will receive a default public domain.

CloudBase supports several deployment methods:

- upload a local build output
- deploy from a template
- deploy from a Git repository

### Step 4: Deploy your code

CloudBase offers three main workflows:

**Option 1: upload a local project**

- choose `Local Project Deployment`
- upload your built static files such as HTML, CSS, and JS
- typically upload a `dist` or `build` directory

**Option 2: use a template**

- start from a preset project template
- common options include React and Vue starter templates

**Option 3: deploy from Git**

- connect a GitHub repository
- set the build command, such as `npm run build`
- every push can trigger an automatic redeploy

> 💡 **Tip**: you can also deploy from the command line:
>
> ```bash
> # Install CloudBase CLI
> npm install -g @cloudbase/cli
> # Log in
> tcb login
> # Deploy
> tcb hosting deploy ./dist -e your-env-id
> ```

### Step 5: Add a custom domain (optional)

CloudBase also supports binding your own domain and applying a free HTTPS certificate.

---

# 2. Vercel

Vercel is one of the most popular frontend deployment platforms in the world and is especially good for React, Vue, and Next.js projects.

Its main strengths:

- **Deep GitHub integration**
- **Automatic preview deployments for pull requests**
- **Global CDN distribution**
- **Support for serverless functions**

> ⚠️ **Note**: in some mainland-China network environments, Vercel may be less stable than domestic options such as CloudBase.

## Deploy a web app with Vercel

### Step 1: Register

Visit [Vercel](https://vercel.com) and sign in with GitHub.

### Step 2: Import a project

1. Click `Add New Project`
2. Select the GitHub repository you want to deploy
3. If needed, adjust GitHub app permissions

### Step 3: Configure build settings

Vercel often detects the framework automatically:

| Framework | Build command | Output directory |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Next.js | `next build` | - |
| Plain HTML | - | project root |

If detection fails, configure it manually:

- **Build Command**
- **Output Directory**
- **Install Command**

### Step 4: Deploy

Click `Deploy` and wait for the build to complete. A successful project receives a `xxx.vercel.app` domain.

### Step 5: Add a custom domain (optional)

Use the `Domains` section in project settings to bind your own domain. HTTPS is handled automatically.

---

# 3. Netlify

Netlify is another strong frontend deployment platform, especially for static sites and single-page applications.

Its strengths:

- **Feature-rich hosting**, including form handling, auth, and edge/serverless functions
- **Strong Git integration**
- **Preview links for branches**
- **Global CDN**
- **Built-in form handling**
- **Built-in user authentication tools**

> ⚠️ **Note**: Netlify may not be as fast as CloudBase for domestic Chinese users.

## Deploy a web app with Netlify

### Step 1: Register

Visit [Netlify](https://www.netlify.com) and sign up with GitHub, GitLab, Bitbucket, or email.

### Step 2: Import a project

1. Click `Add new site` → `Import an existing project`
2. Choose your Git provider
3. Authorize Netlify
4. Select the repository

### Step 3: Configure build settings

| Framework | Build command | Publish directory |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
