#!/bin/bash

npm run build

PROFILE="lif"
REGION="us-east-1"
STACK_NAME="sam-sqs-poc"
VPC_ID="my-vpc"
LAMBDA_SUBNETS="subnet-1111111,subnet-22222222"
DB_SECURITY_GROUP="db-sec-group"
DB_HOST="your-rds-endpoint"
DB_PORT="5432"
DB_NAME="testdb"
DB_USER="dbadmin"
DB_PASSWORD="987654321"

sam deploy --profile $PROFILE --region $REGION --stack-name $STACK_NAME --parameter-overrides VpcId=$VPC_ID LambdaSubnets=$LAMBDA_SUBNETS DBSecurityGroup=$DB_SECURITY_GROUP DBHost=$DB_HOST DBPort=$DB_PORT DBName=$DB_NAME DBUsername=$DB_USER DBPassword=$DB_PASSWORD