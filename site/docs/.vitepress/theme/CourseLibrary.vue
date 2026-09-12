<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import { volumes, courses, sources, categoryOrder } from './generated/catalog'

type Course = (typeof courses)[number]

const q = ref('')
const cat = ref('全部')
const tier = ref(0)
const lang = ref('全部')
const vol = ref('全部')
const sortKey = ref('tier')

const volName = new Map(volumes.map((v) => [v.id, `${v.order}. ${v.name}`]))
const volOrder = new Map(volumes.map((v) => [v.id, v.order]))
const langOf = (s: string) => (/中文/.test(s) && !/中英混排/.test(s) ? '中文' : /中英混排/.test(s) ? '中英混排' : '英文')

const cats = computed(() => {
  const used = new Set(courses.map((c) => c.category))
  return ['全部', ...categoryOrder.filter((c) => used.has(c))]
})
const langs = ['全部', '中文', '中英混排', '英文']
const tiers = [
  { v: 0, label: '全部' },
  { v: 1, label: '★★★ 主线' },
  { v: 2, label: '★★ 进阶' },
  { v: 3, label: '★ 参考' },
]
const sorts = [
  { v: 'tier', label: '分级与体量' },
  { v: 'docs', label: '课时多少' },
  { v: 'volume', label: '路径顺序' },
  { v: 'title', label: '课程名称' },
]

const k = computed(() => q.value.trim().toLowerCase())
const hit = (c: Course) =>
  !k.value || `${c.title} ${c.kind} ${c.category} ${c.lang} ${volName.get(c.volume) || ''}`.toLowerCase().includes(k.value)

const passCat = (c: Course) => cat.value === '全部' || c.category === cat.value
const passTier = (c: Course) => tier.value === 0 || c.tier === tier.value
const passLang = (c: Course) => lang.value === '全部' || langOf(c.lang) === lang.value
const passVol = (c: Course) => vol.value === '全部' || c.volume === vol.value

const list = computed(() => {
  const arr = courses.filter((c) => hit(c) && passCat(c) && passTier(c) && passLang(c) && passVol(c))
  const rank = (c: Course) => volOrder.get(c.volume) || 99
  if (sortKey.value === 'docs') arr.sort((a, b) => b.docs.length - a.docs.length || a.tier - b.tier)
  else if (sortKey.value === 'volume') arr.sort((a, b) => rank(a) - rank(b) || a.tier - b.tier)
  else if (sortKey.value === 'title') arr.sort((a, b) => a.title.localeCompare(b.title, 'zh'))
  else arr.sort((a, b) => a.tier - b.tier || b.docs.length - a.docs.length)
  return arr
})

const nCat = (v: string) =>
  courses.filter((c) => hit(c) && passTier(c) && passLang(c) && passVol(c) && (v === '全部' || c.category === v)).length
const nTier = (v: number) =>
  courses.filter((c) => hit(c) && passCat(c) && passLang(c) && passVol(c) && (v === 0 || c.tier === v)).length
const nLang = (v: string) =>
  courses.filter((c) => hit(c) && passCat(c) && passTier(c) && passVol(c) && (v === '全部' || langOf(c.lang) === v)).length

const outside = computed(() => sources.filter((s) => !s.ported))

const active = computed(() => cat.value !== '全部' || tier.value !== 0 || lang.value !== '全部' || vol.value !== '全部' || !!q.value)

const reset = () => {
  q.value = ''
  cat.value = '全部'
  tier.value = 0
  lang.value = '全部'
  vol.value = '全部'
}
const stars = (t: number) => (t === 1 ? '★★★' : t === 2 ? '★★' : '★')

// 筛选条吸顶后加一道投影：滚动时分得清「筛选条」和「内容」
const rootEl = ref<HTMLElement | null>(null)
const sentinelEl = ref<HTMLElement | null>(null)
let io: IntersectionObserver | null = null

// 筛选条件同步到地址栏：刷新、收藏或把链接发给别人时，看到的是同一组筛选结果
function readQuery() {
  try {
    const sp = new URLSearchParams(window.location.search)
    const c = sp.get('cat')
    if (c && cats.value.includes(c)) cat.value = c
    const t = Number(sp.get('tier') || 0)
    if (t === 1 || t === 2 || t === 3) tier.value = t
    const l = sp.get('lang')
    if (l && langs.includes(l)) lang.value = l
    const v = sp.get('vol')
    if (v && volName.has(v)) vol.value = v
    const st = sp.get('sort')
    if (st && sorts.some((x) => x.v === st)) sortKey.value = st
    const kw = sp.get('q')
    if (kw) q.value = kw
  } catch {
    /* 地址栏不可用时按默认筛选走 */
  }
}

function writeQuery() {
  try {
    const sp = new URLSearchParams()
    if (q.value.trim()) sp.set('q', q.value.trim())
    if (cat.value !== '全部') sp.set('cat', cat.value)
    if (tier.value !== 0) sp.set('tier', String(tier.value))
    if (lang.value !== '全部') sp.set('lang', lang.value)
    if (vol.value !== '全部') sp.set('vol', vol.value)
    if (sortKey.value !== 'tier') sp.set('sort', sortKey.value)
    const qs = sp.toString()
    window.history.replaceState(null, '', qs ? window.location.pathname + '?' + qs : window.location.pathname)
  } catch {
    /* 忽略 */
  }
}

onMounted(() => {
  readQuery()
  watch([q, cat, tier, lang, vol, sortKey], writeQuery)

  const el = sentinelEl.value
  const root = rootEl.value
  if (!el || !root || !('IntersectionObserver' in window)) return
  io = new IntersectionObserver(
    (entries) => {
      const e = entries[entries.length - 1]
      root.classList.toggle('is-stuck', !e.isIntersecting)
    },
    { rootMargin: '-64px 0px 0px 0px', threshold: 0 }
  )
  io.observe(el)
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <div ref="rootEl" class="tb-lib">
    <span ref="sentinelEl" class="tb-lib__stick-sentinel" aria-hidden="true" />
    <div class="tb-lib__bar">
      <input v-model="q" class="tb-lib__search" type="search" placeholder="搜索课程名、分类、路径……" />
      <button class="tb-lib__reset" type="button" :disabled="!active" @click="reset">重置</button>
    </div>

    <div class="tb-lib__group">
      <span class="tb-lib__label">分类</span>
      <button
        v-for="c in cats"
        :key="c"
        class="tb-lib__chip"
        :class="{ 'is-on': cat === c, 'is-zero': nCat(c) === 0 && cat !== c }"
        type="button"
        @click="cat = c"
      >
        {{ c }}<i class="tb-lib__n">{{ nCat(c) }}</i>
      </button>
    </div>
    <div class="tb-lib__group">
      <span class="tb-lib__label">分级</span>
      <button
        v-for="t in tiers"
        :key="t.v"
        class="tb-lib__chip"
        :class="{ 'is-on': tier === t.v, 'is-zero': nTier(t.v) === 0 && tier !== t.v }"
        type="button"
        @click="tier = t.v"
      >
        {{ t.label }}<i class="tb-lib__n">{{ nTier(t.v) }}</i>
      </button>
    </div>
    <div class="tb-lib__group">
      <span class="tb-lib__label">语言</span>
      <button
        v-for="l in langs"
        :key="l"
        class="tb-lib__chip"
        :class="{ 'is-on': lang === l, 'is-zero': nLang(l) === 0 && lang !== l }"
        type="button"
        @click="lang = l"
      >
        {{ l }}<i class="tb-lib__n">{{ nLang(l) }}</i>
      </button>
    </div>
    <div class="tb-lib__group">
      <span class="tb-lib__label">路径</span>
      <select v-model="vol" class="tb-lib__select">
        <option value="全部">全部路径</option>
        <option v-for="v in volumes" :key="v.id" :value="v.id">{{ v.order }}. {{ v.name }}</option>
      </select>
      <span class="tb-lib__label tb-lib__label--gap">排序</span>
      <select v-model="sortKey" class="tb-lib__select">
        <option v-for="s in sorts" :key="s.v" :value="s.v">{{ s.label }}</option>
      </select>
    </div>

    <p class="tb-lib__count">
      匹配 <b>{{ list.length }}</b> 门课程
      <span v-if="list.length" class="tb-lib__count-hint">· 课程名可点开，进入后按左栏目录顺序读</span>
    </p>

    <ul class="tb-lib__list">
      <li v-for="c in list" :key="c.id" class="tb-lib__item">
        <a class="tb-lib__title" :href="withBase(`/lib/${c.volume}/${c.local}/`)">{{ c.title }}</a>
        <div class="tb-lib__meta">
          <span class="tb-lib__tier">{{ stars(c.tier) }}</span>
          <span>{{ c.category }}</span>
          <span class="tb-lib__dot">·</span>
          <span>{{ volName.get(c.volume) }}</span>
          <span class="tb-lib__dot">·</span>
          <span>{{ c.lang }}</span>
          <span class="tb-lib__dot">·</span>
          <span>{{ c.docs.length }} 课时</span>
          <span v-if="c.licenseLabel !== '可转载'" class="tb-lib__lic">{{ c.licenseLabel }}</span>
        </div>
        <div class="tb-lib__links">
          <a :href="withBase(`/lib/${c.volume}/${c.local}/`)">站内阅读</a>
          <a v-if="c.sourceUrl" :href="c.sourceUrl" target="_blank" rel="noreferrer">原文 ↗</a>
        </div>
      </li>
    </ul>
    <div v-if="!list.length" class="tb-lib__empty">
      <p class="tb-lib__empty-text">没有匹配的课程。换一个关键词，或把筛选条件放宽一点。</p>
      <button class="tb-lib__empty-reset" type="button" @click="reset">重置全部筛选</button>
    </div>

    <details class="tb-lib__outside">
      <summary>官方文献与外部索引（{{ outside.length }} 条，提供原文入口）</summary>
      <ul class="tb-lib__list">
        <li v-for="s in outside" :key="s.id" class="tb-lib__item">
          <span class="tb-lib__title tb-lib__title--plain">{{ s.title }}</span>
          <div class="tb-lib__meta">
            <span>{{ s.kind }}</span>
            <span class="tb-lib__dot">·</span>
            <span>{{ volName.get(s.volume) }}</span>
            <span class="tb-lib__dot">·</span>
            <span>{{ s.lang }}</span>
            <span class="tb-lib__dot">·</span>
            <span>{{ s.md }} 篇</span>
            <span class="tb-lib__lic">{{ s.licenseLabel }}</span>
          </div>
          <div class="tb-lib__links">
            <a v-if="s.entryUrl" :href="s.entryUrl" target="_blank" rel="noreferrer">原文 ↗</a>
            <a v-if="s.repo" :href="`https://github.com/${s.repo}`" target="_blank" rel="noreferrer">仓库 ↗</a>
          </div>
        </li>
      </ul>
    </details>
  </div>
</template>
