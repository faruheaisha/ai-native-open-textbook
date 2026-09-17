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
sourceRel: "md/enterprise-ultimate-admin-guide.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-admin-guide.md"
sourceSha256: "aee328b025397e8b62fcfabbfca537af408a6798ccb1860df59110f7e03203d7"
pageSha256: "aee328b025397e8b62fcfabbfca537af408a6798ccb1860df59110f7e03203d7"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

本手册帮助企业管理员配置千问办公-旗舰版管理后台。具体可用功能以企业已开通的能力和当前账号权限为准。

每篇按实际任务说明从哪里进入、填写什么、保存后如何检查。您可以按左侧菜单查找功能，也可以在顶部搜索字段或操作名称。

## 第一次配置企业环境
1. 打开[组织信息](https://docs.qwenwork.cn/enterprise-ultimate/organization/org-profile)，确认当前企业，复制企业的管理后台与客户端服务地址。

2. 决定用户从哪里来。已有企业通讯录时配置[用户同步](https://docs.qwenwork.cn/enterprise-ultimate/users/user-sync)；手动管理时在[用户](https://docs.qwenwork.cn/enterprise-ultimate/users/user)中新增或邀请。

3. 设置[身份认证](https://docs.qwenwork.cn/enterprise-ultimate/users/authentication)，让成员通过密码、邮箱验证码或企业 SSO 登录。

4. 为成员授予席位，再按工作需要配置[模型](https://docs.qwenwork.cn/enterprise-ultimate/models)和 [AI 资产](https://docs.qwenwork.cn/enterprise-ultimate/ai-assets)。

5. 用一名普通成员的账号完成登录、选择模型和使用资源，随后查看[用量统计](https://docs.qwenwork.cn/enterprise-ultimate/analytics/usage)与[日志审计](https://docs.qwenwork.cn/enterprise-ultimate/audit-logs)。

## 按要完成的事情查找
<table> <thead> <tr> <td><p>您要做什么</p></td> <td><p>阅读章节</p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p>接入钉钉、飞书、企业微信或企业身份平台</p></td> <td><p><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/authentication">SSO 登录配置</a></p></td> </tr> <tr> <td><p>同步部门、入职与离职用户</p></td> <td><p><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/user-sync">用户同步配置</a></p></td> </tr> <tr> <td><p>给用户分配席位，处理加入申请</p></td> <td><p><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/user">用户</a></p></td> </tr> <tr> <td><p>委派其他管理员</p></td> <td><p><a href="https://docs.qwenwork.cn/enterprise-ultimate/organization/admin-roles">管理员角色</a></p></td> </tr> <tr> <td><p>控制设备登录或任务中的操作</p></td> <td><p><a href="https://docs.qwenwork.cn/enterprise-ultimate/security/trusted-devices">可信设备</a>、<a href="https://docs.qwenwork.cn/enterprise-ultimate/security/hooks-rules">Hooks 规则</a></p></td> </tr> <tr> <td><p>调整首页和导航</p></td> <td><p><a href="https://docs.qwenwork.cn/enterprise-ultimate/personalization">个性化配置</a></p></td> </tr> <tr> <td><p>分配积分限额，排查用量</p></td> <td><p><a href="https://docs.qwenwork.cn/enterprise-ultimate/subscription/quota">限额管理</a>、<a href="https://docs.qwenwork.cn/enterprise-ultimate/analytics/usage">用量统计</a></p></td> </tr> <tr> <td><p>让企业应用调用管理接口</p></td> <td><p><a href="https://docs.qwenwork.cn/enterprise-ultimate/open-platform/app-authorization">应用授权</a></p></td> </tr> </tbody> </table>

## 查看列表与跳转页码
支持分页的列表底部显示总数、页码、每页条数和「跳至」输入框。输入整数页码后按 Enter 或移开焦点，即可查看指定页；也可以选择每页显示 10、20、50 或 100 条。

页码输入按以下规则处理：

* 只有一页时，仍显示跳转入口；没有记录时，输入框不可用。

* 输入 0 或负数时，跳到首页；超过总页数时，跳到末页。

* 输入空值或非整数时，不会跳转。

调整筛选后，先查看当前总数和页码，再继续浏览。

## 阅读约定
文中的 用户管理 → 身份认证 表示管理后台菜单路径；【保存】表示按钮；「SSO 登录」表示页签或选项。正文中的"客户端"指千问办公-旗舰版用户客户端（桌面端），"管理后台"指管理员操作的网页。

截图中的企业、成员、域名和配置值用于说明填写位置。请使用本企业的真实信息；回调地址、服务地址和标识以当前页面提供的值为准。点击截图可以放大查看。

## 找不到菜单或不能操作
管理后台按管理员角色展示功能和操作权限。如果同事能看到某个入口而您看不到，请让有权限的管理员检查[管理员角色](https://docs.qwenwork.cn/enterprise-ultimate/organization/admin-roles)。按钮不可用时先查看旁边的提示；例如启用用户同步后，成员新增和删除需要在来源通讯录中完成。
