---
title: "TeachAny：K12 互动课件执行摘要"
sourceId: "04-work/qwenwork-guide"
sourceTitle: "千问办公绿皮书（QwenWorkGuide）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/wangxiaoshuai1998/QwenWorkGuide"
entryUrl: "https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/02-K12互动课件开发.md"
sourceRel: "docs/public/skills/10-内容创作/02-K12互动课件开发.md"
rawUrl: "/raw/04-work/qwenwork-guide/docs/public/skills/10-内容创作/02-K12互动课件开发.md"
sourceSha256: "1b3e25a31fd5440fed3a79a7794630a9adcc8ebf7f0821c32daffda35680afd4"
pageSha256: "1b3e25a31fd5440fed3a79a7794630a9adcc8ebf7f0821c32daffda35680afd4"
contentMode: "local-full"
zh: ""
---

# TeachAny：K12 互动课件执行摘要

TeachAny 的目标不是把知识堆进页面，而是把一节课做成**有问题锚点、有互动、有讲解、有评估、有发布闭环**的学习体验。主文件只保留决策骨架；细节按需读取卫星文档。

## 何时使用

使用本技能：

- 用户要制作、改造、调试或发布 K12 学科课件、互动网页、微课、教学动画、PBL 探究课。
- 用户提到：`课件`、`教学设计`、`AI 学伴`、`TTS`、`知识图谱`、`课标`、`PBL`、`学习路径`、`发布到 Gallery`、`rebuild-index`。
- 用户是家长/教师/学生，目标是帮助中小学生理解一个具体知识点。

不要使用：企业培训、成人职业技能课、通用网站/App、纯 PPT/Word 格式转换、非 K12 展览页。

## 知识图谱 / 课标数据在哪？（必读，避免 404）

| 仓库 | GitHub | 含 `data/trees/` | 用途 |
| --- | --- | --- | --- |
| **teachany-courseware** | [weponusa/teachany-courseware](https://github.com/weponusa/teachany-courseware) | ✅ 权威 | 知识树、`node-index.json`、`nodes-metadata.json`、`rebuild-index.py` |
| **teachany**（本地常叫 teachany-opensource） | [weponusa/teachany](https://github.com/weponusa/teachany) | ❌ 轻量 | Skill、`pbl.html` / `path.html`；**无**完整课标 JSON |
| ~~teachany-opensource~~ | **不存在此独立仓库** | — | 勿 clone；会 404 |

### 只读 vs 写入（能否不 clone？）

| 能力 | 不 clone，能访问公网即可？ | 数据/API 来源 |
| --- | --- | --- |
| **学习路径图谱** `path.html` | ✅ | `nodes-metadata.json` + `registry.json`（`teachany-data-fetch.js`） |
| **知识地图** `tree.html` | ✅ | `teachany-courseware` GitHub Pages / raw |
| **PBL 匹配** `pbl.html` | ✅ | 课标树 CDN + `POST https://www.teachany.cn/api/pbl/analyze` |
| **查 node_id** `find_nodes.py` | ✅ | 远程 `data/trees/...`（`repo_paths.fetch_remote_json`） |
| **校验 node_id** `check_node_id.py` | ✅ | 远程 `node-index.json` |
| **课件内知识图谱模块** | ✅ | 课件页加载 `teachany-knowledge-graph.js`（在 courseware 社区页） |
| **挂树 / 发布** | ✅ 见下方 `hang_tree.py` | `GH_TOKEN` 或 Worker PR；**不必**事先 clone |

### 挂树与发布（Skill 一站式，无需事先 clone）

| 步骤 | 命令 | 凭据 |
| --- | --- | --- |
| 注册课标节点 | `python3 hang_tree.py register --node-id ... --subject ... --stage ...` | `GH_TOKEN`（写 courseware） |
