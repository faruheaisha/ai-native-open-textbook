<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'

type RawCourse = { t: string; u: string; v?: string; k?: string; l?: string; g?: string; r?: number }
type RawPage = { t: string; u: string; c?: string; v?: string; h?: string[]; x?: string }

type Item = {
  kind: 'course' | 'page'
  title: string
  tl: string
  url: string
  course: string
  courseL: string
  volume: string
  volumeL: string
  meta: string
  metaL: string
  heads: { t: string; l: string }[]
  ex: string
  exL: string
  hay: string
}

const OPEN_KEY = 'tb-search-open'
const shown = ref(false)
const ready = ref(false)
const failed = ref(false)
const q = ref('')
const cur = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)
const listEl = ref<HTMLElement | null>(null)
const items = ref<Item[]>([])

let focusBack: HTMLElement | null = null

const terms = computed(() =>
  q.value
    .toLowerCase()
    .split(/[\s\u3000]+/)
    .map((t) => t.trim())
    .filter(Boolean)
)
const termsRef = terms

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string)
}

function hi(text: string) {
  const ts = termsRef.value
  if (!ts.length) return esc(text)
  const re = new RegExp('(' + ts.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'gi')
  return text
    .split(re)
    .map((part, i) => (i % 2 ? '<mark>' + esc(part) + '</mark>' : esc(part)))
    .join('')
}

// 命中位置越靠前越相关，整串相等再抬一档；标题权重最高，小节标题次之，摘要最低。
function weight(text: string, term: string, base: number) {
  if (!text) return 0
  const i = text.indexOf(term)
  if (i < 0) return 0
  const exact = text.length === term.length
  return base * (exact ? 3 : i === 0 ? 2 : 1) + base * (1 - Math.min(i, 40) / 50)
}

function scoreIt(it: Item, ts: string[]) {
  let total = 0
  let head = ''
  for (const t of ts) {
    let s = weight(it.tl, t, it.kind === 'course' ? 120 : 100)
    s += weight(it.courseL, t, 26)
    s += weight(it.metaL, t, 14)
    let hs = 0
    let best = ''
    for (const h of it.heads) {
      const v = weight(h.l, t, 46)
      if (v > hs) {
        hs = v
        best = h.t
      }
    }
    s += hs
    if (!s) s += weight(it.exL, t, 8)
    if (!s) return 0
    total += s
    if (!head && best) head = best
  }
  return { total, head }
}

const results = computed(() => {
  const ts = terms.value
  if (!ts.length) return [] as (Item & { head?: string; score: number })[]
  const out: (Item & { head?: string; score: number })[] = []
  for (const it of items.value) {
    if (!ts.every((t) => it.hay.includes(t))) continue
    const r = scoreIt(it, ts)
    if (!r) continue
    out.push({ ...it, head: r.head, score: r.total })
  }
  out.sort((a, b) => b.score - a.score || (a.kind === 'course' ? -1 : 1))
  return out.slice(0, 40)
})

async function load() {
  if (ready.value || failed.value) return
  try {
    const res = await fetch(withBase('/search-index.json'))
    if (!res.ok) throw new Error(String(res.status))
    const data = (await res.json()) as { courses: RawCourse[]; pages: RawPage[] }
    const list: Item[] = []
    for (const c of data.courses || []) {
      const meta = [c.v, c.k, c.l, c.g].filter(Boolean).join(' · ')
      list.push({
        kind: 'course',
        title: c.t,
        tl: c.t.toLowerCase(),
        url: c.u,
        course: '',
        courseL: '',
        volume: c.v || '',
        volumeL: (c.v || '').toLowerCase(),
        meta,
        metaL: meta.toLowerCase(),
        heads: [],
        ex: '',
        exL: '',
        hay: (c.t + ' ' + meta).toLowerCase(),
      } as Item)
    }
    for (const p of data.pages || []) {
      const heads = (p.h || []).map((h) => ({ t: h, l: h.toLowerCase() }))
      const course = p.c || ''
      const volume = p.v || ''
      const meta = [volume, course].filter(Boolean).join(' · ')
      list.push({
        kind: 'page',
        title: p.t,
        tl: p.t.toLowerCase(),
        url: p.u,
        course,
        courseL: course.toLowerCase(),
        volume,
        volumeL: volume.toLowerCase(),
        meta,
        metaL: meta.toLowerCase(),
        heads,
        ex: p.x || '',
        exL: (p.x || '').toLowerCase(),
        hay: [p.t, course, volume, p.x || '', ...(p.h || [])].join(' ').toLowerCase(),
      } as Item)
    }
    items.value = list
    ready.value = true
  } catch {
    failed.value = true
  }
}

async function open() {
  if (shown.value) return
  focusBack = document.activeElement as HTMLElement | null
  shown.value = true
  document.documentElement.classList.add(OPEN_KEY)
  document.body.classList.add('tb-srch-lock')
  await load()
  await nextTick()
  inputEl.value?.focus()
}

function close() {
  if (!shown.value) return
  shown.value = false
  document.documentElement.classList.remove(OPEN_KEY)
  document.body.classList.remove('tb-srch-lock')
  focusBack?.focus?.()
  focusBack = null
}

function go(i = cur.value) {
  const r = results.value[i]
  if (!r) return
  window.location.href = withBase(r.url)
  close()
}

function onKey(e: KeyboardEvent) {
  const n = results.value.length
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (n) cur.value = (cur.value + 1) % n
    return
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (n) cur.value = (cur.value - 1 + n) % n
    return
  }
  if (e.key === 'Enter') {
    e.preventDefault()
    go()
  }
}

function onDocKey(e: KeyboardEvent) {
  const k = e.key.toLowerCase()
  if ((e.metaKey || e.ctrlKey) && k === 'k') {
    e.preventDefault()
    shown.value ? close() : open()
    return
  }
  if (k === '/' && !shown.value) {
    const t = e.target as HTMLElement | null
    const tag = t?.tagName?.toLowerCase()
    if (tag === 'input' || tag === 'textarea' || t?.isContentEditable) return
    e.preventDefault()
    open()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onDocKey)
  const r = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: object) => void }).requestIdleCallback
  if (r) r(() => load(), { timeout: 4000 })
  else window.setTimeout(load, 2500)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onDocKey)
  document.documentElement.classList.remove(OPEN_KEY)
  document.body.classList.remove('tb-srch-lock')
})

// 键盘上下移动时把当前项带进视野，40 条结果里不至于选到看不见的地方
watch(cur, async () => {
  await nextTick()
  const box = listEl.value
  const el = box?.querySelector<HTMLElement>(".is-cur")
  if (!box || !el) return
  const top = el.offsetTop
  const bottom = top + el.offsetHeight
  if (top < box.scrollTop) box.scrollTop = top - 6
  else if (bottom > box.scrollTop + box.clientHeight) box.scrollTop = bottom - box.clientHeight + 6
})
</script>

<template>
  <div class="tb-srch">
    <button class="tb-srch__btn" type="button" aria-label="搜索课程与文档" @click="open">
      <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
        <circle cx="9" cy="9" r="5.4" />
        <path d="M13 13l3.4 3.4" stroke-linecap="round" />
      </svg>
      <span class="tb-srch__btn-text">搜索</span>
      <span class="tb-srch__kbd">Ctrl K</span>
    </button>

    <Teleport to="body">
      <div v-if="shown" class="tb-srch__mask" @click="close">
        <div class="tb-srch__panel" role="dialog" aria-modal="true" aria-label="站内搜索" @click.stop>
          <div class="tb-srch__field">
            <svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
              <circle cx="9" cy="9" r="5.4" />
              <path d="M13 13l3.4 3.4" stroke-linecap="round" />
            </svg>
            <input
              ref="inputEl"
              v-model="q"
              type="search"
              placeholder="搜索课程名、课时名、小节标题……"
              autocomplete="off"
              spellcheck="false"
              aria-label="搜索关键词"
              @keydown="onKey"
              @input="cur = 0"
            />
            <button v-if="q" class="tb-srch__clear" type="button" aria-label="清空" @click="q = ''">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
            <button class="tb-srch__x" type="button" aria-label="关闭搜索" @click="close">
              <svg class="tb-srch__x-i" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
                <path d="M6 6l8 8M14 6l-8 8" />
              </svg>
              <span class="tb-srch__x-t">取消</span>
            </button>
          </div>

          <div v-if="!q" class="tb-srch__guide">
            <p class="tb-srch__guide-t">可以这样找</p>
            <p class="tb-srch__guide-i"><b>课程名</b>：MCP、Harness、WorkBuddy、千问办公</p>
            <p class="tb-srch__guide-i"><b>小节标题</b>：上下文工程、工具调用、多 Agent 编排</p>
            <p class="tb-srch__guide-i"><b>学习路径</b>：AI 基础与模型认知、办公与知识工作</p>
          </div>

          <p v-else-if="failed" class="tb-srch__none">索引没能加载，刷新页面再试一次。</p>
          <p v-else-if="!results.length" class="tb-srch__none">没有匹配「{{ q }}」的课程或章节。</p>

          <template v-else>
            <p class="tb-srch__count">命中 {{ results.length }} 条</p>
            <ul ref="listEl" class="tb-srch__list">
              <li
                v-for="(r, i) in results"
                :key="r.url + '|' + r.title"
                class="tb-srch__item"
                :class="{ 'is-cur': i === cur }"
                @mouseenter="cur = i"
              >
                <a :href="withBase(r.url)" @click="close">
                  <span class="tb-srch__tag" :class="'is-' + r.kind">{{ r.kind === 'course' ? '课程' : '课时' }}</span>
                  <span class="tb-srch__ttl" v-html="hi(r.title)" />
                  <span v-if="r.kind === 'course'" class="tb-srch__ctx">{{ r.meta }}</span>
                  <span v-else-if="r.head" class="tb-srch__ctx tb-srch__ctx--head" v-html="'小节 · ' + hi(r.head)" />
                  <span v-else-if="r.course" class="tb-srch__ctx">{{ r.course }}</span>
                  <span v-if="r.kind === 'page' && r.head" class="tb-srch__ctx2">{{ r.meta }}</span>
                </a>
              </li>
            </ul>
          </template>

          <p class="tb-srch__hint"><b>↑</b><b>↓</b> 选择 · <b>Enter</b> 打开 · <b>Esc</b> 关闭</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>
