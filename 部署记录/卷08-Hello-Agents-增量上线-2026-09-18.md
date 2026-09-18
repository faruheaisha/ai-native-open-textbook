# 卷 08 首批增量上线记录

日期：2026-09-18  
范围：`08-agents/hello-agents`（Datawhale Hello Agents，课程正文未改写）

## 上线内容

- 静态课程页：293 个文件（含课程 HTML 与页面依赖）。
- 前端资源：批次构建生成的 `assets/` 增量资源。
- 其它卷册、首页、来源页和路径页：沿用现有线上版本，未被本次增量包覆盖。

## 验证证据

- 本地批次构建：成功，34 篇 Markdown 正文页面完成静态渲染。
- 服务器目标页 SHA-256：`5c3988d2042370c72d63effacd165c51f6dda89898296012d60138b96ddf53d4`。
- 线上首页：HTTP 200。
- 线上目标页：HTTP 200，页面标题为“Hello Agents（Datawhale 智能体教程） | AI 原生开放教材”。
- `nginx -t`：通过，随后已 reload。

## 回滚点

切换前的完整线上站点保留在服务器：

`/var/www/ai-native-textbook-backup-20260918`

如需回滚，只需将当前目录与该备份目录互换后重新执行 Nginx 配置检查和 reload。备份未删除。

## 后续批次

按同一流程继续部署卷 08 的 Hugging Face Agents Course、Microsoft AI Agents for Beginners、OpenAI Agents SDK 等课程；每批只覆盖对应课程目录及其新增资源，不覆盖未完成构建的全站索引。
