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
sourceRel: "md/enterprise-ultimate-security-trusted-devices.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-security-trusted-devices.md"
sourceSha256: "68dab8f85843a4471b693db2a0918f24e3f9ec37d20bf1d12ba6970d23bd6ffc"
pageSha256: "68dab8f85843a4471b693db2a0918f24e3f9ec37d20bf1d12ba6970d23bd6ffc"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

可信设备按用户登记允许登录的终端，并通过策略决定哪些成员需要验证设备。配置顺序是先登记设备，再确定用户范围，最后启用验证。

## 登记设备
1. 进入 组织与安全 → 安全管控 → 可信设备，选择「可信设备列表」。
2. 点击【单个添加】，选择已有用户，填写设备名称及 SN 或 MAC 地址。SN 是设备序列号，MAC 是网卡地址；至少提供一种可识别的设备标识。
3. 按需要填写操作系统、设备型号和登录用户名，点击【保存】。
4. 搜索该用户或设备标识，确认设备处于可信状态。

批量登记时点击【批量新增】，下载页面模板并按列填写，上传后检查成功与失败记录。不要仅凭设备名称判断是否为同一台终端。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-b39f4489f0f3f916.png)

*用用户与 SN／MAC 核对设备，设备名称只作为辅助识别信息。*

## 为指定成员启用设备验证
1. 切换到「可信设备策略组」，点击【新增策略组】。
2. 填写策略名称、说明与优先级，选择用户、部门或用户组范围。优先级数字越小越先匹配，不能与现有策略重复。
3. 开启「启用可信设备验证」，再设置「首台设备免导入」。开启免导入后，成员首次登录的设备可自动加入可信设备列表。
4. 选择影响目标端和用户范围，点击【保存】。
5. 点击【命中验证】，选择目标成员，检查命中的策略及最终规则。成员同时命中多个策略时，以最高优先级策略为准，未命中其他策略时使用默认策略。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-fe69e6fb64d35363.png)

*启用前检查范围和首台设备规则，避免成员因设备未登记而无法登录。*

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-09275a5b587ee70e.png)

*先开启验证，再设置首台设备规则和成员范围。*

## 将设备设为不可信
在「可信设备列表」搜索目标，核对所属成员与设备标识后点击【设为不可信】。需要恢复时使用对应的可信状态操作。删除登记前检查受影响成员；登录是否被限制还取决于该成员命中的设备策略。

## 手动强制下线
1. 进入「手动强制下线」，点击【创建下线任务】。
2. 填写原因，选择下线范围、目标端及执行时间，确认后提交。
3. 待执行任务可在列表中编辑或取消执行；执行后打开详情查看用户级结果。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-9f84bb906d221ac3.png)

*创建任务后检查执行状态；已执行的退出登录不能通过取消任务恢复。*

强制下线会让所选成员退出客户端。成员再次登录时仍按当前账号和设备规则检查；如需持续限制，应同时核对账号状态或设备策略。
