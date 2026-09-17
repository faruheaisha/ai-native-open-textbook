---
title: "PRODUCTSENSE.md"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/resources/openai-advanced/repo-template/docs/PRODUCT_SENSE.md"
sourceRel: "docs/zh/resources/openai-advanced/repo-template/docs/PRODUCT_SENSE.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/docs/zh/resources/openai-advanced/repo-template/docs/PRODUCT_SENSE.md"
sourceSha256: "b64b2c6a2df71894c6558cc2cf0f57efee924967496cc8a83b976d06d97a771e"
pageSha256: "b64b2c6a2df71894c6558cc2cf0f57efee924967496cc8a83b976d06d97a771e"
contentMode: "local-full"
zh: ""
---

# PRODUCT_SENSE.md

这份文件记录那些代码本身并不能可靠表达出来的产品判断。

## 产品核心

- 主要用户：`[替换]`
- 要完成的任务：`[替换]`
- 最想解决的核心痛点：`[替换]`
- 可接受质量门槛：`[替换]`

## 产品规则

- 优先保证用户可感知的可靠性，而不是一味加功能。
- 行为有歧义时，把它当成 spec 缺口，不要默认允许猜。
- 只要实现改变了用户看见或信任的东西，就更新对应 spec。
- 具体流程写在 product spec 里，跨流程的产品优先级写在这里。

## 禁区模式

- 隐蔽的破坏性操作
- 没有用户反馈的静默失败
- 用户可见状态没有明确真相来源
- 不能用一句话解释清楚的功能
