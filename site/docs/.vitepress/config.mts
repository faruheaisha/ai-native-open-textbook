import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { courses, volumes } from './theme/generated/catalog'

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
  sidebar[`/lib/${c.volume}/${c.local}/`] = [
    { text: c.title, items },
    { text: '出处与许可', items: [{ text: '来源信息', link: `/sources/${c.volume}/${c.local}` }] },
  ]
}

const pathItems = volumes.map((v) => ({ text: `${v.order}. ${v.name}`, link: `/paths/${v.id}` }))
sidebar['/paths/'] = [{ text: '学习路径', items: pathItems }]
sidebar['/library/'] = [{ text: '课程库', link: '/library/' }]
sidebar['/sources/'] = [{ text: '来源总表', link: '/sources/' }]
sidebar['/method/'] = [{ text: '关于本站', link: '/method/' }]

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
  ignoreDeadLinks: [/^https?:\/\/localhost(:\d+)?/],
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE}favicon.svg` }]],
  sitemap: {
    hostname: origin,
    transformItems: (items) => items.filter((i) => !/(^|\/)404$/.test(String(i.url))),
  },
  themeConfig: {
    nav,
    sidebar,
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '浅色',
    darkModeSwitchTitle: '深色',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    externalLinkIcon: true,
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索课程与文档' },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清除条件',
            displayDetails: '显示详情',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
        miniSearch: {
          options: {
            // 中文按词切分，否则整句会被当成一个词条。
            tokenize: (text: string) => {
              const Segmenter = (Intl as unknown as { Segmenter?: new (l: string, o: object) => { segment(t: string): Iterable<{ segment: string }> } }).Segmenter
              if (!Segmenter) return String(text).split(/[\s\-_./]+/).filter(Boolean)
              return Array.from(new Segmenter('zh', { granularity: 'word' }).segment(String(text)), (x) => x.segment).filter((x) => x.trim().length > 0)
            },
          },
        },
      },
    },
  },
})