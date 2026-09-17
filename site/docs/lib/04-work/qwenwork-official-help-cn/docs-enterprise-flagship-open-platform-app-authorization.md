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
sourceRel: "docs/enterprise/flagship/open-platform/app-authorization.md"
rawUrl: "/raw/04-work/qwenwork-official-help-cn/docs/enterprise/flagship/open-platform/app-authorization.md"
sourceSha256: "1fee0de26664fbdb16cfa5e8f472b71e786badac7c0fc5ebf88f27d7f4e3f160"
pageSha256: "1fee0de26664fbdb16cfa5e8f472b71e786badac7c0fc5ebf88f27d7f4e3f160"
contentMode: "local-full"
zh: ""
---

# qwenwork-official-help-cn

帮助中心 企业旗舰版能力 开放平台 应用授权
 通用官方知识库
应用授权
应用授权用于让企业自建服务调用千问办公管理接口。应用 API Key 表明调用身份，权限配置决定它能调用哪些接口；创建密钥本身不会授予全部权限。
创建企业应用
- 进入 开放与集成 → 开放平台 → 应用授权，点击【创建应用】。
- 填写应用名称和用途说明，例如“人事系统通讯录集成”，选择接口权限后创建。创建成功时会生成名为 Default 的 API Key，完整密钥只显示一次，请在关闭窗口前保存。
- 点击应用名称或【查看】进入详情，检查「基础信息」。
【截图：企业应用列表、启用状态与详情入口 · open-platform--app-authorization.png】
图 1：按应用分别管理凭据和权限，避免多个无关服务共用同一应用。
【截图：管理后台创建企业应用与接口权限选择 · app-create.png】
创建应用时即可选择自定义 API 权限，读取、管理与执行互不包含。
配置接口权限
- 在应用详情进入「权限配置」，点击编辑入口。
- 按服务需要选择权限范围，逐项检查接口的读取与写入权限。
- 保存后重新打开该页，核对实际授权集合。
- 将所需接口与权限名称提供给服务开发者，通过开发者文档核对请求要求。
【截图：应用详情中的权限配置 · app-permissions.png】
图 2：只授予当前集成需要的接口权限，修改后重新检查保存结果。
创建和使用 API Key
- 切换到「应用凭据」，点击【创建 API Key】。
- 按窗口填写 Key 名称和有效期等要求，确认创建。
- 完整 Key 只在创建后展示一次，立即保存到企业密钥管理系统，不能通过列表中的掩码还原。
- 将密钥注入实际调用服务，按照接口文档使用 Authorization: Bearer &lt;API_KEY> 请求头。
- 确认应用启用，再调用一个已授权的只读接口，检查返回结果。
【截图：应用 API Key 列表与创建入口 · app-credentials.png】
图 3：列表用于检查名称、到期时间和状态，完整密钥只在创建时显示。
轮换、停用与删除
需要轮换时创建新 Key，更新调用服务并验证成功，再停用旧 Key。若怀疑泄露，应及时停用相关密钥，检查最近使用情况及调用日志。
暂停整项集成可以停用应用。删除应用前需先停用，并确认调用方已停止使用；启用状态下删除按钮不可用。停用应用或停用密钥会使依赖它的服务无法继续正常调用。
处理调用错误
- 401： 检查密钥、请求头和应用状态。
- 403： 检查接口权限与目标数据范围。
进一步处理以开发者文档对应接口的错误响应为准。应定位缺失权限，避免直接扩大为全部权限。
