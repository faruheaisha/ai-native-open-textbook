---
title: "瀏覽器渲染原理"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/3-browser-and-frontend/browser-as-os-rendering.md"
sourceRel: "docs/zh-tw/appendix/3-browser-and-frontend/browser-as-os-rendering.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-tw/appendix/3-browser-and-frontend/browser-as-os-rendering.md"
sourceSha256: "e2a718b73a5abd2ef5000782f36e311206bf50af9c91eb0d9633448ef0419d76"
pageSha256: "e2a718b73a5abd2ef5000782f36e311206bf50af9c91eb0d9633448ef0419d76"
contentMode: "local-full"
zh: ""
---

# 瀏覽器渲染原理
::: tip 🎯 核心問題
**為什麼有些網頁流暢如絲，有些卻卡成 PPT？** 瀏覽器是怎麼把一堆 HTML、CSS、JavaScript 程式碼變成你眼前看到的網頁的？本章將帶你深入瀏覽器的「車間」，理解它的工作流程，從而寫出效能更好的網頁。
:::

**這篇文章會帶你學什麼？**

| 章節 | 內容 | 學完能幹嘛 |
|-----|------|-----------|
| **第 1 章** | 為什麼要理解渲染管線 | 理解效能最佳化的必要性 |
| **第 2 章** | 渲染管線的五個階段 | 掌握瀏覽器渲染的基本流程 |
| **第 3 章** | 構建 DOM 樹和 CSSOM 樹 | 理解 HTML 和 CSS 如何被解析 |
| **第 4 章** | 構建渲染樹 | 知道哪些元素會被渲染 |
| **第 5 章** | 佈局與重排 | 避免觸發昂貴的佈局計算 |
| **第 6 章** | 繪製與重繪 | 減少不必要的繪製操作 |
| **第 7 章** | 合成與 GPU 加速 | 利用 GPU 提升動畫效能 |
| **第 8 章** | 事件迴圈 | 理解 JavaScript 的執行機制 |
| **第 9 章** | 效能最佳化實戰 | 掌握常用的效能最佳化技巧 |

每一章都從「理解原理」開始，不需要你會手寫最佳化程式碼。遇到效能問題時，隨時回來查就行。

---

## 1. 要理解「渲染管線」的動機

### 1.1 從「能跑」到「跑得快」：前端開發的進階之路

剛開始學前端時，我們只關心程式碼「能不能跑」——頁面能顯示出來，按鈕能點擊，就算成功了。但隨著專案變大，使用者變多，你很快會發現一個殘酷的現實：**同樣的功能，有人寫的頁面絲般順滑，有人寫的卻卡頓到使用者想摔滑鼠**。

這就像學開車。新手只關心「車能不能開動」，但老司機會關心「什麼時候該換檔、什麼時候該煞車、怎麼開最省油」。瀏覽器就是你開的那輛「車」，理解它的「工作習性」，你才能開得又快又穩。

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🐢 新手思維（只關注功能）**
- 只要頁面能顯示就行
- 卡頓是瀏覽器的問題
- 效能最佳化是後期才考慮的事

</div>
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🚀 進階思維（關注體驗）**
- 流暢度是使用者體驗的核心
- 理解瀏覽器工作流程
- 寫程式碼時就考慮效能

</div>
</div>

**理解渲染管線，就是從「能跑」到「跑得快」的關鍵一步。**

### 1.2 案例：「最佳化」後反而更卡了的動機

::: warning 小張的效能踩坑記
小張是一家電商公司的前端工程師，負責最佳化商品詳情頁。這個頁面展示商品資訊時卡得要死，使用者投訴不斷。

小張想：「頁面卡應該是因為 DOM 太多了，我先用 `display:none` 隱藏起來，修改完再顯示，這樣瀏覽器就不會重複渲染了吧？」

於是他寫了這樣的程式碼：

```javascript
// 你以為的「最佳化」
const container = document.getElementById('list')
container.style.display = 'none'  // 先隱藏，應該不會觸發渲染了吧？

for (let i = 0; i < 1000; i++) {
  const item = document.createElement('div')
  item.style.width = Math.random() * 100 + 'px'  // 隨機寬度
  container.appendChild(item)
}

container.style.display = 'block'  // 最後顯示，一次性渲染
```

結果測試後發現，頁面**更卡了**！小張懵了：明明已經「最佳化」了，為什麼反而更慢？

後來前端負責人看了程式碼，點出問題所在：**雖然元素被隱藏了，但你每次修改 `style.width` 仍然會觸發瀏覽器的樣式計算和佈局標記，瀏覽器在背景做了大量無用功**。

正確的做法是用 `DocumentFragment` 在記憶體中批次操作，最後一次性插入 DOM，只觸發一次渲染。
:::

::: info 💡 核心啟示
不了解瀏覽器的工作流程，你可能會「自作聰明」地寫出一堆「最佳化程式碼」，結果反而讓效能更差。**理解渲染管線，你才知道哪些操作是昂貴的、哪些是廉價的，從而避免在錯誤的地方用力。**
:::

---

## 2. 核心概念：渲染管線 概述

::: tip 🤔 什麼是「渲染」？
**渲染（Rendering）**，簡單說就是瀏覽器把程式碼「畫」成你看到的網頁的過程。

你可以把它想像成**印刷廠印書**：
- **HTML** = 書稿內容（文字、圖片、章節）
- **CSS** = 排版要求（字型大小、顏色、間距）
- **JavaScript** = 動態修改（作者臨時改稿、調整排版）

瀏覽器拿到這些「材料」後，要經過一道道「工序」，最後才能「印刷」出你看到的網頁。這一系列工序，就是**渲染管線（Rendering Pipeline）**。
:::

為了幫你更好地理解，我們用一家**麵包店**來比喻瀏覽器的渲染流程。

### 2.1 用麵包店比喻理解渲染管線

想像你在經營一家麵包店，每天要為顧客製作各種麵包。這個過程中涉及到的環節，與瀏覽器的渲染流程驚人地相似：

| 階段 | 🥖 麵包店比喻 | 瀏覽器實際工作 | 具體例子 |
|------|-------------|--------------|----------|
| **1. 準備食材** | 整理原料清單（麵粉、雞蛋、奶油...） | **構建 DOM 樹**：把 HTML 解析成樹形結構 | 你寫 `<div><p>Hello</p></div>`，瀏覽器解析成 `div→p→"Hello"` 的樹 |
| **2. 準備配方** | 整理配方卡（每種麵包的配料比例） | **構建 CSSOM 樹**：把 CSS 解析成規則樹 | 你寫 `.title \{ color: red \}`，瀏覽器記錄「`.title` 的文字是紅色」 |
| **3. 制定計劃** | 根據原料和配方，決定今天要做什麼麵包 | **構建渲染樹**：合併 DOM 和 CSSOM，只保留可見元素 | `
&lt;/head>
&lt;body>
  <div class="container">
    <p>可見內容</p>
  </div>
  <div style="display: none">
    <p>隱藏內容（display:none）</p>
  </div>
&lt;/body>
&lt;/html>
```

**DOM 樹會包含所有元素**：
- `<head>`、`<title>`、`<style>`、`
```
:::

### 9.4 防抖與節流：減少事件觸發頻率

**問題**：頻繁觸發的事件（如 scroll、resize）會導致效能問題。

::: details 查看防抖與節流的實作
```javascript
// 防抖（Debounce）：延遲執行，如果在延遲時間內再次觸發，則重新計時
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// 節流（Throttle）：固定時間間隔執行
function throttle(fn, interval) {
  let lastTime = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastTime >= interval) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

// 使用範例
window.addEventListener('scroll', debounce(handleScroll, 200))
window.addEventListener('resize', throttle(handleResize, 100))
```
:::

### 9.5 延遲載入：延遲載入非關鍵資源

**問題**：首屏載入太多資源導致頁面開啟慢。

::: details 查看延遲載入的實作
```javascript
// 圖片延遲載入
const lazyImages = document.querySelectorAll('img[data-src]')

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src  // 載入真實圖片
      img.removeAttribute('data-src')
      observer.unobserve(img)  // 停止觀察
    }
  })
})

lazyImages.forEach(img => imageObserver.observe(img))
```
:::

---

## 10. 你現在應該能識別的效能問題

理解了瀏覽器的渲染管線後，你應該能識別以下常見的效能問題：

| 問題程式碼 | 問題所在 | 如何描述給 AI |
|---------|---------|-------------|
| `element.style.width = ...` | 在迴圈中頻繁修改寬度 | "這裡會觸發多次重排，請改用 transform 或者批次處理" |
| `height = element.offsetHeight` | 在寫入後立即讀取佈局屬性 | "這是強制同步佈局，請分離讀寫操作" |
| `element.className = ...` | 頻繁修改 class 觸發樣式重新計算 | "用 classList.add/remove 代替，減少樣式計算" |
| 動畫用 `width`/`left` | 觸發重排和重繪，效能差 | "改用 transform 和 opacity 做動畫" |
| 給所有元素加 `translateZ(0)` | 濫用 GPU 加速導致記憶體爆炸 | "只給需要動畫的元素開啟 GPU 加速" |
| 列表項 10000 個全渲染 | DOM 節點過多導致卡頓 | "實作虛擬捲動，只渲染可見區域" |
| scroll 事件裡直接操作 DOM | 觸發頻率太高導致卡頓 | "用 requestAnimationFrame 或節流最佳化" |
| `box-shadow` 做 hover 動畫 | 複雜的陰影計算很慢 | "改用 transform 或偽元素，避免動畫陰影" |

**如果你認真讀了每一章的「踩坑實錄」，你還掌握了這些核心概念：**

- **渲染管線五階段**：DOM/CSSOM → 渲染樹 → 佈局 → 繪製 → 合成
- **重排 vs 重繪**：重排最昂貴（幾何變化），重繪次之（外觀變化）
- **強制同步佈局**：讀寫交替會導致佈局抖動，必須分離
- **GPU 加速**：transform 和 opacity 由 GPU 處理，效能最佳
- **事件迴圈**：JavaScript 是單執行緒的，透過任務佇列實現非同步

這些概念會幫你快速定位效能瓶頸。

::: info 💡 遇到效能問題時這樣跟 AI 說
- "動畫卡頓，檢查是否觸發了重排或重繪"
- "捲動效能差，可能需要節流或 requestAnimationFrame"
- "列表資料量大時卡頓，需要虛擬捲動"
- "頻繁修改樣式導致效能問題，請用 transform 最佳化"
:::

---

## 11. 總結：渲染管線最佳化的本質

透過本文的學習，我們可以得出以下核心結論：

**從實踐來看**：不是最佳化越多越好，而是最佳化越「對位」越好。理解瀏覽器的渲染管線，才能知道在哪裡用力、在哪裡放手。

**從成本視角看**：
- 大部分效能浪費來自對佈局屬性的**頻繁讀寫交替**，需要透過讀寫分離、批次處理來解決
- 複雜的動畫效果如果觸發了重排和重繪，往往源於使用了「錯誤的屬性」，需要透過 `transform` 和 `opacity` 來解決
- 面對大量資料的列表渲染，單純依靠虛擬 DOM 已經不夠，必須結合**虛擬捲動**等技術

**目標是：在給定的瀏覽器和硬體條件下，讓每一個渲染步驟的投入都具備明確的效能收益。**

---

## 12. 名詞對照表

| 英文術語 | 中文對照 | 解釋 |
| :--- | :--- | :--- |
| **DOM** | 文件物件模型 | 瀏覽器將 HTML 文件解析後形成的樹形結構，JavaScript 可以透過 DOM API 操作頁面元素 |
| **CSSOM** | CSS 物件模型 | 瀏覽器將 CSS 解析後形成的樹形結構，與 DOM 結合用於計算最終樣式 |
| **Render Tree** | 渲染樹 | 由 DOM 樹和 CSSOM 樹合併而成，只包含可見節點，用於後續的佈局計算和繪製 |
| **Layout** | 佈局 | 計算渲染樹中每個節點的幾何資訊（位置、大小）的過程，也稱為 Reflow（重排） |
| **Reflow** | 重排/回流 | 當元素的尺寸、位置等幾何屬性發生變化時，瀏覽器需要重新計算佈局的過程 |
| **Paint** | 繪製/重繪 | 將佈局計算後的元素樣式（顏色、背景、邊框等）繪製到螢幕上的過程 |
| **Repaint** | 重繪 | 當元素的外觀屬性（如顏色、背景）變化但不影響幾何屬性時，觸發的繪製更新 |
| **Composite** | 合成 | 將多個繪製層（Layer）合併為最終螢幕圖像的過程，通常在 GPU 上執行 |
| **Layer** | 層/合成層 | 瀏覽器為了最佳化渲染而建立的獨立繪製表面，可以單獨變換和合成 |
| **Event Loop** | 事件迴圈 | JavaScript 的非同步執行機制，負責排程巨集任務和微任務的執行 |
| **Call Stack** | 呼叫堆疊 | 記錄目前正在執行的 JavaScript 函式的資料結構 |
| **Macro Task** | 巨集任務 | 事件迴圈中優先順序較低的任務類型，如 setTimeout、setInterval、I/O 操作等 |
| **Micro Task** | 微任務 | 事件迴圈中優先順序較高的任務類型，如 Promise.then、MutationObserver 等 |
| **Forced Synchronous Layout** | 強制同步佈局 | 在 JavaScript 中交替讀取和寫入佈局屬性，導致瀏覽器被迫立即執行佈局計算的效能問題 |
| **Layout Thrashing** | 佈局抖動 | 頻繁的強制同步佈局導致的效能急劇下降現象 |
| **Virtual Scrolling** | 虛擬捲動 | 只渲染視埠內可見列表項的技術，用於最佳化大資料列表的效能 |
| **RAF** | 請求動畫幀 | 瀏覽器提供的 API，用於在下一次重繪前執行動畫相關的 JavaScript 程式碼 |
