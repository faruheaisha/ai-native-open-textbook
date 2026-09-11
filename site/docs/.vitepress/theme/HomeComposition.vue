<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { byKind, sources } from './generated/catalog'

const kindTotal = byKind.reduce((n, k) => n + k.count, 0) || 1
const kindMax = Math.max(...byKind.map((k) => k.count), 1)

const kinds = byKind.map((k) => ({
  kind: k.kind,
  count: k.count,
  pct: Math.round((k.count / kindTotal) * 100),
  w: Math.max(6, Math.round((k.count / kindMax) * 100)),
}))

const TONE: Record<string, string> = { 可转载: 'ok', 限非商用: 'warn', 仅引用: 'mute' }
const ORDER = ['可转载', '限非商用', '仅引用']
const LICENSE_DESC: Record<string, string> = {
  可转载: '许可允许全文转载，正文已在站内逐字收录并保留出处。',
  限非商用: '许可允许非商业使用，正文已在站内收录；商用需另行授权。',
  仅引用: '未见可转载许可，只登记出处与外链，不在站内收录正文。',
}

const licenses = computed(() => {
  const map = new Map<string, number>()
  for (const s of sources) map.set(s.licenseLabel, (map.get(s.licenseLabel) || 0) + 1)
  const total = sources.length || 1
  return [...map.entries()]
    .sort((a, b) => {
      const ia = ORDER.indexOf(a[0])
      const ib = ORDER.indexOf(b[0])
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)
    })
    .map(([label, n]) => ({
      label,
      tone: TONE[label] || 'mute',
      desc: LICENSE_DESC[label] || '',
      n,
      pct: (n / total) * 100,
      pctText: Math.round((n / total) * 100) + '%',
    }))
})

// 静态输出时条形是满的；挂载后才从 0 长出来。
const collapsed = ref(false)
const root = ref<HTMLElement | null>(null)
let io: IntersectionObserver | null = null

onMounted(() => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  const el = root.value
  if (reduce || !el || !('IntersectionObserver' in window)) return
  collapsed.value = true
  io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return
      io?.disconnect()
      io = null
      requestAnimationFrame(() => {
        collapsed.value = false
      })
    },
    { threshold: 0.12 }
  )
  io.observe(el)
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <div ref="root" class="tb-comp" :class="{ 'is-collapsed': collapsed }">
    <section class="tb-comp__panel">
      <h3 class="tb-comp__title">按资料类型</h3>
      <ul class="tb-comp__list">
        <li v-for="(k, i) in kinds" :key="k.kind" class="tb-bar" :style="{ '--i': i, '--w': k.w + '%' }">
          <span class="tb-bar__name">{{ k.kind }}</span>
          <span class="tb-bar__track"><span class="tb-bar__fill" /></span>
          <span class="tb-bar__num">{{ k.count }}</span>
        </li>
      </ul>
    </section>

    <section class="tb-comp__panel">
      <h3 class="tb-comp__title">按许可级别</h3>
      <div class="tb-lic">
        <span
          v-for="l in licenses"
          :key="l.label"
          class="tb-lic__seg"
          :class="'is-' + l.tone"
          :style="{ width: l.pct + '%' }"
        />
      </div>
      <ul class="tb-lic__legend">
        <li v-for="l in licenses" :key="l.label" class="tb-lic__row">
          <span class="tb-lic__head">
            <span class="tb-lic__dot" :class="'is-' + l.tone" />
            <span class="tb-lic__label">{{ l.label }}</span>
            <span class="tb-lic__num">{{ l.n }}</span>
            <span class="tb-lic__pct">{{ l.pctText }}</span>
          </span>
          <span class="tb-lic__desc">{{ l.desc }}</span>
        </li>
      </ul>
      <p class="tb-comp__note">共 {{ sources.length }} 条来源，按许可级别统计。</p>
    </section>
  </div>
</template>