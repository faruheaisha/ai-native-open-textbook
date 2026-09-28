# AGENTS.md — 项目上下文手册（新会话/新机器从这里开始）

面向在本仓库工作的开发者与 AI 编码助手。读完本文件即可安全上手；各节末尾指向更详细的权威文档。

## 项目是什么

「AI 原生开放教材」：把 GitHub 上 143 个高质量 AI/Agent 来源编成 8 卷中文学习路径，**136 门课程、24,585 页正文**全部可在站内直读，逐页标注出处与许可。线上站点 `https://aibook.faruheaisha.me`（自部署，nginx 静态站）。正文与上游逐字一致，每页 frontmatter 带 `sourceId/sourceRel/sourceSha256` 可回溯到原始文件。

- 仓库：`github.com/faruheaisha/ai-native-open-textbook`
- 里程碑：`v1.0-full-20260920`（136/136 门完整上线，2026-09-20）
- 服务器：`168.144.137.102`，站点根 `/var/www/ai-native-textbook`，部署私钥 `~/.ssh/deploy_key`（WSL 侧，**不在仓库里**）

## 真源层级（冲突时听谁的）

1. `课程设计基线/SOURCE_OF_TRUTH.md` —— 权威层级总纲，先读它
2. `课程设计基线/00-课程宪法.md` —— 不可违反的底层原则（18 条）
3. `课程设计基线/01-课程卷册-v1.0.md` —— 卷册边界与职责
4. `课程设计基线/product/` —— 网站 PRD、教学法与交互设计（实现以这三份为准）
5. `curation.json` + `catalog/catalog.json` —— 内容编排与来源索引的唯一数据源
6. `site/docs/lib/` —— 读者正文唯一真源（构建产物 `generated/catalog.ts` 已入库，克隆即可构建）

**注意**：`课程设计基线/` 历史上有「14 卷」的早期规划；现网实际为 8 卷、136 门（2026-09 全量上线口径）。以 `curation.json` 和线上为准。

## 设计文档地图（全部已入库）

| 想了解 | 去看 |
|---|---|
| 教学原则、卷册、生产流程 | `课程设计基线/00~03` |
| 待决策事项 | `课程设计基线/04-待验证与决策队列.md` |
| 网站/蓝皮书产品形态 | `课程设计基线/05` + `product/01~03` |
| 运维踩坑（动手前必读） | `课程设计基线/07-踩坑与运维经验.md` |
| 每次上线的事实记录 | `部署记录/` |
| 换电脑接手 | `RESTORE.md` |
| 第三方许可 | `NOTICE.md`、`LICENSES/` |
| 新手读者视角介绍 | `site/docs/start.md` |

## 常用命令（在仓库根，除非注明）

```bash
# 本地预览 / 完整发布门禁
cd site && npm run docs:dev
cd site && npm run docs:release:local

# 内容数据重建（catalog → 正文 → raw 归档 → manifest → 搜索索引）
cd site && npm run build:data:local

# 单课增量构建 + 推送（WSL 内）
node scripts/deploy/local-tools/build-one.sh <卷>/<课程>

# 分组批量构建 + 推送
TB_VOLFILE=<卷表文件> node scripts/deploy/local-tools/volpush.mjs

# 整站部署（构建产物 → 服务器，WSL 内）
wsl -e bash -lc 'bash scripts/deploy/deploy.sh'

# 校验
node scripts/deploy/local-tools/check-live-links.mjs      # 导航一致性（线上）
cd site && npm run docs:check:provenance                  # 出处完整性
node scripts/deploy/local-tools/check-upstream-vs-raw.mjs # upstream 哈希比对
node scripts/deploy/local-tools/check-nav-coverage.mjs    # 侧栏覆盖
```

## 环境依赖

- **Node ≥ 20**（`site/engines` 已约束）
- **Python 3 + reportlab**：仅 `scripts/build-bluebook-catalog-pdf.py`（蓝皮书 PDF）需要，`pip install reportlab`
- **WSL + rsync + ssh**：部署脚本在 WSL 里跑；私钥 `~/.ssh/deploy_key`
- Windows 侧注意：路径含空格（`E:\claude code`）会让 spawn/Start-Process 拆参——spawn 用相对路径 + cwd，长任务启动脚本放无空格路径；WSL 的 `/tmp` 不持久、后台进程会被回收，长任务用 Windows 侧 `Start-Process powershell -File <无空格路径>` 承载

## 纪律（踩过的真实事故，全文见 `课程设计基线/07-踩坑与运维经验.md`）

1. **擦除半径必须等于推送半径**——按课程擦除，永不按卷擦（曾误删 66 门已上线课程）。
2. **build-batches 暂存舞步进行中 lib 是禁区**——不跑检查、不开第二个构建；被杀后用 `local-tools/recover-stash.mjs` + `git checkout -- site/docs/lib` 收敛。
3. **内存紧张是常态**：构建加 `MAX_PAGES` 切片 + `TB_NO_MINIFY=1`；1,500 页级单课直接在服务器上构建（RESTORE.md / 07 文档有完整做法）。
4. **每次部署**：服务器先留整站备份 `ai-native-textbook-backup-<主题>-<日期>`，部署后写 `部署记录/`。
5. **校验随手跑**：改完导航/索引/上线集，必跑 `check-live-links`；改了内容必跑 `docs:check:provenance`。

## 当前状态与已决事项（2026-09-28）

- 136/136 门完整上线，服务器页数与本地一致；导航/搜索/raw 归档均已对齐
- 许可口径：**全部 136 门按教育用途上线**（含 30 门「仅引用/未声明」来源）——与 `NOTICE.md`「仅引用不收录正文」的旧表述存在已知出入，是用户明确的教育用途决策；若未来转商用需重新审视
- raw 归档（`public/raw/`，45,847 文件）随站部署，支撑每页「原件 ↓」溯源链接
- 19 个非 Git 来源的 upstream 快照在 Release `v1.0-full-20260920` 附件，其余 124 个用 `scripts/restore-upstream.mjs` 恢复
