---
title: "扣子 Coze 官方文档"
sourceId: "04-work/coze-official-docs"
sourceTitle: "扣子 Coze 官方文档"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: ""
entryUrl: null
sourceRel: "docs/cozeloop_register_veadk.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozeloop_register_veadk.md"
sourceSha256: "c6eee380cb40cf5def03f06dc08dff1bff2f06a39ea0a8a82056e99153db9e48"
pageSha256: "c6eee380cb40cf5def03f06dc08dff1bff2f06a39ea0a8a82056e99153db9e48"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

在扣子罗盘中注册火山智能体后，你可以在扣子罗盘中观测、调试或评测该火山智能体。
## 什么是火山智能体 \{#3f65dab9\}
火山智能体是通过火山引擎智能体框架（**VeADK，Volcengine Agent Development Kit**）开发的智能体。关于 VeADK 的详细说明可参考[ VeADK 帮助文档](https://volcengine.github.io/veadk-python/)。目前，仅部署到火山引擎函数服务和火山引擎 AgentKit 的火山智能体可以在扣子罗盘中注册。

* 参考 [部署到 VeFaaS](https://volcengine.github.io/veadk-python/deploy/deploy-vefaas/) 把火山智能体部署到函数服务。
* 参考 [部署到 AgentKit](https://volcengine.github.io/veadk-python/deploy/deploy-agentkit/) 把火山智能体部署到 AgentKit。

:::notice 注意
火山智能体的部署模式必须选择 A2A / MCP Server，才能注册到扣子罗盘进行评测。
:::
火山智能体的 Trace 数据可以直接上报至扣子罗盘，实现调用链路观测；在扣子罗盘中注册的火山智能体，也可以通过观测功能进行 Agent 评测。
## 注册火山智能体 \{#481f8633\}
### 步骤一（可选）：把火山智能体的 Trace 数据上报到扣子罗盘 \{#f010ca6f\}
如需通过扣子罗盘实现 Trace 观测，在通过 VeADK 开发火山智能体时，你需要通过以下步骤上报 Trace 数据。配置步骤如下：

1. 在 VeADK 配置文件 `config.yaml` 的 `observability` 字段中填写 `cozeloop` 的属性。关于配置文件的详细说明及示例可参考 [配置文件](https://volcengine.github.io/veadk-python/configuration/)。
   
   | | | \
   |**属性** |**说明** |
   |---|---|
   | | | \
   |endpoint |固定设置为 `https://api.coze.cn/v1/loop/opentelemetry/v1/traces`。 |
   | | | \
   |api_key |扣子罗盘访问密钥，支持个人访问令牌、OAuth 访问令牌和服务访问令牌。获取方式可参考配置个人访问令牌。 |
   | | | \
   |service_name |扣子罗盘工作空间的 ID。你可以在登录扣子罗盘之后，左上角切换到想要存放火山智能体数据的工作空间，并在 URL 的 space 关键词之后获取工作空间 ID，例如 `https://loop.coze.cn/console/enterprise/personal/space/73917415734092****/pe/prompts` 中，`73917415734092****`为工作空间 ID。 |

   一个可参考的 config.yaml 示例如下：
   ```YAML
   model:
     agent:
       provider: openai
       name: doubao-1-5-pro-256k-250115
       api_base: https://ark.cn-beijing.volces.com/api/v3/
       api_key: 火山方舟模型apikey
   
   # 火山引擎认证信息
   volcengine:
     access_key: 填自己的火山ak
     secret_key: 填自己的火山sk
   
   observability:
     # [optional] for exporting tracing data to Volcengine CozeLoop and APMPlus platform
     opentelemetry:
       cozeloop:
         endpoint: https://api.coze.cn/v1/loop/opentelemetry/v1/traces
         api_key: 填罗盘的apikey
         service_name: 填要上报trace的罗盘的空间ID
   ```

2. 设置云端上报器 `exporter`，添加 CozeLoopExporter 以记录 Agent 执行过程中的关键路径与中间状态。详细说明及示例代码可参考 [VeADK 观测](https://volcengine.github.io/veadk-python/observation/tracing#%E7%81%AB%E5%B1%B1%E4%BA%91%E8%A7%82%E6%B5%8B)。

### 步骤二：获取访问域名和 API Key \{#ab754735\}
如果你的火山智能体部署到了 AgentKit，你可以直接跳到步骤三。
如果你的火山智能体部署到了函数服务，你需要在函数服务的 **我的应用** 列表中找到已部署的火山智能体的访问域名与 API Key。如下图所示:

* 访问域名：访问地址 `？`前面的部分。
* API Key：访问地址中请求参数 Token 的值。
   ![Image=2608x196](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/35e2c2a0001e4087b82a1f9107d9fc3f~tplv-goo7wpa0wc-image.image)

### 步骤三：注册火山智能体 \{#e8ca8988\}
目前，注册部署到函数服务的火山智能体需要在扣子罗盘操作；注册部署到 AgentKit 的火山智能体需要在 AgentKit 操作。
#### 注册部署到函数服务的火山智能体 \{#a5884bfa\}

1. 登录扣子罗盘。
2. 在左侧导航栏中选择 **应用 > 应用注册**，并在页面右上角单击 **注册新应用**。
   ![Image=3808x1762](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/ebff16bff04340818007374039bf8681~tplv-goo7wpa0wc-image.image)
3. 把火山部署平台设置为 **VeFaaS**，然后把你在步骤二获取的访问域名和 API Key 分别填入 **火山智能体访问域名** 和 **火山智能体 API Key**。
   ![Image=3350x1302](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3c4520cce7da4abc97222d7773a60afd~tplv-goo7wpa0wc-image.image)
4. 单击获取智能体元信息，测试 Endpoint 是否能正常访问，并获取到对应智能体元信息（ID、名称与描述）。
   ![Image=659x498](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3a85db4054c84766b14129f9f32afa32~tplv-goo7wpa0wc-image.image)
5. 确认无误后，单击**确认注册**。
   :::tip 说明
   若注册的火山智能体的 Trace 未上报到当前工作空间，不影响注册，且注册后可开展评测实验，但在当前空间查询不到此智能体的 Trace 数据。
   :::

#### 注册部署到 AgentKit 的火山智能体 \{#ba8e6bf8\}
参考 [接入Cozeloop](https://www.volcengine.com/docs/86681/1848568?lang=zh) 在 AgentKit 中把火山智能体注册到扣子罗盘。你暂时无法在扣子罗盘中注册部署到 AgentKit 的火山智能体。
## 其他操作 \{#30e48d1b\}
### 观测火山智能体 \{#311a7154\}
完成火山智能体的 Trace 数据上报和注册之后，你可以在 **应用详情** 页面的 **观测** 页签查看来源为当前火山智能体的 Trace 数据。 关于 Trace 功能的详细说明可参考 查看 Trace 数据。
![Image=3336x976](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/494f977bb8f84aeaa3dcfeb1a2ec5962~tplv-goo7wpa0wc-image.image)
### 调试火山智能体 \{#b356e035\}
你可以在 **应用详情** 页面的 **调试** 页签调试在扣子罗盘中注册的火山智能体。
![Image=3354x1890](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/838b383fca9342a489df8f1b230d577b~tplv-goo7wpa0wc-image.image)
### 评测火山智能体 \{#78a14b7f\}
在扣子罗盘中注册火山智能体后，你在 **应用详情** 页面的 **评测** 页签查看当前火山智能体的实验列表，也可以单击 **新建实验** 为当前火山智能体创建评测实验。关于评测实验的详细操作步骤可参考评测概述 。
![Image=3356x1903](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/1afbf4cbdddc419b94d2aa81894aea38~tplv-goo7wpa0wc-image.image)
##  \{#a37114ee\}
### 编辑火山智能体 \{#04498615\}
若火山智能体迭代变更后，如果 API key 有变更，可通过修改应用配置来重新设置 API key；如果智能体名称或描述有变更，可刷新火山智能体信息。操作步骤如下：

1. 在左侧导航栏中单击**应用注册**，并在列表中找到要修改的火山智能体。
2. 在操作列单击**编辑**。
3. 在 **编辑应用** 页面单击 **修改配置**。
4. 你可以重新设置 API Key，也可以单击 **获取智能体原信息** 来刷新火山智能体信息。修改完成后，单击**确认**。

![Image=2594x1197](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/724a875f45ea4cf3b942e3721dedcf85~tplv-goo7wpa0wc-image.image)
