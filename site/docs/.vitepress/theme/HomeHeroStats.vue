<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { courses, totals, volumes } from './generated/catalog'

// 与仓库 README 同一口径：站内正文页 = 课程页数减去每门课的目录页。
const pages = courses.reduce((n, c) => n + Math.max(0, c.docs.length - 1), 0)

const items = [
  { n: totals.sources, unit: '条', label: '收录来源' },
  { n: courses.length, unit: '门', label: '站内可读课程' },
  { n: pages, unit: '篇', label: '站内正文' },
  { n: volumes.length, unit: '条', label: '学习路径' },
]

// 初值即真实数字：无 JS 或静态输出时也是对的。挂载后才从 0 起跳。
const shown = ref(items.map((i) => i.n))
const root = ref<HTMLElement | null>(null)
let io: IntersectionObserver | null = null
let raf = 0
let timer = 0

function run() {
  const dur = 1500
  const start = performance.now()
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / dur)
    const e = 1 - Math.pow(1 - p, 4)
    shown.value = items.map((i) => Math.round(i.n * e))
    if (p < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  const el = root.value
  if (reduce || !el || !('IntersectionObserver' in window)) return

  shown.value = items.map(() => 0)
  io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return
      io?.disconnect()
      io = null
      timer = window.setTimeout(run, 120)
    },
    { threshold: 0.2 }
  )
  io.observe(el)
})

onBeforeUnmount(() => {
  io?.disconnect()
  cancelAnimationFrame(raf)
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div ref="root" class="tb-stats">
    <div v-for="(it, i) in items" :key="it.label" class="tb-stats__cell" :style="{ '--i': i }">
      <div class="tb-stats__num">
        <span class="tb-stats__digits">{{ shown[i] }}</span>
        <span class="tb-stats__unit">{{ it.unit }}</span>
      </div>
      <div class="tb-stats__label">{{ it.label }}</div>
    </div>
  </div>
</template>