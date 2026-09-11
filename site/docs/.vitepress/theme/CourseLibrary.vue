<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { volumes, courses, sources, categoryOrder, tierLabel } from './generated/catalog'

const q = ref('')
const cat = ref('全部')
const tier = ref(0)
const lang = ref('全部')
const vol = ref('全部')

const volName = new Map(volumes.map((v) => [v.id, `${v.order}. ${v.name}`]))
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

const list = computed(() => {
  const k = q.value.trim().toLowerCase()
  return courses
    .filter((c) => (cat.value === '全部' ? true : c.category === cat.value))
    .filter((c) => (tier.value === 0 ? true : c.tier === tier.value))
    .filter((c) => (lang.value === '全部' ? true : langOf(c.lang) === lang.value))
    .filter((c) => (vol.value === '全部' ? true : c.volume === vol.value))
    .filter((c) =>
      !k ? true : `${c.title} ${c.kind} ${c.category} ${c.lang} ${volName.get(c.volume) || ''}`.toLowerCase().includes(k)
    )
    .sort((a, b) => a.tier - b.tier || b.docs.length - a.docs.length)
})

const outside = computed(() => sources.filter((s) => !s.ported))

const reset = () => {
  q.value = ''
  cat.value = '全部'
  tier.value = 0
  lang.value = '全部'
  vol.value = '全部'
}
const stars = (t: number) => (t === 1 ? '★★★' : t === 2 ? '★★' : '★')
</script>

<template>
  <div class="tb-lib">
    <div class="tb-lib__bar">
      <input v-model="q" class="tb-lib__search" type="search" placeholder="搜索课程名、分类、路径……" />
      <button class="tb-lib__reset" type="button" @click="reset">重置</button>
    </div>

    <div class="tb-lib__group">
      <span class="tb-lib__label">分类</span>
      <button
        v-for="c in cats"
        :key="c"
        class="tb-lib__chip"
        :class="{ 'is-on': cat === c }"
        type="button"
        @click="cat = c"
      >
        {{ c }}
      </button>
    </div>
    <div class="tb-lib__group">
      <span class="tb-lib__label">分级</span>
      <button
        v-for="t in tiers"
        :key="t.v"
        class="tb-lib__chip"
        :class="{ 'is-on': tier === t.v }"
        type="button"
        @click="tier = t.v"
      >
        {{ t.label }}
      </button>
    </div>
    <div class="tb-lib__group">
      <span class="tb-lib__label">语言</span>
      <button
        v-for="l in langs"
        :key="l"
        class="tb-lib__chip"
        :class="{ 'is-on': lang === l }"
        type="button"
        @click="lang = l"
      >
        {{ l }}
      </button>
    </div>
    <div class="tb-lib__group">
      <span class="tb-lib__label">路径</span>
      <select v-model="vol" class="tb-lib__select">
        <option value="全部">全部路径</option>
        <option v-for="v in volumes" :key="v.id" :value="v.id">{{ v.order }}. {{ v.name }}</option>
      </select>
    </div>

    <p class="tb-lib__count">匹配 {{ list.length }} 门课程</p>

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
    <p v-if="!list.length" class="tb-lib__empty">没有匹配的课程，换个关键词或点「重置」。</p>

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