---
title: "3.8 - Coze 案例：商品评论分析"
sourceId: "08-agents/ai-agents-from-zero"
sourceTitle: "从零构建 AI Agent（didilili）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/didilili/ai-agents-from-zero"
entryUrl: "https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/3.8-商品评论分析-商品评论分析-Coze.md"
sourceRel: "案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/3.8-商品评论分析-商品评论分析-Coze.md"
rawUrl: "/raw/08-agents/ai-agents-from-zero/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/3.8-商品评论分析-商品评论分析-Coze.md"
sourceSha256: "f8c91d94a6ada844cd249b2bfba7d4a84f6b8603e63d2fa71a5256df0d5f68fe"
pageSha256: "a3f828aa1cdc7d8c8fd95feb00abc8b46d9fd57cd281497e658ccb1b3f7746f5"
contentMode: "local-full"
zh: ""
---

# 3.8 - Coze 案例：商品评论分析

---

## 本案例概要

### 使用的插件

| 插件名称          | 接口 / 能力     | 作用                                                                                                |
| ----------------- | --------------- | --------------------------------------------------------------------------------------------------- |
| **链接读取/Read** | 按 URL 读取文档 | 根据 Agent 传入的 CSV 文件在线链接读取内容，返回 `data`（csv 原始文本），供后续文本处理与分析使用。 |

### 技术要点

- **智能体 + 工作流协同**：由智能体「商品评论分析」接收用户上传的 CSV；Agent 将文件转为在线链接后调用工作流 `comment_analysis`，工作流负责解析、分析、格式化，结果返回智能体后按人设中的 Markdown 模板输出给用户。
- **开始节点与入参**：工作流接收 `CONVERSATION_NAME`、`BOT_USER_INPUT`；Agent 调用时把用户上传的 CSV 转为文件链接写入 `BOT_USER_INPUT`，变量名需为 `BOT_USER_INPUT` 以便正确赋值。
- **代码节点**：判断 `BOT_USER_INPUT` 中是否包含 `.csv`，输出 `key0`（true/false），用于选择器分支，非 CSV 时直接提示「请正确上传.csv 格式文件」。
- **文本处理节点**：CSV 经 read 得到的内容分为「汇总信息」和「明细表格」两部分，以 `rating|` 为分隔符拆成两段；第一段供后续大模型整理为元数据字典，第二段供分析差评。
- **大模型节点（大模型\_1）**：通过系统提示词设定角色（淘宝产品分析师）、分析原则（客观、系统、解决导向）、分析维度（产品本身/店铺服务/物流/价格）及输出格式（产品分析 + 选品改进建议），对差评内容做四维度分析并输出短期/中期/长期建议，结果以中文输出。
- **大模型节点（大模型\_2）**：将文本处理得到的第一段汇总信息（商品标题、ASIN、链接、星级统计等）整理成 Python 字典结构，便于结束节点与分析结果合并输出。
- **直接回复与结束**：流程中先输出「请稍等 正在智能分析评论 ing」，分析完成后输出「进度 100% 分析已完成，欢迎查看以下报告详情！」及完整报告（元数据 + 分析建议）；非 CSV 分支通过「输出\_2」回复上传格式提示。

### 工作流程概览

```
开始(CONVERSATION_NAME, BOT_USER_INPUT：csv 文件链接)
    ↓
代码：判断 URL 是否包含 .csv → key0
    ↓
选择器(key0)
    ├─ true →
    │      read(链接读取) → 获取 csv 全文 data
    │      ↓
    │      文本处理：按 "rating|" 拆分为 [汇总信息, 明细内容]
    │      ↓
    │      输出(6-1)：「请稍等~正在智能分析评论ing」
    │      ↓
    │      大模型_1(明细内容) → 四维度分析 + 选品改进建议
    │      大模型_2(汇总信息) → 整理为元数据字典(product_title、asin、星级等)
    │      ↓
    │      输出_1(7)：「进度100%~分析已完成，欢迎查看以下报告详情！」
    │      ↓
    │      结束：返回报告(元数据 + 分析建议)
    │
    └─ false → 输出_2：「请正确上传.csv格式文件」 → 结束
```

---

## 1、整体架构

本项目由智能体**商品评论分析**和工作流**comment_analysis**构成。

智能体可以根据用户输入自主选择何时调用工作流。

---

## 2、智能体配置

![商品评论分析案例操作截图](/mirror/43/43fb4df5b7681d864727c70c8144deae7b9e4eb3.png)

### 2.1 人设与回复逻辑

```
# 调用{comment_analysis}处理用户输入的csv文件
# 输出格式
以markdown格式输出
<参考格式>
# 一、 图片
# 二、 商品跳转链接
# 三、 负面评论总数量
- 3星评论数量
- 2星评论数量
- 1星评论数量
# 四、产品分析（analysis）
## 4.1 产品本身
1. {具体的产品缺点1}
2. {具体的产品缺点2}
....
## 4.2 店铺服务
1.{具体的店铺服务缺点1}
2.{具体的店铺服务缺点2}
....
## 4.3 物流服务
1.{具体的物流服务缺点1}
2.{具体的物流服务缺点2}
....
## 4.4 价格
1.{具体的价格缺点1}
2.{具体的价格缺点2}

# 五、选品改进建议（suggestion）
1. 短期改进措施
2. 中期优化方案
3. 长期发展建议
</参考格式>
```

或

```
# 角色
你是一个商品评论分析师，会根据用户传入的商品评论分析的csv文件，进行分析。
调用{comment_analysis}处理用户输入的csv文件

# 约束
用户需要上传csv格式的文件。否则不能进行提取、分析

# 输出格式
以markdown格式输出
<参考格式>
# 一、 图片
# 二、 商品跳转链接
# 三、 负面评论总数量
- 3星评论数量
- 2星评论数量
- 1星评论数量
# 四、产品分析（analysis）
## 4.1 产品本身
1. {具体的产品缺点1}
2. {具体的产品缺点2}
....
## 4.2 店铺服务
1.{具体的店铺服务缺点1}
2.{具体的店铺服务缺点2}
....
## 4.3 物流服务
1.{具体的物流服务缺点1}
2.{具体的物流服务缺点2}
....
## 4.4 价格
1.{具体的价格缺点1}
2.{具体的价格缺点2}

# 五、选品改进建议（suggestion）
1. 短期改进措施
2. 中期优化方案
3. 长期发展建议
</参考格式>
```

### 2.2 模型配置

![商品评论分析案例操作截图](/mirror/b3/b3a73f77f5f1e01dc1a7bc6570de51d545d210f0.png)

可以自主选择模型和配置。

### 2.3 工作流配置

![商品评论分析案例操作截图](/mirror/67/67bd3897d5696175ffca733f762fce11088e685b.png)

**注意**：此处的工作流需要提前创建并发布，具体流程见下文。

![商品评论分析案例操作截图](/mirror/98/987ab74b82927133056328cfef1d809146395ef2.png)

![商品评论分析案例操作截图](/mirror/91/91baa33416014b25ecf743b7eb103beb498c519b.png)

### 2.4 开场白

![商品评论分析案例操作截图](/mirror/f0/f0c5ff3fbebb747aa44bab1aebd0f969b49d9947.png)

内容如下：

```
嗨，你好！✨✨我是亚马逊/淘宝商品评论分析大师，可以为你优化商品。欢迎上传采集好的商品评论数据文件，我将对该商品进行详细分析，给您出具一份商品负面评论分析报告
```

### 2.5 背景图片

![商品评论分析案例操作截图](/mirror/17/1755080930a0480ac0dbb6a074d301207c52dc02.png)

![商品评论分析案例操作截图](/mirror/d7/d787ae2c980d23218c24f021fefd49432b0d366f.png)

![商品评论分析案例操作截图](/mirror/65/65169ffb80ecea5fb92e22bd1a7ab140a66c7876.png)

![商品评论分析案例操作截图](/mirror/77/77b02e19d49574572dd7a090707e750a2f9f81eb.png)

### 2.6 预览与调试

![商品评论分析案例操作截图](/mirror/11/1131b012304556769b468d3571dab4d2c878a059.png)

右侧可以看到用户预览页面，页面中间展示了我们预先设置的开场白。

---

## 3、工作流配置

### 3.1 创建工作流

![商品评论分析案例操作截图](/mirror/7c/7cae2e794269d6a3e564a5bb39918685b5e5fd21.png)

![商品评论分析案例操作截图](/mirror/15/15a3aaa5a27d3bbd431f55fbbcf342901eb1ff17.png)

![商品评论分析案例操作截图](/mirror/3d/3d14e7ac59f140affdd59331a2b153f4f4890f31.png)

![商品评论分析案例操作截图](/mirror/8d/8d2190dbcf9f196bba10026c989833edcdee70a6.png)

### 3.2 配置工作流

整体工作流概览图，高清图见根目录 `images/3.8` 下 `comment_analysis.png` 文件

![商品评论分析案例操作截图](/mirror/ee/ee47f5e12cd1bea3cfc7d15c39ea5022d4bbd7c3.png)

## 本篇目录

- [3.2.1 开始节点](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/01-3.2.1_开始节点.md)
- [3.2.2 代码](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/02-3.2.2_代码.md)
- [3.2.3 选择器](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/03-3.2.3_选择器.md)
- [3.2.4 read 节点](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/04-3.2.4_read_节点.md)
- [3.2.5 文本处理](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/05-3.2.5_文本处理.md)
- [3.2.6 大模型\1](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/06-3.2.6_大模型_1.md)
- [3.2.7 输出](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/07-3.2.7_输出.md)
- [3.2.8 大模型\2](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/08-3.2.8_大模型_2.md)
- [3.2.9 输出\1](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/09-3.2.9_输出_1.md)
- [3.2.10 输出\2](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/10-3.2.10_输出_2.md)
- [3.2.11 结束](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/11-3.2.11_结束.md)
- [3.4.1 运行准备](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/12-3.4.1_运行准备.md)
- [3.4.2 输入](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/13-3.4.2_输入.md)
- [3.4.3 运行时](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/14-3.4.3_运行时.md)
- [3.4.4 输出](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/15-3.4.4_输出.md)
- [3.4.5 调试](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/16-3.4.5_调试.md)
- [3.6.1 输入](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/17-3.6.1_输入.md)
- [3.6.2 运行时](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/18-3.6.2_运行时.md)
- [3.6.3 输出](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/19-3.6.3_输出.md)
- [3.6.4 调试](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.8-Coze案例：商品评论分析/20-3.6.4_调试.md)
