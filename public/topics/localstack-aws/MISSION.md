# Mission: LocalStack & AWS basics

## Why

Build fluency with core AWS infrastructure — S3, Lambda, SQS/SNS, API Gateway,
DynamoDB — against a local LocalStack container in Docker, so every experiment
is free, disposable and reproducible. The same skills must transfer to two
languages: Python (boto3) and TypeScript (AWS SDK v3), and to Terraform for
infrastructure-as-code.

## Success looks like

- Point `awslocal` / the `aws` CLI at LocalStack and verify it is alive in under
  a minute.
- Create, inspect and tear down S3, Lambda, SQS, SNS, API Gateway and DynamoDB
  resources from the CLI — with confidence, not copy-paste.
- Write and deploy Lambda handlers in **both** Python and TypeScript, read
  their logs, and know the runtime differences.
- Describe the same stack twice: once with CLI commands, once as Terraform code
  applied with `tflocal init/plan/apply`.
- Use verification commands (expected output) as the feedback loop for every
  challenge.

## Constraints

- Everything must run on LocalStack Community (free tier) inside Docker.
  Licensed-only services (RDS, ECR, API Gateway v2) are noted, not depended on.
- One tight, self-verifiable challenge per lesson, easy → hard.
- Code samples in both Python and TypeScript wherever SDK code appears.

## Out of scope

- EKS, ECS, real AWS billing, multi-account setups.
- Production Terraform patterns (modules, state backends, workspaces) until the
  core apply/destroy loop is automatic.
