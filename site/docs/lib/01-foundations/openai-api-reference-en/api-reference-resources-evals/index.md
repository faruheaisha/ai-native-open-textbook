---
title: "Evals"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/evals.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/evals.md"
sourceSha256: "8f940ae3c16748ec2321b258d8d2330f315132b3e34fb7b04a9a359d56c9590e"
pageSha256: "39ab417dd1fa62b086467389ff62ec9f1f671901e079dac49465ece838afba34"
contentMode: "local-full"
zh: ""
---

# Evals

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Create eval

**post** `/evals`

Create the structure of an evaluation that can be used to test a model's performance.
An evaluation is a set of testing criteria and the config for a data source, which dictates the schema of the data used in the evaluation. After creating an evaluation, you can run it on different models and model parameters. We support several types of graders and datasources.
For more information, see the [Evals guide](https://developers.openai.com/api/docs/guides/evals).

## 本篇目录

- [Body Parameters](https://developers.openai.com/api/reference)
- [Returns](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Path Parameters](https://developers.openai.com/api/reference)
- [Returns](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Query Parameters](https://developers.openai.com/api/reference)
- [Returns](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Path Parameters](https://developers.openai.com/api/reference)
- [Returns](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Path Parameters](https://developers.openai.com/api/reference)
- [Body Parameters](https://developers.openai.com/api/reference)
- [Returns](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Eval Create Response](https://developers.openai.com/api/reference)
- [Eval Custom Data Source Config](https://developers.openai.com/api/reference)
- [Eval Delete Response](https://developers.openai.com/api/reference)
- [Eval List Response](https://developers.openai.com/api/reference)
- [Eval Retrieve Response](https://developers.openai.com/api/reference)
- [Eval Stored Completions Data Source Config](https://developers.openai.com/api/reference)
- [Eval Update Response](https://developers.openai.com/api/reference)
- [Path Parameters](https://developers.openai.com/api/reference)
- [Returns](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Path Parameters](https://developers.openai.com/api/reference)
- [Body Parameters](https://developers.openai.com/api/reference)
- [Returns](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Path Parameters](https://developers.openai.com/api/reference)
- [Returns](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Path Parameters](https://developers.openai.com/api/reference)
- [Query Parameters](https://developers.openai.com/api/reference)
- [Returns](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Path Parameters](https://developers.openai.com/api/reference)
- [Returns](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Create Eval Completions Run Data Source](https://developers.openai.com/api/reference)
- [Create Eval JSONL Run Data Source](https://developers.openai.com/api/reference)
- [Eval API Error](https://developers.openai.com/api/reference)
- [Run Cancel Response](https://developers.openai.com/api/reference)
- [Run Create Response](https://developers.openai.com/api/reference)
- [Run Delete Response](https://developers.openai.com/api/reference)
- [Run List Response](https://developers.openai.com/api/reference)
- [Run Retrieve Response](https://developers.openai.com/api/reference)
- [Path Parameters](https://developers.openai.com/api/reference)
- [Query Parameters](https://developers.openai.com/api/reference)
- [Returns](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Path Parameters](https://developers.openai.com/api/reference)
- [Returns](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Output Item List Response](https://developers.openai.com/api/reference)
- [Output Item Retrieve Response](https://developers.openai.com/api/reference)
