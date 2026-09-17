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
sourceRel: "docs/coze_pro_arrears_and_renewals.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/coze_pro_arrears_and_renewals.md"
sourceSha256: "edac1431c87d47c2b8f1aebdd346ad88b6dd16f997df5d8a8e308026950673e2"
pageSha256: "edac1431c87d47c2b8f1aebdd346ad88b6dd16f997df5d8a8e308026950673e2"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

本文档介绍扣子企业版（企业标准版、企业旗舰版）欠费的相关流程操作。 
## 欠费 \{#546259a0\}
### 欠费说明 \{#f154d4fe\}
购买企业版后，当你账户内的积分不足时，系统将按照 1000:1 （积分:现金）比例自动从你的现金账户中扣除对应的金额。另外，在扣子平台使用火山方舟、火山知识库等其他火山产品或付费技能、付费模板、三方付费插件时会涉及相关费用，这些费用不支持通过扣子积分抵扣，将通过账户余额或对应产品的资源包抵扣。
### 欠费状态 \{#453c67c4\}

* **欠费触发**：当您的现金账户余额不足以支付按量计费账单时，企业版账号将转为欠费状态，您需要及时补缴欠款。
* **出账延迟与欠费**：企业版采用**按小时后付费**的结算方式，因此出账存在**小时级延迟**。这意味着您在使用服务时产生的费用并不会立即扣除，在系统正式结算扣款前，您仍可以继续使用并产生新费用。只有当系统结算并尝试扣款时，若您的账户余额不足，账号才会进入欠费状态。 
   * **例如**：您在 16:00～17:00 期间产生的费用，可能在 17:30 才进行扣款。如果届时您的账户余额不足，账号便会进入欠费状态。
   ![Image=604x126](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/cbc675e603c642f3b6d0910b291ab956~tplv-goo7wpa0wc-image.image)

### 欠费影响 \{#48175e99\}

* 账号欠费后存在关停风险，为了避免影响业务运行、对服务造成影响，请及时充值、结清欠费账单。具体操作，请参见[充值操作指引](https://www.volcengine.com/docs/6269/100434)。 
* 账号欠费后企业版不可用。为避免影响正常使用，请及时补齐欠款。 

### 预防措施 \{#e248292a\}
建议在[费用中心](https://console.volcengine.com/finance/account-overview)设置**余额阈值提醒**，实时关注账户余额情况。你也可以在[费用中心](https://console.volcengine.com/finance/account-overview)查看账号余额，详情请参考[如何查看可用余额](https://www.volcengine.com/docs/6269/100429#%E6%9D%BF%E5%9D%97%E8%AF%B4%E6%98%8E)。 
## 关停 \{#270b3ae2\}
企业版欠费 2 小时或到期 12 小时后，扣子账号会转为关停状态。此状态下只能查看资源，不能编辑或使用资源。 
关停期间，扣子账号中的智能体、知识库等资源将会持续保留，但系统将自动拦截扣子所有可能产生资源消耗的请求，包括但不限于智能体调用、API 请求等，你将无法使用任何与扣子相关的服务，直至所有欠款补缴完毕。
:::notice 注意
* 关停后，超额的知识库空间、记忆库仍会继续产生费用，直到资源被删除。
* 当账号**欠费超过 15 天**或企业版**到期、退订超过15天**，该企业版账号下所有记忆库数据将被自动删除，不支持找回。
:::
## 常见问题 \{#9c2b92fb\}
为什么欠费关停后，仍收到了账单？
