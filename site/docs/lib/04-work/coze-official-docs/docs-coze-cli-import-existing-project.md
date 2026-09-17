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
sourceRel: "docs/coze-cli-import-existing-project.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/coze-cli-import-existing-project.md"
sourceSha256: "276eb4374e47823f4b81ad60e75cd85d8ca505cab460902dd7c1045a93f9116d"
pageSha256: "276eb4374e47823f4b81ad60e75cd85d8ca505cab460902dd7c1045a93f9116d"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

已经有代码时，不需要使用编程 AI 重新创建项目。Coze CLI 可以把 GitHub 仓库或本地 ZIP 工程导入扣子编程，让编程 AI 在现有代码基础上理解项目、继续开发，并生成可在线预览和部署的版本。想进一步了解 Coze CLI  定位、典型场景和完整能力，可以阅读 [Coze CLI 介绍](https://docs.coze.cn/developer_guides_coze_cli)。

本教程以一个已有的 Web 项目为例，完整演示 GitHub 授权、项目导入、代码理解、需求迭代、仓库绑定检查、预览和部署流程。

## 通过本教程，你将学会 \{#hCRR57U6b\}

* 授权 Git 平台，并从 GitHub 导入已有仓库。
* 将本地 ZIP 工程导入扣子编程。
* 让编程 AI 先理解项目，再在原有代码结构上继续开发。
* 检查项目与远程仓库的绑定和同步状态。
* 预览修改结果，并将新版本部署到线上。

## 开始前确认 \{#hGbGcYPLn\}

打开 [coze.cn](https://www.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=) 并登录扣子。如果是第一次使用 Coze CLI，请先完成 Coze CLI：账号登录与授权。

导入前，建议先确认以下信息：

* 从 GitHub 导入时，准备好仓库完整名称，例如 `owner/repository`，并确认当前账号有权访问该仓库。
* 从本地导入时，将项目整理为 ZIP 文件。当前版本支持最大 500MB 的本地 ZIP。
* 检查工程中是否包含 API Key、访问令牌、数据库密码、真实用户数据或其他不应上传的信息。

如果项目依赖本地环境变量，可以保留变量名称和示例文件，但不要把真实密钥打进 ZIP 或提交到仓库。

## 步骤一：从 GitHub 导入项目 \{#hLli448ao\}

这一阶段需要先完成 GitHub 授权，再把目标仓库导入扣子编程，并确认项目初始化完成。

1. **发起 GitHub 授权和导入。**
   在扣子对话中输入：
   ```Plain Text
   使用 Coze CLI 授权我的 GitHub 账号，然后导入仓库 owner/repository。导入完成后先告诉我项目链接和初始化状态，不要马上修改代码。
   ```
2. **完成 GitHub 授权。**
   扣子会发起 GitHub OAuth 授权。按照页面提示完成授权后，回到对话告知扣子继续操作。
   ![Image=230x224](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/af09a1d261634efba53b74a4227f720d~tplv-goo7wpa0wc-topic.webp)
3. **检查项目初始化状态。**
   导入成功后，Coze CLI 会创建对应的扣子编程项目，并自动将项目与来源仓库绑定。CLI 还会在后台向项目的默认会话发送初始化请求，让编程 AI 开始读取和理解代码。
   如果扣子暂时没有返回代码分析结果，可以输入：
   ```Plain Text
   检查刚才导入项目的初始化状态。如果编程 AI 仍在分析代码，告诉我当前状态；不要重新导入仓库。
   ```
4. **核对导入结果。**
   扣子 Agent 完成编程项目初始化后，你可以根据它的回复，确认项目链接、GitHub 账号和仓库名称正确，避免误选同名仓库、测试仓库或无权使用的代码。
   ![Image=190x170](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/ffdcb018fdeb48619c096ce65f251a85~tplv-goo7wpa0wc-topic.webp)   

## 步骤二：在原项目上持续开发 \{#hTtlE2v8U\}

导入并初始化项目后，可以围绕明确需求持续迭代，例如增删功能、修复故障等，并通过补充上下文提高开发准确性。

1. **明确开发目标，并提交开发需求。**
   说明本次开发要实现什么、需要保留哪些现有行为，以及如何验收，避免只说“优化一下”或“整体重构”。
   例如，为现有应用增加深色模式和用户反馈入口：
   
   | **你的指令**  | **对话过程**  | **效果预览**  |
   | --- | --- | --- |
   | ```Plain Text | ![Image=1828x1549](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/292f81e575ec4a93a91b5f4487511707~tplv-goo7wpa0wc-topic.webp)  | ![Image=2422x1427](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/a4b3b69a3dbf425e86e87dbb7ad7d55d~tplv-goo7wpa0wc-topic.webp)  | \
   | 继续开发这个项目：增加深色模式，并添加用户反馈入口。 | | | \
   | ```  | | |
2. （可选）**跟踪或取消开发任务。**
   需求提交后，可以让扣子查询当前 AI 开发任务的状态，确认任务仍在执行、已经完成还是执行失败，避免因为等待时间较长而重复提交相同需求。如果任务长时间没有进展，或者需求已经不再需要，可以让扣子先说明将要停止的任务，等你确认后再取消。取消任务会终止当前开发过程，已经生成但尚未完成的修改可能无法保留。
   
   | **你的指令**  | **对话过程**  |
   | --- | --- |
   | ```Plain Text | ![Image=1828x1549](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/292f81e575ec4a93a91b5f4487511707~tplv-goo7wpa0wc-topic.webp)  | \
   | 查看当前项目的 AI 开发任务状态，告诉我任务仍在执行、已经完成还是执行失败。如果任务还在进行，不要重复提交需求。 | | \
   | ```  | |
4. （可选）修复问题和故障。
   如果在开发新功能的过程中，预览发现一些问题，可以和编程 AI 对话请它修复。尽量写清复现路径、实际表现和预期结果：
   
   | **你的指令**  | **对话过程**  |
   | --- | --- |
   | ```Plain Text | ![Image=1706x1252](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/2474a9f050164d91b5f3c18264c03474~tplv-goo7wpa0wc-topic.webp)  | \
   | 右上角的人工模式，点了没反应 | | \
   | ```  | |
3. **（可选）配置敏感信息。**
   涉及 API Key 或服务地址时，应通过环境变量管理，不要把真实值写入代码或提交到远程仓库。例如项目当前使用的模型是扣子提供的官方模型，我们希望改成自己的火山方舟 API Key，那么可以提供 API Key 和接入点名称，请编程 AI 通过 Coze CLI 配置。
   
   | **你的指令**  | **对话过程**  | **效果预览**  |
   | --- | --- | --- |
   | ```Plain Text | ![Image=1710x927](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c6313997df6c409488d68801e3abe88e~tplv-goo7wpa0wc-topic.webp)  | ![Image=190x93](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3754d8f8258943cab15d01632637fca3~tplv-goo7wpa0wc-topic.webp)  | \
   | 大模型帮我换成火山方舟的模型，用我的 API Key ****，接入点是 **** | | | \
   | ```  | | |   

## 步骤三：预览和验收修改 \{#hBh3fKpZ1\}

每轮修改完成后，先通过在线预览检查新功能和原有功能，再决定是否继续调整。

1. 获取最新预览。
   开发任务完成后，让扣子获取在线预览链接并总结修改结果：
   ```Plain Text
   把这个项目的最新预览链接发给我。
   ```
2. 预览和验证。
   * **验证新增和现有功能：​**打开预览页面，检查新增功能是否正常、原有功能是否受到影响，以及不同设备下的页面表现。
   * **复测已修复问题：​**对于修复类需求，按照原来的复现步骤重新测试，确认问题确实消失。
3. 继续调整项目。
   如果结果不符合预期，继续在同一个项目中提出修改，不要重复导入仓库。
   根据需要补充错误日志、截图说明、需求文档或其他本地文件，作为编程 AI 的上下文。项目需要新的模型、工具或 Skill 时，也可以先让扣子列出当前可用能力和接入方案，确认后再配置。例如：
   ```Plain Text
   深色模式已经生效，但设置没有在刷新后保留。
   ```   

## 步骤四：（可选）检查远程仓库绑定 \{#hZ8KJlcmc\}

需要远程代码管理时，先确认项目与仓库的绑定关系，并了解当前版本的同步限制。

1. **检查仓库绑定关系、核对仓库信息。**
   让扣子查看当前项目绑定的 Git 平台、远程仓库和同步状态：
   ```Plain Text
   使用 Coze CLI 查看这个项目绑定的 Git 平台和远程仓库，并告诉我当前同步状态。
   ```
2. **（可选）换绑仓库。**
   Coze CLI 当前已经提供远程仓库创建、绑定、解绑和状态查询命令。如果想更换一个绑定的仓库，可以直接和 Agent 对话来换绑。
   对话过程：
   ![Image=499x273](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/a474abf0f0ae43c3aa73228845900e26~tplv-goo7wpa0wc-topic.webp)   

## 步骤五：部署新版本 \{#hUy5MSl7i\}

预览验收通过后，再检查生产环境配置并部署，最后在正式地址完成回归验证。

1. **部署最新版本。**
   请编程 AI 确认检查是否有运行中的任务、检查生产环境配置，并将最新的代码版本部署到线上，将项目发布上线。
   
   | **你的指令**  | **对话过程**  | **效果预览**  |
   | --- | --- | --- |
   | ```Plain Text | ![Image=1700x913](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/9fb68eb7f22b4a809c99f859a00baa6e~tplv-goo7wpa0wc-topic.webp)  | ![Image=2170x1222](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/7614727695d74faf9b55887c96ef28b3~tplv-goo7wpa0wc-topic.webp)  | \
   | 确认这个项目当前没有仍在运行的开发任务，检查最新预览和生产环境配置。确认没有问题后部署最新版本，并把线上地址和部署结果发给我。 | | | \
   | | | | \
   | ```  | | |
2. **验证线上版本。**
   扣子会通过 Coze CLI 发起部署并查询状态。部署完成后，在正式地址重新测试新增功能和关键旧功能，避免只验证预览环境。
3. **（可选）排查部署问题。**
   如果部署失败，让扣子读取部署日志并交给编程 AI 修复：
   ```Plain Text
   查看最近一次部署的状态和失败日志，让 AI 分析并修复。修复后先生成新的预览让我确认，不要直接再次部署。
   ```
   对话过程：
   ![Image=427x267](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/3b48dd782c554f6bb3212af075a242e2~tplv-goo7wpa0wc-topic.webp)   

## 相关操作 \{#hVW6ayeQx\}

### 从本地 ZIP 导入项目 \{#hI4tJw4x1\}

如果项目没有托管在 GitHub，可以使用本地 ZIP 导入。本地 ZIP 导入不会像 GitHub 导入那样自动绑定来源仓库。如果后续需要远程代码管理，可以再为项目创建或绑定仓库。

导入方式：

```Plain Text
使用 Coze CLI 导入这个本地项目压缩包：@project.zip。导入完成后告诉我项目链接和初始化状态，并检查项目结构是否完整。先不要修改代码。
```

注意：

* ZIP 文件最大支持 500MB。
* 建议在压缩前删除 `node_modules`、构建缓存、日志、临时文件和真实密钥，既能减小文件体积，也能避免上传不必要或敏感的内容。

## 常见问题 \{#heECCNMS5\}

### Git 授权失效或仓库找不到 \{#hsjkTQg06\}

如果扣子提示未授权、仓库不存在或没有访问权限，可以先检查 Git 平台授权状态和当前账号：

```Plain Text
帮我检查 Coze CLI 当前授权的是哪个 GitHub 账号，以及授权是否有效。不要重新导入项目。
```

* 找不到仓库时，还应确认仓库完整名称、可见性，以及当前 GitHub 账号是否拥有访问权限。
* 需要切换账号时，先退出原 Git 授权，再重新完成 OAuth 授权。

### 导入成功但项目无法运行 \{#hUy0fv2jW\}

常见原因包括依赖未正确安装、启动脚本缺失、环境变量未配置，或项目依赖本地服务。可以让扣子先收集错误信息，再由编程 AI 分析：

```Plain Text
这个导入项目当前无法正常预览。请检查构建日志、启动脚本、依赖和环境变量，先告诉我具体原因和修复方案，确认后再修改代码。
```

如果项目依赖无法从云端访问的本地数据库、内网接口或文件，应先决定如何替换或迁移这些依赖，再继续开发。
