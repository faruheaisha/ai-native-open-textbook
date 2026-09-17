---
title: "案例正文模板 (/docs/community/case-template)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/community/case-template.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/community/case-template.md"
sourceSha256: "3a6d6a4d965bf6e8fb51548c9e2626c052ad693e79bdbbfb56daf5db43757727"
pageSha256: "3a6d6a4d965bf6e8fb51548c9e2626c052ad693e79bdbbfb56daf5db43757727"
contentMode: "local-full"
zh: ""
---

# 案例正文模板 (/docs/community/case-template)

```markdown
---
title: 案例标题
description: 用一句话说明解决了什么问题。
icon: BookOpenCheck
case:
  kind: community
  status: submitted
  disposition: active
  sourceType: repository
  sourceUrl: 原始案例永久链接
  sourceAuthor: 原页面署名
  sourceLicense: 许可标识或 permission-required
  sourceProduct: 截图和录屏实际显示的产品名称
  productFit: confirmed
  productEvidence: 可定位的界面、官方资料或独立复现证据
  sourceCommit: 40 位固定提交，仅 repository 来源填写
  publishedAt: "YYYY-MM-DD"
  reviewedAt: "YYYY-MM-DD"
  reviewedBy:
    - 本站审核人或审核团队
  maintainers:
    - 后续维护人或维护团队
  category: 数据分析
  difficulty: intermediate
  riskLevel: medium
  skills:
    - 实际使用的 Skill 或连接器
  tags:
    - 可检索标签
---

## 场景与目标

谁在什么工作中遇到了什么问题，原来的处理方式有什么不足。

## 来源与处理说明

说明原作者、原始链接、来源类型、许可、固定版本、来源产品、产品匹配证据、本站审核人、维护人、是否独立复现，以及是否使用了原图、代码或样例文件。

逐张检查截图和录屏中的 Logo、窗口标题、侧栏、设置入口和下载域名。页面标题写“千问办公”不等于产品归属已确认；如果画面或执行证据来自其他产品，填写 `productFit: mismatch` 并将 `disposition` 设为 `withdrawn`。

`submitted` 状态不得填写 `verifiedAt` 或 `maintainedAt`。只有本站按冻结输入实际复现通过后才能改为 `verified` 并补复现日期；完成当前产品版本检查并确认维护责任后，才能改为 `maintained` 并补维护日期。

## 前置条件

- 千问办公入口与适用账号：
- 所需账号或企业权限：
- 输入文件和典型规模：
- 需要人工确认的角色：

## 输入契约

列出字段、格式、允许缺失内容和禁止输入的信息。

## 执行流程

1. 第一步；
2. 第二步；
3. 第三步。

## 提示词或任务指令

放置经过脱敏、可以复用的指令，并解释关键约束。

## 交付物

说明生成了什么、放在哪里、由谁继续使用。

## 验收标准

- 怎样证明已经完成；
- 哪些事实、数字、文件或页面需要人工复核；
- 哪些情况必须判定失败。

## 失败处理

记录至少一种失败表现、识别信号、停止条件和恢复方法。

## 安全与限制

说明数据、权限、文件写入、外部提交、专业责任和版权风险。

## 验证记录

- 验证类型：未验证、`partial-method-verification` 或同输入独立复现；
- 冻结输入版本：真实输入的固定版本，或结构等价合成小样的版本；
- 执行日期、环境与命令：
- 已通过的范围与预期/实际结果：
- 失败项和未覆盖范围：
- 状态晋级决定与阻断原因：

## 可以怎样复用

说明哪些内容能沉淀为提示词、Skill 或定时任务。

## 维护与变更记录

- 当前维护人：
- 最近核对的入口或版本：
- 已知限制：
- 本次变更：
```

  截图只能说明界面曾出现某个结果。案例还需要提供输入条件、可检查标准和失败路径，才能被其他读者可靠复现。

## 状态晋级片段 [#状态晋级片段]

合成小样或其他部分方法验证通过时，保留 `status: submitted`，不要填写 `verifiedAt`。把验证版本、结果、限制和晋级阻断原因写入正文验证记录。

独立复现通过时，把状态改为：

```yaml
status: verified
verifiedAt: "YYYY-MM-DD"
```

进入持续维护的正式教程时，再改为：

```yaml
status: maintained
verifiedAt: "YYYY-MM-DD"
maintainedAt: "YYYY-MM-DD"
```

重复稿被更完整案例替代时保留旧页面，并使用：

```yaml
disposition: superseded
supersededBy: workflows/cases/example-successor
```

没有安全替代页且必须撤回时使用 `withdrawn`，并填写不含敏感细节的公开原因。不要删除历史 URL，也不要把撤回稿继续留在案例中心推荐入口。
