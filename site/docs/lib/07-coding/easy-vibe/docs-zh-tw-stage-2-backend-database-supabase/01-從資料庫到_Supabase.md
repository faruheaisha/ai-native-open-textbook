---
title: "從資料庫到 Supabase"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-2/backend/database-supabase/index.md"
sourceRel: "docs/zh-tw/stage-2/backend/database-supabase/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-tw/stage-2/backend/database-supabase/index.md"
sourceSha256: "b75a815f2c40a3835cfed2f3ae25c9ae72268150ef089d58c432ed0a507f51d8"
pageSha256: "0c9ec95051a697ec71f8618168ef8853cdc1fd8f61d9db1348a13527ed36ecb8"
contentMode: "local-full"
zh: ""
---

# 從資料庫到 Supabase

在上節課中，我們學會了 UI 設計程序 Mastergo 和 Figma 的基本用法，能夠使用 github 進行程式碼的獲取與版本管理，並通過 Zeabur 部署網站將自己的應用 / 網站傳達給更多人使用。

為了幫助大家更好地銜接知識，在開始本節課關於設計工具與部署的新內容前，讓我們一起通過幾道簡單的題目快速回顧一下上節課的核心知識點：

1. 什麼是前端設計工具、Figma、MasterGo 的定義和使用方式。
2. 將設計稿轉換為程式碼的基礎方法。
3. 什麼是 Github，如何配置 SSH，如何構建自己的第一個倉庫。
4. 部署是什麼意思，如何使用 Zeabur，如何將 Github 或本地程式碼部署至公共網路給大家訪問。

如果對以上任何一個問題還有印象模糊的地方，建議先回顧一下上節課的文檔和講義。歡迎隨時在微信學習群中提出疑問。

在本節課中，我們將學習如何讓一個 APP / 網站從能跑起來變為更接近真實線上產品：除了用資料庫管理程序運行中的各種資料變化外，還要具備完善的用戶體系（註冊、登錄、權限等）以及其他關鍵後端能力。我們會以 Supabase 這一後端服務平臺為主線，先用它實現“資料庫 + 用戶系統”這兩項基礎功能，再以 Supabase 提供的組件為參照，進一步理解現代雲服務後端服務通常包含的核心模塊，以及各模塊的具體職能與作用邏輯。
