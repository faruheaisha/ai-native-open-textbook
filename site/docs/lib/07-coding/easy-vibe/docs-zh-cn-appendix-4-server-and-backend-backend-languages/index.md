---
title: "后端语言导论"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/backend-languages.md"
sourceRel: "docs/zh-cn/appendix/4-server-and-backend/backend-languages.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-cn/appendix/4-server-and-backend/backend-languages.md"
sourceSha256: "f887229db26bb12d013c0dc316335f4632b1cef8dc4ed48e19b0a160328cd078"
pageSha256: "8058d170ab917871c964d72744e57ace70502408aac3a1fa4e44977d776960e0"
contentMode: "local-full"
zh: ""
---

# 后端语言导论
::: tip 🎯 核心问题
**"我们后端该用什么语言？"** 这就像问："我应该买什么工具？" 答案永远不是"最好的"，而是"最适合你的"。本章将带你全面了解主流后端编程语言的特点、应用场景和选择策略，帮助你做出明智的决策。
:::

---

## 本篇目录

- [1. 了解后端语言的动机](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/01-1._了解后端语言的动机.md)
- [2. 核心概念：理解后端语言的基本特征](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/02-2._核心概念_理解后端语言的基本特征.md)
- [3. 主流后端语言详解](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/03-3._主流后端语言详解.md)
- [4. 语言选型：决策框架](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/04-4._语言选型_决策框架.md)
- [5. 真实案例：技术栈演进路径](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/05-5._真实案例_技术栈演进路径.md)
- [6. 常见误区与真相](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/06-6._常见误区与真相.md)
- [6.1 新兴与小众后端语言全景](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/07-6.1_新兴与小众后端语言全景.md)
- [6.2 语言适用范围与可开发程序总览](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/08-6.2_语言适用范围与可开发程序总览.md)
- [7. 总结：没有银弹，只有权衡](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/09-7._总结_没有银弹_只有权衡.md)
- [8. 更多学习资源](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/10-8._更多学习资源.md)
- [9. 名词速查表 (Glossary)](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/11-9._名词速查表_Glossary.md)
- [结语：选择是一门艺术](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/12-结语_选择是一门艺术.md)
- [附录：后端语言应用方向全景图](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/13-附录_后端语言应用方向全景图.md)
- [C / C++：系统级语言之王](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/14-C_C_系统级语言之王.md)
- [Rust：内存安全的系统编程新星](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/15-Rust_内存安全的系统编程新星.md)
- [Python：AI 与数据科学的第一语言](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/16-Python_AI_与数据科学的第一语言.md)
- [JavaScript / TypeScript：Web 全栈统治者](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/17-JavaScript_TypeScript_Web_全栈统治者.md)
- [Go：云原生时代的首选语言](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/18-Go_云原生时代的首选语言.md)
- [Java：企业级应用的常青树](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/19-Java_企业级应用的常青树.md)
- [Node.js：JavaScript 的全栈革命](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/20-Node.js_JavaScript_的全栈革命.md)
- [选型方法：快速决策指南](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/21-选型方法_快速决策指南.md)
- [PHP：Web 开发的先驱语言](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/22-PHP_Web_开发的先驱语言.md)
- [Ruby：优雅的快速开发语言](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/23-Ruby_优雅的快速开发语言.md)
- [C#：.NET 生态的企业级选择](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/24-C_.NET_生态的企业级选择.md)
- [Kotlin：现代的 JVM 语言](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/25-Kotlin_现代的_JVM_语言.md)
- [Scala：大数据的 JVM 之王](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/26-Scala_大数据的_JVM_之王.md)
- [Swift：iOS 后端的优雅选择](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/27-Swift_iOS_后端的优雅选择.md)
- [WebAssembly：编译到浏览器的通用格式](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/28-WebAssembly_编译到浏览器的通用格式.md)
- [Erlang / Elixir：高并发容错系统](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/29-Erlang_Elixir_高并发容错系统.md)
- [Go 的额外应用方向（补充）](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/30-Go_的额外应用方向_补充.md)
- [Python 的额外应用方向（补充）](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/31-Python_的额外应用方向_补充.md)
- [JavaScript/TypeScript 的额外应用方向（补充）](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/32-JavaScript_TypeScript_的额外应用方向_补充.md)
- [选型方法：完整决策指南](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/appendix/4-server-and-backend/33-选型方法_完整决策指南.md)
