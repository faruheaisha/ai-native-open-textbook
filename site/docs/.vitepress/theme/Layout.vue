<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from 'vitepress'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { volumes } from './generated/catalog'
import { SITE } from './generated/site'
import HomeHeroStats from './HomeHeroStats.vue'

const { Layout: BaseLayout } = DefaultTheme
const { frontmatter, page } = useData()

const volName = computed(() => volumes.find((v) => v.id === frontmatter.value.volume)?.name || '')
const isCourse = computed(() => !!frontmatter.value.sourceId)
const hasZh = computed(() => frontmatter.value.zh === 'on')
const zhOn = ref(false)

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
  setupHome();
  saveLast(String(page.value.relativePath || ''))
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement | null)?.closest?.('.tb-zh')
    if (el) el.classList.add('tb-zh-hide')
  })
})

watch(
  () => page.value.relativePath,
  (p) => {
    saveLast(String(p || ''))
    window.requestAnimationFrame(setupHome)
  }
)

onBeforeUnmount(teardownHome)
</script>

<template>
  <BaseLayout>
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
    </template>
  </BaseLayout>
</template>