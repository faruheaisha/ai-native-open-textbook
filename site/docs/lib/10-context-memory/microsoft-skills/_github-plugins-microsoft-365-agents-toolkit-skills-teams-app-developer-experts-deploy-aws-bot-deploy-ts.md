---
title: "aws-bot-deploy-ts"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/deploy/aws-bot-deploy-ts.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/deploy/aws-bot-deploy-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/deploy/aws-bot-deploy-ts.md"
sourceSha256: "092c19783d841664509b3a7f66fafac9dc54c94c9eaf3f25e92a0562fc8748ff"
pageSha256: "092c19783d841664509b3a7f66fafac9dc54c94c9eaf3f25e92a0562fc8748ff"
contentMode: "local-full"
zh: ""
---

# aws-bot-deploy-ts

## purpose

Step-by-step deployment of a Slack bot or Teams bot to AWS. Covers AWS CLI setup, IAM configuration, compute provisioning (Lambda + API Gateway / EC2 / ECS Fargate), environment configuration, and verification. Teams bots on AWS still require an Azure Bot Service registration for the Bot Framework messaging endpoint.

## rules

1. **Install prerequisites.** You need: Node.js 20 LTS, AWS CLI v2, and optionally AWS SAM CLI (`pip install aws-sam-cli`) or AWS CDK (`npm install -g aws-cdk`). Verify with `aws --version` and `node --version`. [docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. **Configure AWS credentials.** Run `aws configure` and enter your IAM access key, secret key, default region, and output format. For SSO-enabled organizations, use `aws sso login` instead. Verify with `aws sts get-caller-identity`. [docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)
3. **Create an IAM user or role for the bot.** The bot's execution role needs permissions for: CloudWatch Logs (logging), Secrets Manager or SSM Parameter Store (credentials), and any other AWS services it accesses. Use least-privilege — don't give the bot AdministratorAccess. [docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
4. **Create a Slack API app at api.slack.com.** Under "OAuth & Permissions", install the app to your workspace and copy the Bot User OAuth Token (`xoxb-...`). Under "Basic Information", copy the Signing Secret. For Socket Mode, also create an App-Level Token (`xapp-...`). [api.slack.com/authentication/basics](https://api.slack.com/authentication/basics)
5. **Choose your compute target.** Lambda + API Gateway (serverless, event-driven — best for HTTP-mode Slack bots), EC2 or Elastic Beanstalk (always-on — required for Socket Mode, good for Teams bots), or ECS Fargate (containerized, production-grade). [docs.aws.amazon.com/lambda/latest/dg/welcome.html](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
6. **For Lambda: use SAM or CDK to define the stack.** A SAM template defines the Lambda function + API Gateway in YAML. `sam build && sam deploy --guided` handles packaging, uploading, and CloudFormation stack creation. [docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
7. **For Lambda: handle the Slack 3-second ack deadline.** Lambda cold starts can take 1-5 seconds. Use provisioned concurrency (`ProvisionedConcurrencyConfig` in SAM) to keep warm instances, or use the async pattern: immediately return 200 to ack, then process via SQS + a second Lambda. [docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html](https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html)
8. **Socket Mode cannot run on Lambda.** Socket Mode requires a persistent WebSocket connection — Lambda functions are ephemeral. Use EC2, Elastic Beanstalk, or ECS Fargate for Socket Mode bots. HTTP-mode Slack bots work fine on Lambda.
9. **Store secrets in Secrets Manager or SSM Parameter Store.** Never put `SLACK_BOT_TOKEN` or `CLIENT_SECRET` in Lambda environment variables in plaintext for production. Use the SDK to fetch secrets at runtime: `const client = new SecretsManagerClient(\{\}); const secret = await client.send(new GetSecretValueCommand(\{ SecretId: "bot/slack" \}))`. [docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html)
