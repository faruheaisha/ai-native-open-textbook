---
title: "Hackers Leaderboard"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/apps/hackers-leaderboard/README.md"
sourceRel: "hugging-face-skills/apps/hackers-leaderboard/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/hugging-face-skills/apps/hackers-leaderboard/README.md"
sourceSha256: "7020c859bcf72ec4508954326e82fbde48961921355d6e5e6e4850ff33374532"
pageSha256: "7020c859bcf72ec4508954326e82fbde48961921355d6e5e6e4850ff33374532"
contentMode: "local-full"
zh: ""
---

# Hackers Leaderboard

Tracks engagement from the [hf-skills](https://huggingface.co/hf-skills) organization for the hackathon leaderboard.

## How Points Work

Simple and fair - **1 point per activity**:

| Activity | Points |
|----------|--------|
| 💬 Open a discussion | 1 |
| 📝 Post a comment | 1 |
| 🔀 Open a PR | 1 |
| 📦 Own/create a repo | 1 |

## Scripts

### Collect Points

```bash
# Collect org activity only
HF_TOKEN=$HF_TOKEN python collect_points.py

# Also scan trending repos for member PRs/discussions
HF_TOKEN=$HF_TOKEN python collect_points.py --scan-external

# Scan only specific repo types
HF_TOKEN=$HF_TOKEN python collect_points.py --scan-external --repo-type models
HF_TOKEN=$HF_TOKEN python collect_points.py --scan-external --repo-type models datasets

# Push to HF dataset
HF_TOKEN=$HF_TOKEN python collect_points.py --scan-external --push-to-hub

# Custom output
python collect_points.py --output my_leaderboard.json --repo-id my-org/my-dataset
```

### Options

| Flag | Description |
|------|-------------|
| `--scan-external` | Scan trending repos across Hub for member activity |
| `--repo-type` | Filter external scan to: `models`, `datasets`, `spaces` |
| `--push-to-hub` | Push results to HF dataset |
| `--repo-id` | Target dataset repo (default: `hf-skills/hackers-leaderboard`) |
| `--output` | Local JSON output path |

### Run the App

```bash
HF_TOKEN=$HF_TOKEN python app.py
```

## API

The collector scans:
- All models, datasets, and spaces in the org
- All discussions and PRs on those repos
- All comments on discussions

Results are saved as JSONL for easy dataset consumption.

## Output Format

```json
{
  "username": "user123",
  "total_points": 15,
  "discussions_opened": 3,
  "comments_made": 8,
  "prs_opened": 2,
  "repos_owned": 2
}
```
