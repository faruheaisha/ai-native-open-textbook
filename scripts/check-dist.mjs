#!/usr/bin/env node
/**
 * 产物体检  —  scripts/check-dist.mjs
 *
 * 上线前跑一次，回答三个问题：
 *   1) dist 里有没有指向不存在文件的内部链接（cleanUrls 下 /foo 应能落到 foo.html）
 *   2) dist 里有没有混进仓库源目录（content / 课程设计基线 / upstream / scripts / node_modules）
 *   3) robots.txt 与 sitemap.xml 是否自洽，且 404 页没有进 sitemap
 *
 * 只读 dist，不修改任何文件。发现问题时以非 0 退出码结束，可直接接进 CI。
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve, dirname, posix } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = resolve(process.env.TB_CHECK_DIST || join(ROOT, 'site/docs/.vitepress/dist'))

/** 与 config.mts 一致：子路径部署时产物里的链接会带这个前缀 */
const BASE = (() => {
  const raw = process.env.DOCS_BASE || '/'
  if (!raw || raw === '/') return '/'
  return `/${raw.replace(/^\/+|\/+$/g, '')}/`
})()

if (!existsSync(DIST)) {
  console.error(`找不到构建产物：${DIST}\n请先执行 cd site && npm run docs:build`)
  process.exit(1)
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })

const files = walk(DIST)
const rel = (p) => relative(DIST, p).split('\\').join('/')
const fileSet = new Set(files.map(rel))
const htmlFiles = files.filter((f) => f.endsWith('.html'))

const problems = []
const add = (kind, detail) => problems.push(`[${kind}] ${detail}`)

/* ------------------------------------------------ 1) dist 里不该出现的源目录 */
const FORBIDDEN_TOP = ['content', '课程设计基线', 'upstream', 'scripts', 'node_modules', '.vitepress']
const topLevel = new Set(rel(files[0]).split('/').slice(0, -1))
const tops = new Set()
for (const f of files) tops.add(rel(f).split('/')[0])
for (const bad of FORBIDDEN_TOP) {
  if (tops.has(bad)) add('产物泄漏', `dist 顶层出现源目录 ${bad}/`)
}

/* ------------------------------------------------ 2) 内部链接可达性 */
const ATTR = /(?:href|src)="([^"]+)"/g
/** 一个站内路径是否能在 dist 里落地；相对链接按所在页面的目录解析 */
function resolves(pathOnly, fromRel) {
  let p = pathOnly
  if (BASE !== '/' && p.startsWith(BASE)) p = p.slice(BASE.length - 1)
  if (!p.startsWith('/')) {
    const baseDir = fromRel ? posix.dirname(fromRel) : ''
    p = '/' + posix.normalize(posix.join(baseDir, p))
  }
  if (p.endsWith('/')) p += 'index.html'
  const key = p.slice(1)
  if (!key) return fileSet.has('index.html')
  if (fileSet.has(key)) return true
  if (fileSet.has(`${key}.html`)) return true
  if (fileSet.has(posix.join(key, 'index.html'))) return true
  return false
}

let checkedLinks = 0
const brokenSamples = new Map()
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  for (const m of html.matchAll(ATTR)) {
    const raw = m[1]
    if (!raw) continue
    if (/^(https?:)?\/\//.test(raw) || /^(mailto|tel|data|javascript):/.test(raw)) continue
    if (raw.startsWith('#')) continue
    let pathOnly = raw.split('#')[0].split('?')[0]
    if (!pathOnly) continue
    try {
      pathOnly = decodeURIComponent(pathOnly)
    } catch {
      /* 保留原样 */
    }
    checkedLinks++
    if (resolves(pathOnly, rel(file))) continue
    const key = pathOnly
    if (!brokenSamples.has(key)) brokenSamples.set(key, [])
    brokenSamples.get(key).push(rel(file))
  }
}
for (const [link, from] of brokenSamples) {
  add('死链', `${link}  ← 出现于 ${from.length} 个页面（如 ${from[0]}）`)
}

/* ------------------------------------------------ 3) robots / sitemap 自洽 */
const robotsPath = join(DIST, 'robots.txt')
const sitemapPath = join(DIST, 'sitemap.xml')
let sitemapHost = null
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, 'utf8')
  const m = /^\s*Sitemap:\s*(\S+)\s*$/m.exec(robots)
  if (!m) add('robots', 'robots.txt 缺少 Sitemap 行')
  else sitemapHost = m[1].replace(/\/[^/]*$/, '')
} else {
  add('robots', 'dist 里没有 robots.txt')
}

if (existsSync(sitemapPath)) {
  const xml = readFileSync(sitemapPath, 'utf8')
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (!locs.length) add('sitemap', 'sitemap.xml 没有任何 <loc>')
  if (/\/404(\/|$|<)/.test(xml)) add('sitemap', '404 错误页不应出现在 sitemap 里')
  if (sitemapHost) {
    const off = locs.filter((u) => !u.startsWith(sitemapHost + '/') && u !== sitemapHost)
    if (off.length) add('sitemap', `${off.length} 条 <loc> 的域名与 robots.txt 不一致（如 ${off[0]}）`)
  }
  for (const u of locs) {
    const pathOnly = decodeURIComponent(BASE === '/' ? new URL(u).pathname : new URL(u).pathname.replace(BASE, '/'))
    if (!resolves(pathOnly)) add('sitemap', `sitemap 指向的页面不存在：${u}`)
  }
} else {
  add('sitemap', 'dist 里没有 sitemap.xml')
}

/* ------------------------------------------------ 输出 */
const mb = (files.reduce((n, f) => n + statSync(f).size, 0) / 1024 / 1024).toFixed(2)
console.log('产物体检 …')
console.log(`   目录 ${rel(DIST) || DIST}`)
console.log(`   文件 ${files.length} · ${mb} MB · HTML ${htmlFiles.length} 页 · 站内链接 ${checkedLinks} 条`)

if (problems.length) {
  console.log('')
  for (const p of problems) console.log('   ✗ ' + p)
  console.log(`\n体检未通过：${problems.length} 项`)
  process.exit(1)
}
console.log('   死链 0 · 产物无源目录泄漏 · robots 与 sitemap 自洽')
console.log('\n体检通过。')
