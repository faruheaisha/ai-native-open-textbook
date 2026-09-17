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
sourceRel: "docs/enterprise/flagship/security-control/trusted-network.md"
rawUrl: "/raw/04-work/qwenwork-official-help-cn/docs/enterprise/flagship/security-control/trusted-network.md"
sourceSha256: "4fffc51f89efb48d302ae42d94495b8265d077dd03e586dea863906dac91ad5f"
pageSha256: "4fffc51f89efb48d302ae42d94495b8265d077dd03e586dea863906dac91ad5f"
contentMode: "local-full"
zh: ""
---

# qwenwork-official-help-cn

帮助中心 企业旗舰版能力 安全管控 可信网络
 通用官方知识库
可信网络
可信网络维护整个组织的 IP 白名单。填写前请向企业网络管理员取得实际出口 IP，例如办公区或企业 VPN 出口。
修改 IP 白名单
- 进入 组织与安全 → 安全管控 → 可信网络。
- 在「IP 白名单」中每行填写一个 IPv4、IPv6 地址或 CIDR 网段，最多 100 条，至少保留一条。例如 203.0.113.0/24 表示一个网段。
- 点击【保存配置】，核对白名单包含当前出口 IP，再点击【确认保存】。
- 等待保存成功，点击【重新加载】核对已保存值。存在未保存修改时，重新加载会先要求确认丢弃修改。
【截图：可信网络的组织 IP 白名单 · security-control--trusted-network.png】
IP 白名单按行维护，对整个组织生效。
⚠️ 注意： 误配置可能导致无法继续访问。不要把电脑的局域网地址当作企业互联网出口；修改前请确认当前网络在允许范围内。
放开 IPv4 访问
点击【放开全部 IPv4】会将输入内容替换为 0.0.0.0/0，仍需保存并确认才会提交。此值允许全部 IPv4 地址，使用前请确认符合企业访问要求。
【截图：保存 IP 白名单的影响确认 · network-save-confirm.png】
确认窗口提醒核对当前出口 IP，避免配置后无法访问。
处理保存问题
出现格式错误时，检查报错行的地址和网络前缀；超过 100 条时合并或减少网段。保存失败会保留输入，修正后可重试。白名单没有按用户、部门或用户组分别配置的范围。
