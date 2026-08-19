# LocalStack & AWS Resources

## Knowledge

- [LocalStack — Installation](https://docs.localstack.cloud/getting-started/installation/)
  Official install/upgrade docs for the Docker image, `docker run` and compose
  snippets. Primary source for Lesson 1.
- [LocalStack — Connecting the AWS CLI](https://docs.localstack.cloud/aws/connecting/aws-cli/)
  Official guide for `awslocal` and `--endpoint-url` usage.
- [awscli-local (PyPI)](https://pypi.org/project/awscli-local/)
  The `awslocal` wrapper itself — what it does (thin wrapper, auto endpoint).
- [LocalStack — Terraform integration](https://docs.localstack.cloud/aws/connecting/infrastructure-as-code/terraform/)
  Official provider configuration for LocalStack (endpoints block, skip flags,
  `s3_use_path_style`). Primary source for Lessons 6–7.
- [terraform-local (GitHub)](https://github.com/localstack/terraform-local)
  The `tflocal` wrapper — auto-configures the AWS provider for LocalStack.
- [AWS provider — custom service endpoints](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/guides/custom-service-endpoints)
  HashiCorp's canonical docs for per-service `endpoints {}`.
- Service pages (setup + coverage notes): [S3](https://docs.localstack.cloud/aws/services/s3/),
  [Lambda](https://docs.localstack.cloud/aws/services/lambda/),
  [SQS](https://docs.localstack.cloud/aws/services/sqs/),
  [SNS](https://docs.localstack.cloud/aws/services/sns/),
  [API Gateway](https://docs.localstack.cloud/aws/services/apigateway/),
  [DynamoDB](https://docs.localstack.cloud/aws/services/dynamodb/),
  [CloudWatch Logs](https://docs.localstack.cloud/aws/services/cloudwatch/logs/).
- [boto3 documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)
  Official AWS SDK for Python — use alongside `endpoint_url`.
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
  Official TS/JS SDK — modular clients (`@aws-sdk/client-s3`).
- [LocalStack pricing/coverage comparison](https://www.localstack.cloud/pricing-comparison)
  Which services are in the free Community tier vs licensed (RDS, ECR,
  API GW v2…). Check before assuming a service is free.

## Wisdom (Communities)

- [LocalStack Discuss](https://discuss.localstack.cloud/)
  Official forum — realistic place to test LocalStack-specific wisdom.
- [r/localstack](https://www.reddit.com/r/localstack/)
  Practitioner patterns, compose files, gotchas.
- [Terraform community](https://developer.hashicorp.com/terraform/community)
  HashiCorp community links (discuss, Slack) for IaC questions that are not
  LocalStack-specific.

## Gaps

- Add an RDS/Postgres-on-Docker bridge source if/when Patricio hits the RDS
  paywall and wants a database in the free tier.
