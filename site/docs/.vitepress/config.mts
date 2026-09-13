import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { courses, volumes } from './theme/generated/catalog'
import { SITE } from './theme/generated/site'

const HOST =
  process.env.DOCS_HOST ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  process.env.URL ||
  process.env.DEPLOY_PRIME_URL ||
  process.env.CF_PAGES_URL ||
  'ai-native-textbook.example.com'

const BASE = process.env.DOCS_BASE || '/'
const origin = `https://${HOST.replace(/^https?:\/\//, '')}`

// 侧栏由目录自动生成：新增一门课不必改配置。
const sidebar: DefaultTheme.SidebarMulti = {}
for (const c of courses) {
  const items: DefaultTheme.SidebarItem[] = c.docs
    .filter((d) => d.rel !== 'index')
    .map((d) => ({ text: d.title, link: `/lib/${c.volume}/${c.local}/${d.rel}` }))
  const rail: DefaultTheme.SidebarItem[] = [
    { text: c.title, items },
    { text: '出处与许可', items: [{ text: '来源信息', link: `/sources/${c.volume}/${c.local}` }] },
  ]
  sidebar[`/lib/${c.volume}/${c.local}/`] = rail
  // 从课程点进「来源信息」时不换掉左栏，读者知道自己还在哪门课里。
  sidebar[`/sources/${c.volume}/${c.local}`] = rail
}

const pathItems = volumes.map((v) => ({ text: `${v.order}. ${v.name}`, link: `/paths/${v.id}` }))
sidebar['/paths/'] = [{ text: '学习路径', items: pathItems }]
// 索引类页面本身只有一个条目，左栏会空掉一大片。
// 这三页补上「索引 + 学习路径」，左栏就一直是可用的导航。
const indexItems: DefaultTheme.SidebarItem[] = [
  { text: '课程库', link: '/library/' },
  { text: '来源总表', link: '/sources/' },
  { text: '关于本站', link: '/method/' }
]
const indexRail: DefaultTheme.SidebarItem[] = [
  { text: '索引', items: indexItems },
  { text: '学习路径', items: pathItems }
]
sidebar['/library/'] = indexRail
sidebar['/sources/'] = indexRail
sidebar['/method/'] = indexRail

const nav: DefaultTheme.NavItem[] = [
  { text: '开始学习', items: pathItems },
  { text: '课程库', link: '/library/' },
  { text: '来源总表', link: '/sources/' },
  { text: '关于', link: '/method/' },
]

export default defineConfig({
  lang: 'zh-CN',
  title: 'AI 原生开放教材',
  description: '按学习路径编排的开放课程与官方文献。正文与上游一致，逐页标注出处与许可。',
  base: BASE,
  cleanUrls: true,
  // 2260 个页面的「路径 -> 产物哈希」映射表，默认会被逐页内联进 HTML。
  // 这本教材有 2281 页，单页就要多背 800KB，全站白烧 1.8GB。
  // 打开后改写成一份共享的 metadata.<hash>.js，各页按需引用。
  metaChunk: true,
  ignoreDeadLinks: [/^https?:\/\/localhost(:\d+)?/],
  // viewport-fit=cover 是 env(safe-area-inset-*) 生效的前提（刘海 / 圆角屏的安全区）
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE}favicon.svg` }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,viewport-fit=cover' }],
  ],
  sitemap: {
    hostname: origin,
    transformItems: (items) => items.filter((i) => !/(^|\/)404$/.test(String(i.url))),
  },
  themeConfig: {
    nav,
    socialLinks: [
      { icon: 'github', link: SITE.repo, ariaLabel: 'GitHub 仓库' },
    ],
    sidebar,
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '浅色',
    darkModeSwitchTitle: '深色',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    externalLinkIcon: true,
    // 站内搜索由主题层的 <SiteSearch> 承担：VitePress 自带的本地搜索会把 2700 页正文
    // 整篇编入索引（实测产物 37MB），且默认分词对中文无效。
  },
})