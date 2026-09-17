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
sourceRel: "docs/enterprise/flagship/open-platform/developer-docs.md"
rawUrl: "/raw/04-work/qwenwork-official-help-cn/docs/enterprise/flagship/open-platform/developer-docs.md"
sourceSha256: "797352b22805fa32e305ad1249bdf18901d2f213da090ec7e555cf0579079608"
pageSha256: "797352b22805fa32e305ad1249bdf18901d2f213da090ec7e555cf0579079608"
contentMode: "local-full"
zh: ""
---

# qwenwork-official-help-cn

帮助中心 企业旗舰版能力 开放平台 开发者文档
 通用官方知识库
开发者文档
开发者文档按管理对象提供接口说明、请求参数、响应结构与权限要求。企业管理员可以用它确认应用需要哪些权限，并完成一次只读调用检查。
查找需要的接口
- 点击管理后台 开放与集成 → 开放平台 → 开发者文档，或打开本中心的开发者文档。
- 按接口分类浏览，或搜索要操作的对象和动作，例如用户、部门、查询或新增。
- 打开接口后，先检查请求方法、路径和所需权限，再查看参数及响应示例。
- 将接口要求与应用授权中的权限配置对照。
完成首次调用
- 创建并启用企业应用，授予需要使用的只读接口权限。
- 生成 API Key，保存在调用服务的环境中。
- 使用本企业实际服务地址，按接口示例设置 Authorization: Bearer &lt;API_KEY>、查询参数与请求体。
- 发起查询，检查 HTTP 状态与返回数据是否符合当前企业。
确认身份和权限正确后，再按照具体接口说明实现写入。
调用不符合预期时
记录请求时间、接口路径、状态码和错误响应；分享排查信息时移除 Authorization 头和其他密钥。参数错误按接口字段要求修正，权限错误回到应用授权核对。接口是否成功应以响应和目标数据为准，不能只看请求已经发出。
