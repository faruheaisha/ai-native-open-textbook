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
sourceRel: "docs/cozespace_device.md"
rawUrl: "/raw/04-work/coze-official-docs/docs/cozespace_device.md"
sourceSha256: "24db11dcc196e4311fc38fa23cf9e61f4fef00ed9f4d749915d42245cf665969"
pageSha256: "24db11dcc196e4311fc38fa23cf9e61f4fef00ed9f4d749915d42245cf665969"
contentMode: "local-full"
zh: ""
---

# 扣子 Coze 官方文档

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.coze.cn/llms.txt
> Use this file to discover all available pages before exploring further.

云电脑是三方精选 Agent 在云端持续运行的工作环境。创建三方精选 Agent 时，系统会同时为它配置云电脑，让 Agent 不依赖你的个人电脑，也能长时间执行编码、数据处理和复杂工程等任务。

:::tip 说明
在团队版和企业版中，企业超级管理员可以通过**功能访问控制**和**空间资源可见性**，控制成员可见的功能入口和空间资源范围。如果你未看到预期的功能和资源，请联系企业超级管理员确认。更多信息，请参考功能访问控制和空间资源访问控制。
:::

## 什么是云电脑 \{#hQcdES6jb\}

云电脑是三方精选 Agent 持续在线运行的云端工作环境。即使你的个人电脑已经关机或离线，Agent 仍然可以继续执行任务。你不需要进入云电脑中手动操作系统。创建完成后，直接在对话中给 Agent 安排任务即可。

你可以根据任务复杂度和并行运行需求，选择合适的云电脑规格。

| **规格**  | **适用场景**  | **可运行的三方精选 Agent 数量**  |
| --- | --- | --- |
| 2vCPU/4GiB  | 适合单Agent日常编码和轻量任务  | 1 个  |
| 4vCPU/8GiB  | 适合多Agent并行、复杂工程和团队协作  | 5 个  |
| 8vCPU/16GiB  | 适合大型项目、长时任务和高强度并行  | 10个  |

> * 为简化规格选择及优化资源使用，自 **2026 年 9 月 8 日 0 点起**，新建云电脑仅支持三种规格。此前已创建的 16vCPU/32GiB、​32vCPU/64GiB 规格云电脑可继续使用。系统会按原规格自动折算可运行的三方精选 Agent 数量：16vCPU/32GiB 对应 15 个，32vCPU/64GiB 对应 20 个。
> * 如果存量云电脑还有 Agent 运行额度，可继续创建三方精选 Agent；额度用完后，需先添加云电脑。
> * 存量已部署的 Agent 数量超出额度时，后续新增云电脑获取的 Agent 额度不会用于扣减超额部分。

## 费用与套餐权益 \{#5602a666\}

* 费用：云电脑的详细费用说明请参考[云设备费用](https://docs.coze.cn/coze_pro/cloud_device_fee)。
* 套餐权益：扣子订阅套餐支持的云电脑权益如下：
   
   | **套餐权益**  | **个人免费版**  | **个人进阶版**  | **个人高阶版**  | **个人旗舰版**  | **个人尊享版**  | **团队高阶版**  | **团队旗舰版**  | **团队尊享版**  | **企业标准版**  | **企业旗舰版**  |
   | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
   | 积分兑换云电脑  | ➖  | ➖  | ✔️  | ✔️  | ✔️  | ✔️  | ✔️  | ✔️  | ✔️  | ✔️  |
   | 云电脑规格扩容  | ➖  | ➖  | ➖  | ✔️  | ✔️  | ✔️  | ✔️  | ✔️  | ✔️  | ✔️  |
   | 云电脑数量增购  | ➖  | ➖  | ➖  | ✔️  | ✔️  | ✔️  | ✔️  | ✔️  | ✔️  | ✔️  |
> * ➖ 表示该套餐不包含此权益；✔️ 表示该套餐包含此权益。
> * **数量限制**：包含企业成员在内，每个用户默认 1 台云电脑，个人旗舰版及以上版本支持额外增购云电脑。
> * **权限要求**：企业成员不能自行添加、扩容或删除企业云电脑，如需调整设备，请联系企业超管或管理员。

## 安全使用准则 \{#OsNKkToRrY\}

* **账号隔离**：为了保障你的账号安全，建议为扣子注册专用的 App 或网页账号，避免使用你的个人账号。这可以防止因自动化操作被平台识别为机器人，而导致你的个人账号被封禁。
* **安全下载**：请仅通过官方渠道获取软件或脚本，不要运行来源不明的插件、附件，或访问非法网站。
* **信息保护**：请勿在云电脑中存储或处理任何敏感个人信息（如身份证号、银行卡、密码等），以防信息泄露。

## 添加云电脑 \{#0a1d3383\}

### 个人版操作步骤 \{#e9310ffa\}

::::tabs
@tab 网页端、桌面端
1. 打开扣子[设备管理](https://www.coze.cn/device?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)页面。
2. 在页面右上角单击**添加设备**。
3. 选择设备类型和规格。
   * **设备类型**：选择云电脑。
   * **设备规格**：根据你要执行的任务选择合适的设备规格，目前扣子提供多种规格可选。
4. 确认设备单价。
   各个规格的设备单价不同，按每天的实际运行时间计算费用，详细说明可参考云设备费用。
5. 单击**确认创建**。

@tab 移动端
1. 登录扣子 App，在底部单击**更多**。
2. 在**页面中部**位置，单击**设备**。
3. 在页面右上角，单击➕。
4. 选择设备类型和规格。
   * **设备类型**：选择云电脑。
   * **设备规格**：根据你要执行的任务选择合适的设备规格，目前扣子提供多种规格可选。
5. 确认设备单价。
   各个规格的设备单价不同，按每天的实际运行时间计算费用，详细说明可参考云设备费用。
6. 单击**确认创建**。
::::

### 企业版操作步骤 \{#552e2663\}

:::tip 说明
团队版、企业版套餐的云电脑由企业统一管理，以下步骤须由企业超管或管理员在网页或桌面端操作。
:::

#### 添加云电脑 \{#f1499c7e\}

1. 企业超管或管理员打开[企业管理](https://admin.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=) > **企业云设备管理**页面。
2. 在页面右上角单击**添加设备**。
   ![Image=389x203](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/1cdc4b9366e9482ab2c982b0830f70c3~tplv-goo7wpa0wc-topic.webp)
3. 选择设备类型和规格，并设置设备名称。
   * **设备类型**：选择云电脑。
   * **设备规格**：根据你要执行的任务选择合适的设备规格，目前扣子提供多种规格可选。
   * **设备数量**：每个企业成员最多 1 台云电脑，所以单次创建数量最大不超过企业当前员工人数。
4. 确认设备单价。
   各个规格的设备单价不同，高规格的设备单价更高，且按每天的实际运行时间计算费用；各个成员在组织中的设备费用统一从企业账号扣除积分，详细说明可参考云设备费用。
5. 单击**确认创建**。

#### 分配云电脑 \{#7c4c6f95\}

云电脑由管理员统一添加并分配，未分配时任何成员均不可用。

1. 企业超管或管理员在[企业管理](https://admin.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=) > **企业云设备管理**页面找到要分配的云电脑。
2. 在**操作**列单击**分配使用者**。
   如果此设备已分配给员工，需要重新分配给其他员工，则在**操作**列单击**更改使用者**。
   :::warning 注意
   更改云设备使用者会重置设备数据。设备中的文件、已安装软件和运行环境将被清除，且无法恢复。部署在该设备上的 Claude Code、Codex CLI、OpenClaw 等云端 Agent 将无法继续使用，也不能自动恢复。更改使用者前，请先导出需要保留的数据。
   :::
3. 确认要分配的设备名称和规格。
4. 选择使用者所在的**组织**、使用者的名称，并单击**确认分配**。
   ![Image=418x297](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/f3f6ff429f1a4fb3bf3adbe7b17fefa6~tplv-goo7wpa0wc-topic.webp)
5. 分配成功后，企业员工可以在自己的设备管理页面看到并开始使用云电脑。
   ![Image=421x237](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/bdffea7afb52475f9c03766ec4c36509~tplv-goo7wpa0wc-topic.webp)   

## 扩容云电脑 \{#3cf622ba\}

当云电脑的 CPU、内存或系统盘使用率较高时，设备页会显示负载提醒。为避免任务变慢或失败，建议及时扩容或减少同时运行的 Agent 数量。

:::tip 说明
* 个人旗舰版及以上版本支持扩容云电脑。
* 暂不支持设备缩容，或更换到更低的设备规格。
* 扩容需要一定时间，期间可能显示“扩容中”；如果设备上有 Agent 正在运行任务，扩容可能需要等待任务完成或影响任务执行，具体表现以页面提示为准。
:::

操作步骤如下：

::::tabs
@tab 网页端、桌面端
### 个人版 \{#615a3ddd\}

1. 打开扣子[设备管理](https://www.coze.cn/device?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=)页面。
2. 打开要扩容的云电脑。
3. 在页面右下角单击**立即扩容**。
4. 选择新的设备规格，并单击**确认扩容**。

### 企业版 \{#dee174fb\}

1. 企业超管或管理员打开[企业管理](https://admin.coze.cn/?surl_token=FJvCs&zlink_code=FFKdE&utm_medium=docs&utm_source=docs&utm_content=landingpage&utm_id=&utm_campaign=&utm_term=docs&utm_source_platform=) > **企业云设备管理**页面。
2. 找到要扩容的设备，在操作列单击**编辑设备**。
3. 选择新的设备规格，并单击**确认修改**。
   ![Image=319x228](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/c08b153c43404a55aaaf9913007aa011~tplv-goo7wpa0wc-topic.webp)

@tab 移动端
1. 登录扣子 App，并打开首页。
2. 在页面底部选择**设备**。
3. 在设备列表中选择要扩容的云电脑。
4. 在**容量使用**区域单击**扩容**。
::::

## 常见问题 \{#19f42582\}

* 云设备都有哪些规格，如何选择？
* 云电脑是个人独享的吗？
* 云设备能保证信息安全吗？
* 使用云手机登录软件，会被封号吗？
* 浏览器为什么总是间歇性黑屏？
* 为什么安装 App 时提示“此用户无权限安装此应用”？
* 云手机和云电脑可以安装代理软件、VPN 吗？
* 云设备支持访问海外网站吗？
* 云设备能换个系统吗？
* 云设备怎么没有声音？
