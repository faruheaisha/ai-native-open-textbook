---
title: "Azure AI 搜索设置指南"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/translations/zh-CN/README.md"
zh: ""
---

# Azure AI 搜索设置指南

本指南将帮助您通过 Azure 门户设置 Azure AI 搜索服务。请按照以下步骤创建和配置您的 Azure AI 搜索服务。

## 前提条件

在开始之前，请确保您具备以下条件：

- 一个 Azure 订阅。如果您还没有 Azure 订阅，可以在 [Azure 免费账户](https://azure.microsoft.com/free/?wt.mc_id=studentamb_258691) 创建一个免费账户。

## 第一步：创建 Azure 存储账户

1. 按照此说明 [创建 Azure 存储账户](https://learn.microsoft.com/azure/storage/common/storage-account-create?tabs=azure-portal)，创建一个新的 Azure 存储账户。
   **注意**：请确保存储账户类型为标准通用 V2。

## 第二步：创建 Azure AI 搜索服务

1. 登录 [Azure 门户](https://portal.azure.com/?wt.mc_id=studentamb_258691)。
2. 在左侧导航栏中，点击 **创建资源**。
3. 在搜索框中输入 "Azure AI Search"，然后从结果列表中选择 **Azure AI Search**。
4. 点击 **创建** 按钮。
5. 在 **基本信息** 选项卡中提供以下信息：
   - **订阅**：选择您的 Azure 订阅。
   - **资源组**：创建一个新的资源组或选择现有的资源组。
   - **资源名称**：输入您的搜索服务的唯一名称。
   - **区域**：选择离您的用户最近的区域。
   - **定价层**：选择适合您需求的定价层。您可以从免费层开始测试。
6. 点击 **查看 + 创建**。
7. 查看设置后，点击 **创建** 来创建搜索服务。

## 第三步：开始使用 Azure AI 搜索

1. 部署完成后，导航到 Azure 门户中的搜索服务。
