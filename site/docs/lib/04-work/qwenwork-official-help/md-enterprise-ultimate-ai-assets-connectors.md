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
sourceRel: "md/enterprise-ultimate-ai-assets-connectors.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-ai-assets-connectors.md"
sourceSha256: "99ff3af7f9c451ee34410fa85523cf68e1c35ea2d299ebde7f5715df45f55005"
pageSha256: "99ff3af7f9c451ee34410fa85523cf68e1c35ea2d299ebde7f5715df45f55005"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

连接器让千问办公访问企业系统或外部服务。管理员在这里维护企业连接器、凭据与开放范围，也可以限制成员自行添加的连接器。

## 开启连接器市场
进入 AI 管理 → AI 资产管理 → 连接器 → 市场管理，分别设置官方市场和企业市场开关。

1. 开启企业市场，点击【配置】。
2. 选择「专属市场」或「私有市场」。专属市场中的资源由管理员在本后台维护；私有市场接入企业已有市场。
3. 选择私有市场时，填写下表中的信息，再点击【保存配置】。名称至少填写一种语言，两个地址均须使用完整 HTTPS 地址。

<table> <thead> <tr> <td>字段</td> <td>填写说明</td> </tr> </thead> <tbody> <tr> <td>私有市场名称</td> <td>点击语言按钮可分别填写简体中文和英文名称。</td> </tr> <tr> <td>市场地址</td> <td>填写企业市场的完整页面地址，例如 https://market.future-ai.example/qwenwork。</td> </tr> <tr> <td>允许来源</td> <td>填写允许接入的来源地址，例如 https://market.future-ai.example。</td> </tr> </tbody> </table>

保存后返回市场管理，可查看当前模式。再次点击【配置】可修改名称和地址；未保存时离开页面，会提示确认放弃修改。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-ee375ce0679e35cb.png)

*选择私有市场后，填写名称、市场地址和允许来源，再保存配置。*

使用私有市场或关闭企业市场时，企业连接器列表、分类和开放策略保留内容，但不能修改；切回并开启专属市场后可继续管理。「允许添加连接器」独立控制成员自行添加的能力，不受市场模式影响。

## 新建企业连接器
1. 进入「列表」，点击【新建连接器】。已有官方连接器时也可使用【从官方市场添加】。
2. 填写名称、唯一标识、分类和说明。说明应交代能访问什么业务数据，便于成员判断用途。
3. 在「认证与凭据」选择「无认证」「MCP OAuth 2.1（DCR）」或「API Key（用户提供）」。DCR 是动态客户端注册，按 MCP 服务的 OAuth 能力接入。API Key 方式在后台只定义请求头名称和值前缀，每位成员在客户端填写自己的密钥；前缀所需空格也要保留。
4. 点击【下一步】进入「连接协议」，按实际协议填写服务地址或内部启动命令，点击【测试连接】。
5. 点击【保存连接器】保留配置，或【保存并启用】投入使用。回到列表核对服务 URL、授权方式、可见 Endpoint 与状态。

MCP（Model Context Protocol，模型上下文协议）是连接工具服务的一种协议。填写 MCP 地址时使用服务提供方给出的完整入口，不能把普通网页地址当成 MCP 接口。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-e45c2d65d2cace05.png)

*用唯一标识与服务 URL 确认接入对象，再检查凭据和启用状态。*

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-b0493c26226e03aa.png)

*后台定义鉴权格式，成员在客户端提供自己的 API Key。*

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-892789b76e8bf5e2.png)

*按服务协议填写完整地址，测试后选择保存或保存并启用。*

## 设置企业连接器开放范围
1. 在「开放策略组」点击【新增连接器策略组】。
2. 选择白名单或黑名单，设置用户范围、连接器范围及目标端。
3. 需要自动安装时，在白名单策略中选择指定资源，再开启「自动安装」；「全部资源」不能与自动安装同时开启。
4. 保存后启用，先用【命中验证】检查目标成员，再在客户端验证安装和实际调用。

**说明**

黑名单优先于白名单。默认策略始终启用，可以编辑允许的资源范围。

能够看到连接器不代表已获得外部系统的数据访问权限，还需检查该系统的授权。

## 限制成员自行添加的连接器
进入「访问策略」选择接入模式。这组规则**仅影响成员自行添加的连接器**，企业专属市场和自定义市场中上传的连接器不受这组规则影响。
<table> <thead> <tr> <td>模式</td> <td>对成员自行添加的连接器如何处理</td> </tr> </thead> <tbody> <tr> <td>全部允许</td> <td>允许直接访问</td> </tr> <tr> <td>按规则判断</td> <td>命中任一启用的允许规则才可访问</td> </tr> <tr> <td>全部禁止</td> <td>禁止访问</td> </tr> </tbody> </table>

选择「按规则判断」时，按以下步骤添加允许规则：

1. 点击【新增规则】，填写规则名称和说明。
2. 选择匹配对象。需要匹配远程地址或资源标识时选择「服务地址或连接器标识」，命令型连接器选择对应的内部启动命令选项。
3. 填写正则表达式，选择适用用户、部门或用户组。
4. 保存并启用规则，再点击【命中测试】，使用目标成员与连接器信息检查结果。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-fc864d688ad19dfb.png)

*规则同时检查连接器信息与适用范围；匹配任一启用规则才获得允许。*

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-113eb6e1c0bdf3f4.png)

*先确定匹配对象，再设置表达式和允许使用的成员范围。*

例如，服务地址规则 `^https://crm\.example\.com/mcp$` 只允许该完整地址。点号需要转义，首尾的 \^ 和 $ 限定完整匹配。配置后既要测试允许地址，也要测试相似但不应允许的域名，避免表达式匹配过宽。

## 更新凭据和排查失败
使用「API Key（用户提供）」时，密钥由成员在客户端维护，后台不接收、不保存密钥值。密钥到期后由成员更新；管理员修改请求头或授权方式后，应通知成员重新检查连接。
<table> <thead> <tr> <td>现象</td> <td>优先检查</td> </tr> </thead> <tbody> <tr> <td>出现 401／403</td> <td>凭据与外部系统权限</td> </tr> <tr> <td>OAuth 连接异常</td> <td>是否需要重新授权</td> </tr> <tr> <td>看不到连接器</td> <td>市场开关、资源状态和开放策略</td> </tr> <tr> <td>自行添加的连接器被拒绝</td> <td>访问模式、规则状态和用户范围</td> </tr> </tbody> </table>
