---
title: "Retrieval Augmented Generation (RAG) and Vector Databases"
sourceId: "01-foundations/microsoft-generative-ai-for-beginners"
sourceTitle: "Generative AI for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/microsoft/generative-ai-for-beginners"
entryUrl: "https://github.com/microsoft/generative-ai-for-beginners/blob/c9657f3fdb6e4f50a168b1d026eadf4cda2f0d07/15-rag-and-vector-databases/README.md"
sourceRel: "15-rag-and-vector-databases/README.md"
rawUrl: "/raw/01-foundations/microsoft-generative-ai-for-beginners/15-rag-and-vector-databases/README.md"
sourceSha256: "3e4218f262f47214d278d0a631d964a95ffbcc8d6140c727d4d795bc34dbdd43"
pageSha256: "3e4218f262f47214d278d0a631d964a95ffbcc8d6140c727d4d795bc34dbdd43"
contentMode: "local-full"
zh: ""
---

# Retrieval Augmented Generation (RAG) and Vector Databases

[![Retrieval Augmented Generation (RAG) and Vector Databases](/mirror/23/235de08f793ddb8fc0dc13d1c8ae4599ac892ab2.png)](https://youtu.be/4l8zhHUBeyI?si=BmvDmL1fnHtgQYkL)

In the search applications lesson, we briefly learned how to integrate your own data into Large Language Models (LLMs). In this lesson, we will delve further into the concepts of grounding your data in your LLM application, the mechanics of the process and the methods for storing data, including both embeddings and text.

> **Video Coming Soon**

## Introduction

In this lesson we will cover the following:

- An introduction to RAG, what it is and why it is used in AI (artificial intelligence).

- Understanding what vector databases are and creating one for our application.

- A practical example on how to integrate RAG into an application.

## Learning Goals

After completing this lesson, you will be able to:

- Explain the significance of RAG in data retrieval and processing.

- Setup RAG application and ground your data to an LLM

- Effective integration of RAG and Vector Databases in LLM Applications.

## Our Scenario: enhancing our LLMs with our own data

For this lesson, we want to add our own notes into the education startup, which allows the chatbot to get more information on the different subjects. Using the notes that we have, learners will be able to study better and understand the different topics, making it easier to revise for their examinations. To create our scenario, we will use:

- `Azure OpenAI:` the LLM we will use to create our chatbot

- `AI for beginners' lesson on Neural Networks`: this will be the data we ground our LLM on

- `Azure AI Search` and `Azure Cosmos DB:` vector database to store our data and create a search index

Users will be able to create practice quizzes from their notes, revision flash cards and summarize it to concise overviews. To get started, let us look at what is RAG and how works:

## Retrieval Augmented Generation (RAG)

An LLM powered chatbot processes user prompts to generate responses. It is designed to be interactive and engages with users on a wide array of topics. However, its responses are limited to the context provided and its foundational training data. For instance, GPT-4 knowledge cutoff is September 2021, meaning, it lacks knowledge of events that have occurred after this period. In addition, the data used to train LLMs excludes confidential information such as personal notes or a company's product manual.

### How RAGs (Retrieval Augmented Generation) work

![drawing showing how RAGs work](/mirror/f9/f9aeddac8dfad890ae5c711baf08c2c00f813ee3.png)

Suppose you want to deploy a chatbot that creates quizzes from your notes, you will require a connection to the knowledge base. This is where RAG comes to the rescue. RAGs operate as follows:

- **Knowledge base:** Before retrieval, these documents need to be ingested and preprocessed, typically breaking down large documents into smaller chunks, transforming them to text embedding and storing them in a database.

- **User Query:** the user asks a question

- **Retrieval:** When a user asks a question, the embedding model retrieves relevant information from our knowledge base to provide more context that will be incorporated into the prompt.

- **Augmented Generation:** the LLM enhances its response based on the data retrieved. It allows the response generated to be not only based on pre-trained data but also relevant information from the added context. The retrieved data is used to augment the LLM's responses. The LLM then returns an answer to the user's question.

![drawing showing how RAGs architecture](/mirror/ab/ab31f90bf9f710e4fa35e31431932d9c1572fb48.png)

The architecture for RAGs is implemented using transformers consisting of two parts: an encoder and a decoder. For example, when a user asks a question, the input text 'encoded' into vectors capturing the meaning of words and the vectors are 'decoded' into our document index and generates new text based on the user query. The LLM uses both an encoder-decoder model to generate the output.

Two approaches when implementing RAG according to the proposed paper: [Retrieval-Augmented Generation for Knowledge intensive NLP (natural language processing software) Tasks](https://arxiv.org/pdf/2005.11401.pdf?WT.mc_id=academic-105485-koreyst) are:

- **_RAG-Sequence_** using retrieved documents to predict the best possible answer to a user query

- **RAG-Token** using documents to generate the next token, then retrieve them to answer the user's query

### Why would you use RAGs? 

- **Information richness:** ensures text responses are up to date and current. It, therefore, enhances performance on domain specific tasks by accessing the internal knowledge base.

- Reduces fabrication by utilizing **verifiable data** in the knowledge base to provide context to the user queries.

- It is **cost effective** as they are more economical compared to fine-tuning an LLM

## Creating a knowledge base

Our application is based on our personal data i.e., the Neural Network lesson on AI For Beginners curriculum.

### Vector Databases

A vector database, unlike traditional databases, is a specialized database designed to store, manage and search embedded vectors. It stores numerical representations of documents. Breaking down data to numerical embeddings makes it easier for our AI system to understand and process the data.

We store our embeddings in vector databases as LLMs have a limit of the number of tokens they accept as input. As you cannot pass the entire embeddings to an LLM, we will need to break them down into chunks and when a user asks a question, the embeddings most like the question will be returned together with the prompt. Chunking also reduces costs on the number of tokens passed through an LLM.

Some popular vector databases include Azure Cosmos DB, Clarifyai, Pinecone, Chromadb, ScaNN, Qdrant and DeepLake. You can create an Azure Cosmos DB model using Azure CLI with the following command:

```bash
az login
