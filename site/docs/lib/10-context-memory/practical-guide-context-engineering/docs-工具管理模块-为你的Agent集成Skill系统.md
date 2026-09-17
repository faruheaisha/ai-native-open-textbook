---
title: "为你的 Agent 集成 Skill 系统"
sourceId: "10-context-memory/practical-guide-context-engineering"
sourceTitle: "大模型应用开发 -上下文工程与运行空间实践指南"
sourceKind: "工程手册"
licenseLabel: "仅引用"
lang: "中文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering"
entryUrl: "https://github.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/blob/ec349a470e2992adc1d98899a46cb085839c0676/docs/工具管理模块/为你的Agent集成Skill系统.md"
sourceRel: "docs/工具管理模块/为你的Agent集成Skill系统.md"
rawUrl: "/raw/10-context-memory/practical-guide-context-engineering/docs/工具管理模块/为你的Agent集成Skill系统.md"
sourceSha256: "414ead7352ae26551c9d9661d12d199fe238ca79ac31f6c9c8ade264d63154f0"
pageSha256: "414ead7352ae26551c9d9661d12d199fe238ca79ac31f6c9c8ade264d63154f0"
contentMode: "local-full"
zh: ""
---

# 为你的 Agent 集成 Skill 系统

为自己开发的Agent添加Skill支持时，开发的核心步骤：**发现、解析、使用、管理**

1. 发现：你的Skill存储在哪里，本地还是云端，项目级和用户级的优先级是什么，如何确定该文件夹是一个Skill
2. 解析：将SKILL.md的元信息解析出来
3. 使用：Agent如何使用解析出来的元信息，是系统提示词还是工具描述，后续的渐进式披露策略的执行，是使用读取工具还是使用内部的激活工具
4. 管理：如何维持加载进入上下文的Skill的有效性，上下文压缩的时候Skill的内容是否需要保护

🌟 **开发的核心原则也是Skill的核心特点：渐进式披露**

Excalidraw文件：https://my.feishu.cn/file/V5kabOooOo5hZVxmAjCcFilJn5f?from=from_parent_docx

![Skill的渐进式加载](https://gh-proxy.com/https://raw.githubusercontent.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/ec349a470e2992adc1d98899a46cb085839c0676/docs/工具管理模块/image/BH9kbQf7GoZGUXx5RHDcrzuDnfh.png)

- 第一层披露：在会话启动的时候，将**元信息（名称+描述）**加载到上下文中
- 第二层披露：在Skill激活的时候，也就是Agent根据用户输入和元信息匹配到相应的Skill，将**完整的SKILL.md内容**加载到上下文中
- 第三层披露：当SKILL.md的正文内容加载到上下文之后，Agent根据任务的复杂情况来选择加载更详细的指导说明，也就是**脚本、参考资料、静态资源**这三种可按需加载的资源

## 一、发现

Agent是需要从相应的文件目录中发现运行环境有哪些Skill，大部分Agent是运行在本地环境的，所以我们重点说一下本地环境的Skill发现

对于Skill的文件目录的范围是分为两种的：**用户全局范围和项目局部范围**

- 项目局部范围：只对当前项目生效的SKill，例如：前端设计Skill、React最佳实践SKill等
- 用户全局范围：对用户所有的项目生效的Skill，例如：find-skills（发现Skill）、pptx(生成ppt的Skill）

ExcailDraw文件：https://my.feishu.cn/file/JfaxbHpFaogKJsxHCDrc99dAnlp

![Skill的发现](https://gh-proxy.com/https://raw.githubusercontent.com/WakeUp-Jin/Practical-Guide-to-Context-Engineering/ec349a470e2992adc1d98899a46cb085839c0676/docs/工具管理模块/image/XF5ybPkrbolYg6xGvAfciXZEnvd.png)

具体的Skill的目录模块是这样的：
