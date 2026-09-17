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
sourceRel: "docs/cozespace_local_device.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozespace_local_device.md"
sourceSha256: "190b6e8682e63ba5f45bdd6e6151ecb0c0250fbb9d90fc61fb4beedecfd63958"
pageSha256: "190b6e8682e63ba5f45bdd6e6151ecb0c0250fbb9d90fc61fb4beedecfd63958"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

扣子桌面端可以将你的个人电脑连接到扣子，让扣子 Agent 在获得授权后，帮助你处理本地电脑上的文件、文件夹和部分本地 Shell 任务。

:::tip 说明
在团队版和企业版中，企业超级管理员可以通过**功能访问控制**和**空间资源可见性**，控制成员可见的功能入口和空间资源范围。如果你未看到预期的功能和资源，请联系企业超级管理员确认。更多信息，请参考功能访问控制和空间资源访问控制。
:::

## 能做什么 \{#dcaf93f0\}

扣子桌面端支持连接你的本地电脑，帮助扣子 Agent 在授权范围内操作本地文件目录、处理文件内容，并执行常见的 Shell 命令。配合扣子移动端，你还可以在手机上通过语音输入向扣子 Agent 下达任务，让家中或办公室的桌面端扣子执行本地电脑上的复杂操作。

扣子已经不仅限于在云端帮你完成任务，它已经进化出了桌面的操作能力，和你的物理世界连接更紧密。

连接桌面端后，你可以让扣子 Agent 完成以下操作：

* **操作本地目录和文件**：查找、读取、分析和上传本地文件；在你授权的文件夹中创建、修改文件。
* **执行 Shell 命令**：运行脚本、处理数据或进行简单网络请求等 Shell 命令。

为保护你的电脑和文件安全，Agent 不会默认拥有所有权限。涉及访问受系统保护的目录、写入文件、执行高风险命令等操作时，系统会要求你确认授权。

## 使用限制 \{#301db129\}

* 仅扣子 Agent 可以操作你的本地电脑设备。
* 通过 Agent 操作本地电脑时，请确保电脑处于唤醒状态，并已打开扣子桌面端应用程序。
* 在实际运行过程中，扣子可能会申请操作本地电脑所需的相关权限。执行高风险命令等敏感操作时，系统会先弹出确认请求，只有在你同意后才会继续执行。
* AI 模型也可能会犯错，建议不要使用此功能处理敏感数据。

## 如何使用 \{#d4fc7f2e\}

:::notice 注意
* 操作你的本地电脑之前，应先下载并安装扣子桌面端。下载方式可参考开始使用扣子。
* 使用本地设备读取、分析或处理文件时，可能会产生较多 Token 消耗；建议你尽量指定具体文件、文件夹、文件类型或筛选条件，避免一次性处理过大的目录。
:::

### 开启本地文件访问能力 \{#6debe35e\}

首次使用前，请先安装扣子桌面端，并使用你的扣子账号登录。登录完成并授权后，桌面端会自动将当前电脑连接到你的扣子账号。你可以在设备管理页查看本地设备状态。

![Image=499x287](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/df42efd4864b42ca8c9c20f03e2c1b2b~tplv-goo7wpa0wc-topic.webp)

如果你是首次使用扣子桌面端，扣子会询问你是否允许 Agent 使用本地电脑能力。你可以根据需要开启或关闭。关闭后，Agent 将无法通过扣子桌面端访问你的本地文件或执行本地任务。

你也可以之后在桌面端的**设置** > **应用和权限管理**中开启或关闭该能力。

![Image=497x286](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/329f9b61f94a45088fbe19884f84f265~tplv-goo7wpa0wc-topic.webp)

### 操作本地文件 \{#9e1a0ea4\}

你可以让 Agent 在授权范围内处理本地文件和文件夹，包括查看、分析、编辑、移动文件。

常见指令示例：

* **查看和查找文件**：“`帮我在下载文件夹里找到最近修改过的 PDF。`”
* **读取和分析文件**：“`帮我读取这个目录下的需求文档，并总结重点。`”
* **创建和编辑文件**：“`帮我把整理结果保存到指定文件夹。`”
* **移动和整理文件**：“`帮我把图片文件移动到 images 文件夹中。`”

![Image=459x328](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/65b186fee5d24ffc8612c30cbc9f4209~tplv-goo7wpa0wc-topic.webp)

:::notice 注意
对于移动文件等敏感操作，Agent 执行前会根据权限情况向你发起确认请求；你同意后，任务才会继续。
:::

### 执行 Shell 命令 \{#133939e5\}

Shell 命令可以理解为本地电脑上的命令行操作。开启本地电脑能力后，Agent 可以根据任务需要执行部分 Shell 命令，帮助你处理文件、运行脚本、调用工具或进行数据处理。

常见可执行的操作包括：

* **文件操作**：创建、读取、编辑文件和目录，查找文件，压缩或解压文件。
* **开发相关**：运行 Python、Node.js 等脚本，安装依赖，执行 Git 操作，管理或部署项目。
* **本地电脑操作**：执行本地命令、读取或写入授权路径下的文件，必要时进行截图等操作。
* **网络相关**：通过 curl 请求 API，下载文件，进行简单的网络连通性测试。
* **数据处理**：清洗数据、转换格式、统计计算，或生成图表。

![Image=444x318](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/bccac01ced0f47108e515d9115ee4b98~tplv-goo7wpa0wc-topic.webp)

以下命令或操作会受到限制：

* 需要交互式输入的命令，例如 ssh、vim 等
* 需要手动输入密码的命令，例如部分 Git 推送、系统提权命令等
* 访问未授权路径的命令
* 可能影响文件安全、系统设置或网络安全的高风险命令

对于受限制或高风险的命令，扣子会根据实际情况提示你补充信息、完成授权或确认是否继续。只有在满足权限要求后，Agent 才会继续执行。

如果你不确定某条命令的影响，可以选择拒绝，并让 Agent 解释命令的作用或换一种更安全的处理方式。

### 管理个人电脑设备 \{#a6f569e6\}

你可以在设备管理页面查看当前账号已连接的个人电脑设备，包括设备名称、在线状态、设备 ID、设备系统等信息。

设备状态说明：

| **状态**  | **说明**  |
| --- | --- |
| 在线  | 当前电脑已连接扣子桌面端，可以使用本地电脑能力。  |
| 离线  | 该电脑曾连接过当前账号，但当前不可用。请确认电脑已唤醒，并已打开扣子桌面端应用程序。  |

你可以在设备管理页面执行以下操作：

| **操作**  | **说明**  | **示例**  |
| --- | --- | --- |
| 查看设备信息  | 查看设备名称、在线状态、设备 ID、设备系统等信息。  | ![Image=1604x1732](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/1183abbf323449fda1f69a319cf79a63~tplv-goo7wpa0wc-topic.webp)  |
| 编辑设备名称  | 修改设备在列表中的显示名称，方便区分不同电脑。  | ![Image=1374x1722](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/89523821e4d941a88b93705d96d1f883~tplv-goo7wpa0wc-topic.webp)  |
| 文件夹授权  | 进入 **Agent 设置**中的设备权限页面，在**已授权的文件夹**区域调整 Agent 对某个文件夹的访问权限，例如改为“本对话允许”“所有对话允许”或“未授权”。  | ![Image=2404x1696](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/b2b9b43c976a4fb4bfdf9e078905b7a4~tplv-goo7wpa0wc-topic.webp)  |

## 安全提醒 \{#c653d380\}

扣子桌面端让 Agent 具备访问本地文件和执行本地指令的能力。为了让你更放心地使用，扣子提供了多层保护机制：

* **你始终拥有最终控制权**：Agent 在访问本地文件夹、执行敏感指令前，会先请求你的授权。你可以随时查看、修改或撤销已授予的权限，也可以关闭 Agent 对本机的访问能力。
* **默认最小权限**：首次使用时，Agent 不会默认获得本地访问能力。你需要明确开启后，Agent 才能使用本地能力。文件夹授权会按 Agent 和目录分别管理，每个 Agent、每个目录都需要单独授权，互不影响。

扣子桌面端的本地能力仍在持续迭代中，Agent 可能会理解错误或执行不符合预期的操作。建议你先从熟悉、可控的场景开始尝试，避免直接授权包含密钥、财务信息或身份信息的目录。

## 场景演示 \{#a0ee93f8\}

### **场景1：整理桌面文件** \{#8dc2e971\}

当桌面上积累了较多文件时，你可以让 Agent 帮你查找、分类和整理文件。

示例指令：

```Plain Text
帮我整理桌面文件，把 PDF、图片和压缩包分别归类，并生成一份整理结果说明。
```

可能流程：Agent 会确认桌面目录，在你完成必要授权后，对桌面文件进行分类整理并返回结果。

![Image=466x335](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/eb5fbed053dd4c0db05db4ee4315703d~tplv-goo7wpa0wc-topic.webp)

### 场景 2 ：远程办公协作 \{#dc2566a3\}

当你不在电脑旁，但电脑已保持唤醒并打开扣子桌面端时，可以通过扣子移动端让 Agent 读取本地文件，并把处理结果交给项目成员继续确认。

示例指令：

```Plain Text
帮我从本地设备的桌面上找到本月销售报表，整理出关键数据和异常项，然后请项目里的小李确认。
```

可能流程：Agent 会通过在线的桌面端访问报表文件，在获得授权后完成整理，并将结果发送给指定项目成员确认。

![Image=366x372](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/894fb43344ff48fea58603269bbfbdec~tplv-goo7wpa0wc-topic.webp)

### 场景 3：托管批量任务 \{#caab05e1\}

对于需要处理多个文件、运行脚本或生成结果文件的任务，你可以让 Agent 在本地电脑上按顺序执行。

示例指令：

```Plain Text
帮我扫描这个目录，把所有 Markdown 文件的标题加一个前缀 Coze
```

可能流程：Agent 会确认任务范围，按顺序处理相关文件或脚本，并在完成后返回统计结果和报告。

![Image=372x269](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/5a7c2ca36408487d9768d5115dbac5ae~tplv-goo7wpa0wc-topic.webp)
