# site · 网页站点

把 `catalog/`、`curation.json`、`derived/`、`translations/` 渲染成可在线阅读的教材站，使用 VitePress。

站点的定位、八条学习路径与整体说明见仓库根目录的 `README.md`。

---

## 1. 环境

| 项 | 要求 |
|---|---|
| Node | 20 或更高 |
| 依赖 | 仓库内已提交 `package-lock.json`，用 `npm ci` 可复现 |

## 2. 本地开发与构建

```bash
cd site

npm ci                # 首次安装依赖
npm run docs:dev      # 开发预览（先重建目录与正文，再起开发服务器）
npm run docs:build    # 生产构建
npm run docs:preview  # 预览构建产物
```

`docs:dev` 与 `docs:build` 都等价于「先 `npm run build:data`，再跑 VitePress」：

```bash
node ../scripts/build-catalog.mjs        # 由 upstream/ 快照重建 catalog/catalog.json
node ../scripts/build-site-content.mjs   # 生成 site/docs/lib/**、sources/**、library/**、paths/**
vitepress dev docs                       # 或 vitepress build docs
```

构建产物落在 `docs/.vitepress/dist/`。

### 校验工具

| 命令 | 作用 |
|---|---|
| `npm run docs:check:html` | 检查生成正文里的 HTML 结构问题 |
| `npm run docs:check` | 检查 `dist/` 产物（死链、缺页等） |
| `node ../scripts/check-vue-render.mjs` | 把每页正文走一遍 VitePress 渲染器与 Vue 模板编译，提前发现会让整站构建失败的页面 |
| `npm run docs:release` | 上述检查 + 构建 + 产物检查 |

## 3. 环境变量

| 变量 | 默认值 | 用途 |
|---|---|---|
| `DOCS_HOST` | 部署域名 | 生成 sitemap 的绝对地址与 `robots.txt` 里的 Sitemap 行 |
| `DOCS_BASE` | `/` | 部署到子路径时设置，例如 `/textbook/` |

两个变量要同时提供给数据构建与 VitePress 构建；`docs:build` 在同一条命令链里依次执行两者，所以在构建环境里设置一次即可。

## 4. 部署

通用参数：

- **Root / Base directory**：`site`
- **Build command**：`npm ci && npm run docs:build`
- **Output / Publish directory**：`site/docs/.vitepress/dist`

仓库根目录已提供 `vercel.json` 与 `netlify.toml`。

站点开启了 `cleanUrls`（链接形如 `/library/`，不带 `.html`）。Vercel、Netlify、Cloudflare Pages 默认支持；
GitHub Pages 与普通 nginx 需要额外把 `/foo` 映射到 `/foo.html`，或改用带 `.html` 的地址。

## 5. 目录结构

```
site/
├── package.json
├── package-lock.json
└── docs/
    ├── index.md                 首页
    ├── paths/                   8 条学习路径页
    ├── library/                 课程库（按分类与分级浏览）
    ├── method/                  方法与可信度说明
    ├── sources/                 来源总表 + 每门课程的来源页
    ├── lib/<卷>/<课程>/          课程正文
    ├── public/                  静态资源
    └── .vitepress/
        ├── config.mts           导航、侧边栏、检索、sitemap、base
        └── theme/
            ├── index.ts         主题入口
            ├── style.css        设计令牌与站点样式
            ├── Layout.vue       布局与释义开关
            └── components/      课程库、路径网格、续读卡片
```

`docs/lib/**`、`docs/sources/**`、`docs/library/**`、`docs/paths/**` 都是**构建产物**，
不要在站内直接改这些文件 —— 下一次构建会覆盖。要改内容，改仓库根的
`curation.json`、`derived/` 或 `translations/`。