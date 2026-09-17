<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from 'vitepress'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { volumes } from './generated/catalog'
import { SITE } from './generated/site'
import HomeHeroStats from './HomeHeroStats.vue'
import { resetMermaid, setupMermaid } from './mermaid'

const { Layout: BaseLayout } = DefaultTheme
const { frontmatter, page } = useData()

const volName = computed(() => volumes.find((v) => v.id === frontmatter.value.volume)?.name || '')
const isCourse = computed(() => !!frontmatter.value.sourceId)
const hasZh = computed(() => frontmatter.value.zh === 'on')
const zhOn = ref(false)

const notFoundLinks = [
  { title: '课程库', desc: '按分类、分级与语言筛选全部课程', href: '/library/' },
  { title: '学习路径', desc: '按知识依赖顺序的八条主线', href: '/paths/01-foundations' },
  { title: '来源总表', desc: '每条来源的出处、许可与原文入口', href: '/sources/' },
  { title: '关于本站', desc: '编排口径与署名方式', href: '/method/' },
]

function applyZh(on: boolean) {
  zhOn.value = on
  document.documentElement.classList.toggle('tb-zh-on', on)
  try {
    localStorage.setItem('tb-zh', on ? '1' : '0')
  } catch {
    /* ignore */
  }
}

function toggleZh() {
  applyZh(!zhOn.value)
  document.querySelectorAll('.tb-zh-hide').forEach((el) => el.classList.remove('tb-zh-hide'))
}

// 阅读位置：回到首页时能接着上次那一课。
const saveLast = (rel: string) => {
  if (!rel.startsWith('lib/')) return
  const clean = rel.replace(/\.md$/, '')
  if (clean.endsWith('/index') || clean === 'index') return
  const href = '/' + clean
  try {
    localStorage.setItem(
      'tb-last',
      JSON.stringify({ href, title: String(frontmatter.value.title || ''), course: String(frontmatter.value.sourceTitle || '') })
    )
  } catch {
    /* ignore */
  }
}

// 阅读进度与回到顶部：长文页（动辄上万像素）需要知道「还剩多少」。
const progressEl = ref<HTMLElement | null>(null)
const toTopEl = ref<HTMLElement | null>(null)
let scrollRaf = 0

function onScroll() {
  if (scrollRaf) return
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0
    const doc = document.documentElement
    const max = doc.scrollHeight - window.innerHeight
    const y = window.scrollY || doc.scrollTop || 0
    const p = max > 160 ? Math.min(1, Math.max(0, y / max)) : 0
    progressEl.value?.style.setProperty('--tb-p', p.toFixed(4))
    toTopEl.value?.classList.toggle('is-on', y > 700)
  })
}

function scrollTop() {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

// 宽表在窄屏会横着溢出，读起来只能看见半列。
// 手机宽度下把它整张转成卡片：标签从表头取，正文里不用手写。
const CARD_MAX = 719.9
const SKIP_HEAD = /^#|^序号|^编号|^no\.?$/i
let tblTimer = 0

function markTables() {
  const narrow = window.innerWidth <= CARD_MAX
  document.querySelectorAll('.vp-doc table').forEach((node) => {
    const el = node
    const head = el.tHead ? Array.from(el.tHead.rows[0]?.cells || []) : []
    const labels = head.map((th) => (th.textContent || '').trim())
    const cols = labels.length || el.rows[1]?.cells?.length || 0
    if (!narrow || cols < 3) {
      el.classList.remove('tb-card')
      return
    }
    let titleIdx = labels.findIndex((t) => t && !SKIP_HEAD.test(t))
    if (titleIdx < 0) titleIdx = 0
    el.querySelectorAll('tbody td').forEach((td) => {
      const cell = td
      const i = cell.cellIndex
      cell.removeAttribute('data-th')
      cell.removeAttribute('data-th-skip')
      cell.removeAttribute('data-th-long')
      if (i === titleIdx) return
      const label = labels[i] || ''
      if (!label || SKIP_HEAD.test(label)) {
        cell.setAttribute('data-th-skip', '')
        return
      }
      cell.setAttribute('data-th', label)
      if (label.replace(/[\s\u00b7]/g, '').length > 4) cell.setAttribute('data-th-long', '')
    })
    el.classList.remove('tb-card')
    if (el.scrollWidth > el.clientWidth + 4) el.classList.add('tb-card')
  })
}

// 站内不少链接的文字里已经带了箭头（表格的「打开 ↗」、卡片的「原文 ↗」），
// VitePress 还会再补一个外链图标，于是并排出现两个箭头。文字里已有箭头就不补图标。
function markExtLinks() {
  document.querySelectorAll('.vp-doc a[target="_blank"], .vp-doc a[href^="http"]').forEach((node) => {
    const a = node as HTMLAnchorElement
    a.classList.toggle('tb-x-text', /[\u2197\u2196\u2191]\s*$/.test((a.textContent || '').trim()))
  })
}

// 来源总表一百四十多行，靠滚动找一条要翻十屏。行数多的表就地加一个筛选框，
// 只过滤、不改正文——表格内容仍是上游/生成器写的那一份。
const FILTER_MIN = 25

function setupTableFilter() {
  document.querySelectorAll('.vp-doc table').forEach((node) => {
    const el = node as HTMLTableElement
    const body = el.tBodies[0]
    if (!body || body.rows.length < FILTER_MIN) return
    const prev = el.previousElementSibling as HTMLElement | null
    if (prev && prev.classList.contains('tb-filter')) return

    const box = document.createElement('div')
    box.className = 'tb-filter'

    const field = document.createElement('div')
    field.className = 'tb-filter__field'

    const icon = document.createElement('span')
    icon.className = 'tb-filter__icon'
    icon.setAttribute('aria-hidden', 'true')
    icon.innerHTML =
      '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="7" cy="7" r="4.5"/><path d="M10.3 10.3 14 14"/></svg>'

    const input = document.createElement('input')
    input.type = 'search'
    input.className = 'tb-filter__input'
    input.placeholder = '筛选这 ' + body.rows.length + ' 条…'
    input.setAttribute('aria-label', '筛选当前表格')
    field.appendChild(icon)
    field.appendChild(input)

    const count = document.createElement('span')
    count.className = 'tb-filter__count'
    count.setAttribute('role', 'status')

    const clear = document.createElement('button')
    clear.type = 'button'
    clear.className = 'tb-filter__clear'
    clear.textContent = '清除'
    clear.hidden = true

    box.appendChild(field)
    box.appendChild(count)
    box.appendChild(clear)

    const rows = Array.from(body.rows)
    const hay = rows.map((tr) => (tr.textContent || '').replace(/\s+/g, ' ').toLowerCase())

    const run = () => {
      const terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean)
      const on = terms.length > 0
      let hit = 0
      rows.forEach((tr, i) => {
        const ok = terms.every((t) => hay[i].indexOf(t) >= 0)
        tr.hidden = !ok
        if (ok) hit++
      })
      clear.hidden = !on
      count.textContent = !on ? '' : hit === 0 ? '没有匹配的条目' : '显示 ' + hit + ' / ' + rows.length
    }

    input.addEventListener('input', run)
    input.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' || !input.value) return
      e.stopPropagation()
      input.value = ''
      run()
    })
    clear.addEventListener('click', () => {
      input.value = ''
      run()
      input.focus()
    })

    el.parentElement?.insertBefore(box, el)
  })
}

function refreshTables() {
  markTables()
  markExtLinks()
  setupTableFilter()
  window.clearTimeout(tblTimer)
  tblTimer = window.setTimeout(() => {
    markTables()
    markExtLinks()
    setupTableFilter()
  }, 320)
}

function onResize() {
  onScroll()
  window.clearTimeout(tblTimer)
  tblTimer = window.setTimeout(markTables, 160)
}

// 课程入口页（frontmatter.landing）的课时清单要单独排版，
// 在 html 上落一个标记，样式层就不用去猜这是哪一页。
function markLanding() {
  document.documentElement.classList.toggle('tb-landing', frontmatter.value.landing === true)
}

function bindReader() {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
  onScroll()
  markLanding()
  refreshTables()
}

function unbindReader() {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  cancelAnimationFrame(scrollRaf)
  scrollRaf = 0
  window.clearTimeout(tblTimer)
  progressEl.value?.style.setProperty('--tb-p', '0')
  toTopEl.value?.classList.remove('is-on')
}
// 正文插图放大：课程页里的截图、示意图原始宽度常在 1800px 以上，
// 正文栏只有 47rem，缩放后细节根本看不清，点开看原尺寸。
const lbEl = ref<HTMLElement | null>(null)
const lbSrc = ref('')
const lbAlt = ref('')
let lbFocus: HTMLElement | null = null
let lbTimer = 0

function closeLightbox() {
  const el = lbEl.value
  if (!el || el.hasAttribute('hidden')) return
  el.classList.remove('is-on')
  document.body.classList.remove('tb-lb-open')
  window.clearTimeout(lbTimer)
  lbTimer = window.setTimeout(() => {
    const cur = lbEl.value
    if (cur && !cur.classList.contains('is-on')) cur.setAttribute('hidden', '')
  }, 240)
  lbFocus?.focus?.()
  lbFocus = null
}

function openLightbox(src: string, alt: string) {
  const el = lbEl.value
  if (!el || !src) return
  lbSrc.value = src
  lbAlt.value = alt
  el.removeAttribute('hidden')
  window.clearTimeout(lbTimer)
  requestAnimationFrame(() => el.classList.add('is-on'))
  document.body.classList.add('tb-lb-open')
  el.focus?.()
}

// 按下位置：用来区分「轻点」和「拖动 / 滚动」。
// 触屏上整块可点会让人在滚动或选字时把译文误收起，所以触屏只认左侧装订线的轻点。
const downPt = { x: 0, y: 0, touch: false }

function onPointerDown(e: PointerEvent) {
  downPt.x = e.clientX
  downPt.y = e.clientY
  downPt.touch = e.pointerType === 'touch'
}

function onDocClick(e: MouseEvent) {
  const t = e.target as HTMLElement | null
  if (!t || typeof t.closest !== 'function') return
  if (t.closest('.tb-lb')) return
  const zh = t.closest('.tb-zh') as HTMLElement | null
  if (zh) {
    if (Math.hypot(e.clientX - downPt.x, e.clientY - downPt.y) > 8) return
    if (downPt.touch && e.clientX - zh.getBoundingClientRect().left > 36) return
    zh.classList.add('tb-zh-hide')
    return
  }
  const img = t.closest('.vp-doc img') as HTMLImageElement | null
  if (!img || img.closest('a')) return
  lbFocus = (document.activeElement as HTMLElement) || null
  openLightbox(img.currentSrc || img.src, img.alt || '')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeLightbox()
}

// 首页主视觉：柔光跟着光标走；底部区块滚动进入时再浮现。
// 两者都只在能悬停、且未开启「减少动态效果」的设备上启用。
let heroFx: HTMLElement | null = null
let heroRaf = 0
let revealIo: IntersectionObserver | null = null

function calm() {
  return (
    !!window.matchMedia?.('(pointer: coarse)')?.matches ||
    !!window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  )
}

function onHeroMove(e: PointerEvent) {
  if (!heroFx || heroRaf) return
  heroRaf = requestAnimationFrame(() => {
    heroRaf = 0
    const el = heroFx
    if (!el || !el.parentElement) return
    const r = el.parentElement.getBoundingClientRect()
    el.style.setProperty('--tb-mx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%')
    el.style.setProperty('--tb-my', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%')
  })
}

function teardownHome() {
  cancelAnimationFrame(heroRaf)
  heroRaf = 0
  revealIo?.disconnect()
  revealIo = null
  if (heroFx) {
    heroFx.removeEventListener('pointermove', onHeroMove)
    heroFx = null
  }
}

function setupHome() {
  teardownHome()
  if (frontmatter.value.layout !== 'home' || calm()) return

  heroFx = document.querySelector('.tb-hero__fx')
  if (heroFx) heroFx.addEventListener('pointermove', onHeroMove)

  const targets = Array.from(
    document.querySelectorAll('.tb-comp, .tb-entry, .tb-gh, .tb-resume')
  ) as HTMLElement[]
  if (!targets.length || !('IntersectionObserver' in window)) return

  document.documentElement.classList.add('tb-reveal')
  revealIo = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-in')
        revealIo?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  )
  targets.forEach((el) => revealIo?.observe(el))
}

onMounted(() => {
  try {
    applyZh(localStorage.getItem('tb-zh') === '1')
  } catch {
    /* ignore */
  }
  // env(safe-area-inset-*) 只在 viewport-fit=cover 下有效。
  // 主题模板自带的 viewport 标签不带这个值，这里补上，并顺手去掉重复的标签。
  const vps = Array.from(document.querySelectorAll('meta[name="viewport"]'));
  vps.forEach((m, i) => {
    const meta = m as HTMLMetaElement;
    if (i === 0) {
      if (!meta.content.includes('viewport-fit')) {
        meta.content = meta.content.replace(/\s*$/, '') + ',viewport-fit=cover';
      }
    } else {
      meta.remove();
    }
  });
  setupHome();
  bindReader();
  setupMermaid();
  saveLast(String(page.value.relativePath || ''))
  document.addEventListener('pointerdown', onPointerDown, true)
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKeydown)
})

watch(
  () => page.value.relativePath,
  (p) => {
    saveLast(String(p || ''))
    resetMermaid()
    window.requestAnimationFrame(() => {
      setupHome()
      onScroll()
      markLanding()
      refreshTables()
      setupMermaid()
    })
  }
)

onBeforeUnmount(() => {
  teardownHome()
  unbindReader()
  document.removeEventListener('pointerdown', onPointerDown, true)
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKeydown)
  window.clearTimeout(lbTimer)
  document.body.classList.remove('tb-lb-open')
})
</script>

<template>
  <BaseLayout>
    <template #nav-bar-content-before>
      <SiteSearch />
    </template>

    <template #layout-top>
      <div ref="progressEl" class="tb-progress" aria-hidden="true" />
      <button ref="toTopEl" class="tb-totop" type="button" aria-label="回到顶部" @click="scrollTop">
        <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M8 13V3.6" />
          <path d="M4 7.4 8 3.4l4 4" />
        </svg>
      </button>
    </template>

    <template #home-hero-before>
      <div class="tb-hero__fx" aria-hidden="true" />
    </template>

    <template #home-hero-info-before>
      <p class="tb-hero__eyebrow">
        <span class="tb-hero__pulse" aria-hidden="true" />
        开放课程 · 站内直读 · 逐段中文释义
      </p>
    </template>

    <template #home-hero-info-after>
      <HomeHeroStats />
    </template>

    <template #home-hero-image>
      <div class="tb-hero__preview" aria-hidden="true">
        <div class="tb-hero__preview-top">
          <span class="tb-hero__preview-dots"><i /><i /><i /></span>
          <span class="tb-hero__preview-title">站内直读</span>
        </div>
        <div class="tb-hero__preview-body">
          <div class="tb-hero__preview-col">
            <span class="tb-hero__preview-cap">目录</span>
            <span class="tb-skel" style="width: 84%" />
            <span class="tb-skel" style="width: 60%" />
            <span class="tb-skel" style="width: 72%" />
            <span class="tb-skel" style="width: 48%" />
          </div>
          <div class="tb-hero__preview-col tb-hero__preview-col--main">
            <span class="tb-hero__preview-cap">正文</span>
            <span class="tb-skel tb-skel--lead" style="width: 88%" />
            <span class="tb-skel" style="width: 100%" />
            <span class="tb-skel" style="width: 76%" />
            <span class="tb-hero__zh">中文释义</span>
            <span class="tb-skel" style="width: 82%" />
          </div>
        </div>
      </div>
    </template>

    <template #not-found>
      <div class="tb-nf">
        <p class="tb-nf__code" aria-hidden="true">404</p>
        <h1 class="tb-nf__title">页面不存在</h1>
        <p class="tb-nf__text">链接可能已经失效，或者这门课换了位置。</p>
        <div class="tb-nf__grid">
          <a v-for="l in notFoundLinks" :key="l.href" class="tb-nf__card" :href="withBase(l.href)">
            <span class="tb-nf__card-t">{{ l.title }}</span>
            <span class="tb-nf__card-d">{{ l.desc }}</span>
          </a>
        </div>
        <p class="tb-nf__hint">也可以直接在右上角的搜索框里搜课程名或正文关键词。</p>
      </div>
    </template>

    <template #doc-before>
      <template v-if="isCourse">
        <nav class="tb-crumb">
          <a :href="withBase('/library/')">课程库</a>
          <span class="tb-crumb__sep">›</span>
          <a v-if="frontmatter.volume" :href="withBase(`/paths/${frontmatter.volume}`)">{{ volName }}</a>
          <span class="tb-crumb__sep">›</span>
          <span class="tb-crumb__here">{{ frontmatter.sourceTitle }}</span>
        </nav>
        <div class="tb-sourcebar">
          <span class="tb-sourcebar__name">{{ frontmatter.sourceTitle }}</span>
          <span class="tb-sourcebar__meta">{{ frontmatter.sourceKind }}</span>
          <span class="tb-sourcebar__dot">·</span>
          <span class="tb-sourcebar__meta">{{ frontmatter.lang }}</span>
          <span class="tb-sourcebar__spacer" />
          <button v-if="hasZh" class="tb-zh-btn" type="button" :aria-pressed="zhOn" @click="toggleZh">
            {{ zhOn ? '隐藏中文释义' : '显示中文释义' }}
          </button>
          <a v-if="frontmatter.entryUrl" class="tb-sourcebar__link" :href="frontmatter.entryUrl" target="_blank" rel="noreferrer">原文 ↗</a>
          <a v-if="frontmatter.rawUrl" class="tb-sourcebar__link" :href="withBase(frontmatter.rawUrl)" target="_blank" rel="noreferrer">原件 ↓</a>
          <a v-if="frontmatter.sourceUrl" class="tb-sourcebar__link" :href="frontmatter.sourceUrl" target="_blank" rel="noreferrer">仓库 ↗</a>
        </div>
      </template>
    </template>

    <template #layout-bottom>
      <footer class="tb-foot">
        <div class="tb-foot__inner">
          <span class="tb-foot__brand">AI 原生开放教材</span>
          <span class="tb-foot__sep">·</span>
          <a :href="SITE.repo" target="_blank" rel="noreferrer">GitHub 仓库</a>
          <span class="tb-foot__sep">·</span>
          <a :href="SITE.profile" target="_blank" rel="noreferrer">{{ SITE.profileLabel }}</a>
          <span class="tb-foot__sep">·</span>
          <a :href="SITE.notice" target="_blank" rel="noreferrer">署名与许可</a>
          <span class="tb-foot__spacer" />
          <span class="tb-foot__mute">编排与站点代码 MIT · 课程内容著作权归各上游作者</span>
        </div>
      </footer>

      <Teleport to="body">
        <div
          ref="lbEl"
          class="tb-lb"
          role="dialog"
          aria-modal="true"
          aria-label="图片放大"
          tabindex="-1"
          hidden
          @click="closeLightbox"
        >
          <button class="tb-lb__x" type="button" aria-label="关闭" @click.stop="closeLightbox">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
          <img :src="lbSrc || undefined" :alt="lbAlt" />
          <p class="tb-lb__hint">点击任意处关闭 · Esc</p>
        </div>
      </Teleport>
    </template>
  </BaseLayout>
</template>
