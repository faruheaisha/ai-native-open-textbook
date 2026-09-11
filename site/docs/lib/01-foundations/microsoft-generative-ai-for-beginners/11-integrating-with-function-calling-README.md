---
title: "Integrating with function calling"
sourceId: "01-foundations/microsoft-generative-ai-for-beginners"
sourceTitle: "Generative AI for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/microsoft/generative-ai-for-beginners"
entryUrl: "https://github.com/microsoft/generative-ai-for-beginners/blob/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/README.md"
zh: ""
---

# Integrating with function calling

[![Integrating with function calling](https://raw.githubusercontent.com/microsoft/generative-ai-for-beginners/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/11-integrating-with-function-calling/images/11-lesson-banner.png)](https://youtu.be/DgUdCLX8qYQ?si=f1ouQU5HQx6F8Gl2)

You've learned a fair bit so far in the previous lessons. However, we can improve further. Some things we can address are how we can get a more consistent response format to make it easier to work with the response downstream. Also, we might want to add data from other sources to further enrich our application.

The above-mentioned problems are what this chapter is looking to address.

## Introduction

This lesson will cover:

- Explain what function calling is and its use cases.
- Creating a function call using Azure OpenAI.
- How to integrate a function call into an application.

## Learning Goals

By the end of this lesson, you will be able to:

- Explain the purpose of using function calling.
- Setup Function Call using the Azure OpenAI Service.
- Design effective function calls for your application's use case.

## Scenario: Improving our chatbot with functions

For this lesson, we want to build a feature for our education startup that allows users to use a chatbot to find technical courses. We will recommend courses that fit their skill level, current role and technology of interest.

To complete this scenario, we will use a combination of:

- `Azure OpenAI` to create a chat experience for the user.
- `Microsoft Learn Catalog API` to help users find courses based on the request of the user.
- `Function Calling` to take the user's query and send it to a function to make the API request.

To get started, let's look at why we would want to use function calling in the first place:

## Why Function Calling

Before function calling, responses from an LLM were unstructured and inconsistent. Developers were required to write complex validation code to make sure they were able to handle each variation of a response. Users could not get answers like "What is the current weather in Stockholm?". This is because models were limited to the time the data was trained on.

Function Calling is a feature of the Azure OpenAI Service to overcome the following limitations:

- **Consistent response format**. If we can better control the response format we can more easily integrate the response downstream to other systems.
- **External data**. Ability to use data from other sources of an application in a chat context.

## Illustrating the problem through a scenario

> We recommend you to use the [included notebook](https://github.com/microsoft/generative-ai-for-beginners/blob/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/11-integrating-with-function-calling/python/aoai-assignment.ipynb) if you want to run the below scenario. You can also just read along as we're trying to illustrate a problem where functions can help to address the problem.

Let's look at the example that illustrates the response format problem:

Let's say we want to create a database of student data so we can suggest the right course to them. Below we have two descriptions of students that are very similar in the data they contain.

1. Create a connection to our Azure OpenAI resource:

   ```python
   import os
   import json
   from openai import OpenAI
   from dotenv import load_dotenv
   load_dotenv()

   # The Responses API is served from the Azure OpenAI (Microsoft Foundry) v1
