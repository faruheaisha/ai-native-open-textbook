---
title: "第 9 章 如何接入外部 API"
sourceId: "04-work/workbuddy-guide"
sourceTitle: "WorkBuddyGuide（蓝皮书 + 社区案例集）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/AlephAITech/WorkBuddyGuide"
entryUrl: "https://github.com/AlephAITech/WorkBuddyGuide/blob/814ec835e9dae4a89da368fe208425ff50e121fe/docs/bluebook/第一篇%20使用手册：先把%20WorkBuddy%20用起来/第%209%20章%20如何接入外部%20API/index.md"
sourceRel: "docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 9 章 如何接入外部 API/index.md"
rawUrl: "/raw/04-work/workbuddy-guide/docs/bluebook/第一篇 使用手册：先把 WorkBuddy 用起来/第 9 章 如何接入外部 API/index.md"
sourceSha256: "6ba2df582e4b775ab98193798be3fb454af1e0821de0196c98f8ce1695a1551a"
pageSha256: "6ba2df582e4b775ab98193798be3fb454af1e0821de0196c98f8ce1695a1551a"
contentMode: "local-full"
zh: ""
---

# 第 9 章 如何接入外部 API

你也许没有积分，但是你有自己的LLM API，

WorkBuddy支持接入其他 LLM 的 API，以及 Coding Plan、Token Plan 等套餐。

直接从设置中进入，

![](/mirror/dd/dd8bc5507e51099ad473890899635a89a0dc1075.png)

选择模型选项，

![](/mirror/85/85eaf9d1f570b1fa81351e418d8abb970e52282a.png)

点击添加模型，

![](/mirror/34/34d0d5e38a4b53025d082b40a76bc5ca0d1a0eac.png)

可以选择各种coding plan或者自定义的api

![](/mirror/9d/9dd7ad69436738bc4db8afdf49840c37033070d9.png)

比如，DeepSeek，你只需要输入api key即可，

![](/mirror/f2/f2ed2ea6483bd333090c2b36257898bd36081e54.png)

或者接入本地ollama模型，需先本地启动 Ollama（默认端口 11434，OpenAI 兼容接口），本地模型优势为数据不出本机、可离线、零 Token 成本。

![](/mirror/b5/b56445f56f278dcbb0ea3ec409f4ab39a1bb088e.png)
