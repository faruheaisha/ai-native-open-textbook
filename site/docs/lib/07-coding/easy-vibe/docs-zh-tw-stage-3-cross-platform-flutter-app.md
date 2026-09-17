---
title: "如何用 Flutter 開發跨平台 App"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-3/cross-platform/flutter-app/index.md"
sourceRel: "docs/zh-tw/stage-3/cross-platform/flutter-app/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-tw/stage-3/cross-platform/flutter-app/index.md"
sourceSha256: "49f8453e425ce20ff241551702e2a8d2084c665f4058c8076b64906873e3d24f"
pageSha256: "49f8453e425ce20ff241551702e2a8d2084c665f4058c8076b64906873e3d24f"
contentMode: "local-full"
zh: ""
---

# 如何用 Flutter 開發跨平台 App

Flutter 適合 Android、iOS 需要大致相同功能與視覺風格的產品。它使用 Dart 語言，並由自己的繪製系統呈現介面。這次我們做一個門市費用簿：輸入支出、更新今日總額，重新開啟後記錄仍然存在。

## 1. 從正式產品理解 Flutter

My BMW 把車況、充電、保養與遠端操作放在同一個 App。它先顯示車輛與目前狀態，再提供次要入口。

![My BMW 的車況與服務入口](/mirror/1c/1c83e41bf59ac892a50a53f1087c1900d1bf6a59.png)

Google Pay 在付款或取得獎勵後立即顯示明確結果；Nubank 則用安靜的資訊層級整理帳戶和服務入口。

![Google Pay 的付款狀態與回饋](/mirror/4a/4a30b879d309267160c7201f80b602efacdc4b8a.png)

![Nubank 的帳戶與協助入口](/mirror/ce/ce51aa0a014496e72412191096a7d9c103321882.png)

費用簿也採用同樣的順序：今日總額、最新記錄、明確的新增按鈕。

## 2. 建立並執行專案

安裝穩定版 Flutter 後，先檢查環境：

```bash
flutter doctor
flutter create store_expense_ledger
cd store_expense_ledger
flutter run -d chrome
```

`flutter doctor` 只會列出這台電腦真正準備好的平台。Web 可以執行，不代表 Android SDK、Xcode、簽名與手機測試也完成了。

## 3. 做出第一個費用首頁

> 把計數器範例改成門市費用首頁。顯示今日總額、費用清單和「新增費用」按鈕。

![實際執行的門市費用簿首頁](/mirror/39/39c8cdc585f4810afd98bf80ca894b30cd8ac429.png)

> 點擊按鈕後開啟表單，加入類別、說明、金額、保存與取消。

![實際執行的新增費用表單](/mirror/50/5021dfcfa5a275d744607941cb86e6cc56d852a1.png)

## 4. 讓錯誤與成功都看得懂

> 空白欄位或小於等於零的金額，要在欄位下方顯示簡短說明，而且不能保存。

![空白表單的欄位錯誤提示](/mirror/4d/4de94243e281bd17eb45dfa9228a7d0a2f35c008.png)

> 保存成功後關閉表單，把記錄放到清單最上方，更新總額並顯示成功訊息。

輸入「辦公用品」、「影印紙」與 `56`，確認總額、清單和提示只更新一次。

![保存後同時更新總額、清單與訊息](/mirror/7b/7b5cdbd055c05a81ddb819e5271cf49f41e44218.png)

## 5. 關閉後仍要找得到資料

> 把費用記錄保存在本機，程式啟動時再載入。先不要加入帳號和伺服器。

保存兩筆資料，重新整理，再關閉瀏覽器後重開。總額與兩筆記錄都回來，才算通過。

之後再逐步加入編輯、刪除確認、穩定的記錄 ID，以及連接公司後端。使用者能看哪些門市和費用，必須由伺服器決定，不能讓 App 自己修改角色。

## 6. 測試與建置

```bash
flutter analyze
flutter test
flutter build web
```

Android 需要 Android Studio、SDK、簽名與真機；iOS 需要 Mac、Xcode、Simulator Runtime 或真機與簽名。桌面版也要在沒有開發環境的乾淨電腦安裝測試。

本章使用 Flutter 3.44.9 與 Dart 3.12.2，靜態分析、Widget Test 和 Web 建置都通過，並實際驗證表單錯誤、保存成功與重新整理後資料仍在。這台電腦缺少 Android SDK，也沒有可用的 iOS Simulator Runtime 和 CocoaPods，所以沒有宣稱手機建置與上架已完成。

先把一筆費用從輸入、驗證、保存到重新開啟都做穩，再接帳號、同步與正式發布。
