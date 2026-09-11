<script setup lang="ts">
import { withBase } from 'vitepress'

// 与学习路径卡片一致：高光跟随光标。
function onMove(e: PointerEvent) {
  const el = (e.target as HTMLElement | null)?.closest?.('.tb-entry__card') as HTMLElement | null
  if (!el) return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', e.clientX - r.left + 'px')
  el.style.setProperty('--my', e.clientY - r.top + 'px')
}

const items = [
  { title: '课程库', desc: '按分类、分级、语言与关键词筛选已上架的全部课程', link: '/library/' },
  { title: '来源总表', desc: '每条来源的出处、锚定版本、许可与原文入口', link: '/sources/' },
  { title: '关于本站', desc: '编排口径、分类方式与许可处理原则', link: '/method/' },
]
</script>

<template>
  <div class="tb-entry" @pointermove="onMove">
    <a
      v-for="(it, i) in items"
      :key="it.link"
      class="tb-entry__card"
      :style="{ '--i': i }"
      :href="withBase(it.link)"
    >
      <span class="tb-entry__glow" aria-hidden="true" />
      <span class="tb-entry__title">{{ it.title }}</span>
      <span class="tb-entry__desc">{{ it.desc }}</span>
      <span class="tb-entry__go">进入 →</span>
    </a>
  </div>
</template>