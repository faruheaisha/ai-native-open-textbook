---
title: "用 WorkBuddy 整理桌面发票：查找、归档与核对"
sourceId: "04-work/agent-guide-office"
sourceTitle: "Agent 办公实战指南（社区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/tangshiyegit/agent-guide"
entryUrl: "https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/README.md"
zh: ""
---

# 用 WorkBuddy 整理桌面发票：查找、归档与核对

刚开始用 WorkBuddy 时，整理桌面文件是一个很合适的练习。

任务不大，结果也容易检查。

发票尤其适合拿来练手。

电子发票、报销截图、邮件附件和微信下载文件经常混在一起，格式有 PDF、JPG、PNG，文件名却未必写着发票。

`image.png` 和一串日期编号都很常见，单看名字很难判断内容。

真正报销时，需要的又是另一套信息。

抬头、税号、金额、开票日期、发票号码、销售方，少一项就得重新打开原文件核对。

文件只有几张时，手动处理并不费事。

数量多起来以后，时间主要花在反复打开、辨认和复制上。

## 先告诉WorkBuddy查找范围

一句「帮我整理电脑里的发票」还不够。

WorkBuddy 不知道应该检查哪些目录，也不知道能否移动文件。

任务写得太宽，扫描到的无关材料会增加，人工检查反而更麻烦。

这次只检查 「下载」目录。

时间限制为最近 30 天，文件格式只包括 PDF、JPG 和 PNG。

范围这样写有两个好处。

WorkBuddy 不必查看整台电脑，候选清单也不会混入很久以前的材料。

以后要扩大范围，可以再增加目录或调整时间，不需要第一次就把所有地方都交出去。

文件名可以作为第一层判断。

名称里含有发票、电子发票或 invoice 的文件，先放进候选清单。

但这一步会漏掉微信图片和被重新命名的附件，所以还要读取文件内容，把能够识别为发票的图片和 PDF 一并列出来。

## 把不能做的动作写进指令

文件任务最容易出问题的地方，往往是权限给得太宽。

这次只需要读取文件并新增台账记录，没有必要移动、改名、覆盖或删除原件。

把这些限制直接写进提示词，比任务完成后再去找文件稳妥得多。

完整指令可以这样写。

```text
请帮我整理电脑里的发票，不要删除、移动、重命名或覆盖原文件。

扫描范围只包括「下载」接收目录，时间范围为最近 30 天，只处理 PDF、JPG 和 PNG 文件。

文件名包含发票、电子发票、invoice，或者文件内容能够识别为发票时，将其列入候选清单。

先返回候选文件清单和总数。确认候选范围后，识别抬头、税号、金额、开票日期、发票号码、销售方和原文件路径。

在当前工作目录新增 invoice-ledger.xlsx，并分别列出疑似重复发票和无法识别字段的人工确认清单。

拿不准的内容保持为空，不要猜测。整个过程中只新增结果文件，不改动任何原文件。
```

![image-20260806114148220](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122739Z-35df111140a263df-b5a572e3.jpg)

执行完成后，新增的内容只有发票台账。桌面和其他目录里的原发票不移动、不改名、不删除。

![image-20260806141316971](https://vtang.oss-cn-hangzhou.aliyuncs.com/images/2026/08/25/20260825T122738Z-e41b278b5ad9eb59-3f26cf1d.jpg)

## 收到结果以后，检查几件事

先看发票数量是否符合预期。

如果数量明显偏少，检查时间范围和扫描目录。

数量异常多，则要看内容识别是否把普通截图算成了发票。

再打开 `invoice-ledger.xlsx`，抽查几张发票的金额、号码和日期，确认字段与原文件一致。

最后查看疑似重复和无法识别清单，把需要人工判断的内容处理完。

这套流程没有替人决定哪些发票应该删除，也没有替人猜出模糊字段。

它处理的是查找、读取和录入，人负责确认例外。

整理合同、简历或会议材料时也可以沿用这个顺序。

先限制目录和格式，再看候选清单，随后提取需要的字段，拿不准的内容单独列出。

只要原文件保护规则仍然写清楚，第一次尝试就不必承担太大的文件风险。

## 相关阅读

- [用 WorkBuddy 批量整理图片](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/getting-started/03-work-buddy-images.html)
- [WorkBuddy 综合文件处理教程](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/office-productivity/05-work-buddy-file-management.html)
- [查看完整 WorkBuddy 教程目录](https://github.com/tangshiyegit/agent-guide/blob/ae8b2262e7a1e5bd0d466037c6ad9f6037b72c33/workbuddy-guide/README.md)
