---
title: "MLflow Integration with Gemini"
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

# MLflow Integration with Gemini
[MLflow](https://mlflow.org/) is an open-source tool for comprehensive management of the Machine Learning Lifecycle. Here's the foundational components of MLflow:

- Tracking: MLflow Tracking provides both an API and UI dedicated to the logging of parameters, code versions, metrics, and artifacts during the ML process. This centralized repository captures details such as parameters, metrics, artifacts, data, and environment configurations, giving teams insight into their models’ evolution over time. Whether working in standalone scripts, notebooks, or other environments, Tracking facilitates the logging of results either to local files or a server, making it easier to compare multiple runs across different users.
- Model Registry: A systematic approach to model management, the Model Registry assists in handling different versions of models, discerning their current state, and ensuring smooth productionization. It offers a centralized model store, APIs, and UI to collaboratively manage an MLflow Model’s full lifecycle, including model lineage, versioning, aliasing, tagging, and annotations.
- MLflow Tracing: MLflow provides a tracing feature that enhances observability in your AI applications by capturing detailed information about the execution of your application's services. Tracing provides a way to record the inputs, outputs, and metadata associated with each intermediate step of a request, enabling you to easily pinpoint the source of bugs and unexpected behaviors.
- Evaluate: Designed for in-depth model analysis, this set of tools facilitates objective model comparison, be it traditional ML algorithms or cutting-edge LLMs.

MLflow provides a native tracing integration with Google Gen AI SDK that automatically generate traces for your interactions with Gemini models. Please refer to [MLflow Gemini integration](https://mlflow.org/docs/latest/tracing/integrations/gemini) for more details.
