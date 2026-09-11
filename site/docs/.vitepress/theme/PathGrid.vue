<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { volumes, courses } from './generated/catalog'

const byVolume = computed(() =>
  volumes.map((v) => {
    const list = courses.filter((c) => c.volume === v.id)
    const mainline = list.filter((c) => c.tier === 1)
    return {
      ...v,
      total: list.length,
      mainline: mainline.slice(0, 4),
    }
  })
)
</script>

<template>
  <div class="tb-paths">
    <a v-for="v in byVolume" :key="v.id" class="tb-path" :href="withBase(`/paths/${v.id}`)">
      <div class="tb-path__head">
        <span class="tb-path__order">{{ String(v.order).padStart(2, '0') }}</span>
        <span class="tb-path__name">{{ v.name }}</span>
      </div>
      <p class="tb-path__blurb">{{ v.blurb }}</p>
      <div class="tb-path__main">
        <span v-for="c in v.mainline" :key="c.id" class="tb-path__pill">{{ c.title }}</span>
      </div>
      <div class="tb-path__foot">{{ v.total }} 门可在站内阅读</div>
    </a>
  </div>
</template>