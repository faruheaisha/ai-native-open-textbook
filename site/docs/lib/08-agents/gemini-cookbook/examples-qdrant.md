---
title: "Gemini API Cookbook"
sourceId: "08-agents/gemini-cookbook"
sourceTitle: "Gemini API Cookbook"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/google-gemini/cookbook"
entryUrl: "https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/README.md"
zh: ""
---

# Gemini API Cookbook

## Gemini API Qdrant Examples

### Table of Contents

This folder contains example notebooks demonstrating how to combine the **Gemini API** with the **Qdrant vector database** to enable semantic search and recommendation features using embeddings.

---

### Notebooks

* **[Similarity Search using Qdrant](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/examples/qdrant/Qdrant_similarity_search.ipynb)**
  Load website data, build a semantic search system using embeddings from the Gemini API, store the embeddings in a Qdrant vector DB, and perform similarity search using Gemini-powered queries.

* **[Movie Recommendation using Qdrant](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/examples/qdrant/Movie_Recommendation.ipynb)**
  Process and embed a large movie dataset with the Gemini API, index movie vectors in Qdrant, and build a semantic movie recommender that returns similar movies based on user input using vector similarity search.

* **[Hybrid Search & Reranking with Qdrant: Under the Hood of Legal AI](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/examples/qdrant/Hybrid_Search_Legal.ipynb)**
  Embed and index a legal dataset with the Gemini API and Qdrant, combining dense (based on Matryoshka Representations of Gemini embeddings) and sparse (based on the Qdrant's custom keywords-based retriever miniCOIL) vectors for hybrid search to ensure high accuracy, citation-grounded legal domain question answering.
  

---

These examples show how to:

* Embed unstructured text data using Gemini's embedding model.
* Store and search high-dimensional vectors in Qdrant.
* Use Gemini queries to semantically match user input to relevant content.

You can use these templates as a foundation for building search, recommendation, or AI assistant systems using Gemini and Qdrant.
