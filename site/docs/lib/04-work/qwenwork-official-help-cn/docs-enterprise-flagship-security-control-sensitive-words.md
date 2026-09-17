---
title: "qwenwork-official-help-cn"
sourceId: "04-work/qwenwork-official-help-cn"
sourceTitle: "qwenwork-official-help-cn"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.cn/docs"
entryUrl: "https://qwenwork.cn/docs"
sourceRel: "docs/enterprise/flagship/security-control/sensitive-words.md"
rawUrl: "/raw/04-work/qwenwork-official-help-cn/docs/enterprise/flagship/security-control/sensitive-words.md"
sourceSha256: "e4864d103cce0193f84cb4ef3fc003dab51cbfc67a15c98923ddc6d45dc80cb4"
pageSha256: "e4864d103cce0193f84cb4ef3fc003dab51cbfc67a15c98923ddc6d45dc80cb4"
contentMode: "local-full"
zh: ""
---

# qwenwork-official-help-cn

帮助中心 企业旗舰版能力 安全管控 敏感词
 通用官方知识库
敏感词
敏感词库用于检查文本中的指定关键字。启用的词库对全部用户生效，命中后拦截；适合维护明确不能提交或使用的词条。
新建并启用词库
- 进入 组织与安全 → 安全管控 → 敏感词，点击【新增词库】。
- 输入便于识别的词库名称，按输入区域要求填写词条。
- 检查重复词、空行与过长内容，保存词库。
- 回到列表确认词条数量及启用状态，需要生效时开启词库。
每个企业最多维护 20 个词库，每个词库最多 1,000 个词条，每条不超过 50 个字符。词条按关键字内容匹配，不作为正则表达式执行。
【截图：敏感词库列表与拦截校验入口 · security-control--sensitive-words.png】
图 1：保存词库后检查是否启用，只有启用词库参与匹配。
【截图：管理后台敏感词库配置 · sensitive-create.png】
词条逐行填写，保存前检查数量及全员生效提示。
测试是否误拦截
- 点击【拦截校验】，输入包含目标词条的测试文本并执行校验。
- 查看命中的词库和词条，确认符合预期。
- 再输入一段业务允许的文本，检查常见词语是否因包含短词条而被命中。
- 误拦截时编辑词库，调整过短或含义过宽的词条，保存后重新测试。
修改与停用
搜索词库名称或词条，点击【编辑】维护内容。临时停止使用时关闭该词库；不再需要时按删除提示移除。删除或停用后，重新运行相同测试，确认这份词库不再参与判断。
