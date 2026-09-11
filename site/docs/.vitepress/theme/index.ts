import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import PathGrid from './PathGrid.vue'
import CourseLibrary from './CourseLibrary.vue'
import ResumeCard from './ResumeCard.vue'
import HomeHeroStats from './HomeHeroStats.vue'
import HomeComposition from './HomeComposition.vue'
import HomeGithub from './HomeGithub.vue'
import EntryGrid from './EntryGrid.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('PathGrid', PathGrid)
    app.component('CourseLibrary', CourseLibrary)
    app.component('ResumeCard', ResumeCard)
    app.component('HomeHeroStats', HomeHeroStats)
    app.component('HomeComposition', HomeComposition)
    app.component('HomeGithub', HomeGithub)
    app.component('EntryGrid', EntryGrid)
  },
} satisfies Theme