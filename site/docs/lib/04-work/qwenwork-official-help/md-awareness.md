---
title: "千问办公官方帮助中心（阿里云）"
sourceId: "04-work/qwenwork-official-help"
sourceTitle: "千问办公官方帮助中心（阿里云）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: ""
entryUrl: null
sourceRel: "md/awareness.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/awareness.md"
sourceSha256: "90e5063cf3b0663b07fca1697001d8b4f68595c1a258f61191d0b05c844b3287"
pageSha256: "90e5063cf3b0663b07fca1697001d8b4f68595c1a258f61191d0b05c844b3287"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

定制协作风格与工作手册，赋予 QwenWork 跨会话记忆与技能进化能力。

意识是 QwenWork 的记忆与个性化系统------启用后，它会持续记录你的偏好和工作习惯，让每次新对话都带着完整上下文开始，而不是从零重来。

意识页面入口在左侧导航的「**意识**」图标，进入后包含两个主开关、进化动态面板，以及所有意识文件的管理入口。

![产品界面](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/5013209871/p1096525.png)

## 主开关
* **意识模式**：主开关。启用后 QwenWork 将按照你定制的风格工作，并拥有跨会话记忆与技能进化能力。

* **自动记忆**：启用后 QwenWork 将自动维护用户画像与长短期记忆，并定期触发记忆反思。

## 进化动态
展示意识系统的活跃情况：

* **记忆趋势图**------折线图按天显示记忆条目的变化趋势，可切换「天 / 周 / 月」视角。

* **今日统计**------当日的审查次数、新增记忆条数、技能更新数、反思次数。

* **近期动态**------按时间倒序列出最新的记忆写入与反思记录（短期记忆、记忆反思等），点击「显示更多」可查看完整历史。

## 意识信息
管理所有与意识相关的文件和配置，包含以下条目：
<table> <thead> <tr> <td><p><b>条目</b></p></td> <td><p><b>说明</b></p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p><b>存储位置</b></p></td> <td><p>所有意识文件的根目录（<code>\~/.qwenworkcn/awareness/main</code>），点击「打开所在文件夹」可在 Finder / 资源管理器中直接打开。</p></td> </tr> <tr> <td><p><b>协作风格</b></p></td> <td><p>定义 QwenWork 的沟通和协作方式。点击「个性化」选择预设风格或自定义描述（<code>SOUL.md</code>）。</p></td> </tr> <tr> <td><p><b>工作手册</b></p></td> <td><p>定义 QwenWork 的工作规范和行为准则，可直接编辑定制（<code>AGENTS.md</code>）。</p></td> </tr> <tr> <td><p><b>用户画像</b></p></td> <td><p>记录你的基本信息、偏好和习惯，由 QwenWork 自动维护（<code>USER.md</code>）。</p></td> </tr> <tr> <td><p><b>长期记忆</b></p></td> <td><p>跨会话持久保存的重要知识和结论，由 QwenWork 自动维护（<code>MEMORY.md</code>）。</p></td> </tr> <tr> <td><p><b>短期记忆</b></p></td> <td><p>按天记录的对话摘要和临时笔记，由 QwenWork 自动维护（<code>memory/</code> 目录）。</p></td> </tr> <tr> <td><p><b>索引</b></p></td> <td><p>为意识文件建立本地检索索引，便于快速定位历史记录。点击「重建搜索索引」可手动刷新。</p></td> </tr> <tr> <td><p><b>备份与恢复</b></p></td> <td><p>导出或导入整个意识目录（记忆文件），用于多设备同步或备份。</p></td> </tr> </tbody> </table>

## 危险操作
以下操作不可恢复，请谨慎执行：

* **重置协作风格**：清除当前协作风格配置，可通过「个性化」重新选择。

* **重置工作手册** ：将工作手册（`AGENTS.md`）恢复为初始模板，当前内容将被覆盖。

* **清空记忆** ：删除 `USER.md`、`MEMORY.md` 和所有记忆日志文件，搜索索引将同步重建。
