---
title: "Call the Gemini API with cURL"
sourceId: "08-agents/gemini-cookbook"
sourceTitle: "Gemini API Cookbook"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/google-gemini/cookbook"
entryUrl: "https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/rest/README.md"
sourceRel: "quickstarts/rest/README.md"
rawUrl: "/raw/08-agents/gemini-cookbook/quickstarts/rest/README.md"
sourceSha256: "3369330d02b1e8dd7765dd2c39d861f120859cceb317a947e8ee76ae609c51a2"
pageSha256: "3369330d02b1e8dd7765dd2c39d861f120859cceb317a947e8ee76ae609c51a2"
contentMode: "local-full"
zh: ""
---

# Call the Gemini API with cURL

These examples show you how to call the Gemini API using `curl`. You can run them in Colab, or copy/paste the commands into your terminal.

| Quickstart | Description | Open |
| -------- | ----------- | ---- |
| [Audio](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/rest/Audio_REST.ipynb) | Process audio files with the REST API. | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/rest/Audio_REST.ipynb) |
| [Caching](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/rest/Caching_REST.ipynb) | Cache context to reduce cost and latency using REST. | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/rest/Caching_REST.ipynb) |
| [Embeddings](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/rest/Embeddings_REST.ipynb) | Generate text embeddings using REST. | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/rest/Embeddings_REST.ipynb) |
| [Function calling](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/rest/Function_calling_REST.ipynb) | Perform function calling with cURL and REST. | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/rest/Function_calling_REST.ipynb) |
| [Function calling config](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/rest/Function_calling_config_REST.ipynb) | Configure function calling modes with REST. | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/rest/Function_calling_config_REST.ipynb) |
| [Image generation](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/rest/Imagen_REST.ipynb) | Generate images with Imagen using the REST API. | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/rest/Imagen_REST.ipynb) |
| [JSON mode](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/rest/JSON_mode_REST.ipynb) | Enforce JSON output format with REST. | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/rest/JSON_mode_REST.ipynb) |
| [Models](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/rest/Models_REST.ipynb) | List and retrieve model metadata with REST. | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/rest/Models_REST.ipynb) |
| [Prompting](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/rest/Prompting_REST.ipynb) | Send text and multimodal prompts with REST. | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/rest/Prompting_REST.ipynb) |
| [Safety](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/rest/Safety_REST.ipynb) | Configure safety settings with REST. | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/rest/Safety_REST.ipynb) |
| [Search Grounding](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/rest/Search_Grounding.ipynb) | Ground responses with Google Search via REST. | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/rest/Search_Grounding.ipynb) |
| [Streaming](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/rest/Streaming_REST.ipynb) | Stream responses in real-time with REST. | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/rest/Streaming_REST.ipynb) |
| [System instructions](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/rest/System_instructions_REST.ipynb) | Set system instructions using REST. | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/rest/System_instructions_REST.ipynb) |
| [Video](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/rest/Video_REST.ipynb) | Process video files with REST. | [![Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/google-gemini/cookbook/blob/main/quickstarts/rest/Video_REST.ipynb) |
