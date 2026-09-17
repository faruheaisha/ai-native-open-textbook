---
title: "Appendix A: Introduction to PyTorch"
sourceId: "01-foundations/llms-from-scratch"
sourceTitle: "LLMs from Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "01-foundations"
sourceUrl: "https://github.com/rasbt/LLMs-from-scratch"
entryUrl: "https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/appendix-A/01_main-chapter-code/README.md"
sourceRel: "appendix-A/01_main-chapter-code/README.md"
rawUrl: "/raw/01-foundations/llms-from-scratch/appendix-A/01_main-chapter-code/README.md"
sourceSha256: "1eb1d7ddf169edde5ac65c771c2271b4b82855dfb93e513e3af111b3fe05b5ba"
pageSha256: "1eb1d7ddf169edde5ac65c771c2271b4b82855dfb93e513e3af111b3fe05b5ba"
contentMode: "local-full"
zh: ""
---

# Appendix A: Introduction to PyTorch

### Main Chapter Code

- [code-part1.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/appendix-A/01_main-chapter-code/code-part1.ipynb) contains all the section A.1 to A.8 code as it appears in the chapter
- [code-part2.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/appendix-A/01_main-chapter-code/code-part2.ipynb) contains all the section A.9 GPU code as it appears in the chapter 
- [DDP-script.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/appendix-A/01_main-chapter-code/DDP-script.py) contains the script to demonstrate multi-GPU usage (note that Jupyter Notebooks only support single GPUs, so this is a script, not a notebook). You can run it as `python DDP-script.py`. If your machine has more than 2 GPUs, run it as `CUDA_VISIBLE_DEVIVES=0,1 python DDP-script.py`.
- [exercise-solutions.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/appendix-A/01_main-chapter-code/exercise-solutions.ipynb) contains the exercise solutions for this chapter

### Optional Code

- [DDP-script-torchrun.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/appendix-A/01_main-chapter-code/DDP-script-torchrun.py) is an optional version of the `DDP-script.py` script that runs via the PyTorch `torchrun` command instead of spawning and managing multiple processes ourselves via `multiprocessing.spawn`. The `torchrun` command has the advantage of automatically handling distributed initialization, including multi-node coordination, which slightly simplifies the setup process. You can use this script via `torchrun --nproc_per_node=2 DDP-script-torchrun.py`
