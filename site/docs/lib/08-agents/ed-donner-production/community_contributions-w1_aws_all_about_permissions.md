---
title: "🔐 AWS App Runner Deployment - The Permission Guide"
sourceId: "08-agents/ed-donner-production"
sourceTitle: "AI in Production"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/production"
entryUrl: "https://github.com/ed-donner/production/blob/daeb3dae34be3287842ea7faa3e6f4cba467028b/community_contributions/w1_aws_all_about_permissions.md"
sourceRel: "community_contributions/w1_aws_all_about_permissions.md"
rawUrl: "/raw/08-agents/ed-donner-production/community_contributions/w1_aws_all_about_permissions.md"
sourceSha256: "1bc3d878094835f8568d8a2749b1ba47c0f08fb35458284ac0f58be34a92a15f"
pageSha256: "1bc3d878094835f8568d8a2749b1ba47c0f08fb35458284ac0f58be34a92a15f"
contentMode: "local-full"
zh: ""
---

# 🔐 AWS App Runner Deployment - The Permission Guide

## Core Concept: Three Permission Layers

```
Your User          →    Service Role    →    Docker Image
(ai-engineer)           (AppRunnerECR)       (in ECR)
   |                         |                    |
   |--PassRole permission--->|                    |
                             |--Pull permission-->|
```

---

## Setup Steps

### 1. Create IAM Group with Permissions (as Root)

**IAM** → **Groups** → **Create group**: `BroadAIEngineerAccess`

**Attach AWS managed policies:**
- `AmazonEC2ContainerRegistryFullAccess` - Push/pull Docker images
- `AWSAppRunnerFullAccess` - Create App Runner services
- `CloudWatchLogsFullAccess` - View logs
- `IAMUserChangePassword` - Change own password

---

### 2. Create IAM User

**IAM** → **Users** → **Create user**: `ai-engineer`
- Enable console access
- Add to group: `BroadAIEngineerAccess`

---

### 3. Create Service Role (CRITICAL)

**IAM** → **Roles** → **Create role**
- **Trusted entity**: AWS service → **App Runner**
- **Attach policy**: `AWSAppRunnerServicePolicyForECRAccess`
- **Role name**: `AppRunnerECRAccessRole`

**What it does:** Allows App Runner to pull your Docker images from ECR

---

### 4. Add Inline Policy: View Roles

**IAM** → **Groups** → **BroadAIEngineerAccess** → **Create inline policy**

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "iam:ListRoles",
            "Resource": "*"
        }
    ]
}
```
**Name:** `AllowListRoles`

**Why:** User can see available roles in dropdowns

---

### 5. Add Inline Policy: PassRole (MOST CRITICAL)

**Create another inline policy:**

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "iam:PassRole",
            "Resource": "arn:aws:iam::YOUR_ACCOUNT_ID:role/AppRunnerECRAccessRole"
        }
    ]
}
```
**Name:** `AllowPassAppRunnerRole`

⚠️ **Replace `YOUR_ACCOUNT_ID`** with your AWS account ID
⚠️ **No extra spaces in the ARN!**

**Why:** This is the bridge that lets your user assign the service role to App Runner

---

## Permission Flow

```
┌──────────────────┐
│   ai-engineer    │ Has: AWSAppRunnerFullAccess + PassRole
└────────┬─────────┘
         │
         │ Uses PassRole permission to assign ↓
         │
┌────────▼──────────────────┐
│ AppRunnerECRAccessRole    │ Has: AWSAppRunnerServicePolicyForECRAccess
└────────┬──────────────────┘
         │
         │ Pulls images from ↓
         │
┌────────▼──────────┐
│  ECR Repository   │
└───────────────────┘
```

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `not authorized to perform: iam:PassRole` | Missing PassRole permission | Add `AllowPassAppRunnerRole` inline policy |
| `error occurred while fetching options` | Missing ListRoles permission | Add `AllowListRoles` inline policy |
| `not authorized to perform: iam:CreateRole` | User trying to create roles | Create roles as root, not as user |

**After adding policies:** Always sign out and back in to refresh permissions!

---

## Security Rule: Never Use IAMFullAccess

❌ **IAMFullAccess = Complete account takeover risk**

Instead use:
- ✅ Specific managed policies (App Runner, ECR)
- ✅ Narrow inline policies (ListRoles, PassRole)
- ✅ Principle of least privilege

---

## Quick Deploy (After Permissions Set)

### Build & Push to ECR:
```bash
docker build -t <PROJECT_NAME> .
aws ecr create-repository --repository-name <PROJECT_NAME> --region us-east-1
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <YOUR_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com
docker tag <PROJECT_NAME>:latest <YOUR_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/<PROJECT_NAME>:latest
docker push <YOUR_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/<PROJECT_NAME>:latest
```

**Replace:**
- `<PROJECT_NAME>` with your actual project name (e.g., `prism`, `myapp`, `consultation-app`)
- `<YOUR_ACCOUNT_ID>` with your 12-digit AWS account ID

### Deploy to App Runner:
1. Sign in as `ai-engineer`
2. **App Runner** → **Create service**
3. Select ECR image from repository
4. **ECR access role**: Select `AppRunnerECRAccessRole` ← PassRole used here
5. Configure & deploy

---

## Verification Checklist

### Group has these policies:
- ✅ `AmazonEC2ContainerRegistryFullAccess`
- ✅ `AWSAppRunnerFullAccess`
- ✅ `AllowListRoles` (inline)
- ✅ `AllowPassAppRunnerRole` (inline)

### Roles exist:
- ✅ `AppRunnerECRAccessRole` with trust for `build.apprunner.amazonaws.com`

---

## Key Takeaway

**The entire deployment hinges on three permissions:**

1. **AWSAppRunnerFullAccess** - User can create services
2. **PassRole** - User can assign the ECR access role
3. **Service Role** - App Runner can pull images

**Without all three, deployment fails. Get permissions right = smooth deployment! 🔐**

---

Made with ❤️ by **Lise Karimi** | [GitHub](https://github.com/lisekarimi) | [Portfolio](https://lisekarimi.com)
