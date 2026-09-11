<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { volumes, courses } from './generated/catalog'

const byVolume = computed(() =>
  volumes.map((v) => {
    const list = courses.filter((c) => c.volume === v.id)
    return {
      ...v,
      total: list.length,
      mainline: list.filter((c) => c.tier === 1).slice(0, 3),
    }
  })
)

// 高光跟着光标走：只在能悬停的设备上有意义，样式层已用 media query 兜住。
function onMove(e: PointerEvent) {
  const el = (e.target as HTMLElement | null)?.closest?.('.tb-path') as HTMLElement | null
  if (!el) return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', e.clientX - r.left + 'px')
  el.style.setProperty('--my', e.clientY - r.top + 'px')
}
</script>

<template>
  <div class="tb-paths" @pointermove="onMove">
    <a
      v-for="(v, i) in byVolume"
      :key="v.id"
      class="tb-path"
      :style="{ '--i': i }"
      :href="withBase(`/paths/${v.id}`)"
    >
      <span class="tb-path__glow" aria-hidden="true" />
      <span class="tb-path__head">
        <span class="tb-path__order">{{ String(v.order).padStart(2, '0') }}</span>
        <span class="tb-path__name">{{ v.name }}</span>
      </span>
      <span class="tb-path__blurb">{{ v.blurb }}</span>
      <span class="tb-path__who">{{ v.who }}</span>
      <span class="tb-path__main">
        <span v-for="c in v.mainline" :key="c.id" class="tb-path__pill">{{ c.title }}</span>
      </span>
      <span class="tb-path__foot">{{ v.total }} 门课程可在站内读完</span>
    </a>
  </div>
</template>