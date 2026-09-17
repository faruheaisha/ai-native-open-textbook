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
sourceRel: "md/enterprise-ultimate-security-trusted-network.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-security-trusted-network.md"
sourceSha256: "df26de89739d63a34aff72050854dd590c10f61c788d644925d1bf7d0c7f0326"
pageSha256: "df26de89739d63a34aff72050854dd590c10f61c788d644925d1bf7d0c7f0326"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

可信网络维护整个组织的 IP 白名单。填写前请向企业网络管理员取得实际出口 IP，例如办公区或企业 VPN 出口。

## 修改 IP 白名单
1. 进入 组织与安全 → 安全管控 → 可信网络。
2. 在「IP 白名单」中每行填写一个 IPv4、IPv6 地址或 CIDR 网段，最多 100 条，至少保留一条。例如 203.0.113.0/24 表示一个网段。
3. 点击【保存配置】，核对白名单包含当前出口 IP，再点击【确认保存】。
4. 等待保存成功，点击【重新加载】核对已保存值。存在未保存修改时，重新加载会先要求确认丢弃修改。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-11e0e32a742073b9.png)

*IP 白名单按行维护，对整个组织生效。*  
**警告**

误配置可能导致无法继续访问。不要把电脑的局域网地址当作企业互联网出口；修改前请确认当前网络在允许范围内。

## 放开 IPv4 访问
点击【放开全部 IPv4】会将输入内容替换为 0.0.0.0/0，仍需保存并确认才会提交。此值允许全部 IPv4 地址，使用前请确认符合企业访问要求。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-fcaeab6adfe80d04.png)

*确认窗口提醒核对当前出口 IP，避免配置后无法访问。*

## 处理保存问题
出现格式错误时，检查报错行的地址和网络前缀；超过 100 条时合并或减少网段。保存失败会保留输入，修正后可重试。白名单没有按用户、部门或用户组分别配置的范围。
