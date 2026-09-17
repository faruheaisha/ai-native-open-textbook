---
title: "qwenwork-official-help-cn"
sourceId: "04-work/qwenwork-official-help-cn"
sourceTitle: "qwenwork-official-help-cn"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.cn/docs"
entryUrl: "https://qwenwork.cn/docs"
sourceRel: "docs/install/macos.md"
rawUrl: "/raw/04-work/qwenwork-official-help-cn/docs/install/macos.md"
sourceSha256: "33555f479c6e41801618584ec7d16cd1335606072576ff9920ca2167e1f3fefe"
pageSha256: "33555f479c6e41801618584ec7d16cd1335606072576ff9920ca2167e1f3fefe"
contentMode: "local-full"
zh: ""
---

# qwenwork-official-help-cn

帮助中心 入门指南 桌面端安装指引 macOS 安装指南
 桌面端官方知识库
macOS 安装指南
在 macOS 上安装、登录并维护 QwenWork 的完整指南。
QwenWork 的 macOS 版本是一款原生桌面应用，安装后位于 /Applications/QwenWork.app，所有任务都在本地运行。本指南覆盖从全新 Mac 到第一个任务完成的全过程：系统要求、安装流程、登录账户，以及自动更新和卸载等日常维护操作。
系统要求
开始之前请先确认你的 Mac 满足最低要求。QwenWork 会在本地驱动密集的 AI 工作流，因此对系统版本和磁盘空间都有一定的要求。
要求最低配置
操作系统macOS 14 或更高版本
架构Apple Silicon 或 Intel
存储空间应用本身约 700 MB，请额外预留任务产物的空间
网络稳定的互联网连接（登录、调用模型与下载技能时使用）

如果你的 macOS 版本较旧，请先在 系统设置 → 通用 → 软件更新 中升级。低于 macOS 14 的版本无法启动 QwenWork。
安装步骤
下载安装包
访问官网下载页 qwenwork.cn/download，点击 macOS 按钮下载最新版 .dmg 安装包。
macOS 安装包按芯片区分，功能完全一致，只需选对与你的 Mac 匹配的版本：
- ARM64（Apple Silicon）——适用于搭载 M 系列芯片的 Mac。
- X64（Intel）——适用于 Intel 芯片的 Mac。
下载页会自动识别并标出与你当前 Mac 匹配的版本（标记为「推荐」），按提示选择即可。不确定芯片型号时，点击屏幕左上角的苹果菜单 →「关于本机」查看。
安装应用
双击下载好的 .dmg 文件，在弹出的窗口里把 QwenWork 图标拖到 Applications 文件夹快捷方式上。等待拷贝完成后，在 Finder 边栏中弹出该磁盘映像，避免每次开机自动挂载。
安装完成后应用位于 /Applications/千问办公.app，建议把它固定到 Dock 中，方便后续访问。
首次启动
可以通过 启动台、Spotlight（⌘ + 空格 输入"QwenWork"）或直接在应用程序文件夹中打开 QwenWork。
首次启动时，Gatekeeper 可能会拦截并提示 "无法打开 QwenWork.app，因为 Apple 无法检查其是否包含恶意软件"。打开 系统设置 → 隐私与安全性，下拉到底部找到 QwenWork 对应的提示，点击 仍然打开 即可。这一步只会出现一次。
登录账号
全新安装后，QwenWork 会引导你完成登录。可以使用已有的账号，或直接注册新账号——支持邮箱注册以及第三方登录。
已登录的用户则不会看到这个页面：QwenWork 会保留你的登录态，恢复之前的任务，并直接进入工作界面。账户区域始终位于窗口的 左下角，点击头像即可展开账户菜单，里面提供了套餐到期、设置、偏好设置、帮助文档、更新日志、关于我们和 退出登录 等入口。
进入 QwenWork 工作界面
QwenWork 是一款独立应用——并不存在"在其他产品里切换到 QwenWork 标签"的概念。登录完成后，你会直接落在主工作界面，左侧就是导航侧边栏。
侧边栏提供了一些常用入口：
- 新任务——发起一个新任务；
- 专家套件 / 技能 / 连接器——为 AI 安装能力扩展；
- 定时任务——按周期运行的任务；
- IM 频道——基于聊天频道的协作；
- 任务 / 频道——查看与回到历史工作。
更新 QwenWork
QwenWork 默认会在后台检查新版本。有新版本时，应用会在右下角或菜单栏弹出更新提示——你点击确认后才会下载并重启更新，不会未经确认就替换当前版本。
如果想立刻检查，从 macOS 顶部菜单栏选择 QwenWork → 检查更新 即可。
卸载
如果你需要彻底卸载 QwenWork：
- 退出应用（在 Dock 上右键 → 退出）。
- 打开 访达 → 应用程序，把 QwenWork 拖入废纸篓。
- 清空废纸篓完成卸载。
如果还需要清理本地配置和缓存的任务数据，删除应用的支持目录：
rm -rf ~/.qwenworkcn
注意这会清除尚未同步到云端的本地任务历史。如果担心残留信息，建议先在账户菜单里执行一次"退出登录"。
