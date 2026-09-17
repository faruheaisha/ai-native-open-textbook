---
title: "对象存储与 CDN 原理"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/7-infrastructure-and-operations/cloud-storage-cdn.md"
sourceRel: "docs/zh-cn/appendix/7-infrastructure-and-operations/cloud-storage-cdn.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-cn/appendix/7-infrastructure-and-operations/cloud-storage-cdn.md"
sourceSha256: "11a73f5114b518b485818af48aacde02a6cd9156de6bc9975fe3ec0401c93eec"
pageSha256: "524956a37000954330f277170505b359184a1ba547171306cc18e0be83da1f58"
contentMode: "local-full"
zh: ""
---

# 对象存储与 CDN 原理
> 💡 **学习指南**：本文会带你走完一条完整的链路——从文件上传到用户下载。你会看到对象存储如何像"智能仓库"一样管理海量文件，CDN 如何像"快递网点"一样把内容送到用户家门口，以及这中间有哪些"坑"等着你跳进去。建议先了解基础的 HTTP 请求和 DNS 解析原理。

在开始之前，建议你先补几块"基础砖"：

- **HTTP 请求流程**：可以先阅读 [浏览器输入 URL 后发生了什么](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/7-infrastructure-and-operations/web-basics/url-to-browser.md) 了解完整的请求链路。
- **DNS 解析原理**：如果你对域名解析还不太熟悉，可以先看 [DNS 查询流程](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/7-infrastructure-and-operations/deployment/dns-flow.md) 的图解部分。

---

## 本篇目录

- [0. 引言：文件上传下载这么"慢的原理](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/7-infrastructure-and-operations/01-0._引言_文件上传下载这么_慢的原理.md)
- [1. 对象存储：你的"智能云仓库"](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/7-infrastructure-and-operations/02-1._对象存储_你的_智能云仓库.md)
- [2. CDN：你的"全球快递网络"](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/7-infrastructure-and-operations/03-2._CDN_你的_全球快递网络.md)
- [3. 从上传到访问：完整链路解析](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/7-infrastructure-and-operations/04-3._从上传到访问_完整链路解析.md)
- [4. 流量调度：让用户访问"最近"的节点](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/7-infrastructure-and-operations/05-4._流量调度_让用户访问_最近_的节点.md)
- [5. HTTPS 优化：安全与性能的平衡](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/7-infrastructure-and-operations/06-5._HTTPS_优化_安全与性能的平衡.md)
- [6. 访问分析：看懂你的 CDN 报表](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/7-infrastructure-and-operations/07-6._访问分析_看懂你的_CDN_报表.md)
- [7. 实战案例：从 0 搭建图片加速方案](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/7-infrastructure-and-operations/08-7._实战案例_从_0_搭建图片加速方案.md)
- [8. 总结：对象存储 + CDN 的黄金法则](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/7-infrastructure-and-operations/09-8._总结_对象存储_CDN_的黄金法则.md)
- [9. 实战代码模板](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/7-infrastructure-and-operations/10-9._实战代码模板.md)
- [10. 名词对照表](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/7-infrastructure-and-operations/11-10._名词对照表.md)
- [总结：对象存储 + CDN 的黄金法则](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/7-infrastructure-and-operations/12-总结_对象存储_CDN_的黄金法则.md)
