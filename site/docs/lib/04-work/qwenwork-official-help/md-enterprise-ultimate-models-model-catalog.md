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
sourceRel: "md/enterprise-ultimate-models-model-catalog.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-models-model-catalog.md"
sourceSha256: "165587fee148e2083ca874b3e67cc2f77554286570fe76deb8ed5d455e68ff20"
pageSha256: "165587fee148e2083ca874b3e67cc2f77554286570fe76deb8ed5d455e68ff20"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

模型目录维护企业可以提供的模型。主模型用于成员日常选择；专项模型用于视觉理解、语音或多媒体任务。模型连接配置完成后，还需检查模型策略组是否向目标成员开放。  
**警告**

**BYOK 适用说明：** BYOK（Bring Your Own Key，自带模型密钥）能力仅对已开放该能力的部分用户可用。BYOK 模型不适用千问办公-旗舰版的用量统计与限额管理；相关统计数据和限额规则不包含 BYOK 模型。

## 查看与配置主模型
1. 进入 AI 管理 → 模型管理 → 模型目录，选择「主模型」。
2. 查找模型，检查来源、上下文尺寸上限、说明和启用状态。官方主模型由平台提供，部分状态操作不可更改。
3. 点击模型的【配置】，维护允许修改的展示名称、说明和上下文上限。
4. 保存后检查列表显示，再到客户端查看该模型的名称和说明。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-e80864042fc2cd1a.png)

*先分清官方与企业自定义模型，再进入对应配置。*

## 添加企业自定义主模型
开始前向模型服务提供方取得完整接口地址、API Key、模型 Key 和支持能力。API Key 是调用密钥；服务端模型 Key 是接口请求中识别模型的名称，不等同于成员看到的展示名称。

1. 在「主模型」点击【新增自定义模型】，进入配置页。
2. 填写「完整 Endpoint」，应是完整 Chat Completions 地址，例如 https://model.example.com/v1/chat/completions。只填写网站首页或 /v1 可能不能完成请求。
3. 填写 API Key、企业展示名称和服务端模型 Key，选择服务实际支持的上下文上限。
4. 按模型能力设置推理、视觉理解等选项，不要仅为显示入口而勾选服务不支持的能力。
5. 如启用向模型传入第三方用户 ID，先确认企业确实需要向该服务传递此标识。
6. 点击【测试并保存】，修正连接或凭据错误后再次测试。保存成功后确认启用状态和开放策略。

私网 HTTP(S)、IP 和自定义端口可按服务实际地址填写，但要确保调用链路能访问。新建模型测试并保存后处于未启用状态，需要回到列表手动开启。  
**警告**

已启用的自定义模型只能修改展示资料。修改 Endpoint、API Key、上游模型名称或重新测试连接前，须先停用模型。

修改 Endpoint 时，按变化范围处理凭据：

* 协议、主机或端口改变：**必须重新填写 API Key**。
* 仅修改同一协议、主机和端口下的路径：可以保留已有凭据。

界面掩码不能作为真实密钥提交。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-08476a1f311ae034.png)

*先停用模型，再修改连接配置或重新测试。*

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-1b781dd486ef2959.png)

*完整接口地址、模型 Key 与展示名称分别填写，完成后测试并保存。*

## 配置专项模型
1. 切换到「专项模型」，选择视觉理解、语音输入、语音润色、图像生成、视频生成或音乐生成分组。
2. 查看当前生效的官方或企业模型。需要接入企业服务时点击【添加模型】，按该分组要求填写配置并测试。
3. 切换生效模型后，用相应任务验证，例如上传一张图片测试视觉理解，不能只验证普通文本问答。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-e3b5276d777fce60.png)

*专项模型按任务能力分别配置；测试时要触发对应能力。*

## 更新凭据或移除模型
凭据更换后重新测试并保存，再检查实际调用。删除自定义主模型会同时清理策略组中的相关引用；操作前确认成员有其他可用模型。当前生效或被限制删除的专项模型，先按页面提示切换到可用替代项。

## 客户端看不到模型
依次检查模型本身是否启用、用户命中的策略是否允许，以及是否存在黑名单限制。连接测试通过只能说明测试范围内的配置可用，不能证明每个成员都有使用权限。
