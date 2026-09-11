<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData, withBase } from 'vitepress'
import { computed, onMounted, ref, watch } from 'vue'
import { volumes } from './generated/catalog'

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

onMounted(() => {
  try {
    applyZh(localStorage.getItem('tb-zh') === '1')
  } catch {
    /* ignore */
  }
  saveLast(String(page.value.relativePath || ''))
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement | null)?.closest?.('.tb-zh')
    if (el) el.classList.add('tb-zh-hide')
  })
})

watch(
  () => page.value.relativePath,
  (p) => saveLast(String(p || ''))
)
</script>

<template>
  <BaseLayout>
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
  </BaseLayout>
</template>