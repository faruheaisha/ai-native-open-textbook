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
sourceRel: "md/skills.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/skills.md"
sourceSha256: "4a9df6ce20e64d3f6ae87ba2adb9c4e603bb02cebaafbbbe2a06f72b4642801d"
pageSha256: "4a9df6ce20e64d3f6ae87ba2adb9c4e603bb02cebaafbbbe2a06f72b4642801d"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

## 什么是 Skill？
在日常工作中，我们经常反复处理相似任务：写周报、整理文档、生成信息图等。若每次都要重新向 AI 说明需求、偏好和流程，不仅耗时，也容易遗漏关键细节。

Skills（技能）正是为解决这个问题而设计的。Skill 是一份提前写好的工作指南，告诉 QwenWork 在面对某一类任务时：遵循什么步骤、输出什么格式、注意哪些细节。只需定义一次，QwenWork 便能在后续每次对话中自动识别并应用，像训练有素的助手一样稳定、一致地完成工作。

从技术角度看，每个 Skill 本质上是一个包含 `SKILL.md` 文件的文件夹，存放于 `~/.qwenworkcn/skills/` 目录下。`SKILL.md`用自然语言描述技能的名称、触发条件和执行步骤------无需写代码，只需将工作经验和流程用文字表达清楚即可。

## Skill 能带来什么？
**告别重复解释**

每次开启新对话，都需要花时间描述需求和偏好。有了 Skill，这些信息被一次性固化下来------后续使用时只需一句话触发，甚至可以自动识别应用，省去大量重复沟通的时间。

**保证输出一致性**

当团队对某类产出有明确的格式、风格要求时（比如周报必须包含哪些板块），Skill 能确保每一次输出都符合既定标准，不会因为沟通偏差或执行者不同而出现质量波动。

**个人经验变成可复用资产**

工作中积累的最佳实践、处理技巧和判断标准，都可以通过 Skill 沉淀下来。它不仅服务于创建者本身，还可以分享给团队成员，让经验在组织内流转复用，而不是停留在个人脑海中。

**让 AI 从「通才」变成「专才」**

QwenWork 本身具备广泛的通用能力，而 Skill 就像给它加装了一个个专业模块------文档处理专家、设计助手、数据分析师等。通过不同的 Skill 组合，QwenWork 可以适配工作中几乎所有的场景。

## 获取 Skill
QwenWork 提供多种获取渠道，从发现到安装一步到位。

### 在对话中搜索安装

直接用自然语言描述需求，QwenWork 通过内置的 find-skill 功能从技能库中检索并推荐最匹配的 Skill，例如：
> 帮我找一个能把网页内容自动转成 Markdown 笔记的 skill_

QwenWork 会列出匹配结果及简介，确认后可以让 QwenWork 帮你一键安装到 `~/.qwenworkcn/skills/` 目录，全程无需离开对话窗口。

### 在 Skill 广场浏览安装

在左侧导航的「**扩展** 」中点击「**技能**」，进入 Skill 广场------QwenWork 内置的技能市场，汇集官方和社区贡献的各类 Skill。按分类浏览或搜索关键词，找到后点击安装即可使用。
![产品界面](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/9213209871/p1096709.png)

### 从开源社区获取

GitHub 等平台上有大量社区共享的 Skill。将仓库链接发给 QwenWork 并告知安装即可，例如：
> 请帮我把 \<技能来源地址\> 下载并放到 \~/.qwenworkcn/skills/ 目录

QwenWork 会自动完成克隆、文件放置和加载，无需手动操作任何命令。

### 手动上传本地文件

已有写好的 Skill 文件时（比如从同事处获取），在左侧导航的「**扩展** 」中点击「**技能** 」，点击**安装技能** ，直接上传 `SKILL.md` 及辅助文件。上传后自动识别并加载，后续在相关场景下即可使用。

## 使用 Skill
Skill 安装完成后，有以下方式在对话中调用。

### 自动触发

直接描述需求，QwenWork 自动判断是否有匹配的 Skill 并启用。例如安装了「简历优化」Skill 后：
> 帮我根据岗位 JD 优化下我的简历

QwenWork 识别并调用相应 Skill。

### / 快捷调用

在对话输入框中输入 `/`，QwenWork 会弹出已安装的 Skill 列表，选择即可调用。

### @ 添加上下文

在对话输入框中输入 `@`，可以添加上下文信息（如文件、文件夹等），帮助 QwenWork 更好地理解你的需求。`@` 用于补充上下文，而非调用 Skill。

### 对话中指定调用

直接在对话中指名使用某个 Skill，例如：
> 使用 kancolle-infographic skill 生成组图

QwenWork 加载指定 Skill 后执行，并将生成结果直接呈现在对话中。  
**说明**

想创建自己的 Skill？请参阅创建 Skill 了解从任务沉淀、对话共创到 SKILL.md 文件格式的完整指南。

## 管理 Skill
![产品界面](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/9213209871/p1096710.png)

**通过文件系统操作**

所有 Skill 保存在 `~/.qwenworkcn/skills/` 目录下，每个 Skill 是一个独立文件夹（包含 `SKILL.md` 及可选辅助文件），可直接在文件系统中增删和编辑。

## 内置技能
QwenWork 预装了一批内置技能，开箱即用：
<table> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <thead> <tr> <td><p><b>技能名</b></p></td> <td><p><b>功能</b></p></td> <td><p><b>触发方式</b></p></td> </tr> </thead> <tbody> <tr> <td><p>create-skill</p></td> <td><p>指导创建千问办公技能，包括技能结构、最佳实践和 <code>SKILL.md</code> 编写</p></td> <td><p>提到创建、编写或设计 Skill，或询问 <code>SKILL.md</code> 时触发</p></td> </tr> <tr> <td><p>docx</p></td> <td><p>创建、阅读、编辑 Word 文档，支持模板填充、排版、修订、批注及图片替换</p></td> <td><p>提到 Word、<code>.docx</code>、Word 报告、合同、信函、会议纪要或 Markdown 转 Word 时触发</p></td> </tr> <tr> <td><p>find-skills</p></td> <td><p>从官方市场、社区及企业技能市场搜索和安装专业技能</p></td> <td><p>处理非简单任务前优先触发；提到查找、安装技能时直接触发</p></td> </tr> <tr> <td><p>pdf</p></td> <td><p>阅读、创建、合并、拆分和旋转 PDF，支持水印、表单、加密、图片提取及 OCR</p></td> <td><p>提到 PDF、<code>.pdf</code>，或要求生成和处理 PDF 时触发</p></td> </tr> <tr> <td><p>plugin-creator</p></td> <td><p>创建、定制或修改千问办公专家套件，包括套件中的技能和命令</p></td> <td><p>提到创建、定制或编辑专家套件、插件时触发</p></td> </tr> <tr> <td><p>pptx</p></td> <td><p>创建、读取和编辑演示文稿，支持模板、版式、备注、批注、合并及拆分</p></td> <td><p>提到 PPT、<code>.pptx</code>、幻灯片、演示文稿、deck 或 slides 时触发</p></td> </tr> <tr> <td><p>qwenwork-guidance</p></td> <td><p>查询和管理千问办公自身能力，包括设置、连接器、技能、套件、任务、定时任务和额度等</p></td> <td><p>询问千问办公设置、功能状态、连接器、技能、套件、任务进度或额度时触发</p></td> </tr> <tr> <td><p>xlsx</p></td> <td><p>创建、读取和编辑电子表格，支持公式、格式、图表、数据清洗及表格格式转换</p></td> <td><p>提到 <code>.xlsx</code>、<code>.xlsm</code>、<code>.csv</code>、<code>.tsv</code> 或要求生成、处理电子表格时触发</p></td> </tr> </tbody> </table>  
**说明**

以上是 QwenWork 当前的内置技能。Skill 广场上还有大量社区贡献的技能等待发现；你也可以直接在对话里说「帮我找一个能做 XX 的 skill」让 QwenWork 替你搜索。

## Skill UI --- 交互式界面
部分进阶 Skill 支持渲染交互式 HTML 组件------表单、图表、配置面板等。这些组件会直接嵌入到对话流中，让你无需离开对话即可完成操作。

例如使用 `frontend-design` 技能时，生成的网页预览会直接展示在对话中，你可以即时查看效果并给出反馈进行修改。
