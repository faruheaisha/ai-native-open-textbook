---
title: "Sample Receipt Fixtures"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/18-securing-ai-agents/code_samples/sample_receipts/README.md"
sourceRel: "18-securing-ai-agents/code_samples/sample_receipts/README.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/18-securing-ai-agents/code_samples/sample_receipts/README.md"
sourceSha256: "6bf61d6eec23a801b4c134ba65702aae4046b6bd3ae56e695eda9e077f766491"
pageSha256: "6bf61d6eec23a801b4c134ba65702aae4046b6bd3ae56e695eda9e077f766491"
contentMode: "local-full"
zh: ""
---

# Sample Receipt Fixtures

Three pre-generated receipt files for inspection without running the notebook.

| File | What it is |
|---|---|
| `01_valid_receipt.json` | A valid signed receipt for a `lookup_flights` tool call. Verification returns True. |
| `02_tampered_receipt.json` | The same receipt with one field modified after signing. Verification returns False. |
| `03_chain_three_receipts.json` | A chain of three valid receipts (search, hold, book) with `previous_receipt_hash` linking each to the prior one. |

The fixtures sign the payload's canonical JCS bytes directly with Ed25519.
SHA-256 remains in use for content digests and receipt-chain links, not as an
extra pre-hash before signing.

## Verifying the samples

The notebook walks through verification in four sections. To verify these fixtures
directly without running through the notebook narrative:

```python
import json
from pathlib import Path

# Assumes you have completed the imports and helper functions
# from sections 1 and 2 of 18-signed-receipts.ipynb.

valid = json.loads(Path("01_valid_receipt.json").read_text())
print(f"Valid receipt: {verify_receipt(valid)}")        # True

tampered = json.loads(Path("02_tampered_receipt.json").read_text())
print(f"Tampered receipt: {verify_receipt(tampered)}")  # False

chain = json.loads(Path("03_chain_three_receipts.json").read_text())
for r in verify_chain(chain):
    print(f"  Receipt {r['index']} ({r['tool']}): {'VALID' if r['overall_valid'] else 'INVALID'}")
```

## How these were generated

The fixtures use the same code path as the notebook, with one fixed signing key
and fixed timestamps for byte-reproducibility. To regenerate:

```bash
python3 generate_fixtures.py
```

(Script is at `generate_fixtures.py` in this directory.)

## What students learn from inspecting raw JSON

Reading the raw receipt format builds intuition that the cells in the notebook
do not always provide. Students who skim the JSON often notice:

1. The signature is an opaque base64url string, but every other field is plain
   readable JSON. The signature does not encrypt the content; it attests to it.
2. The `public_key` is embedded in the receipt. An auditor needs nothing else
   to verify (subject to trusting that the key actually belongs to the claimed
   issuer; see the lesson README on identity infrastructure).
3. Modifying a single character of any field, then re-comparing this file with
   `02_tampered_receipt.json`, makes the byte-level mechanism concrete.
