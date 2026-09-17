---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/01-math-foundations/12-tensor-operations/outputs/prompt-tensor-debugger.md"
sourceRel: "phases/01-math-foundations/12-tensor-operations/outputs/prompt-tensor-debugger.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/01-math-foundations/12-tensor-operations/outputs/prompt-tensor-debugger.md"
sourceSha256: "a84c14e20bd4ef62a693793ebcea9d1f06f181892ada520359ce17eaa2f7667b"
pageSha256: "a84c14e20bd4ef62a693793ebcea9d1f06f181892ada520359ce17eaa2f7667b"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

I have a tensor shape error in my deep learning code. Help me fix it.

**Error message:** [paste the error here]

**My tensor shapes:**
- \[name]: [shape]
- \[name]: [shape]

**The operation I'm trying to do:** [describe it]

---

When debugging, follow this exact process:

**Step 1: Identify the operation type.**
What operation produced the error? Map it to one of these:
- Matrix multiply / Linear layer (inner dimensions must match)
- Broadcasting (align from right, each dim must be equal or 1)
- Concatenation (all dims match except the cat dimension)
- Convolution (expects specific rank and channel position)
- Reshape (total elements must be preserved)

**Step 2: Write out the shape contract.**
For the identified operation, write the expected shapes explicitly:
```
matmul(A, B): A is (..., m, k), B is (..., k, n) -> (..., m, n)
broadcast(A, B): align right, each pair must be (equal) or (one is 1)
cat([A, B], dim=d): all dims match except dim d
Linear(in_f, out_f): input last dim must equal in_f
Conv2d(in_c, out_c, k): input must be (B, in_c, H, W)
```

**Step 3: Find the mismatch.**
Compare actual shapes against the contract. Identify the exact dimension that violates the rule.

**Step 4: Choose the minimal fix.**
Pick from this table:

| Symptom | Fix |
|---|---|
| Missing batch dimension | `.unsqueeze(0)` |
| Missing channel dimension | `.unsqueeze(1)` |
| Extra size-1 dimension | `.squeeze(dim)` |
| Inner dims wrong for matmul | `.transpose(-1, -2)` or check weight shape |
| Need NCHW from NHWC | `.permute(0, 3, 1, 2)` |
| Need NHWC from NCHW | `.permute(0, 2, 3, 1)` |
| Flatten spatial dims for linear | `.flatten(1)` or `.reshape(B, -1)` |
| Split heads: (B,T,D) to (B,H,T,D/H) | `.reshape(B, T, H, D//H).transpose(1, 2)` |
| Merge heads: (B,H,T,D/H) to (B,T,D) | `.transpose(1, 2).reshape(B, T, H*(D//H))` |
| Non-contiguous tensor with .view() | `.contiguous().view(...)` or use `.reshape(...)` |

**Step 5: Verify the fix.**
Show the resulting shapes at each step. Confirm total elements are preserved across any reshape. Confirm the operation's shape contract is now satisfied.

**Step 6: Check for silent bugs.**
Even if shapes match, verify:
- Broadcasting is happening along the intended axis (not accidentally)
- Reduction is summing over the right dimension
- The batch dimension (dim 0) survives through the entire forward pass
- Transpose + reshape is used (not just reshape) when dimension ordering matters

Format your response as:
```
OPERATION: [what operation failed]
EXPECTED: [shape contract]
ACTUAL: [what shapes were provided]
MISMATCH: [which dimension, why]
FIX: [exact code]
RESULT: [shapes after fix]
```
