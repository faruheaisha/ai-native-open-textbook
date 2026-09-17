// 把 ```mermaid 代码块画成图。
//
// 为什么按需画：
//   2169 篇正文里只有 181 篇带流程图。库只在真正滚到图附近时才 import，
//   其余页面一点都不用替它付流量 —— 跨境链路上这比省几行代码重要得多。
//
// 为什么不在构建期画成 SVG：
//   mermaid 会把具体颜色写进 SVG 里，暗色主题得另存一份、还要靠 JS 换 src。
//   放在浏览器端画，主题一变直接重画，两条路各自都更简单。
//
// 渲染后原地保留 VitePress 的代码块外壳：右上角的「mermaid」标签和复制按钮
// 仍然指向原始源码，学习者想抄走这张图不用另开一个面板。

type MermaidLike = {
  initialize: (config: Record<string, unknown>) => void
  render: (id: string, code: string) => Promise<{ svg: string }>
}

type Block = { code: string; drawn: boolean; busy: boolean }

const blocks = new Map<HTMLElement, Block>()
let lib: MermaidLike | null = null
let loading: Promise<MermaidLike> | null = null
let observer: IntersectionObserver | null = null
let themeWatcher: MutationObserver | null = null
let themeTimer = 0
let seq = 0

function isDark() {
  return document.documentElement.classList.contains('dark')
}

// 亮色下用 base 主题再覆盖几个变量：默认的 default 主题是蓝紫配色，
// 跟站里的暖白底、砖红强调色放在一起很跳。
function themeConfig() {
  if (isDark()) return { theme: 'dark' as const }
  return {
    theme: 'base' as const,
    themeVariables: {
      primaryColor: '#f4f2ec',
      primaryTextColor: '#17181a',
      primaryBorderColor: '#d9d3c6',
      secondaryColor: '#efe9df',
      tertiaryColor: '#fbfaf7',
      lineColor: '#9a9084',
      textColor: '#3c3a35',
      fontFamily: 'inherit',
    },
  }
}

async function loadLib(): Promise<MermaidLike> {
  if (lib) return lib
  if (!loading) {
    loading = import('mermaid').then((mod) => {
      const picked = ((mod as { default?: MermaidLike }).default || mod) as MermaidLike
      lib = picked
      return picked
    })
  }
  return loading
}

function sourceOf(box: HTMLElement) {
  const code = box.querySelector('pre code')
  return (code && code.textContent) || ''
}

function figureOf(box: HTMLElement) {
  return box.querySelector<HTMLElement>('.tb-mermaid__figure')
}

async function draw(box: HTMLElement) {
  const rec = blocks.get(box)
  if (!rec || rec.busy) return
  rec.busy = true
  try {
    const m = await loadLib()
    m.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      ...themeConfig(),
      flowchart: { useMaxWidth: true, htmlLabels: true },
      sequence: { useMaxWidth: true },
      gantt: { useMaxWidth: true },
    })
    const id = 'tb-mmd-' + (++seq)
    const { svg } = await m.render(id, rec.code)
    let figure = figureOf(box)
    if (!figure) {
      figure = document.createElement('div')
      figure.className = 'tb-mermaid__figure'
      const pre = box.querySelector('pre')
      box.insertBefore(figure, pre || null)
    }
    figure.innerHTML = svg
    box.classList.add('is-drawn')
    rec.drawn = true
  } catch (err) {
    // 画不出来就退回源码块：原文本身是完整的，不能因为它画不出来就整块消失。
    box.classList.add('is-failed')
    rec.drawn = false
    if (import.meta.env.DEV) console.warn('[mermaid] 渲染失败', err)
  } finally {
    rec.busy = false
  }
}

function collect(root: ParentNode) {
  observer = observer || new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer?.unobserve(entry.target)
        void draw(entry.target as HTMLElement)
      }
    },
    // 提前一屏开始画：等图滚进视口再动手，看到的会是空档。
    { rootMargin: '640px 0px' }
  )
  root.querySelectorAll<HTMLElement>('div.language-mermaid').forEach((box) => {
    if (blocks.has(box)) return
    const code = sourceOf(box)
    if (!code.trim()) return
    blocks.set(box, { code, drawn: false, busy: false })
    observer?.observe(box)
  })
}

// mermaid 把颜色烤进 SVG，切主题只能重画。用 MutationObserver 盯 html 上的
// class，是因为 VitePress 的暗色开关就是切这一个 class，没有事件可听。
function watchTheme() {
  if (themeWatcher) return
  themeWatcher = new MutationObserver(() => {
    window.clearTimeout(themeTimer)
    themeTimer = window.setTimeout(() => {
      blocks.forEach((rec, box) => {
        if (rec.drawn) void draw(box)
      })
    }, 120)
  })
  themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
}

export function setupMermaid() {
  collect(document)
  watchTheme()
}

// 换页时旧节点会被丢掉，Map 里留着它们就是稳定的内存泄漏。
export function resetMermaid() {
  observer?.disconnect()
  observer = null
  blocks.clear()
}