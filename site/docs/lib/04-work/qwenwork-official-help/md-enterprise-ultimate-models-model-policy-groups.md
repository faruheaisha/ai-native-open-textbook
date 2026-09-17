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
sourceRel: "md/enterprise-ultimate-models-model-policy-groups.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-models-model-policy-groups.md"
sourceSha256: "a6fc62d11b56231aa35cf5c65f1f3ecf10b154709e3c3cb160d1f13092a23c99"
pageSha256: "a6fc62d11b56231aa35cf5c65f1f3ecf10b154709e3c3cb160d1f13092a23c99"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

模型策略组按用户、部门或用户组控制可用主模型。白名单允许使用所选模型，黑名单禁止使用所选模型；同一成员同时命中时，黑名单优先。  
**警告**

**BYOK 适用说明：** BYOK（Bring Your Own Key，自带模型密钥）能力仅对已开放该能力的部分用户可用。BYOK 模型不适用千问办公-旗舰版的用量统计与限额管理；相关统计数据和限额规则不包含 BYOK 模型。

## 新建开放或限制策略
1. 进入 AI 管理 → 模型管理 → 模型策略组，点击【新增策略组】。
2. 填写策略组名称，选择「白名单」或「黑名单」。
3. 设置生效范围，选择全部用户或指定用户、部门、用户组，检查已选范围。
4. 选择主模型。选择「全部模型」会把以后新增的主模型也纳入当前策略；只希望开放已审核模型时选择具体模型。
5. 检查目标端与影响提示，保存后确认策略启用状态。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-bb0f5092a1e9fe93.png)

*判断结果时同时检查模式、用户范围、模型范围和启用状态。*

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-d029ba75a450802f.png)

*选择目标用户与主模型后，检查目标端和发布影响。*

## 调整默认策略
默认开放策略组始终启用且不能删除。管理员可以调整默认允许的模型集合。新建一条试点白名单前，要一起检查默认策略，避免默认范围仍向其他成员开放同一模型。

## 验证一名成员的可用模型
1. 点击【命中验证】，搜索并选择目标成员。
2. 查看「命中策略组」与「最终规则」，再打开对应策略核对所选模型。
3. 再选择一名不在目标范围中的成员验证，确认没有扩大开放范围。
4. 请测试成员在客户端打开模型选择入口，检查实际可选模型。

停用或删除策略后，成员会按剩余启用策略重新判断。模型本身仍保留在目录中；需要移除模型时到模型目录处理。
