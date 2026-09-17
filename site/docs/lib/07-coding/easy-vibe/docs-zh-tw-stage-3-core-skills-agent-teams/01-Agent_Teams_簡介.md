---
title: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-3/core-skills/agent-teams/index.md"
sourceRel: "docs/zh-tw/stage-3/core-skills/agent-teams/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-tw/stage-3/core-skills/agent-teams/index.md"
sourceSha256: "3fc79382466c21dc9354a701e59220191441936aab243de14837961caf597a30"
pageSha256: "99ce6c11b3de244073ea0887229394e7bb08908d27c399ff685d2e6bd3eef2ad"
contentMode: "local-full"
zh: ""
---

## Agent Teams 簡介

**Agent Teams** 是 Claude Code 中的一項革命性功能，允許**多個獨立的 AI 實例像真正的開發團隊一樣協作**。

想像一下，過去使用 Claude Code 就像是一位專案經理帶著一位能力超強的助手。無論任務多複雜，都只有這一位助手在工作。現在，有了 Agent Teams，你可以組建一支完整的 AI 開發團隊：一位成員負責前端，一位負責後端，一位負責測試，他們可以**同時工作、相互溝通、協作完成複雜任務**。

### 從單一助手到團隊協作

在深入了解 Agent Teams 之前，我們先來看看它解決了什麼問題。

**單一 AI 模式的限制**：

當你使用單一 Claude 實例處理一個複雜專案時，會遇到以下瓶頸：

- **序列處理瓶頸**：AI 一次只能做一件事。例如在重構一個專案時，它可能需要先分析認證模組，然後是資料庫模組，最後是 API 模組。這些步驟必須依序進行，即使它們之間並沒有依賴關係。

- **上下文擁擠問題**：所有資訊都存在於單一對話視窗中。隨著對話變長，早期的重要細節可能被淹沒，AI 可能忘記之前討論過的關鍵決策。

- **單一視角限制**：只有一個 AI 在思考，沒有多角度的討論或驗證。當出現複雜的設計決策時，沒有「隊友」可以辯論或提供不同的觀點。

- **效率天花板**：大型重構或多模組開發需要很長時間，無法透過並行處理來加速。

**Agent Teams 的解決方案**：

Agent Teams 透過**多實例並行協作**來解決這些問題：

- **真正的並行工作**：多個 AI 可以同時處理不同的任務。一個處理前端 UI，另一個處理後端 API，還有一個處理資料庫設計，互不干擾。

- **獨立的上下文空間**：每個團隊成員都有自己的完整 200K token 上下文視窗，重要資訊不會因為對話過長而「被遺忘」。

- **團隊協作能力**：成員之間可以直接溝通、討論設計決策、互相驗證程式碼品質，就像一個真正的開發團隊。

- **顯著的效率提升**：根據 Anthropic 內部測試，大型專案重構的效率可提升約 50%。
