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
pageSha256: "84d4471207b5beb39243256a1b8c23bc53229bb52152462a9d7b8d4ed2957190"
contentMode: "local-full"
zh: ""
---

## Agent Teams 與 Subagent 的比較

在深入了解 Agent Teams 的架構之前，我們需要先釐清一個常見的困惑：**Agent Teams 和 Subagent 有什麼區別**？

兩個功能都涉及「多個 AI 協作」，但它們的協作模式完全不同，適用於不同的場景。

### 核心差異一覽

| 維度 | Subagent | Agent Teams |
|---------|-------------------|----------------------|
| **拓撲結構** | 星狀拓撲：所有子代理向主代理回報 | 網狀拓撲：成員之間可以互相溝通 |
| **溝通方式** | 主代理透過提示詞明確傳遞資訊，子代理完成後回傳結果 | 成員可以直接溝通、討論、協調 |
| **上下文管理** | 每個子代理有獨立上下文，主代理只傳遞必要資訊 | 每個成員有完全獨立的上下文 |
| **並行性** | 可以並行執行，但協作鏈仍以主代理為中心 | 真正的並行開發和協作 |
| **任務協調** | 主代理集中分派和協調一切 | 成員可以更自主地認領任務 |
| **成本** | 不低。多個子代理並行時 token 用量疊加 | 較高。成員獨立執行且溝通更頻繁 |

### 直觀的類比

**Subagent 就像**：一位經理為幾位助手分別寫了任務單。每位助手根據自己的任務單獨立工作，完成後只將結果回報給經理。助手之間不直接溝通，經理也看不到助手工作時的完整思考過程。

```
You → 主代理 → 子代理 A：「分析這個檔案」
You → 主代理 → 子代理 B：「搜尋那個函式」
         ↓
    子代理 A 完成 → 向主代理回報結果
    子代理 B 完成 → 向主代理回報結果
         ↓
    主代理彙整結果 → 回報給你
```

**Agent Teams 就像**：一位專案經理帶領一個真正的開發團隊。團隊成員可以直接溝通、討論、協作，而不是把每個細節都透過專案經理轉達。

```
You → 團隊負責人：「建立一個使用者認證功能」
         ↓
    團隊負責人建立團隊並分配任務
         ↓
    成員 A：「@成員 B，API 介面設計好了嗎？」
    成員 B：「好了，格式是這樣的...」
    成員 C：「我審查了介面，發現有個問題需要討論...」
         ↓
    團隊成員協作完成工作 → 團隊負責人彙整結果 → 回報給你
```

### 何時使用哪個

**使用 Subagent 的場景**：

- 有一個快速、明確的單一任務，例如「搜尋這個錯誤代碼」
- 任務之間的依賴性不高
- 需要並行執行，但不需要成員之間持續討論

**使用 Agent Teams 的場景**：

- 進行跨越多個模組的複雜系統重構
- 需要多角度分析和討論，例如安全專家和效能專家辯論一個解決方案
- 需要真正的並行開發，前端、後端和測試同時進行
- 任務需要頻繁的協調和資訊分享

### 簡單總結

- **Subagent**：一個任務分派工具，將大任務拆成小任務分派給不同的「工人」
- **Agent Teams**：一個真正的協作團隊，成員可以像真正團隊一樣溝通、討論、共同工作
