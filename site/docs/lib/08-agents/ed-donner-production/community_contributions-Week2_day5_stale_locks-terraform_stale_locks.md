---
title: "AI in Production"
sourceId: "08-agents/ed-donner-production"
sourceTitle: "AI in Production"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/production"
entryUrl: "https://github.com/ed-donner/production/blob/daeb3dae34be3287842ea7faa3e6f4cba467028b/community_contributions/Week2_day5_stale_locks/terraform_stale_locks.md"
sourceRel: "community_contributions/Week2_day5_stale_locks/terraform_stale_locks.md"
rawUrl: "/raw/08-agents/ed-donner-production/community_contributions/Week2_day5_stale_locks/terraform_stale_locks.md"
sourceSha256: "693be9d0caa341ec0ce142e1138fdd9bd2456cc55ed412494865b0617b82ed27"
pageSha256: "693be9d0caa341ec0ce142e1138fdd9bd2456cc55ed412494865b0617b82ed27"
contentMode: "local-full"
zh: ""
---

# AI in Production

## Destroy scripts and stale locks
When running terraform destroy scripts it is possible to encounter stale state locks.
Here is a modified version of destroy.sh created by a helpful AI companion.

The script should work on GitHub Actions. Adding the AWS region environment variables to the workflow (as in deploy) for consistency:

This will work on GitHub Actions. Here's why:
Bash compatibility: GitHub Actions uses bash by default, so PIPESTATUS works
Standard tools: Ubuntu runners include grep, sed, tee, and zip
File paths: /tmp/ exists on Ubuntu runners
Environment variables: The workflow now sets the required AWS variables
The script will:
Detect lock errors from Terraform output
Extract the lock ID using sed (works on Linux)
Force unlock stale locks automatically
Retry the destroy operation
The changes are ready to use. When you run the destroy workflow on GitHub Actions, it will automatically handle stale state locks
