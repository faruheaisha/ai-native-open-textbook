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
sourceRel: "docs/cozeloop_evaluate_coze_agent.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozeloop_evaluate_coze_agent.md"
sourceSha256: "bab0dea9f0824e5937b75f8c5975a0b12037bee96697701899650ed87d46608c"
pageSha256: "bab0dea9f0824e5937b75f8c5975a0b12037bee96697701899650ed87d46608c"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

本文档介绍在扣子罗盘中评测扣子智能体的操作步骤。
## 场景描述 \{#0921bb0c\}
当你在扣子编程搭建智能体（如翻译助手、客服机器人、代码生成工具等）后，需要系统性评估其功能表现（如翻译准确性、回答相关性、代码正确性等）以验证是否符合预期时，可通过扣子罗盘提供的评测功能，对智能体进行标准化、量化的质量检测。
例如，你开发了一个翻译助手智能体，希望验证其翻译结果的准确性，本文将演示如何通过评测集、LLM 评估器和实验来对该智能体进行评测。
## 准备工作 \{#eaa69be1\}

* 已在扣子编程搭建翻译助手智能体，详细步骤参考搭建一个低代码智能体。
* 已准备评测数据，本文将使用以下评测数据作为示例：
[翻译助手评测 .csv](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/b6cb430a2c924a0caac2d3b2c45b4e73~tplv-goo7wpa0wc-image.image)

## 操作步骤 \{#59a2aaae\}
### 步骤一：创建评测集 \{#164c4f06\}

1. 访问[扣子罗盘](https://loop.coze.cn)，在左侧导航栏顶部，选择目标工作空间。
2. 在左侧导航栏，选择**评测 > 评测集**，单击右上角的 **+ 新建评测集**。
   ![Image=585x217](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/286983f23f644939ac27242a92855610~tplv-goo7wpa0wc-image.image)
3. 在**新建评测**集页面，输入评测集的名称，配置评测集的输入数据列和输出列信息，然后单击**创建**。
   ![Image=500x379](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/8675018d48694a19a1615f127e0e05e6~tplv-goo7wpa0wc-image.image)
4. 添加测试数据。
   扣子罗盘支持**本地上传**和**手动导入**两种方式来添加测试数据。本文以本地上传方式为例，将已准备的评测数据批量上传至评测集。
   在评测集详情页面，选择**添加数据 > 本地导入**，导入准备工作中准备好的测试数据，并配置列映射关系， 单击**导入**。
   
   ::::cols
   @col 50
   ![Image=500x171](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/0666cf9352bb48f197f7061268946ced~tplv-goo7wpa0wc-image.image)
   
   
   
   @col 50
   ![Image=400x403](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/dc28c8b8f6964bf8ab9db2daa50d6505~tplv-goo7wpa0wc-image.image)
   
   ::::

5. 单击**提交新版本**。
   ![Image=600x260](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/9ec4d329454c4dd192d9ac5a4aba0918~tplv-goo7wpa0wc-image.image)

### 步骤二：创建评估器 \{#c388bddd\}

1. 在左侧导航栏选择**评测 > 评估器**，单击 **+ 新建评估器** > **LLM评估器**。
   ![Image=1629x446](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/f22ed655328d4dbe8b4ba4e55b6164a5~tplv-goo7wpa0wc-image.image)
2. 在**评估器模板**页面，扣子罗盘提供了多个预置的模板，如果没有合适的模板，你也可以单击**自定义创建LLM评估器**创建评估器。
   在本场景中，你需要评估翻译助手智能体的翻译准确性，因此选择选择**内容质量** > **正确性**模板，单击**应用**。 
   ![Image=500x358](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/faa9a9ba0b704c5ba9db77e62aa4c637~tplv-goo7wpa0wc-image.image)
3. 修改评估器的名称和模型，单击**调试**，测试一下评估器效果。
   :::tip 说明
   在调试评估器时，会产生 Token 消耗。
   :::
   在弹出的**预览与调试**页面，输入一组测试数据，然后单击**运行**查看评估效果是否符合预期。
   ![Image=658x290](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/cf7da8cda9064204a688456621af4ffe~tplv-goo7wpa0wc-image.image)
4. 单击**创建**，单击**提交新版本**。完成评估器创建并提交评估器版本。
   :::tip 说明
   在创建评测实验时，只能使用已提交的评估器。
   :::

### 步骤三：发起实验 \{#0e543ebd\}
在准备好评测集和评估器后，就可以发起实验来测试翻译助手智能体的翻译准确性了。

1. 在左侧导航栏，选择**评测 > 实验**，然后单击 **+ 新建实验**。
2. 输入一个实验名称，然后单击**下一步: 评测集**。
3. 选择已创建的评测集，并选择要使用的评测集版本，然后单击**下一步：评测对象**。
   ![Image=591x334](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/08f9038a82134528baa950cd95140f15~tplv-goo7wpa0wc-image.image)
4. 评测对象选择 **Coze 智能体**，然后选择要评测的智能体和版本，再通过字段映射的方式选择评测集中的哪列数据作为智能体的输入传递给智能体，最后单击**下一步：评估器**。
   ![Image=600x446](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c224316f902e40ceae1099b8a19ff553~tplv-goo7wpa0wc-image.image)
5. 单击**添加评估器**，选择已创建的评估器和版本，然后将评测集的字段、评测对象的实际输出与评估器的参数关联，确保评估器准确获取数据并执行评估，最后单击**确认实验配置**。
   ![Image=600x447](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/f6af76b92d4b4cc7a5962bd73086d879~tplv-goo7wpa0wc-image.image)
6. 检查实验配置，确认无误后，单击**发起实验**。
   发起实验后，你可以刷新实验页面，查看评估进度。
   ![Image=2374x1265](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3255c3dfe9414c1c88aa1a471d792e98~tplv-goo7wpa0wc-image.image)

### 步骤四：分析实验结果 \{#600b175c\}
在评估器执行完所有评估任务后，你可以在实验页面查看实验报告。通过实验报告来判断评估对象是否符合预期。
#### 查看评测结果 \{#d37facef\}
在**数据明细**页面，你可以查看评估器对每个测试数据的执行结果的评分，以及评分的具体原因。
如果某个测试数据的评估器自动打分不准确，你可以将鼠标悬浮至评分上，然后点击出现的**人工校准**图标。在弹出的页面中输入修正的分数和原因。
![Image=2410x1263](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/6f37bd3ca12a43b7bfd5ce76ef7cb2c0~tplv-goo7wpa0wc-image.image)
#### 查看实验报告 \{#6ea609a8\}
在**实验详情**页面，单击**指标统计**页签查看实验数据报告。
![Image=2374x1051](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/40955c4815cd441ab86d529362cc4f6c~tplv-goo7wpa0wc-image.image)
