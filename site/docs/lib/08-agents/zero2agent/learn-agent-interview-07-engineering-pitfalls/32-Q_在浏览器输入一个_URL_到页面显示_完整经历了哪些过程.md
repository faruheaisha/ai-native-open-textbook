---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/07-engineering-pitfalls/index.md"
sourceRel: "learn-agent-interview/07-engineering-pitfalls/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/07-engineering-pitfalls/index.md"
sourceSha256: "0214669d4cd53d5c31df35ebc9b82df54b029eeebc1ad4358ad54c8ee17cbace"
pageSha256: "584e35b279f4273e789afaceeca7c0c5efa5fdc0c9dc86e00f43869a0fe22236"
contentMode: "local-full"
zh: ""
---

## Q：在浏览器输入一个 URL 到页面显示，完整经历了哪些过程？

> 来源：小红书 Agent 岗一面

**新手答**：“DNS 找到服务器，HTTP 请求页面，然后浏览器渲染。”

**高手答**：

可以沿着“解析地址—建立连接—服务端处理—浏览器渲染”讲完整链路：

1. 浏览器解析 URL，检查 HSTS、Service Worker、HTTP 缓存和本地资源策略。
2. DNS 依次查询浏览器/系统缓存、递归解析器和权威服务器，得到 IP；CDN 可能按位置调度边缘节点。
3. 客户端通过 ARP/NDP 找到下一跳，经路由与 NAT 发包。HTTP/1.1、HTTP/2 通常先建 TCP；HTTPS 再进行 TLS 握手、证书校验和密钥协商。HTTP/3 则基于 QUIC/UDP。
4. 浏览器发送 HTTP 请求。请求可能经过 CDN、WAF、负载均衡、网关和反向代理，再到应用服务；服务端访问缓存或数据库后返回状态码、响应头和正文，可使用压缩、分块或流式传输。
5. 浏览器处理缓存、重定向、Cookie 和安全头，HTML 解析为 DOM，CSS 解析为 CSSOM；预加载扫描器并行请求 CSS、JS、字体和图片。
6. DOM 与 CSSOM 形成渲染树，随后 style、layout、paint、composite。脚本可能阻塞解析或修改 DOM，引发重新布局与重绘。
7. 页面可见不代表完成：异步请求、懒加载、事件循环任务和性能指标仍会继续；排障时可按 DNS、连接、TLS、TTFB、资源下载和渲染阶段定位。

**差距在哪**：高手能说明协议分支、缓存与代理层，以及网络完成后浏览器主线程如何把字节变成像素。
