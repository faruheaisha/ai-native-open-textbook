import { compile } from '@vue/compiler-dom'
import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
// 分批构建时由 scripts/deploy/build-batches.mjs 生成只包含当前批次的目录，
// 避免每一批都把完整 12MB 课程树复制进 SSR 页面。正式构建仍使用全量目录。
const catalog = process.env.TB_BATCH_CATALOG === '1'
  ? await import('./theme/generated/catalog-batch')
  : await import('./theme/generated/catalog')
const { courses, volumes } = catalog
import { SITE } from './theme/generated/site'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setPublicDir, sizeFor, decorateHtml } from './image-dims.mts'

// 正文插图的像素尺寸从 public/mirror 下的真实文件里读，先把目录位置告诉解析器。
setPublicDir(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public'))

const HOST =
  process.env.DOCS_HOST ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  process.env.URL ||
  process.env.DEPLOY_PRIME_URL ||
  process.env.CF_PAGES_URL ||
  'ai-native-textbook.example.com'

// Vue 编译安全网。
// 上游官方文档里混着 JSX 代码样例（<table style={{ width: "100%" }}> … </table> 只写了半截），
// markdown-it 会把其中一部分当 HTML 块原样交给 Vue，Vue 编译到「找不到闭合标签」就直接
// 让整栋构建失败（实测 21 篇，OpenAI API 文档为主）。
// 另一类问题只有「整篇编译」才看得见：正文里的 {{ }} 是文档自己的模板占位符
// （{{job.parameters.<name>}} 这种），Vue 会当成插值表达式求值，同样让构建中断。
//
// 做法是：先让 @vue/compiler-dom 完整编译一次片段，一旦报错就把尖括号转义成实体；
// 整篇渲染完再统一把 {{ 转义掉。读者看到的仍是原文那几个字符，页面照样能构建。
function vueSafe(html: string): string {
  if (!html || html.indexOf('<') < 0) return html
  const errs: unknown[] = []
  try {
    compile(html, { onError: (e: unknown) => errs.push(e) })
  } catch {
    errs.push(1)
  }
  if (!errs.length) return html
  return html.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const BASE = process.env.DOCS_BASE || '/'
const origin = `https://${HOST.replace(/^https?:\/\//, '')}`
const mirrorBuildRoot = path
  .join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', '.mirror-build-stash')
  .replaceAll('\\', '/')
const workbuddyBuildRoot = path
  .join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'workbuddy-harness')
  .replaceAll('\\', '/')

// 侧栏由目录自动生成：新增一门课不必改配置。
const sidebar: DefaultTheme.SidebarMulti = {}
for (const c of courses) {
  // 侧栏直接用生成器按上游目录编好的树：课程自己有几分章，栏里就是几层。
  // 之前这里是把 c.docs 摊平成一条列表，上千页的课会拉出一千多行。
  const items = (c.nav || []) as DefaultTheme.SidebarItem[]
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
  // 分批构建用：整站一次构建会 OOM，见 scripts/deploy/build-batches.mjs。
  // 命令行传 --outDir 会被 shell 按空格拆开（路径里有「claude code」），所以走环境变量。
  outDir: process.env.TB_OUT_DIR || undefined,
  // 分批构建低磁盘模式：图片目录仍以 junction 提供给 Markdown 解析，
  // 但禁止 Vite 把整套镜像复制进每个批次的临时产物。
  vite: {
    publicDir: process.env.TB_SKIP_MIRROR === '1' ? false : undefined,
    resolve:
      process.env.TB_SKIP_MIRROR === '1'
        ? {
            alias: [
              { find: /^\/mirror\//, replacement: `${mirrorBuildRoot}/` },
              { find: /^\/workbuddy-harness\//, replacement: `${workbuddyBuildRoot}/` },
            ],
          }
        : undefined,
  },
  // 原始课程归档是静态下载资源，不是 VitePress 页面。否则其中的 Markdown
  // 会被误识别为动态路由，构建时要求不存在的 .paths.js。
  srcExclude: ['public/raw/**', 'public/raw/**/*', 'raw/**', 'raw/**/*'],
  cleanUrls: true,
  // 2260 个页面的「路径 -> 产物哈希」映射表，默认会被逐页内联进 HTML。
  // 这本教材有 2281 页，单页就要多背 800KB，全站白烧 1.8GB。
  // 打开后改写成一份共享的 metadata.<hash>.js，各页按需引用。
  metaChunk: true,
    // 上游正文里带了很多指向「上游自己站点」的根路径（/docs、/dashboard、/support…）。
  // 这些不是本站链接，重排后自然找不到目标；把它们当成死链会让整栋构建失败。
  // 覆盖它们的不是「关掉检查」，而是 scripts/tmp/check-links.cjs：它按本站规则
  // 逐篇扫 12700+ 篇正文的站内链接，只认 /lib、/sources、/paths、/library、/method 这几类，
  // 本站自己造出来的死链一条都跑不掉。
  // 站内死链由正式门禁先检查；VitePress 也必须在发现未解析路径时失败。
  // 分批渲染时其余课程暂存在 .batch-stash，跨批次路径暂时不存在；完整构建
  // 仍保持严格失败，正式发布前另有全量 check-links 门禁。
  ignoreDeadLinks: process.env.TB_BATCH_BUILD === '1' ? true : false,
  // viewport-fit=cover 是 env(safe-area-inset-*) 生效的前提（刘海 / 圆角屏的安全区）
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE}favicon.svg` }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,viewport-fit=cover' }],
  ],
  sitemap: {
    hostname: origin,
    transformItems: (items) => items.filter((i) => !/(^|\/)404$/.test(String(i.url))),
  },
  markdown: {
    // 正文插图统一补三个属性：
    //   loading="lazy"   一页十几张图时，先只取视口内的，别让视口里那张去抢十几分之一的带宽
    //   decoding="async" 解码不阻塞主线程
    //   width/height     让浏览器提前按真实比例占好位置，图片陆续到达时页面不再往下跳
    // 外链和走加速通道的图读不到尺寸，就只补前两个。
    config: (md) => {
      const renderImage = md.renderer.rules.image!
      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        if (token.attrGet('width') === null) {
          const dim = sizeFor(token.attrGet('src') || '')
          if (dim) {
            token.attrSet('width', String(dim[0]))
            token.attrSet('height', String(dim[1]))
          }
        }
        token.attrSet('loading', 'lazy')
        token.attrSet('decoding', 'async')
        return renderImage(tokens, idx, options, env, self)
      }

      // 上游大量直接写 <img>，不走 markdown 图片语法，得单独过一遍。
      // html_block / html_inline 只覆盖 HTML 片段，代码块走的是 fence/code，不会被误改。
      for (const rule of ['html_block', 'html_inline'] as const) {
        const orig = md.renderer.rules[rule]
        md.renderer.rules[rule] = (tokens, idx, options, env, self) =>
          vueSafe(decorateHtml(orig ? orig(tokens, idx, options, env, self) : tokens[idx].content ?? ''))
      }

      // 整篇渲染完再兜一遍：{{ }} 在 Vue 模板里是插值表达式，文档里的模板占位符
      // 会让编译直接失败。换成字符实体后读者看到的还是那两个花括号，插值不再触发。
      const renderAll = md.renderer.render.bind(md.renderer) as typeof md.renderer.render
      md.renderer.render = ((tokens, options, env) =>
        renderAll(tokens, options, env).replace(/\{\{/g, '&#123;&#123;')) as typeof md.renderer.render
    },
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
