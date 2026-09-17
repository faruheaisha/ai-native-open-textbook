---
title: "Day 5: Deploy Your SaaS to AWS — Container on AWS Lambda"
sourceId: "08-agents/ed-donner-production"
sourceTitle: "AI in Production"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/production"
entryUrl: "https://github.com/ed-donner/production/blob/daeb3dae34be3287842ea7faa3e6f4cba467028b/week1/day5.md"
sourceRel: "week1/day5.md"
rawUrl: "/raw/08-agents/ed-donner-production/week1/day5.md"
sourceSha256: "156ae552874b63e9bd802bde84ab51ef3c829e289f222d91b171a09cf9f1a50d"
pageSha256: "156ae552874b63e9bd802bde84ab51ef3c829e289f222d91b171a09cf9f1a50d"
contentMode: "local-full"
zh: ""
---

# Day 5: Deploy Your SaaS to AWS — Container on AWS Lambda

## Important — Read This First (April 2026 Update) - Change from App Runner

**AWS has put App Runner into maintenance mode.** As of April 30, 2026, App Runner stopped accepting new customers. Existing customers can keep using it for now, but no new features are planned. The original videos for this lesson use App Runner — that path is no longer available to new students, so this document replaces those instructions.

**AWS officially recommends migrating to "Amazon ECS Express Mode"** as the App Runner replacement. I do not recommend it for this course. ECS Express Mode automatically provisions an Application Load Balancer (~$16/month minimum even when idle) plus other infrastructure — too much cost and too much complexity for deploying a single container.

**Instead, we'll deploy the same Docker container to AWS Lambda using the AWS Lambda Web Adapter.** This is both simpler and easier. We cover Lambda is more detail in Week 2; it is the most natural go-to service for AWS, and it supports Docker containers.

The architecture from the videos still applies almost everywhere: you still build a Docker container, still push it to ECR, still set environment variables, still get a public HTTPS URL. **Only Part 7 changes substantially** (we create a Lambda function instead of an App Runner service), with small adjustments to Part 1 Step 5 (IAM policies), Part 4 Step 1 (Dockerfile), Part 8, and Part 9. Every section that changed is clearly marked.

If you are watching the videos alongside this guide: the section numbers below match the videos exactly. Where the contents of a section changed, you'll see the note **"This section is changed due to the AWS App Runner changes"** at the top of that section. Every other section follows the videos as-is.

I've also recorded an extra video to highlight the approach covered here - here's a link to the video: https://youtu.be/aNYbZpLwBj0

---

## What You'll Learn

- **Docker containerization** for consistent deployments
- **AWS fundamentals** and account setup
- **AWS Lambda container images** for serverless container hosting (replacing App Runner)
- **Lambda Function URLs** for direct HTTPS access without API Gateway
- **AWS Lambda Web Adapter** to run a normal FastAPI app on Lambda unchanged
- **Cost monitoring** to keep your AWS bill under control

## Important: Budget Protection First!

AWS charges for resources you use. Let's set up cost alerts BEFORE deploying anything.

**Expected costs**: With Lambda's generous free tier, expect **$0/month** for typical course usage. Even with hundreds of test requests you should stay inside the free tier. ECR storage for your image costs about $0.10/month.

We'll still set up budget alerts at $1, $5, and $10 to track spending. This is a crucial professional practice.

## Understanding AWS Services We'll Use

### AWS Lambda
**Lambda** is AWS's serverless compute service. It runs your code (or a container image, in our case) only when it's invoked, and you pay only for the compute time you use, billed in millisecond increments. Cold starts (the very first invocation) take a few seconds; warm invocations are fast. Lambda supports container images up to 10GB.

### Lambda Function URLs
**Function URLs** are dedicated HTTPS endpoints that route directly to a Lambda function — no API Gateway needed, no extra cost. The URL looks like `https://<id>.lambda-url.<region>.on.aws/`. As of November 2025, Function URLs support response streaming, which is what we'll use to stream Server-Sent Events from FastAPI.

### AWS Lambda Web Adapter
The **Lambda Web Adapter** is an open-source Lambda extension from AWS Labs. By dropping a single binary into your container at `/opt/extensions/lambda-adapter`, you can run any standard web framework (FastAPI, Flask, Express, etc.) on Lambda without modifying your application code. The adapter translates Lambda invocations into HTTP requests to your local web server (FastAPI listening on port 8000) and translates responses back. With response streaming enabled, it streams chunks as your FastAPI app yields them.

### Amazon ECR (Elastic Container Registry)
**ECR** is like GitHub but for Docker images. It's where we'll store our containerized application before deploying it to Lambda.

### AWS IAM (Identity and Access Management)
**IAM** controls who can access what in your AWS account. We'll create a special user account with limited permissions for safety — never use your root account for daily work.

### CloudWatch
**CloudWatch** is AWS's monitoring service. It collects logs from your Lambda function and helps you debug issues — like having the browser console for your server.

## Part 1: Create Your AWS Account

### Step 1: Sign Up for AWS

1. Visit [aws.amazon.com](https://aws.amazon.com)
2. Click **Create an AWS Account**
3. Enter your email and choose a password
4. Select **Personal** account type, but not "free tier" - see note below
5. Enter payment information (required, but we'll set up cost alerts)
6. Verify your phone number via SMS
7. Select **Basic Support - Free**

You now have an AWS root account. This is like having admin access — powerful but dangerous!

> There's an option for first time users of AWS to select the "free tier" of AWS. Don't choose this! It only has limited access to AWS services. It would work for today's projects, but it might not support future projects. This doesn't mean that you need to pay a subscription or pay for support; just that you need to enter payment details and not be in a sandbox environment.

### Step 2: Secure Your Root Account

1. Sign in to AWS Console
2. Click your account name (top right) → **Security credentials**
3. Enable **Multi-Factor Authentication (MFA)**:
   - Click **Assign MFA device**
   - Name: `root-mfa`
   - Select **Authenticator app**
   - Scan QR code with Google Authenticator or Authy
   - Enter two consecutive codes
   - Click **Add MFA**

### Step 3: Set Up Budget Alerts (Critical!)

1. In AWS Console, search for **Billing** and click **Billing and Cost Management**
2. In the left menu, click **Budgets**
3. Click **Create budget**
4. Select **Use a template (simplified)**
5. Choose **Monthly cost budget**
6. Set up three budgets:

**Budget 1 - Early Warning ($1)**:
- Budget name: `early-warning`
- Enter budgeted amount: `1` USD
- Email recipients: Enter your email address
- Click **Create budget**

**Budget 2 - Caution ($5)**:
- Repeat: Create budget → Use a template → Monthly cost budget
- Budget name: `caution-budget`
- Enter budgeted amount: `5` USD
- Email recipients: Enter your email address
- Click **Create budget**

**Budget 3 - Stop Alert ($10)**:
- Repeat: Create budget → Use a template → Monthly cost budget
- Budget name: `stop-budget`
- Enter budgeted amount: `10` USD
- Email recipients: Enter your email address
- Click **Create budget**

If you hit $10, stop and review what's running.

### Step 4: Create an IAM User for Daily Work

Never use your root account for daily work. Let's create a limited user:

1. Search for **IAM** in the AWS Console
2. Click **Users** → **Create user**
3. Username: `aiengineer`
4. Check **Provide user access to the AWS Management Console**
5. Select **I want to create an IAM user**
6. Choose **Custom password** and set a strong password
7. Uncheck **Users must create a new password at next sign-in**
8. Click **Next**

### Step 5: Create a User Group with Permissions

**This section is changed due to the AWS App Runner changes.** The IAM policies attached to the group are different — we replace `AWSAppRunnerFullAccess` with `AWSLambda_FullAccess`. Everything else in this section is identical to the videos.

We'll create a reusable permission group first, then add our user to it:

1. On the permissions page, select **Add user to group**
2. Click **Create group**
3. Group name: `BroadAIEngineerAccess`
4. In the permissions policies search, find and check these policies (note: **the first item replaces what the video shows**):
   - **`AWSLambda_FullAccess`** — to deploy and manage Lambda functions (replaces the video's `AWSAppRunnerFullAccess`)
   - `AmazonEC2ContainerRegistryFullAccess` — to store Docker images
   - `CloudWatchLogsFullAccess` — to view logs
   - `IAMUserChangePassword` — to manage own credentials
   - `IAMFullAccess` — required to let Lambda create its own service-linked execution role
5. Click **Create user group**
6. Back on the permissions page, select the `BroadAIEngineerAccess` group (it should be checked)
7. Click **Next** → **Create user**
8. **Important**: Click **Download .csv file** and save it securely!

It's worth keeping in mind that you might get permissions errors throughout the course, when AWS complains that your user doesn't have permission to do something. The solution is usually to come back to this screen (as the root user) and attach another policy. This is a very common chore working with AWS.

### Step 6: Sign In as IAM User

1. Sign out from root account
2. Go to your AWS sign-in URL (in the CSV file, looks like: `https://123456789012.signin.aws.amazon.com/console`)
3. Sign in with:
   - Username: `aiengineer`
   - Password: (the one you created)

**Checkpoint**: You should see "aiengineer @ Account-ID" in the top right corner.

## Part 2: Install Docker Desktop

Docker lets us package our application into a container — like a shipping container for software!

### Step 1: Install Docker Desktop

1. Visit [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Download for your system:
   - **Mac**: Download for Mac (Apple Silicon or Intel)
   - **Windows**: Download for Windows (requires Windows 10/11)
3. Run the installer
4. **Windows users**: Docker Desktop will install WSL2 if needed — accept all prompts
5. Start Docker Desktop
6. You may need to restart your computer

### Step 2: Verify Docker Works

Open Terminal (Mac) or PowerShell (Windows):

```bash
docker --version
```

You should see: `Docker version 26.x.x` or similar

Test Docker:
```bash
docker run hello-world
```

You should see a message starting with "Hello from Docker!" confirming Docker is working correctly.

**Checkpoint**: Docker Desktop icon should be running (whale icon in system tray/menu bar).

## Part 3: Prepare Your Application

We need to modify our Day 4 application for AWS deployment. The key change: we'll export Next.js as static files and serve everything from a single container.

### Step 1: Update Project Structure

Your project should look like this:
```
saas/
├── pages/                  # Next.js Pages Router
├── styles/                 # CSS styles
├── api/                    # FastAPI backend
├── public/                 # Static assets
├── node_modules/
├── .env.local              # Your secrets (never commit!)
├── .gitignore
├── package.json
├── requirements.txt
├── next.config.ts
└── tsconfig.json
```

### Step 2: Convert to Static Export

**Important Architecture Change**: On Vercel, our Next.js app could make server-side requests. For AWS simplicity, we'll export Next.js as static HTML/JS files and serve them from our Python backend. This means everything runs in one container — and that one container will run on Lambda.

**Note about Middleware**: With Pages Router, we don't use middleware files. Authentication is handled entirely by Clerk's client-side components (`<Protect>`, `<SignedIn>`, etc.) which work perfectly with static exports.

Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // This exports static HTML/JS files
  images: {
    unoptimized: true  // Required for static export
  }
};

export default nextConfig;
```

### Step 3: Update Frontend API Calls

Since we're serving everything from the same container, we need to update how the frontend calls the backend.

Update `pages/product.tsx` — find the `fetchEventSource` call and change it:

```typescript
// Old (Vercel):
await fetchEventSource('/api', {

// New (AWS):
await fetchEventSource('/api/consultation', {
```

This works because both frontend and backend will be served from the same domain.

### Step 4: Update Backend Server

Create a new file `api/server.py` (the same FastAPI server that worked for App Runner — no changes are required for it to run on Lambda; the Lambda Web Adapter handles the translation transparently):

```python
import os
from pathlib import Path
from fastapi import FastAPI, Depends
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi_clerk_auth import ClerkConfig, ClerkHTTPBearer, HTTPAuthorizationCredentials
from openai import OpenAI

app = FastAPI()

# Add CORS middleware (allows frontend to call backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Clerk authentication setup
clerk_config = ClerkConfig(jwks_url=os.getenv("CLERK_JWKS_URL"))
clerk_guard = ClerkHTTPBearer(clerk_config)

class Visit(BaseModel):
    patient_name: str
    date_of_visit: str
    notes: str

system_prompt = """
You are provided with notes written by a doctor from a patient's visit.
Your job is to summarize the visit for the doctor and provide an email.
Reply with exactly three sections with the headings:
### Summary of visit for the doctor's records
### Next steps for the doctor
### Draft of email to patient in patient-friendly language
"""

def user_prompt_for(visit: Visit) -> str:
    return f"""Create the summary, next steps and draft email for:
Patient Name: {visit.patient_name}
Date of Visit: {visit.date_of_visit}
Notes:
{visit.notes}"""

@app.post("/api/consultation")
def consultation_summary(
    visit: Visit,
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
):
    user_id = creds.decoded["sub"]
    client = OpenAI()

    user_prompt = user_prompt_for(visit)
    prompt = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]

    stream = client.chat.completions.create(
        model="gpt-5-nano",
        messages=prompt,
        stream=True,
    )

    def event_stream():
        for chunk in stream:
            text = chunk.choices[0].delta.content
            if text:
                lines = text.split("\n")
                for line in lines[:-1]:
                    yield f"data: {line}\n\n"
                    yield "data:  \n"
                yield f"data: {lines[-1]}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")

@app.get("/health")
def health_check():
    """Health check endpoint (used for local Docker; Lambda does not invoke it)"""
    return {"status": "healthy"}

# Serve static files (our Next.js export) - MUST BE LAST!
static_path = Path("static")
if static_path.exists():
    @app.get("/")
    async def serve_root():
        return FileResponse(static_path / "index.html")

    app.mount("/", StaticFiles(directory="static", html=True), name="static")
```

### Step 5: Create Environment File for AWS

Create `.env` file (copy from `.env.local` but add AWS info):

```bash
# Copy your values from .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_JWKS_URL=https://...
OPENAI_API_KEY=sk-...

# Add AWS configuration (use your chosen region from earlier) - us-east-1 or eu-west-1 etc
DEFAULT_AWS_REGION=us-east-1
AWS_ACCOUNT_ID=123456789012
```

**To find your AWS Account ID**:
1. In AWS Console, click your username (top right)
2. Copy the 12-digit Account ID

**Important**: Add `.env` to your `.gitignore` file if not already there.

## Part 4: Create Docker Configuration

Docker lets us package everything into a single container that runs anywhere.

### Step 1: Create Dockerfile

**This section is changed due to the AWS App Runner changes.** The Dockerfile is almost identical to the video's version. The only differences are three new lines that add the AWS Lambda Web Adapter as a Lambda extension and configure it. The same image still works for local Docker testing — the Web Adapter is a Lambda extension that only activates when the image is invoked by the Lambda runtime.

Create `Dockerfile` in your project root:

```dockerfile
# Stage 1: Build the Next.js static files
FROM node:22-alpine AS frontend-builder

WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./
RUN npm ci

# Copy all frontend files
COPY . .

# Build argument for Clerk public key
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# Note: Docker may warn about "secrets in ARG/ENV" - this is OK!
# The NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is meant to be public (it starts with pk_)

# Build the Next.js app (creates 'out' directory with static files)
RUN npm run build

# Stage 2: Create the final Python container
FROM python:3.12-slim

WORKDIR /app

# --- Lambda Web Adapter additions (the only changes vs. the video's Dockerfile) ---
# Drops a Lambda extension binary into /opt/extensions. The binary is inert
# unless invoked by the Lambda runtime, so local `docker run` is unaffected.
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:1.0.0 /lambda-adapter /opt/extensions/lambda-adapter

# Tell the adapter which port FastAPI listens on
ENV PORT=8000

# Enable Lambda response streaming (required so SSE / streaming endpoints work end-to-end)
ENV AWS_LWA_INVOKE_MODE=response_stream
# --- end of Lambda Web Adapter additions ---

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the FastAPI server
COPY api/server.py .

# Copy the Next.js static export from builder stage
COPY --from=frontend-builder /app/out ./static

# Health check (used during local Docker testing; Lambda does not call it)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"

# Expose port 8000 (FastAPI will serve everything)
EXPOSE 8000

# Start the FastAPI server
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Step 2: Create .dockerignore

Create `.dockerignore` to exclude unnecessary files:

```
node_modules
.next
.env
.env.local
.git
.gitignore
README.md
.DS_Store
*.log
.vercel
dist
build
```

## Part 5: Build and Test Locally

Let's test our containerized app before deploying to AWS. **The Lambda Web Adapter does not affect local testing — your container still runs as a normal FastAPI server on port 8000.**

### Step 1: Load Environment Variables

**Mac/Linux** (Terminal):
```bash
export $(cat .env | grep -v '^#' | xargs)
```

**Windows** (PowerShell):
```powershell
Get-Content .env | ForEach-Object {
    if ($_ -match '^(.+?)=(.+)$') {
        [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2])
    }
}
```

### Step 2: Build the Docker Image

Build your container:

**Mac/Linux**:
```bash
docker build \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" \
  -t consultation-app .
```

**Windows PowerShell**:
```powershell
docker build `
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$env:NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" `
  -t consultation-app .
```

This will take 2-3 minutes the first time.

Windows people: if you get an error `The image manifest, config or layer media type for the source image [...] is not supported` then please go to Docker Desktop -> Settings -> General and make sure that "Use containerd for pulling and storing images checkbox" is NOT checked. Thank you Muhammad T. for this pro tip..

### Step 3: Run Locally

**Mac/Linux**:
```bash
docker run -p 8000:8000 \
  -e CLERK_SECRET_KEY="$CLERK_SECRET_KEY" \
  -e CLERK_JWKS_URL="$CLERK_JWKS_URL" \
  -e OPENAI_API_KEY="$OPENAI_API_KEY" \
  consultation-app
```

**Windows PowerShell**:
```powershell
docker run -p 8000:8000 `
  -e CLERK_SECRET_KEY="$env:CLERK_SECRET_KEY" `
  -e CLERK_JWKS_URL="$env:CLERK_JWKS_URL" `
  -e OPENAI_API_KEY="$env:OPENAI_API_KEY" `
  consultation-app
```

### Step 4: Test Your Application

1. Open browser to `http://localhost:8000`
2. Sign in with your Clerk account
3. Test the consultation form
4. Verify everything works!

**To stop**: Press `Ctrl+C` in the terminal.

**Checkpoint**: Application works identically to the Vercel version.

## Part 6: Deploy to AWS

Now let's push our container to ECR. (In Part 7, we'll point Lambda at it.)

### Step 1: Create ECR Repository

ECR (Elastic Container Registry) is where we'll store our Docker image.

1. In AWS Console, search for **ECR**
2. Click **Get started** or **Create repository**
3. **Important**: Make sure you're in the correct region (top right of AWS Console — should match your `DEFAULT_AWS_REGION`)
4. Settings:
   - Visibility settings: **Private** (or the heading might be 'Create private repository')
   - Repository name: `consultation-app` (must match exactly!)
   - Leave all other settings as default
5. Click **Create repository**
6. **Verify**: You should see your new `consultation-app` repository in the list

### Step 2: Set Up AWS CLI

We need AWS CLI to push our image.

#### Create Access Keys

1. In AWS Console, go to **IAM**
2. Click **Users** → click on `aiengineer`
3. Click **Security credentials** tab
4. Under **Access keys**, click **Create access key**
5. Select **Command Line Interface (CLI)**
6. Check the confirmation box → **Next**
7. Description: `Docker push access`
8. Click **Create access key**
9. **Critical**: Download CSV or copy both:
   - Access key ID (like: `AKIAIOSFODNN7EXAMPLE`)
   - Secret access key (like: `wJalrXUtnFEMI/K7MDENG/bPxRfiCY`)
10. Click **Done**

#### Configure AWS CLI

Install AWS CLI if you haven't:
- **Mac**: `brew install awscli` or download from [aws.amazon.com/cli](https://aws.amazon.com/cli/)
- **Windows**: Download installer from [aws.amazon.com/cli](https://aws.amazon.com/cli/)

Configure it:
```bash
aws configure
```

Enter:
- AWS Access Key ID: (paste your key)
- AWS Secret Access Key: (paste your secret)
- Default region: Choose based on your location:
  - **US East Coast**: `us-east-1` (N. Virginia)
  - **US West Coast**: `us-west-2` (Oregon)
  - **Europe**: `eu-west-1` (Ireland)
  - **Asia**: `ap-southeast-1` (Singapore)
  - **Pick the closest region for best performance!**
- Default output format: `json`

**Important**: Remember your region choice — your ECR repository, Lambda function, and AWS CLI must all use the same region.

### Step 3: Push Image to ECR

1. In ECR console, click your `consultation-app` repository
2. Click **View push commands** to see AWS's customized version of these commands
3. **First, make sure your environment variables are loaded** (from Part 5, Step 1).

**Understanding the authentication**: The first command gets a temporary password from AWS and pipes it to Docker. You won't be prompted for a password — it's all automatic.

**Mac/Linux**:
```bash
# 1. Authenticate Docker to ECR (using your .env values!)
aws ecr get-login-password --region $DEFAULT_AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$DEFAULT_AWS_REGION.amazonaws.com

# 2. Build for Linux/AMD64 (CRITICAL for Apple Silicon Macs!)
docker build \
  --platform linux/amd64 \
  --provenance=false \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" \
  -t consultation-app .

# 3. Tag your image
docker tag consultation-app:latest $AWS_ACCOUNT_ID.dkr.ecr.$DEFAULT_AWS_REGION.amazonaws.com/consultation-app:latest

# 4. Push to ECR
docker push $AWS_ACCOUNT_ID.dkr.ecr.$DEFAULT_AWS_REGION.amazonaws.com/consultation-app:latest
```

**Windows PowerShell**:
```powershell
# 1. Authenticate Docker to ECR
aws ecr get-login-password --region $env:DEFAULT_AWS_REGION | docker login --username AWS --password-stdin "$env:AWS_ACCOUNT_ID.dkr.ecr.$env:DEFAULT_AWS_REGION.amazonaws.com"

# 2. Build for Linux/AMD64
docker build `
  --platform linux/amd64 `
  --provenance=false `
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$env:NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" `
  -t consultation-app .

# 3. Tag your image
docker tag consultation-app:latest "$env:AWS_ACCOUNT_ID.dkr.ecr.$env:DEFAULT_AWS_REGION.amazonaws.com/consultation-app:latest"

# 4. Push to ECR
docker push "$env:AWS_ACCOUNT_ID.dkr.ecr.$env:DEFAULT_AWS_REGION.amazonaws.com/consultation-app:latest"
```

**Note for Apple Silicon (M1/M2/M3/M4/M5) Macs**: The `--platform linux/amd64` flag is ESSENTIAL. Without it, Lambda will fail with an "exec format error" because Lambda runs amd64 by default.

The push will take 2-5 minutes depending on your internet speed.

**Checkpoint**: In ECR console, you should see your image with tag `latest`.

## Part 7: Create Lambda Function (replaces App Runner)

**This section is changed due to the AWS App Runner changes.** The video creates an App Runner service here. We'll instead create a Lambda function from the same ECR image, then attach a Function URL with response streaming enabled. The end result is the same: a public HTTPS URL pointing at your container.

### Step 1: Launch Lambda

1. In AWS Console, search for **Lambda**
2. Confirm the **region (top right)** matches the region your ECR image is in
3. Click **Create function**

### Step 2: Configure Source

1. Select **Container image** (not "Author from scratch")
2. **Function name**: `consultation-app`
3. **Container image URI**: click **Browse images**
   - Select repository: `consultation-app`
   - Select tag: `latest`
   - Click **Select image**
4. Click **Create function**

Lambda will take 30-60 seconds to provision the function and pull the image.

### Step 3: Configure Service

Now configure resources and environment variables.

#### Memory and Timeout

1. On your function's page, click the **Configuration** tab
2. Click **General configuration** (left side) → **Edit**
3. Set:
   - **Memory**: `1024 MB` — gives FastAPI + the Next.js static handler comfortable headroom
   - **Ephemeral storage**: leave default (`512 MB`)
   - **Timeout**: `5 min 0 sec` (`300` seconds) — long enough for the longest expected OpenAI streaming response
4. Click **Save**

#### Cap Concurrency at 4

By default, Lambda will scale your function out to many concurrent containers under load. For a course project, you want a hard cap so a runaway loop or a bot can't rack up usage. We'll set **Reserved Concurrency** to `4` — meaning at most 4 containers will ever run at the same time. Anything beyond that will be throttled with HTTP 429 until one finishes.

5. Still in the **Configuration** tab, click **Concurrency and recursion detection** (left side)
6. On the **Concurrency** card, click **Edit**
7. Select **Reserve concurrency**
8. Enter `4` for **Reserved concurrency**
9. Click **Save**

> **Important — do NOT touch Provisioned concurrency.** That's a separate, paid feature on a different card on the same page that pre-warms containers and **costs money even when idle**. We only want **Reserved** concurrency, which is free and just acts as a ceiling. Leave Provisioned concurrency alone.

#### Environment Variables

10. Still in the **Configuration** tab, click **Environment variables** → **Edit** → **Add environment variable** for each (these match what App Runner used):
    - `CLERK_SECRET_KEY` = (paste your value)
    - `CLERK_JWKS_URL` = (paste your value)
    - `OPENAI_API_KEY` = (paste your value)
11. Click **Save**

You don't need `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` here — it was baked into the static files at build time. You also don't need to re-set `PORT` or `AWS_LWA_INVOKE_MODE` — those are already set inside the Dockerfile.

### Step 4: Create the Function URL (replaces health-check configuration)

In the video, I use an App Runner health check at this step. Lambda doesn't have an equivalent. Instead, we set up a public HTTPS endpoint:

1. Still in the **Configuration** tab, click **Function URL** (left side) → **Create function URL**
2. **Auth type**: **NONE** — we use Clerk JWTs for auth ourselves; setting this to AWS_IAM would block the browser from calling the API
3. Expand **Additional settings**
4. **Configure cross-origin resource sharing (CORS)**: leave unchecked — our FastAPI app already returns CORS headers via its middleware
5. **Invoke mode**: **RESPONSE_STREAM** — **this is the most important setting on the page.** Without it, Server-Sent Events will be buffered and the streaming UI on the frontend will not work.
6. Click **Save**

You'll now see a **Function URL** at the top of the function's overview, in the format:

```
