---
title: "把網站發到網上（簡單方式）：Vercel/Zeabur/CloudBase 一鍵發佈"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-2/backend/zeabur-deployment/index.md"
sourceRel: "docs/zh-tw/stage-2/backend/zeabur-deployment/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-tw/stage-2/backend/zeabur-deployment/index.md"
sourceSha256: "521800f2c8fdd2a0a418f2c7b9667b42d78e3532a3585e9b8170257d14038c62"
pageSha256: "521800f2c8fdd2a0a418f2c7b9667b42d78e3532a3585e9b8170257d14038c62"
contentMode: "local-full"
zh: ""
---

# 把網站發到網上（簡單方式）：Vercel/Zeabur/CloudBase 一鍵發佈

> 💡 **什麼叫「把網站發到網上」？** 也叫「上線」或「部署發佈」。你在本地電腦寫好的網站，只有你自己能開啟；**「發到網上」就是把它放到一台 24 小時開機的伺服器上，讓任何一個人在瀏覽器裡輸入網址就能訪問到**——就像你寫了一篇 Word 文件只有自己電腦能看，發到公眾號／部落格後所有人都能看一樣，只不過這次發上去的是一個完整的網站。

在本教程中，我們會介紹最簡單的發站方式——**不需要買伺服器，不需要懂維運**，連一下 GitHub 倉庫點幾下按鈕就能把網站發到網上。我們會介紹三個常用平台：**騰訊雲 CloudBase**、**Vercel** 和 **Zeabur**。

# 為什麼用平台一鍵發佈，而不自己搭伺服器？

你可能想問：既然最終都要「放到伺服器上」，為什麼不自己買一台伺服器來部署？答案是：**平台幫你把麻煩事全包了**。

如果手動部署，一個項目往往需要好幾個步驟，每一步都可能踩坑。常見關鍵步驟包括：

1. **伺服器準備**：你需要先購買雲伺服器（比如阿里雲、騰訊雲、或 AWS EC2），選擇伺服器所在地區（如上海、新加坡）、設定（CPU、記憶體、磁碟大小等），還要學會如何遠端連接伺服器（例如透過 SSH 工具登入）。
   ![](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/zh-cn/stage-2/backend/zeabur-deployment/images/image2.png)
2. **環境設定**：Web 應用需要在特定「環境」中才能執行——例如執行 Node.js 專案必須先安裝 Node.js；執行 Python 專案必須安裝 Python 以及對應的第三方函式庫。如果環境版本不相符，程式就可能報錯、無法啟動。
3. **上傳資源**：你需要把本地的程式碼和資源上傳到伺服器上，常用的方法包括 FTP 或 Git。如果專案體積比較大（比如包含影片檔案），中途一旦斷線，有時需要重新上傳。

![](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/zh-cn/stage-2/backend/zeabur-deployment/images/image3.png)

4. **啟動服務並測試**：上傳完成後，你還需要在伺服器上執行指令啟動應用，並測試「分配的網路位址是否能訪問」。如果訪問不了，有可能是伺服器防火牆沒有放行對應連接埠（比如你的應用監聽 3000 連接埠，但該連接埠被防火牆攔截），也可能是程式本身有 Bug，這時就需要查看伺服器日誌進行排解。
   > 💡 可以把連接埠理解為區分同一臺設備上不同應用的「房間號」，而 IP 則是這臺設備的「門牌號」。IP 和連接埠合在一起（IP:port），就可以精確定位到某一個網路服務。
5. **維護與更新**：後續每次你修改程式碼，都要重新上傳並重新啟動服務。如果伺服器當機（例如斷電、網路故障），還需要手動重新啟動應用，有時還要額外設定「進程守護工具」，讓程式在異常退出後自動拉起。

像 CloudBase、Vercel、Zeabur 這樣的「低程式碼部署平臺」，就是為了解決上述複雜問題而誕生的。它們會幫你自動完成「買伺服器、設定環境、上傳程式碼、啟動服務、監控執行」等步驟。你只需要把自己的程式碼倉庫（比如 GitHub 或 GitLab）連接到平臺，或者直接上傳程式碼，它就會自動拉取程式碼、識別應用類型、設定對應的執行環境，最後給你一個可以被任何人訪問的公網位址。它甚至可以一鍵綁定你自己的網域。

![](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/zh-cn/stage-2/backend/zeabur-deployment/images/image4.png)

接下來，我們會分別介紹這三個平臺的特點和使用方法，幫助你選擇最適合自己的部署方案。

---

# 部署平臺對比

| 平臺 | 特點 | 適用場景 | 免費額度 |
|------|------|----------|----------|
| **騰訊雲 CloudBase** | 國內訪問速度快，與微信生態深度整合 | 國內用戶為主、需要微信小程序支持的項目 | 有免費額度 |
| **Vercel** | 前端框架支持好，與 GitHub 集成緊密 | React/Vue/Next.js 等現代前端項目 | 有免費額度 |
| **Netlify** | 功能全面，支持表單處理和身份驗證，與 Git 集成好 | 需要表單處理、身份驗證等高級功能的靜態網站 | 有免費額度 |
| **Zeabur** | 支持多種語言和服務模板，配置靈活 | 需要部署多種服務（如 Dify、n8n）的複雜項目 | 每月約 5 美元免費額度 |

---

# 1. 騰訊雲 CloudBase

騰訊雲 CloudBase（雲開發）是騰訊雲提供的一站式後端雲服務，特別適合國內開發者使用。它的優勢在於：

- **國內訪問速度快**：服務器位於國內，訪問延遲低
- **微信生態整合**：可以方便地對接微信小程序、公眾號
- **一站式解決方案**：提供靜態網站託管、雲函數、資料庫、存儲等全套服務
- **免費額度充足**：個人開發者有充足的免費資源額度

## 使用 CloudBase 部署 Web 應用

### 步驟 1：註冊並登錄

訪問 [騰訊雲 CloudBase 控制檯](https://console.cloud.tencent.com/tcb)，使用微信或 QQ 登錄。

### 步驟 2：創建環境

點擊"新建環境"，選擇一個環境名稱（如 `my-web-app`）。

> ⚠️ **注意**：CloudBase 的免費體驗版需要兌換碼才能開通。你需要關注騰訊雲 CloudBase 公眾號，在公眾號中輸入"領取兌換碼"獲取免費體驗版的兌換碼，然後在創建環境時填寫兌換碼即可開通免費環境（免費試用期為 6 個月）。

### 步驟 3：開通靜態網站託管

在環境管理頁面，找到"靜態網站託管"功能並開通。開通後你會獲得一個默認的訪問域名。

CloudBase 的靜態網站託管提供多種部署方式，與 Zeabur 類似：

- **本地項目上傳**：直接從本地上傳構建好的靜態文件（HTML、CSS、JS 等）
- **模板部署**：使用預設模板快速創建項目，如 React Web 應用模板、Vue Web 應用模板
- **Git 倉庫部署**：支持從 GitHub 等程式碼倉庫自動拉取程式碼並部署

### 步驟 4：部署程式碼

在靜態網站託管頁面，CloudBase 提供三種部署方式：

**方式一：本地項目部署（本地項目上傳）**
- 在控制檯選擇"本地項目部署"
- 直接上傳構建好的靜態文件（HTML、CSS、JS 等）
- 選擇你本地構建好的項目文件夾（如 `dist` 或 `build` 目錄）
- 等待上傳完成即可訪問

**方式二：模板部署**
- 使用預設模板快速創建項目
- 支持 React Web 應用模板、Vue Web 應用模板等
- 基於模板自動構建並部署

**方式三：Git 倉庫部署**
- **Git 個人倉庫部署**：綁定你的 GitHub 等個人程式碼倉庫
- **公開倉庫部署**：支持從公開的 Git 倉庫拉取程式碼
- 配置自動構建命令（如 `npm run build`）
- 每次推送程式碼會自動重新部署

> 💡 **提示**：你也可以使用 CLI 工具進行部署：
> ```bash
> # 安裝 CloudBase CLI
> npm install -g @cloudbase/cli
> # 登錄
> tcb login
> # 部署
> tcb hosting deploy ./dist -e your-env-id
> ```

### 步驟 5：配置自定義域名（可選）

在靜態網站託管設置中，可以綁定你自己的域名，並申請免費的 HTTPS 證書。

---

# 2. Vercel

Vercel 是全球最流行的前端部署平臺之一，特別適合部署 React、Vue、Next.js 等現代前端框架項目。它的特點包括：

- **與 GitHub 深度集成**：推送程式碼即自動部署
- **自動預覽**：每個 Pull Request 都會生成獨立的預覽鏈接
- **全球 CDN**：網站自動分發到全球節點，訪問速度快
- **Serverless 函數**：支持在項目中編寫後端 API

> ⚠️ **注意**：Vercel 在部分網路環境下訪問可能不太穩定，國內用戶建議優先考慮 CloudBase。

## 使用 Vercel 部署 Web 應用

### 步驟 1：註冊賬號

訪問 [Vercel 官網](https://vercel.com)，使用 GitHub 賬號登錄。

### 步驟 2：導入項目

1. 點擊 "Add New Project"
2. 選擇你要部署的 GitHub 倉庫
3. 如果沒有看到想要的倉庫，點擊 "Adjust GitHub App Permissions" 授權訪問

### 步驟 3：配置構建設置

Vercel 會自動識別項目類型並配置構建命令：

| 框架 | 構建命令 | 輸出目錄 |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Next.js | `next build` | - |
| 純 HTML | - | 項目根目錄 |

如果自動識別不正確，可以手動修改：
- **Build Command**: 構建命令，如 `npm run build`
- **Output Directory**: 構建輸出目錄，如 `dist` 或 `build`
- **Install Command**: 依賴安裝命令，通常是 `npm install`

### 步驟 4：部署

點擊 "Deploy" 按鈕，等待構建完成。構建成功後，你會獲得一個 `xxx.vercel.app` 的域名。

### 步驟 5：自定義域名（可選）

在項目設置中的 "Domains" 頁面，可以添加你自己的域名。Vercel 會自動配置 HTTPS。

---

# 3. Netlify

Netlify 是另一個非常流行的前端部署平臺，與 Vercel 類似，特別適合部署靜態網站和單頁應用（SPA）。它的特點包括：

- **功能全面**：除了靜態網站託管，還支持表單處理、身份驗證、邊緣函數等高級功能
- **與 Git 深度集成**：支持 GitHub、GitLab、Bitbucket，推送程式碼自動部署
- **分支預覽**：每個分支都會自動生成獨立的預覽鏈接
- **全球 CDN**：網站自動分發到全球節點，訪問速度快
- **表單處理**：無需後端程式碼即可處理網站表單提交
- **身份驗證**：內置用戶身份驗證功能，可快速實現登錄/註冊

> ⚠️ **注意**：Netlify 的國內訪問速度可能不如 CloudBase，建議主要面向海外用戶的項目使用。

## 使用 Netlify 部署 Web 應用

### 步驟 1：註冊賬號

訪問 [Netlify 官網](https://www.netlify.com)，點擊 "Sign up" 註冊。你可以使用 GitHub、GitLab、Bitbucket 或郵箱註冊。

### 步驟 2：導入項目

1. 登錄後點擊 "Add new site" → "Import an existing project"
2. 選擇你的程式碼託管平臺（如 GitHub）
3. 授權 Netlify 訪問你的倉庫
4. 從列表中選擇你要部署的倉庫

### 步驟 3：配置構建設置

Netlify 會自動識別常見的前端框架並配置構建設置：

| 框架 | 構建命令 | 發佈目錄 |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
