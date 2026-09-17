---
title: "Azure AI Search Setup Guide"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/00-course-setup/AzureSearch.md"
sourceRel: "00-course-setup/AzureSearch.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/00-course-setup/AzureSearch.md"
sourceSha256: "13f07f7e92dd0e1c4cafca3378839bb9369e9ff65485b4db28e109c05fe6a946"
pageSha256: "13f07f7e92dd0e1c4cafca3378839bb9369e9ff65485b4db28e109c05fe6a946"
contentMode: "local-full"
zh: ""
---

# Azure AI Search Setup Guide

This guide will help you set up Azure AI Search using the Azure portal. Follow the steps below to create and configure your Azure AI Search service.

## Prerequisites

Before you begin, ensure you have the following:

- An Azure subscription. If you don't have an Azure subscription, you can create a free account at [Azure Free Account](https://azure.microsoft.com/free/?wt.mc_id=studentamb_258691).

## Step 1: Create an Azure Storage Account

1. Follow this instruction, [Create an Azure storage account](https://learn.microsoft.com/azure/storage/common/storage-account-create?tabs=azure-portal), to create a new Azure Storage Account.
   **NOTE**: Make sure that the type of Storage Account is Standard General Purpose V2.

## Step 2: Create an Azure AI Search Service

1. Sign in to the [Azure portal](https://portal.azure.com/?wt.mc_id=studentamb_258691).
2. In the left-hand navigation pane, click on **Create a resource**.
3. In the search box, type "Azure AI Search" and select **Azure AI Search** from the list of results.
4. Click the **Create** button.
5. In the **Basics** tab, provide the following information:
   - **Subscription**: Select your Azure subscription.
   - **Resource group**: Create a new resource group or select an existing one.
   - **Resource name**: Enter a unique name for your search service.
   - **Region**: Select the region closest to your users.
   - **Pricing tier**: Choose a pricing tier that suits your requirements. You can start with the Free tier for testing.
6. Click **Review + create**.
7. Review the settings and click **Create** to create the search service.

## Step 3: Get Started with Azure AI Search

1. Once the deployment is complete, navigate to your search service in the Azure portal.
