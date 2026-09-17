---
title: "從零開始用 React Native + Expo 做門市巡檢 App"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-tw/stage-3/cross-platform/react-native-expo/index.md"
sourceRel: "docs/zh-tw/stage-3/cross-platform/react-native-expo/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/zh-tw/stage-3/cross-platform/react-native-expo/index.md"
sourceSha256: "ec326cafb10e7fd6bbd5450613b0bb207b1e31a67144e9fe1ff41ae27d6533de"
pageSha256: "ec326cafb10e7fd6bbd5450613b0bb207b1e31a67144e9fe1ff41ae27d6533de"
contentMode: "local-full"
zh: ""
---

# 從零開始用 React Native + Expo 做門市巡檢 App

假設連鎖門市每天都要檢查照明、價籤、走道和消防出口。員工需要在手機上逐項勾選、留下說明並保存記錄，主管也希望快速在瀏覽器查看。這正是 React Native 與 Expo 適合處理的企業場景。

## 1. React Native 與 Expo 分別做什麼

React Native 讓你用 React 和 TypeScript 建立 Android、iOS 介面；Expo 則提供建立專案、開發伺服器、常用裝置能力、打包與更新工具。

「一套程式碼」不代表每一行都相同，而是讓畫面和商業邏輯盡量共用，真正不同的裝置能力再分開處理。

## 2. 先看三個正式產品

**Shopify POS** 是店員在實體門市結帳、查庫存與連接零售設備的平台。它提醒我們：首頁要先放下一個工作和今日進度，也要在門市真正使用的低階裝置上測試。

![Shopify POS 的門市與庫存介面](/mirror/04/04964d0b3a53089988fe2ef19d5f46aa6fa9e12c.jpg)

**Discord** 是社群與通訊平台。它在 Android、iOS 共用大量產品程式碼，但仍保留必要的平台差異。

![Discord Android 角色頁面的改版比較](/mirror/16/161976b5437e9a0c4a9f9cc9fcab37615f45b3b5.png)

**MTA TrainTime** 是紐約通勤鐵路的官方行程與票務 App。Expo 的案例說明了建置與發布工具也能支援正式產品。

![Expo 案例中的 MTA TrainTime](/mirror/1c/1cb009756b345148df5a8d9e77bfb792376ac0cd.png)

## 3. 建立第一個專案

```bash
npx create-expo-app@latest store-inspection
cd store-inspection
npm run web
```

瀏覽器出現範例頁後，先保留這個可以回復的版本，再對 AI 說：

> 把目前的 Expo 範例改成門市巡檢首頁。顯示門市名稱、今日進度，以及一個「開始巡檢」按鈕。

![React Native 與 Expo 專案的關係](/mirror/1c/1cc9981bf798c001434703d74f27ba2b4be0079a.svg)

## 4. 做出第一張巡檢單

> 新增巡檢頁，放入照明、價籤、走道和消防出口四個項目。點擊後切換完成狀態，並更新進度。

實際點完四項，再取消其中一項，確認數字會正確增減。

![Expo Web 中實際執行的巡檢 App](/mirror/e8/e8c4c379f1dcfceb5cb8a6cf4719e668ca744701.png)

把瀏覽器縮窄，檢查按鈕與文字沒有被截斷。

![同一個 App 的窄螢幕版面](/mirror/44/4458f6dd49b13a4290b8da13b3be7b7db14cac7d.png)

## 5. 保存一筆記錄

> 新增現場說明與「保存」按鈕。保存後，在下方顯示時間、完成數量和說明。

![點擊並保存後的真實巡檢記錄](/mirror/88/888cc1eb813ee9287854cb6105dbff4304cdd910.png)

接著讓資料留在裝置上：

> 把進度與巡檢記錄保存在本機。關閉後重新開啟時要恢復，先不要接伺服器。

少量資料可用 `AsyncStorage`；資料開始出現巡檢單、明細與待上傳工作之間的關係時，可改用 `expo-sqlite`。

## 6. 再加入照片、登入與後端

普通保存穩定後，再逐步增加：

> 讓未完成的項目可以附上一張照片，顯示預覽，也可以移除。

> 接上既有登入 API。使用者只能看到伺服器分配給他的門市。

登入憑證要放進 `SecureStore`。公司後端密鑰不能放在 App 或 `EXPO_PUBLIC_` 變數裡，因為客戶端內容最後都可能被讀取。

離線同步是「斷網時先存在本機，連線恢復後再上傳」。等本機保存與後端都正常，再加入待同步、重試與唯一請求編號，避免同一張巡檢單被重複建立。

## 7. 到真機上完成最後驗證

Expo Go 適合早期開發；加入自訂原生能力後，應改用 development build。正式發布前，要在 Android 與 iPhone 真機測試鍵盤、權限、相片、重新啟動、弱網、重試、登出與版本升級。

本章原型使用 Expo SDK 57 與 TypeScript，型別檢查、Web 正式匯出、勾選與保存都已實際完成。這台電腦沒有可用的 Android 模擬器與 iOS Simulator Runtime，因此沒有把手機建置、簽名與上架寫成「已通過」。

先把「開啟巡檢表、完成一項、保存說明、重新開啟後仍看得到」這條路做穩，再增加相片、帳號與同步。
