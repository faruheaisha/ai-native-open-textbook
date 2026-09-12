---
title: "Generated data"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/README.md"
zh: "on"
---

# Generated data

This folder is where Week 1 writes the synthetic freight dataset. The files
themselves are gitignored. You generate them locally:

<div class="tb-zh"><p>这个目录是第 1 周写入合成货运数据集的地方。数据文件本身被 gitignore 忽略，你在本地生成它们：</p></div>

```python
from zoro import data
data.save_all()          # writes CSV + Parquet under data/
```

Do not commit the generated tables. Anyone who clones the repo can rebuild the
same rows from `zoro/data.py` with the same seed.

<div class="tb-zh"><p>不要把生成的表提交上去。任何人 clone 这个仓库后，都能用同一个随机种子从 zoro/data.py 重建出同样的数据行。</p></div>
