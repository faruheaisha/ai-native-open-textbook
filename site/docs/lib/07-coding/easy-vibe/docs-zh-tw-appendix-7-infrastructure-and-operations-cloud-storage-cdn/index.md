---
title: "物件儲存與 CDN 原理"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/7-infrastructure-and-operations/cloud-storage-cdn.md"
sourceRel: "docs/zh-tw/appendix/7-infrastructure-and-operations/cloud-storage-cdn.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-tw/appendix/7-infrastructure-and-operations/cloud-storage-cdn.md"
sourceSha256: "0790b05f9add2c3daeda22204842eb537b1d5b4a42245c25059e4ca56e1720f8"
pageSha256: "9d66843ffb14a312b8229fbc00990e660517805ff963c509f6673dc7831afee4"
contentMode: "local-full"
zh: ""
---

# 物件儲存與 CDN 原理
> 💡 **學習指南**：本文會帶你走完一條完整的鏈路——從檔案上傳到使用者下載。你會看到物件儲存如何像「智慧倉庫」一樣管理海量檔案，CDN 如何像「快遞據點」一樣把內容送到使用者家門口，以及這中間有哪些「坑」等著你跳進去。建議先了解基礎的 HTTP 請求和 DNS 解析原理。

在開始之前，建議你先補幾塊「基礎磚」：

- **HTTP 請求流程**：可以先閱讀 [瀏覽器輸入 URL 後發生了什麼](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/7-infrastructure-and-operations/web-basics/url-to-browser.md) 了解完整的請求鏈路。
- **DNS 解析原理**：如果你對網域名稱解析還不太熟悉，可以先看 [DNS 查詢流程](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/7-infrastructure-and-operations/deployment/dns-flow.md) 的圖解部分。

---

## 本篇目录

- [0. 引言：檔案上傳下載這麼「慢」的動機](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/7-infrastructure-and-operations/01-0._引言_檔案上傳下載這麼_慢_的動機.md)
- [1. 物件儲存：你的「智慧雲端倉庫」](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/7-infrastructure-and-operations/02-1._物件儲存_你的_智慧雲端倉庫.md)
- [2. CDN：你的「全球快遞網路」](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/7-infrastructure-and-operations/03-2._CDN_你的_全球快遞網路.md)
- [3. 從上傳到存取：完整鏈路解析](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/7-infrastructure-and-operations/04-3._從上傳到存取_完整鏈路解析.md)
- [4. 流量排程：讓使用者存取「最近」的節點](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/7-infrastructure-and-operations/05-4._流量排程_讓使用者存取_最近_的節點.md)
- [5. HTTPS 最佳化：安全與效能的平衡](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/7-infrastructure-and-operations/06-5._HTTPS_最佳化_安全與效能的平衡.md)
- [6. 存取分析：看懂你的 CDN 報表](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/7-infrastructure-and-operations/07-6._存取分析_看懂你的_CDN_報表.md)
- [7. 實戰案例：從 0 搭建圖片加速方案](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/7-infrastructure-and-operations/08-7._實戰案例_從_0_搭建圖片加速方案.md)
- [8. 總結：物件儲存 + CDN 的黃金法則](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/7-infrastructure-and-operations/09-8._總結_物件儲存_CDN_的黃金法則.md)
- [9. 實戰程式碼範本](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/7-infrastructure-and-operations/10-9._實戰程式碼範本.md)
- [10. 名詞對照表](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/7-infrastructure-and-operations/11-10._名詞對照表.md)
- [總結：物件儲存 + CDN 的黃金法則](https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/appendix/7-infrastructure-and-operations/12-總結_物件儲存_CDN_的黃金法則.md)
