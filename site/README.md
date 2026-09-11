# AI 原生开放教材 · 网页交互版

一套 14 卷开放教材的站点。编排形态对齐技术文档站：顶部四个一级入口（开始 / 教材 / 案例 / 方法），
左侧全局目录，正文页带右侧本页目录，正文本身按教科书结构写（编号小节 → 本章要点 → 练习 → 参考文献）。

**读者正文的唯一真源在仓库根的 `content/`。`site/docs/` 下的卷册页与案例页都是构建产物，不要手改 —— 下次构建会被覆盖。**

---

## 1. 部署前先知道的三件事

1. **构建上下文是整个仓库，不是 `site/`。** 构建脚本要读仓库根的 `content/` 与 `课程设计基线/`；命令在 `site/` 目录下执行。
2. **要部署的是构建产物目录：`site/docs/.vitepress/dist`。**
3. **站点开启了 `cleanUrls`。** 链接形如 `/cases/CASE-08-01-CALENDAR`（无 `.html`）。托管平台必须能把 `/foo` 映射到 `/foo.html`；Vercel、Netlify、Cloudflare Pages 默认支持。GitHub Pages 与普通 nginx 需要额外配置，见第 5 节。

---

## 2. 环境

| 项 | 要求 |
|---|---|
| Node | 20 或更高（构建环境实测 24.15） |
| 依赖安装 | 仓库内已提交 `site/package-lock.json`，用 `npm ci` 可复现 |

---

## 3. 本地开发与构建

```bash
cd site

npm ci            # 首次
npm run docs:dev      # 开发预览（会先重建数据，再起开发服务器）
npm run docs:build    # 生产构建（会先重建数据，再生成静态站点）
npm run docs:preview  # 本地预览构建产物
```

`docs:build` 等价于：

```bash
node ../scripts/build-index.mjs   # 重建 data/ 与 site/docs 下的生成物
vitepress build docs              # 生成 dist
```

产物落在 `site/docs/.vitepress/dist/`。

### 构建脚本会生成什么

| 生成物 | 说明 |
|---|---|
| `data/site-index.json`、`data/claims.json`、`data/cases.json` | 站点数据（卷册、主张、案例） |
| `site/docs/.vitepress/theme/generated/*.ts` | 上面三份数据的模块化副本，供组件导入 |
| `site/docs/volumes/**` | 卷首页与章节页（注入站内组件后的副本） |
| `site/docs/cases/**` | 案例库与案例页 |
| `site/docs/public/search.json` | 自建检索索引 |
| `site/docs/public/robots.txt` | 含 sitemap 地址 |
| `site/docs/public/brand/volume-spines.svg` | 首页主视觉（14 卷书脊，实心表示已有正文） |

以上全部由构建重建，不需要提交，也不要手工编辑。

---

## 4. 环境变量

| 变量 | 默认值 | 用途 |
|---|---|---|
| `DOCS_HOST` | `https://ai-native-textbook.example.com` | 站点正式域名。用于生成 sitemap 的绝对地址与 `robots.txt` 里的 Sitemap 行。 |
| `DOCS_BASE` | `/` | 部署到子路径时设置，例如 `/textbook/`。 |

**两个变量必须同时提供给 `build:data` 与 `vitepress build`。** 由于 `docs:build` 会在同一个进程链里依次执行两者，只要在构建环境里设置一次即可。

```bash
# 部署到域名根
DOCS_HOST=https://your-domain.com npm run docs:build

# 部署到子路径 https://your-domain.com/textbook/
DOCS_HOST=https://your-domain.com DOCS_BASE=/textbook/ npm run docs:build
```

设置后会被写入：sitemap 的全部 `<loc>`、`robots.txt` 的 Sitemap 行、页面内的全部站内链接前缀。

> 注意：`DOCS_BASE` 一旦改动，站点内所有绝对链接都会带该前缀。托管平台的重写规则要与之对应。

---

## 5. 各托管平台配置

通用参数：

- **Root / Base directory**：`site`
- **Build command**：`npm ci && npm run docs:build`
- **Output / Publish directory**：`site/docs/.vitepress/dist`
- **Node 版本**：20 或更高

### Vercel

仓库导入后按上面的参数设置即可，无需额外重写。若使用 `vercel.json`：

```json
{
  "buildCommand": "cd site && npm ci && npm run docs:build",
  "outputDirectory": "site/docs/.vitepress/dist",
  "cleanUrls": true
}
```

### Netlify

`netlify.toml`：

```toml
[build]
  base = "site"
  command = "npm ci && npm run docs:build"
  publish = "docs/.vitepress/dist"

[build.environment]
  NODE_VERSION = "20"
```

Netlify 的 Pretty URLs 默认开启，可满足 `cleanUrls` 的映射要求。

### Cloudflare Pages

- Build command：`npm ci && npm run docs:build`
- Build output directory：`docs/.vitepress/dist`
- Root directory：`site`

### GitHub Pages

GitHub Pages **不会**把 `/foo` 映射到 `/foo.html`，因此需要二选一：

1. **推荐**：不用 `cleanUrls`，改用带 `.html` 的地址。这需要修改 `site/docs/.vitepress/config.mts` 里的 `cleanUrls: false`，站内链接会变成 `/cases/CASE-08-01-CALENDAR.html`。
2. 保留 `cleanUrls`，并在产物里补一份 404 回退页把请求改写到对应 `.html`（GitHub Pages 只支持基于 `404.html` 的前端跳转，属于变通方案）。

另外，项目站点部署在 `https://<user>.github.io/<repo>/` 时，必须设置 `DOCS_BASE=/<repo>/`。

### 自建 nginx

```nginx
server {
  listen 80;
  root /var/www/textbook;
  index index.html;

  # cleanUrls：/foo -> /foo.html
  location / {
    try_files $uri $uri.html $uri/ /404.html;
  }

  error_page 404 /404.html;
}
```

---

## 6. 目录结构

```
site/
├── package.json
├── package-lock.json
└── docs/
    ├── index.md                 首页（Hero + Home.vue 编排）
    ├── start/index.md           怎么读这套教材        ← 手写
    ├── method/index.md          方法与可信度          ← 手写
    ├── volumes/                 卷册总览 + 卷页 + 章节  ← 生成
    ├── cases/                   案例库 + 案例页        ← 生成
    ├── public/                  静态资源 + 生成物
    └── .vitepress/
        ├── config.mts           导航、侧边栏、sitemap、base
        └── theme/
            ├── index.ts         主题入口（注册组件、注入检索与 404）
            ├── style.css        设计令牌与全部站点样式
            ├── generated/       构建生成的数据模块
            └── components/      首页、卷册网格、案例、证据面板、检索、404
```

---

## 7. 上线前检查

- [ ] `npm run docs:build` 在干净环境能通过（已锁定 Node 20+）
- [ ] `DOCS_HOST` 已改成正式域名，`dist/sitemap.xml` 与 `dist/robots.txt` 中的地址正确
- [ ] 若部署在子路径，`DOCS_BASE` 与托管平台的路径一致
- [ ] 托管平台支持 `cleanUrls`（否则按第 5 节处理）
- [ ] 访问根路径、`/volumes/`、`/cases/`、任一章节页、任一不存在的地址（应看到中文 404）
- [ ] 确认 `dist/` 里没有把仓库根的 `content/`、`课程设计基线/` 一并发布（产物只应包含站点文件）
