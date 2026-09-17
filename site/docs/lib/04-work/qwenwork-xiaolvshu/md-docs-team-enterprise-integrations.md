---
title: "企业连接器、MCP 与技能 (/docs/team/enterprise-integrations)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/team/enterprise-integrations.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/team/enterprise-integrations.md"
sourceSha256: "7939daee3d37133c9c2aecdfb6aca572f6fc79ea0002dc8c9692f7328a00607e"
pageSha256: "7939daee3d37133c9c2aecdfb6aca572f6fc79ea0002dc8c9692f7328a00607e"
contentMode: "local-full"
zh: ""
---

# 企业连接器、MCP 与技能 (/docs/team/enterprise-integrations)

企业接入可以拆成三层：

* **连接器**：连接具体账号、数据源或业务系统；
* **MCP**：用统一协议描述可以调用的工具与参数；
* **Skill**：规定什么时候调用、按什么步骤执行、如何输出与验收。

专家套件可以在这些基础能力之上组合领域角色、方法和工作流，但不会因此自动获得更多权限。

## 接入流程 [#接入流程]

    ### 明确业务任务 [#明确业务任务]

    先写清要读取或写入什么、谁使用、输出到哪里以及失败时如何停止。

    ### 核对服务与权限 [#核对服务与权限]

    确认服务提供方、授权账号、读取与写入范围、数据传输位置和撤销方式。

    ### 小范围连接 [#小范围连接]

    使用低权限测试账号连接，在少量脱敏数据上验证工具、参数和错误处理。

    ### 绑定已验证 Skill [#绑定已验证-skill]

    把稳定步骤、输入、输出、权限和人工确认点写入 Skill。

    ### 上线与复核 [#上线与复核]

    记录负责人、版本、变更和撤销流程，并定期清理长期不用的连接。

## 支持范围 [#支持范围]

当前连接方向包括浏览器、macOS 应用、Microsoft 365、钉钉工作台和自定义 MCP；实际支持范围仍以当前端“扩展”和企业后台为准。连接器刚启用或停用后，需要新建对话才能让工具列表刷新。

团队知识库、单点登录和组织级设置已经进入公开企业功能说明，但 SSO 协议、配置入口和知识库权限继承仍有待确认项，不代表每个账号均已开放。

钉钉组织绑定规则已在公开文档中明确：一个钉钉组织只能绑定一个千问办公组织，一个钉钉账号可以绑定多个千问办公组织；更换绑定本期暂未开放，首次绑定前应确认组织选择无误。

## 安全要求 [#安全要求]

* 不把密钥写进文档、截图、任务 Prompt 或代码仓库；
* 授权遵循最小权限，不使用不必要的全量范围；
* 测试使用专门的低权限账号和脱敏数据；
* 离职成员同时处理平台账号和第三方授权；
* 发布 Skill 新版本前验证连接器与 MCP 依赖和写操作。
