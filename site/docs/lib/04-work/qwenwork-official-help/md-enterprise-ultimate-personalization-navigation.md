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
sourceRel: "md/enterprise-ultimate-personalization-navigation.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-personalization-navigation.md"
sourceSha256: "aa0af6ef709d026464c27b0f8994f1efe4707cc4127bf36460ba92c40ab5982e"
pageSha256: "aa0af6ef709d026464c27b0f8994f1efe4707cc4127bf36460ba92c40ab5982e"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

导航配置用于安排客户端左侧入口。您可以增加分组和自定义链接，调整展示顺序，并通过右侧预览检查成员看到的结构。

默认内置目录包含新任务、扩展（专家套件、技能、连接器）、定时任务和 IM 频道。管理员保存的自定义链接、分组和启用状态可以继续维护。

## 新增分组和链接
1. 进入 用户与体验 → 个性化配置 → 导航。
2. 点击【新增分组】，填写能概括内容的分组名称，例如"企业服务"。
3. 点击【新增自定义链接】，填写入口名称（最多 10 个字符）和网页地址，选择图标，以及「在千问办公内打开」或「在浏览器新标签打开」。保存后，新链接位于根目录。
4. 将链接放入合适的分组，拖动排序控件调整显示顺序，在预览中确认层级。
5. 点击【保存并发布】，等待成功提示后重新打开本页，确认顺序与链接已保存。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-7eae0b8a5272c128.png)

*左侧维护入口及层级，右侧预览成员导航；拖动前先确认要移动的条目。*

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-6d48811106dcd859.png)

*入口名称、网页地址、图标与打开方式都在新增窗口中设置。*

## 调整现有入口
通过条目的开关控制是否展示，通过【更多操作】编辑当前允许修改的名称、图标或链接。导航最多使用两级结构；"新任务"是固定入口，不能像自定义链接一样关闭、移动或更换图标。

删除分组后，其中的入口会移到根目录。修改名称时优先使用成员熟悉的业务名称，例如"报销系统"，避免只有管理员理解的系统代号。

## 配置内嵌网页插件
选择「在千问办公内打开」后，展开【高级配置】，可配置网页插件。
<table> <thead> <tr> <td>字段</td> <td>填写说明</td> </tr> </thead> <tbody> <tr> <td>环境变量</td> <td>JSON 对象，最多 20 项；值支持文本、数字和布尔值，留空不传入</td> </tr> <tr> <td>路由标识</td> <td>1--32 位小写字母、数字或连字符，同一目录中不得重复；不能使用保留名称 knowledge-base</td> </tr> <tr> <td>直达链接</td> <td>由路由标识生成，可复制给需要进入该页面的用户</td> </tr> <tr> <td>插件包</td> <td>上传最大 50 MB 的 ZIP，须含 web/index.html；包含 native/ 时须有 native/index.js</td> </tr> </tbody> </table>

1. 点击【下载模板】，按模板准备文件后点击【上传 ZIP】。
2. 检查文件名；可以下载已上传文件核对内容，或点击【移除】后恢复使用网页地址。
3. 插件包存在时优先使用包，不要求填写网页地址。保存链接后，再点击【保存并发布】。
4. 重新打开链接配置，核对路由、环境变量与文件。选择在浏览器新标签打开时，不使用插件高级配置。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-697b23f48bf94bf8.png)

*高级配置集中维护插件路由、环境变量与文件。*

## 检查链接能够打开
保存后进入客户端，逐一点击新增或修改的链接。确认地址可访问、登录方式正确，目标站点没有因网络或权限限制而打不开。后台预览只能检查布局，不能代替真实访问。
