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
sourceRel: "docs/coze-cli-build-ai-app-with-database.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/coze-cli-build-ai-app-with-database.md"
sourceSha256: "88478b5266ec4aa51eb82ed9705e7747d6c0fff376c6368d21f0d7c161fecc8a"
pageSha256: "88478b5266ec4aa51eb82ed9705e7747d6c0fff376c6368d21f0d7c161fecc8a"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

很多 AI 应用不只需要生成内容，还需要记住用户提交的信息、保存 AI 的处理结果，并支持后续查询和更新。Coze CLI 可以创建和管理云数据库，让编程 AI 在开发应用的同时完成表结构设计、数据读写、类型生成、预览调试和生产部署。想进一步了解 Coze CLI  定位、典型场景和完整能力，可以阅读 [Coze CLI 介绍](https://docs.coze.cn/developer_guides_coze_cli)。

本教程将创建一个客户反馈管理 Web 应用。用户提交反馈后，AI 会生成摘要和分类，管理员可以查看反馈列表、按状态筛选，并更新处理进度。

## 通过本教程，你将学会 \{#hIUywxGvv\}

* 明确应用需要保存哪些信息。
* 创建数据库，并把这些信息整理到数据表中。
* 添加几条测试内容，确认数据可以正常保存和查找。
* 把数据库连接到应用，让页面可以保存、读取和修改数据。
* 在预览环境中测试反馈提交、AI 处理和状态更新。
* 上线应用，并确认正式环境可以正常使用数据库。

## 开始前确认 \{#hZ5r9Alsy\}

* 打开 [coze.cn](https://www.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=) 并登录扣子。扣子已经预安装 Coze CLI，可以直接在对话中描述需求，不需要单独安装命令行工具。
* 本教程会使用模拟的客户反馈进行测试。不要把真实姓名、联系方式、业务数据、访问令牌或其他敏感信息直接写进提示词、测试记录和代码仓库。
* 扣子数据库的测试数据和线上数据相互隔离。预览和调试阶段产生的记录用于测试；应用部署后产生的记录属于线上数据，不会自动继承预览环境中的测试记录。上线后需要在正式环境重新验证数据读写。

## 步骤一：创建应用 \{#hMQRgJDqp\}

先创建客户反馈管理应用的页面和基本交互，确认产品形态符合预期后，再添加数据库和 AI 处理能力。

1. **描述应用需求。**
   在扣子对话中输入：
   ```Plain Text
   使用 Coze CLI 创建一个客户反馈管理 Web 应用。应用包含用户反馈提交页和管理员反馈列表页：用户可以填写反馈标题、反馈内容和可选联系方式；管理员可以查看反馈列表、查看详情，并按分类、优先级和处理状态筛选。
   请先完成页面、导航和基本交互，暂时使用模拟数据，做个 demo 出来预览看看。
   ```
   扣子会创建项目并调用编程 AI 开发应用。开发任务可能需要一定时间，请耐心等待。
2. **查看开发进度。**
   如果开发任务仍在进行，可以让扣子检查当前状态：
   ```Plain Text
   检查当前项目的 AI 开发任务状态。如果任务仍在进行，告诉我当前进度；任务完成后总结已经实现的页面和功能。不要重复提交开发需求。
   ```
3. **预览应用。**
   开发完成后，打开最新预览，检查反馈提交页、管理员列表页、页面导航和基础交互是否符合预期。如果页面内容或样式需要调整，直接描述修改要求，并在修改完成后重新获取预览。   

::::cols
@col 33
**描述需求：**

![Image=1582x1313](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/dca708fca1cb4b9796fd125e13df054e~tplv-goo7wpa0wc-topic.webp)

@col 33
**查看开发任务：**

![Image=1604x1726](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c27696aa88724256a05d6b8d21f69640~tplv-goo7wpa0wc-topic.webp)

@col 33
**预览应用：**

![Image=2650x1586](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/fa22187f958545fe9b88bec099e40ec6~tplv-goo7wpa0wc-topic.webp)
::::

## 步骤二：添加数据库功能并验证 \{#hz1FHrDEN\}

页面确认无误后，让编程 AI 在当前项目中创建项目数据库，并完成数据保存、AI 处理和后台管理功能。你不需要单独准备数据库，也不需要提供数据库 ID 或连接凭据。

1. **添加数据库和 AI 处理功能。**
   在扣子对话中输入你的指令：
   
   | **你的指令**  | **对话过程**  | **效果预览**  |
   | --- | --- | --- |
   | ```Plain Text | ![Image=1550x1514](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/54a3d61f2501437aa1efd7265703bff9~tplv-goo7wpa0wc-topic.webp)  | 在 Agent 提供的编程项目管理页面打开**数据库**页签，查看是否已成功添加数据库。 | \
   | 继续开发当前项目： | | | \
   | 1. 在项目中创建数据库和反馈表，让提交页和管理页使用真实数据。 | | ![Image=3470x1735](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/9b22411d63fb44c1beef7552ef35c306~tplv-goo7wpa0wc-topic.webp)  | \
   | 2. 反馈表需要保存反馈标题、原始内容、可选联系方式、AI 摘要、分类、优先级、处理状态，以及创建和更新时间。 | | | \
   | 3. 用户提交后，先保存原始反馈，再使用项目当前可用的模型生成摘要、分类和优先级，并把结果更新到同一条记录。 | | | \
   | 4. 管理员可以查看详情、按分类、优先级和处理状态筛选，并将状态更新为待处理、处理中或已完成。 | | | \
   | 5. AI 处理失败时保留原始反馈并显示可重试状态。 | | | \
   | ```  | | |
2. **提交测试反馈。**
   在预览页面提交一条模拟反馈。确认页面提示提交成功，AI 摘要、分类和优先级已经生成；刷新页面后，记录仍然存在。
   注意开发和测试时只使用虚构内容，不要把真实姓名、联系方式、业务数据、访问令牌或其他敏感信息写入提示词和测试记录。
3. **验证数据查询和状态更新。**
   打开管理员页面，检查：
   * 检查新记录是否出现在列表中，并依次测试分类、优先级和处理状态筛选。
   * 将测试反馈从待处理更新为处理中，再更新为已完成。
   * 刷新页面后，确认状态仍然正确且没有影响其他记录。

如果数据提交和查询没有问题，表示这个 Web 应用已成功集成了数据库能力。

| **提交反馈**  | **查看数据表**  |
| --- | --- |
| ![Image=2168x1606](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/b2bffa455ab9405f9816cf687e7abf05~tplv-goo7wpa0wc-topic.webp)  | ![Image=2588x1319](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/6982cb9e28fb4d2a837e34105dea998e~tplv-goo7wpa0wc-topic.webp)  |

## 步骤三：部署并验证生产环境 \{#hNtP1qDDT\}

预览环境验证通过后，将最新版本和反馈表一起部署到生产环境，并重新走一遍核心流程。预览环境的测试数据与线上数据相互隔离，不会自动带到生产环境。

1. **部署应用并同步反馈表。**
   在扣子对话中输入：
   ```Plain Text
   部署当前项目的最新版本，并同步反馈表。等待部署完成后，把部署状态和线上地址发给我。
   ```
   对话过程：
   ![Image=382x293](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c7fc7fd736544b9e8e11ec810d47db89~tplv-goo7wpa0wc-topic.webp)
2. **验证生产环境。**
   打开线上地址，重新提交一条模拟反馈，检查 AI 摘要、分类和优先级是否正常生成，反馈是否出现在管理员列表中，以及筛选和状态更新是否有效。不要使用预览环境的测试结果代替生产环境验证。
3. **清理生产测试记录。**
   确认生产功能正常后，如果需要删除测试记录，应先按唯一标识查询目标记录，确认只影响这一条数据，再执行删除。不要使用没有筛选条件的删除操作。
   
   | **测试线上反馈**  | **查看反馈记录**  | **清理测试记录**  |
   | --- | --- | --- |
   | ![Image=2160x1559](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/bd0ec91e390342dc9b956672ec89f838~tplv-goo7wpa0wc-topic.webp)  | ![Image=280x234](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/9c57d3746b30482392825a29ebe72fa3~tplv-goo7wpa0wc-topic.webp)  | 你的指令：`帮我把这个数据库里所有线上数据都删掉吧` | \
   | | | | \
   | | | 对话过程： | \
   | | | | \
   | | | ![Image=150x117](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/ce279c73212045a1a69e3782fddec006~tplv-goo7wpa0wc-topic.webp)  |   

至此，你已经完成了一个带数据库的 AI 应用从创建、开发和预览验证到部署上线的完整流程。后续可以继续通过自然语言完善数据表和业务功能，并分别在预览环境与生产环境中验证每次修改，持续迭代应用。
