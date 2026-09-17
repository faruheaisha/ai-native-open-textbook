---
title: "Building a User Interface to Interact With the Pretrained LLM"
sourceId: "01-foundations/llms-from-scratch"
sourceTitle: "LLMs from Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "01-foundations"
sourceUrl: "https://github.com/rasbt/LLMs-from-scratch"
entryUrl: "https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/06_user_interface/README.md"
sourceRel: "ch05/06_user_interface/README.md"
rawUrl: "/raw/01-foundations/llms-from-scratch/ch05/06_user_interface/README.md"
sourceSha256: "821a1479d2343498b9b141e418e0af13f7169d77244ce81fae3e0264c81319eb"
pageSha256: "821a1479d2343498b9b141e418e0af13f7169d77244ce81fae3e0264c81319eb"
contentMode: "local-full"
zh: ""
---

# Building a User Interface to Interact With the Pretrained LLM

This bonus folder contains code for running a ChatGPT-like user interface to interact with the pretrained LLMs from chapter 5, as shown below.

![Chainlit UI example](https://sebastianraschka.com/images/LLMs-from-scratch-images/bonus/chainlit/chainlit-orig.webp)

To implement this user interface, we use the open-source [Chainlit Python package](https://github.com/Chainlit/chainlit).

&nbsp;
## Step 1: Install dependencies

First, we install the `chainlit` package via

```bash
pip install chainlit
```

(Alternatively, execute `pip install -r requirements-extra.txt`.)

&nbsp;
## Step 2: Run `app` code

This folder contains 2 files:

1. [`app_orig.py`](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/06_user_interface/app_orig.py): This file loads and uses the original GPT-2 weights from OpenAI. 
2. [`app_own.py`](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/06_user_interface/app_own.py): This file loads and uses the GPT-2 weights we generated in chapter 5. This requires that you execute the [`../01_main-chapter-code/ch05.ipynb`](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/01_main-chapter-code/ch05.ipynb) file first.

(Open and inspect these files to learn more.)

Run one of the following commands from the terminal to start the UI server:

```bash
chainlit run app_orig.py
```

or

```bash
chainlit run app_own.py
```

Running one of the commands above should open a new browser tab where you can interact with the model. If the browser tab does not open automatically, inspect the terminal command and copy the local address into your browser address bar (usually, the address is `http://localhost:8000`).
