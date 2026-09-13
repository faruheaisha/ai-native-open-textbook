---
title: "Gemini websockets Cookbook"
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

# Gemini websockets Cookbook

This is a collection of websocket-specific examples and quickstarts for using the Gemini Live model.

Python users should build using the [Google GenAI SDK](https://ai.google.dev/gemini-api/docs/sdks) to access the Multimodal Live API, but as the underlying API is served over secure websockets, the following examples have been provided to help you understand how the protocol works.

To learn about what’s new in the recent Gemini model release and the new [Google GenAI SDKs](https://github.com/googleapis/python-genai), check out the [Gemini model page](https://ai.google.dev/gemini-api/docs/models). To start experimenting with the model now, head to [Google AI Studio](https://aistudio.google.com/prompts/new_chat) for prompting or to the [Multimodal Live API demo](https://aistudio.google.com/live) to try the new Live capabilities.
## Contents

Explore Gemini’s capabilities on your own local machine.

* [Live API starter script](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/websockets/Get_started_LiveAPI.py) \- A locally runnable Python script using websockets that supports streaming audio in and audio + video out from your machine
* [Bash Websocket example](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/websockets/shell_websockets.sh) \- A bash script using [`websocat`](https://github.com/vi/websocat) to interact with the Live API in a shell context

Explore Gemini’s capabilities through the following notebooks you can run through Google Colab.

* [Live API starter](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/websockets/Get_started_LiveAPI.ipynb) \- Overview of the Multimodal Live API using websockets
* [Live API tool use](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/websockets/Get_started_LiveAPI_tools.ipynb) \- Overview of tool use in the Live API with websockets
* [Live API streaming in Colab](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/websockets/LiveAPI_streaming_in_colab.ipynb) \- Interactive streaming with the Live API in Colab
* [Lyria RealTime websockets](https://github.com/google-gemini/cookbook/blob/a1b990c859a34823c982f70edaff35b830511c64/quickstarts/websockets/Get_started_LyriaRealTime_websockets.ipynb) \- Real-time music generation using websockets
