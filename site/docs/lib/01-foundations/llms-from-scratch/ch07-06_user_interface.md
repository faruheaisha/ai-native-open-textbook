---
title: "Building a User Interface to Interact With the Instruction Finetuned GPT Model"
sourceId: "01-foundations/llms-from-scratch"
sourceTitle: "LLMs from Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "01-foundations"
sourceUrl: "https://github.com/rasbt/LLMs-from-scratch"
entryUrl: "https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/06_user_interface/README.md"
sourceRel: "ch07/06_user_interface/README.md"
rawUrl: "/raw/01-foundations/llms-from-scratch/ch07/06_user_interface/README.md"
sourceSha256: "bff1baab26f24f340cbd68b1fa3ef43683da12bd039bdea6468b6067332f877a"
pageSha256: "bff1baab26f24f340cbd68b1fa3ef43683da12bd039bdea6468b6067332f877a"
contentMode: "local-full"
zh: ""
---

# Building a User Interface to Interact With the Instruction Finetuned GPT Model

This bonus folder contains code for running a ChatGPT-like user interface to interact with the instruction finetuned GPT from chapter 7, as shown below.

![Chainlit UI example](https://sebastianraschka.com/images/LLMs-from-scratch-images/bonus/chainlit/chainlit-sft.webp?2)

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

The [`app.py`](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/06_user_interface/app.py) file contains the UI code based. Open and inspect these files to learn more.

This file loads and uses the GPT-2 weights we generated in chapter 7. This requires that you execute the [`../01_main-chapter-code/ch07.ipynb`](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/01_main-chapter-code/ch07.ipynb) file first.

Excecute the following command from the terminal to start the UI server:

```bash
chainlit run app.py
```

Running commands above should open a new browser tab where you can interact with the model. If the browser tab does not open automatically, inspect the terminal command and copy the local address into your browser address bar (usually, the address is `http://localhost:8000`).
