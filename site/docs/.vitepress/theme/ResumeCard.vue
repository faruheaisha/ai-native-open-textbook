<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { courses } from './generated/catalog'

interface Last {
  href: string
  title: string
  course: string
}

const last = ref<Last | null>(null)
const start = courses.filter((c) => c.tier === 1).slice(0, 3)

onMounted(() => {
  try {
    const raw = localStorage.getItem('tb-last')
    if (raw) last.value = JSON.parse(raw) as Last
  } catch {
    last.value = null
  }
})
</script>

<template>
  <div class="tb-resume">
    <div v-if="last" class="tb-resume__last">
      <span class="tb-resume__tag">继续阅读</span>
      <a class="tb-resume__title" :href="withBase(last.href)">{{ last.title }}</a>
      <span class="tb-resume__from">{{ last.course }}</span>
    </div>
    <div class="tb-resume__start">
      <span class="tb-resume__tag tb-resume__tag--quiet">主线起点</span>
      <a v-for="c in start" :key="c.id" class="tb-resume__pill" :href="withBase(`/lib/${c.volume}/${c.local}/`)">
        {{ c.title }}
      </a>
    </div>
  </div>
</template>