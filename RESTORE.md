# 新电脑接手指南（RESTORE）

目的：换一台电脑后，从 GitHub 克隆本仓库，按本文恢复全部工作环境。全文按顺序执行即可。

## 仓库里有什么（已随 Git 上传）

| 目录 / 文件 | 内容 |
|---|---|
| `catalog/` | 143 条来源的总索引（含每条来源的仓库地址与锚定 commit） |
| `curation.json` | 人工编排：学习路径、难度分级、标题、阅读范围 |
| `derived/` `translations/` | 结构化派生稿、逐段中文释义 |
| `site/docs/lib/` | 136 门课程全部正文（24,585 页 Markdown，站内直读的源头） |
| `site/docs/.vitepress/` | 站点主题、导航配置 |
| `scripts/` | 目录构建、正文构建、校验、镜像、部署全套脚本（含 `deploy/local-tools/`） |
| `部署记录/` | 历次上线记录与回滚点 |
| `课程设计基线/` | 课程宪法、卷册边界、编撰规程（决策依据，先读 `SOURCE_OF_TRUTH.md`） |
| `archive/legacy-platforms/` | 早期 Vercel/Netlify 配置（已弃用，仅存档） |

## 不在仓库里、需要恢复的东西

| 内容 | 大小 | 恢复方式 |
|---|---|---|
| `upstream/` 上游快照 | 约 1.4 GB | 见下文「恢复上游快照」 |
| `site/docs/public/mirror/` 第三方图片镜像 | 约 1.2 GB | `node scripts/mirror-images.mjs`（可断点续跑；站内图片走它） |
| `site/docs/public/raw/` 原件归档 | 约 1 GB | `node scripts/build-raw-archive.mjs`（依赖 upstream 完整） |
| `site/node_modules/` | 约 300 MB | `cd site && npm ci` |
| 部署私钥 | 极小 | **只能从旧电脑手动拷贝，见「部署凭据」** |

> 19 个非 Git 来源的快照（约 207MB）在 Release `v1.0-full-20260920` 附件里，见下文步骤 2。

## 恢复步骤（顺序执行）

### 0. 前置要求

- Node.js 20 或更高；Git；部署相关脚本在 WSL 里跑（Windows 用户装好 WSL + rsync）。
- `cd site && npm ci`

### 1. 克隆仓库

```bash
git clone https://github.com/faruheaisha/ai-native-open-textbook.git
cd ai-native-open-textbook
git checkout v1.0-full-20260920   # 当前里程碑；或直接用 main
```

### 2. 恢复上游快照（upstream/）

```bash
node scripts/restore-upstream.mjs
```

脚本按 `catalog/catalog.json` 的 repo + commit 锚点浅克隆 124 个 Git 来源，可中断续跑（默认跳过已存在目录，`--force` 重来）。

**注意**：143 条来源里有 19 条不是 Git 仓库（OpenAI/Anthropic/Coze 等官方文档的网页导出），脚本结束时会打印完整清单。它们的快照已打包在 GitHub Release `v1.0-full-20260920` 的附件 `upstream-non-git-19.tar.gz` 里，下载后解压到 `upstream/` 即可（`tar xzf upstream-non-git-19.tar.gz -C upstream`）。**在这 19 条补齐之前，不要运行 raw 归档重建**（`build-raw-archive.mjs` 遇到缺失快照会直接报错，不会写坏数据）。

### 3. 重建图片镜像与原件归档

```bash
node scripts/mirror-images.mjs        # 约 1.2 GB，慢，可断点续跑
node scripts/build-raw-archive.mjs    # 依赖 upstream 完整，产出 public/raw/
```

### 4. 本地验证一遍

```bash
cd site
npm run docs:dev        # 本地预览，会先重建目录与正文
npm run docs:release:local   # 完整发布门禁（HTML/链接/导航/构建/出处校验）
```

### 5. 部署凭据（唯一无法从仓库恢复的东西）

线上站 `aibook.faruheaisha.me` 的部署通道是 SSH 私钥：

- 密钥文件：旧电脑 WSL 的 `~/.ssh/deploy_key`（服务器 `168.144.137.102`，站点根目录 `/var/www/ai-native-textbook`）
- 用私有通道（U 盘 / 加密传输）拷到新电脑同一位置，`chmod 600`
- 服务器端的 `authorized_keys` 不用动；若旧电脑退役，记得在新电脑验证 `ssh -i ~/.ssh/deploy_key root@168.144.137.102` 能登录后再删旧密钥
- GitHub 推送：新电脑自行登录 GitHub（HTTPS 走凭证管理器，或配置代理——国内网络直连 github.com 通常不通）

### 6. 日常操作速查

| 操作 | 命令 |
|---|---|
| 改完正文/索引重新部署 | `cd site && npm run docs:build:local`，然后 `wsl bash scripts/deploy/deploy.sh` |
| 单课增量构建+推送 | `node scripts/deploy/local-tools/build-one.sh <卷>/<课程>`（WSL 内运行） |
| 批量分组构建推送 | `node scripts/deploy/local-tools/volpush.mjs`（组表 `tmp/redeploy-*.txt` 格式见脚本头注释） |
| 导航一致性校验 | `node scripts/deploy/local-tools/check-live-links.mjs` |
| 出处完整性校验 | `cd site && npm run docs:check:provenance` |
| upstream 哈希比对 | `node scripts/deploy/local-tools/check-upstream-vs-raw.mjs` |
| 恢复暂存舞步残留 | `node scripts/deploy/local-tools/recover-stash.mjs` |

## 纪律提醒（历史教训，见 部署记录/全量136门完整上线-2026-09-20.md）

**完整踩坑清单在 `课程设计基线/07-踩坑与运维经验.md`，动手前必读。** 最要紧的四条：

1. 部署工具的**擦除半径必须等于推送半径**——按课程擦除，不要按卷擦。
2. build-batches 暂存舞步进行中，**不要碰 lib**（不跑检查、不跑 git、不开第二个构建）。
3. 本机内存吃紧时：构建加 `MAX_PAGES` 切片 + `TB_NO_MINIFY=1`，或直接在服务器上构建（见部署记录）。
4. 每次部署前服务器留整站备份，部署后写 `部署记录/`。
