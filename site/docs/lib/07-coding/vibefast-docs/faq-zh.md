---
title: "常見問題"
sourceId: "07-coding/vibefast-docs"
sourceTitle: "VibeFast 文档"
sourceKind: "官方文档"
licenseLabel: "限非商用"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/vibefast-app/vibefast-docs"
entryUrl: "https://github.com/vibefast-app/vibefast-docs/blob/2a34bc50576f3f74fda6196ca9bebf851187bcf9/faq-zh.md"
sourceRel: "faq-zh.md"
rawUrl: "/raw/07-coding/vibefast-docs/faq-zh.md"
sourceSha256: "754aa44a722af1b5d5a0afe36db14eca320d731c2bb66abd1ce5f2dde2847917"
pageSha256: "754aa44a722af1b5d5a0afe36db14eca320d731c2bb66abd1ce5f2dde2847917"
contentMode: "local-full"
zh: ""
---

# 常見問題

[English](/lib/07-coding/vibefast-docs/faq) · [繁中](/lib/07-coding/vibefast-docs/faq-zh) · [日本語](/lib/07-coding/vibefast-docs/faq-jp) · [Español](/lib/07-coding/vibefast-docs/faq-es) · [Português (BR)](/lib/07-coding/vibefast-docs/faq-pt-br)

-----

## 關於產品

### vibefast.app 是開源的嗎？

不是。這是一個商業產品，公開倉庫只承擔介紹與學習資源入口的角色。

### 公開倉庫和 private repo 的差別是什麼？

公開倉庫提供產品介紹與 Vibe Coding 學習內容；private repo 承載實際的完整原始碼與買家文件。

### 我可以把 vibefast.app template 用在自己的產品上嗎？

可以，這正是它的主要用途。多數買家會把它當作品牌重塑的起點，或直接作為自己 SaaS / web app 的基礎架構。

### 我一定要保留所有預設模組嗎？

不一定。vibefast.app template 提供的是完整參考產品，你可以依照自己的需求保留、調整或移除模組。例如不需要 blog 的話可以直接刪除，不影響其他功能。

### 這裡會公開所有技術細節嗎？

不會。這裡只提供公開層級的介紹與教學，完整的架構說明、部署指南、API 文件都在 private repo 裡。

-----

## 關於購買

### 怎麼購買？付款之後如何取得 code？

前往 [vibefast.app](https://vibefast.app) 完成 Stripe 付款後，系統會自動發送 GitHub 邀請到你的信箱，接受邀請即可存取 private repo。整個流程全自動，通常在幾分鐘內完成。

如果超過 10 分鐘未收到邀請，請檢查垃圾信箱或聯絡 [hello@dankoai.com](mailto:hello@dankoai.com)。

### 早鳥價是限時優惠嗎？

是的，限時優惠。2026 年 8 月 1 日前維持 $99，之後漲至 $199。現在買和 6 月後買，差 $100。

### 一次付款包含什麼？

$99 包含：private repo 存取權限、完整原始碼、所有買家文件，以及所有未來的模板更新。沒有月費，沒有隱藏費用。

### 購買前我可以在 live demo 裡看到什麼？

你可以免費註冊並進入 live backend。裡面可以直接體驗 Analytics、Blog、Media。Business 和 User 區域會在 limited-access mode 下以 sample data 顯示，而需要改動正式資料的操作仍然會受到保護。

### 有退款政策嗎？

因為這是數位產品，付款後即可存取原始碼，原則上不提供退款。如果購買後遇到技術問題，請先聯絡 [hello@dankoai.com](mailto:hello@dankoai.com)，我們會盡力協助解決。

-----

## 關於技術

### 我需要多少技術背景才能使用 vibefast.app template？

能夠閱讀和理解本 repo 的教學內容即可。vibefast.app template 設計上對 Vibe Coder 友好——配合 Cursor 或 Claude 等 AI 工具，沒有深厚工程背景的人也能上手。如果你能跑 `npm install` 並且看懂 AI 生成的代碼，就足夠了。

### 需要有 Cloudflare 付費帳號嗎？

不需要。Cloudflare 的免費方案對大多數 app 的起步階段完全夠用——Workers 每天 10 萬次請求、D1 每天 10 萬次讀取、R2 每月 100 萬次操作。等到你的 app 真的有大量流量，再考慮升級方案。

### vibefast.app template 之後會支援其他 stack 嗎？

目前專注在 Cloudflare 全棧（Remix + Workers + D1 + R2），這是 vibefast.app template 的核心定位。支援其他 stack 不在目前的 Roadmap 上。

### 我買了之後可以用在多個專案上嗎？

是的，目前的授權支持多專案使用。你可以自由在多個個人或客戶專案中使用，包含接案工作。

### vibefast.app template 和其他模板（如 ShipFast、Supastarter）有什麼不同？

vibefast.app template 原生建構在 Cloudflare 全棧上（Remix + Workers + D1 + R2）。核心差異：真正的一鍵部署（`npm run setup`）、邊緣運算零冷啟動、不需要額外的資料庫託管、前後端通過 Service Binding 零 CORS 內部通訊。這不是通用型 template，是一套有明確主張、經過生產環境驗證的架構。

-----

## 關於支援

### 買了之後如果有問題，可以找誰？

可以透過以下方式聯絡：

- 信箱：[hello@dankoai.com](mailto:hello@dankoai.com)
- X：[@dankopeng](https://x.com/dankopeng)

### vibefast.app template 多久更新一次？

vibefast.app template 採用持續更新模式。所有更新都會推送到 private repo，買家無需額外付費。

### 我想先了解 Vibe Coding 的方法論，從哪裡開始？

從這裡開始：

- [什麼是 Vibe Coding？](/lib/07-coding/vibefast-docs/zh-01-what-is-vibecoding-zh) — 核心概念與關鍵術語
- [為什麼 Cloudflare 是 Vibe Coding 的最佳選擇？](/lib/07-coding/vibefast-docs/zh-05-the-best-way-to-vibecoding-on-cloudflare-zh) — 實戰介紹

### 我剛買了，第一步該做什麼？

跟著 [快速上手指南](/lib/07-coding/vibefast-docs/quickstart-zh) 走一遍，10 分鐘內就能從 clone 到上線。

-----

一般問題歡迎在 [GitHub Issues](https://github.com/vibefast-app/vibefast-docs/issues) 提問。  
購買後的技術問題請在 private repo 開 issue 或信箱聯絡 [hello@dankoai.com](mailto:hello@dankoai.com)。  
或直接聯絡 [@dankopeng](https://x.com/dankopeng)。
