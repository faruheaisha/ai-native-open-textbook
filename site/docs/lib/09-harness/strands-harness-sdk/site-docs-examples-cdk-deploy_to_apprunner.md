---
title: "AWS CDK App Runner Deployment Example"
sourceId: "09-harness/strands-harness-sdk"
sourceTitle: "Strands Harness SDK"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/strands-agents/harness-sdk"
entryUrl: "https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/docs/examples/cdk/deploy_to_apprunner/README.md"
sourceRel: "site/docs/examples/cdk/deploy_to_apprunner/README.md"
rawUrl: "/raw/09-harness/strands-harness-sdk/site/docs/examples/cdk/deploy_to_apprunner/README.md"
sourceSha256: "0f77c2cd054eb843ddaf728fab17f818ebbf325daf63f005b74db107cf435bca"
pageSha256: "0f77c2cd054eb843ddaf728fab17f818ebbf325daf63f005b74db107cf435bca"
contentMode: "local-full"
zh: ""
---

# AWS CDK App Runner Deployment Example

## Introduction

This is a TypeScript-based CDK (Cloud Development Kit) example that demonstrates how to deploy a Python application to AWS App Runner. The example deploys a weather forecaster application that runs as a containerized service in AWS App Runner. The application is built with FastAPI and provides two weather endpoints:

1. `/weather` - A standard endpoint that returns weather information based on the provided prompt
2. `/weather-streaming` - A streaming endpoint that delivers weather information in real-time as it's being generated

## Prerequisites

- [AWS CLI](https://aws.amazon.com/cli/) installed and configured
- [Node.js](https://nodejs.org/) (v18.x or later)
- Python 3.12 or later
- Either:
  - [Podman](https://podman.io/) installed and running
  - (or) [Docker](https://www.docker.com/) installed and running
## Project Structure

- `lib/` - Contains the CDK stack definition in TypeScript
- `bin/` - Contains the CDK app entry point and deployment scripts:
  - `cdk-app.ts` - Main CDK application entry point
- `docker/` - Contains the Dockerfile and application code for the container:
  - `Dockerfile` - Docker image definition
  - `app/` - Application code
  - `requirements.txt` - Python dependencies for the container & local development

## Setup and Deployment

1. Install dependencies:

```bash
# Install Node.js dependencies including CDK and TypeScript locally
npm install

# Create a Python virtual environment (optional but recommended)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install Python dependencies for the local development
pip install -r ./docker/requirements.txt
```

2. Bootstrap your AWS environment (if not already done):

```bash
npx cdk bootstrap
```

3. Ensure podman is started (one time):

```bash
podman machine init
podman machine start
```

4. Package & deploy via CDK:

```bash
CDK_DOCKER=podman npx cdk deploy
```

## Usage

After deployment, you can access the weather service using the App Runner Service URL that is output after deployment:

```bash
# Get the service URL from the CDK output
SERVICE_URL=$(aws cloudformation describe-stacks --stack-name AgentAppRunnerStack --query "Stacks[0].Outputs[?ExportName=='AppRunnerServiceUrl'].OutputValue" --output text)
```

The service exposes a REST API endpoint that you can call using curl or any HTTP client:

```bash
# Call the weather service
curl -X POST \
  https://$SERVICE_URL/weather \
  -H 'Content-Type: application/json' \
  -d '{"prompt": "What is the weather in New York?"}'
  
# Call the streaming endpoint
curl -X POST \
  https://$SERVICE_URL/weather-streaming \
  -H 'Content-Type: application/json' \
  -d '{"prompt": "What is the weather in New York in Celsius?"}'
```

## Local testing (python)

You can run the python app directly for local testing via:

```bash
python ./docker/app/app.py
```

Then, set the SERVICE_URL to point to your local server

```bash
SERVICE_URL=127.0.0.1:8000
```

and you can use the curl commands above to test locally.

## Local testing (container)

Build & run the container:

```bash
podman build --platform linux/amd64 -t agent_container ./docker/

podman run -p 127.0.0.1:8000:8000 \
  -v ~/.aws:/home/appuser/.aws:ro \
  -e AWS_PROFILE=default \
  -t agent_container
```

Then, set the SERVICE_URL to point to your local server

```bash
SERVICE_URL=127.0.0.1:8000
```

and you can use the curl commands above to test locally.

## Cleanup

To remove all resources created by this example:

```bash
npx cdk destroy
```

## Additional Resources

- [AWS CDK TypeScript Documentation](https://docs.aws.amazon.com/cdk/latest/guide/work-with-cdk-typescript.html)
- [AWS App Runner Documentation](https://docs.aws.amazon.com/apprunner/latest/dg/what-is-apprunner.html)
- [Docker Documentation](https://docs.docker.com/)
- [Podman Documentation](https://podman.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
