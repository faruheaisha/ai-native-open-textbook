---
title: "记账 App 流失用户洞察预览"
sourceId: "04-work/awesome-workbuddy"
sourceTitle: "办公 Agent 生态清单（awesome-workbuddy）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/staruhub/awesome-workbuddy"
entryUrl: "https://github.com/staruhub/awesome-workbuddy/blob/e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3/prompts/runs/prompt-009-chatgpt-5-6-sol-20260731/output.md"
sourceRel: "prompts/runs/prompt-009-chatgpt-5-6-sol-20260731/output.md"
rawUrl: "/raw/04-work/awesome-workbuddy/prompts/runs/prompt-009-chatgpt-5-6-sol-20260731/output.md"
sourceSha256: "18d1307cdeb9b612f7986a6857239feb3f6dda2fe3a8e7733e4735532c69414f"
pageSha256: "18d1307cdeb9b612f7986a6857239feb3f6dda2fe3a8e7733e4735532c69414f"
contentMode: "local-full"
zh: ""
---

# 记账 App 流失用户洞察预览

合成样本为12名曾连续记账至少14天、随后30天未打开的用户。访谈“觉得麻烦”被拆成可观察行为，避免把一句客套评价直接当需求。

| 主题 | 人数 | 行为证据 | 代表性原话（合成） | 机会 |
|---|---:|---|---|---|
| 补记成本高 | 7 | 常在三天后批量补 | “不是不想记，是想起来时已经忘了。” | 账单半自动导入 |
| 分类不可信 | 5 | 修改过同类商户分类 | “它老把咖啡算餐饮，我最后懒得改。” | 个人规则记忆 |
| 看不到回报 | 6 | 报表页停留低于10秒 | “记了半个月，也没告诉我该改什么。” | 每周一条行动建议 |
| 隐私顾虑 | 3 | 拒绝授权短信/账单 | “要读那么多权限，我宁愿手填。” | 最小权限模式 |

## 三类画像

1. **碎片补记者：**有意愿、没固定时间；适合“晚间30秒确认”。
2. **结果导向者：**只在预算超支时关心；需要异常提醒而非更多图。
3. **隐私敏感者：**宁愿少自动化；需要清楚说明读取什么、不读取什么。

## 产品机会排序

- P0：导入后只让用户确认异常分类，目标将单笔操作降到5秒内；
- P1：周报只回答“本周哪一项多花、下周怎么改”；
- P1：权限页提供本地处理/不上传的可验证说明；
- 暂缓：增加更多勋章。样本里没有证据显示游戏化能抵消记录成本。

“喜欢简洁界面”等泛化表扬被降权，因为行为日志显示它不影响留存。真实项目需逐段引用原始转写编号，并把“用户说的”与埋点“用户做的”并列验证。
