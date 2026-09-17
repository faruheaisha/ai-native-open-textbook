---
title: "Principles of Browser Rendering"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/appendix/3-browser-and-frontend/browser-as-os-rendering.md"
sourceRel: "docs/en/appendix/3-browser-and-frontend/browser-as-os-rendering.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/en/appendix/3-browser-and-frontend/browser-as-os-rendering.md"
sourceSha256: "ad3e4574c4ac646eb3e4974c0c5d09510d25a398127edf6b73b465ac0614bad8"
pageSha256: "ad3e4574c4ac646eb3e4974c0c5d09510d25a398127edf6b73b465ac0614bad8"
contentMode: "local-full"
zh: ""
---

# Principles of Browser Rendering
::: tip 🎯 Core Question
**Why are some web pages smooth as silk while others stutter like a slideshow?** How does the browser turn a pile of HTML, CSS, and JavaScript into the page you see? This chapter takes you inside the browser's "workshop" to understand its workflow so you can write higher-performance web pages.
:::

**What will this article teach you?**

| Chapter | Content | What You'll Be Able to Do |
|-----|------|-----------|
| **Chapter 1** | Why understand the rendering pipeline | Understand the necessity of performance optimization |
| **Chapter 2** | The five stages of the rendering pipeline | Master the basic browser rendering process |
| **Chapter 3** | Building the DOM tree and CSSOM tree | Understand how HTML and CSS are parsed |
| **Chapter 4** | Building the render tree | Know which elements get rendered |
| **Chapter 5** | Layout and reflow | Avoid triggering expensive layout calculations |
| **Chapter 6** | Paint and repaint | Reduce unnecessary paint operations |
| **Chapter 7** | Compositing and GPU acceleration | Leverage GPU to improve animation performance |
| **Chapter 8** | Event loop | Understand JavaScript's execution mechanism |
| **Chapter 9** | Performance optimization in practice | Master common performance optimization techniques |

Each chapter starts with "understanding the principles" — you don't need to hand-write optimization code. When you encounter performance issues, come back and reference this anytime.

---

## 1. Motivation for Understanding the "Rendering Pipeline"

### 1.1 From "It Works" to "It's Fast": The Advanced Path of Frontend Development

When you first learn frontend, you only care whether the code "works" — the page displays, buttons are clickable, and that's success. But as projects grow and users increase, you'll quickly face a harsh reality: **for the same functionality, some people's pages are buttery smooth, while others stutter so badly users want to throw their mouse.**

It's like learning to drive. Beginners only care about "can the car move," but experienced drivers care about "when to shift gears, when to brake, how to drive most efficiently." The browser is the "car" you're driving — understanding its "working habits" lets you drive fast and smooth.

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🐢 Beginner Mindset (Functionality Only)**
- As long as the page displays, it's fine
- Stuttering is the browser's problem
- Performance optimization is something to consider later

</div>
<div style="flex: 1; padding: 16px; border: 1px solid #e4e7ed; border-radius: 12px;">

**🚀 Advanced Mindset (Experience Focused)**
- Smoothness is core to user experience
- Understand the browser's workflow
- Consider performance while writing code

</div>
</div>

**Understanding the rendering pipeline is the key step from "it works" to "it's fast."**

### 1.2 Case: "Optimization" Actually Making It Slower

::: warning Xiao Zhang's Performance Pitfall
Xiao Zhang is a frontend engineer at an e-commerce company, responsible for optimizing the product detail page. The page was horribly laggy when displaying product information, and user complaints kept pouring in.

Xiao Zhang thought: "The page is laggy probably because there are too many DOM elements. I'll hide them with `display:none` first, modify them, then show them again — that way the browser won't re-render repeatedly, right?"

So he wrote this code:

```javascript
// The "optimization" you thought you were doing
const container = document.getElementById('list')
container.style.display = 'none'  // Hide first — shouldn't trigger rendering, right?

for (let i = 0; i < 1000; i++) {
  const item = document.createElement('div')
  item.style.width = Math.random() * 100 + 'px'  // Random width
  container.appendChild(item)
}

container.style.display = 'block'  // Show at the end, render once
```

After testing, the page was **even laggier**! Xiao Zhang was baffled: he had clearly "optimized" it, so why was it slower?

Later, the frontend lead looked at the code and pointed out the problem: **although the elements were hidden, each modification to `style.width` still triggered the browser's style recalculation and layout invalidation. The browser was doing a ton of useless work in the background.**

The correct approach is to use `DocumentFragment` to batch operations in memory, then insert into the DOM once, triggering only a single render.
:::

::: info 💡 Core Insight
Without understanding the browser's workflow, you might "cleverly" write a bunch of "optimization code" that actually makes performance worse. **Understanding the rendering pipeline tells you which operations are expensive and which are cheap, so you avoid putting effort in the wrong places.**
:::

---

## 2. Core Concept: Overview of the "Rendering Pipeline"

::: tip 🤔 What Is "Rendering"?
**Rendering**, simply put, is the process by which the browser "draws" code into the web page you see.

You can think of it like a **printing press producing a book**:
- **HTML** = the manuscript content (text, images, chapters)
- **CSS** = the typesetting requirements (font size, color, spacing)
- **JavaScript** = dynamic modifications (the author making last-minute edits, adjusting layout)

The browser takes these "materials" and passes them through a series of "processes" before finally "printing" the web page you see. This series of processes is the **Rendering Pipeline**.
:::

To help you understand better, let's use a **bakery** as an analogy for the browser's rendering process.

### 2.1 Understanding the Rendering Pipeline Through a Bakery Analogy

Imagine you're running a bakery, making various breads for customers every day. The stages involved in this process are strikingly similar to the browser's rendering pipeline:

| Stage | 🥖 Bakery Analogy | What the Browser Actually Does | Concrete Example |
|------|-------------|--------------|----------|
| **1. Prepare Ingredients** | Organize the ingredient list (flour, eggs, cream...) | **Build the DOM tree**: Parse HTML into a tree structure | You write `<div><p>Hello</p></div>`, the browser parses it into a `div→p→"Hello"` tree |
| **2. Prepare Recipes** | Organize recipe cards (ingredient ratios for each bread) | **Build the CSSOM tree**: Parse CSS into a tree of rules | You write `.title \{ color: red \}`, the browser records "`.title` text is red" |
| **3. Make a Plan** | Based on ingredients and recipes, decide what breads to make today | **Build the render tree**: Merge DOM and CSSOM, keeping only visible elements | `
&lt;/head>
&lt;body>
  <div class="container">
    <p>Visible content</p>
  </div>
  <div style="display: none">
    <p>Hidden content (display:none)</p>
  </div>
&lt;/body>
&lt;/html>
```

**The DOM tree includes all elements**:
- `<head>`, `<title>`, `<style>`, `
```
:::

### 9.4 Debounce and Throttle: Reduce Event Trigger Frequency

**Problem**: Frequently triggered events (like scroll, resize) cause performance issues.

::: details View Debounce and Throttle Implementation
```javascript
// Debounce: delay execution; if triggered again within the delay, restart the timer
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// Throttle: execute at fixed time intervals
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

// Usage example
window.addEventListener('scroll', debounce(handleScroll, 200))
window.addEventListener('resize', throttle(handleResize, 100))
```
:::

### 9.5 Lazy Loading: Defer Loading Non-Critical Resources

**Problem**: Loading too many resources on the first screen makes the page open slowly.

::: details View Lazy Loading Implementation
```javascript
// Image lazy loading
const lazyImages = document.querySelectorAll('img[data-src]')

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src  // Load the real image
      img.removeAttribute('data-src')
      observer.unobserve(img)  // Stop observing
    }
  })
})

lazyImages.forEach(img => imageObserver.observe(img))
```
:::

---

## 10. Performance Problems You Should Now Be Able to Identify

After understanding the browser's rendering pipeline, you should be able to identify these common performance issues:

| Problem Code | What's Wrong | How to Describe It to AI |
|---------|---------|-------------|
| `element.style.width = ...` | Frequently modifying width in a loop | "This triggers multiple reflows; please use transform or batch processing instead" |
| `height = element.offsetHeight` | Reading layout properties right after writing | "This is forced synchronous layout; please separate reads and writes" |
| `element.className = ...` | Frequently modifying class triggers style recalculation | "Use classList.add/remove instead to reduce style calculations" |
| Animating with `width`/`left` | Triggers reflow and repaint, poor performance | "Use transform and opacity for animations instead" |
| Adding `translateZ(0)` to all elements | Abusing GPU acceleration causes memory explosion | "Only enable GPU acceleration on elements that need animation" |
| Rendering 10,000 list items all at once | Too many DOM nodes cause stutter | "Implement virtual scrolling to only render the visible area" |
| Manipulating DOM directly in scroll events | Too-high trigger frequency causes stutter | "Use requestAnimationFrame or throttle to optimize" |
| Using `box-shadow` for hover animation | Complex shadow calculation is very slow | "Use transform or pseudo-elements instead; avoid animating shadows" |

**If you've carefully read each chapter's "Pitfall Journal," you've also mastered these core concepts:**

- **The five stages of the rendering pipeline**: DOM/CSSOM → Render Tree → Layout → Paint → Composite
- **Reflow vs. Repaint**: Reflow is most expensive (geometric changes), repaint is next (appearance changes)
- **Forced Synchronous Layout**: Interleaved reads and writes cause layout thrashing — must separate them
- **GPU Acceleration**: transform and opacity are handled by GPU for best performance
- **Event Loop**: JavaScript is single-threaded, achieving asynchrony through task queues

These concepts will help you quickly identify performance bottlenecks.

::: info 💡 When You Encounter Performance Issues, Tell AI This
- "Animation is choppy — check if it's triggering reflow or repaint"
- "Scroll performance is poor — may need throttling or requestAnimationFrame"
- "Large lists stutter — need virtual scrolling"
- "Frequent style changes cause performance issues — please optimize with transform"
:::

---

## 11. Summary: The Essence of Rendering Pipeline Optimization

Through this article, we can draw the following core conclusions:

**From a practical standpoint**: It's not about doing more optimization, but about doing the *right* optimization. Understanding the browser's rendering pipeline tells you where to focus effort and where to let go.

**From a cost perspective**:
- Most performance waste comes from **frequent interleaved reads and writes** of layout properties, which must be solved through read/write separation and batch processing
- Complex animation effects that trigger reflow and repaint often stem from using the "wrong properties" and need to be solved through `transform` and `opacity`
- For rendering large data lists, relying solely on virtual DOM is no longer enough — techniques like **virtual scrolling** must be combined

**The goal is: under given browser and hardware conditions, ensure every rendering step's investment delivers clear performance returns.**

---

## 12. Glossary

| English Term | Chinese Translation | Explanation |
| :--- | :--- | :--- |
| **DOM** | 文档对象模型 | The tree structure formed after the browser parses an HTML document; JavaScript can manipulate page elements through the DOM API |
| **CSSOM** | CSS对象模型 | The tree structure formed after the browser parses CSS; combined with the DOM to calculate final styles |
| **Render Tree** | 渲染树 | Formed by merging the DOM tree and CSSOM tree; contains only visible nodes, used for subsequent layout calculation and painting |
| **Layout** | 布局 | The process of calculating geometric information (position, size) for each node in the render tree; also called Reflow |
| **Reflow** | 重排/回流 | When an element's geometric properties (size, position) change, the browser must recalculate layout |
| **Paint** | 绘制/重绘 | The process of drawing layout-calculated element styles (color, background, borders, etc.) onto the screen |
| **Repaint** | 重绘 | A paint update triggered when an element's appearance properties (like color, background) change without affecting geometric properties |
| **Composite** | 合成 | The process of merging multiple paint layers into the final screen image, typically executed on the GPU |
| **Layer** | 层/合成层 | An independent paint surface created by the browser to optimize rendering; can be transformed and composited independently |
| **Event Loop** | 事件循环 | JavaScript's asynchronous execution mechanism, responsible for scheduling macrotask and microtask execution |
| **Call Stack** | 调用栈 | A data structure that records the currently executing JavaScript functions |
| **Macro Task** | 宏任务 | Lower-priority task types in the event loop, such as setTimeout, setInterval, I/O operations, etc. |
| **Micro Task** | 微任务 | Higher-priority task types in the event loop, such as Promise.then, MutationObserver, etc. |
| **Forced Synchronous Layout** | 强制同步布局 | A performance problem where interleaving reads and writes of layout properties in JavaScript forces the browser to immediately execute layout calculations |
| **Layout Thrashing** | 布局抖动 | The severe performance degradation caused by frequent forced synchronous layout |
| **Virtual Scrolling** | 虚拟滚动 | A technique that only renders visible list items within the viewport, used to optimize performance for large data lists |
| **RAF** | 请求动画帧 | A browser API for executing animation-related JavaScript code before the next repaint |
