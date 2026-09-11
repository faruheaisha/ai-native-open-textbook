import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import PathGrid from './PathGrid.vue'
import CourseLibrary from './CourseLibrary.vue'
import ResumeCard from './ResumeCard.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('PathGrid', PathGrid)
    app.component('CourseLibrary', CourseLibrary)
    app.component('ResumeCard', ResumeCard)
  },
} satisfies Theme