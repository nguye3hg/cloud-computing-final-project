# Cloud-Based Retail Analytics Web App

## Description:
A serverless React web app using AWS Amplify, Cognito, Lambda functions, and Amazon RDS. Provides secure user login, interactive dashboards (customer segmentation, lifetime value, cross-sell, seasonal trends), and real-time data pipelines.

## Tech stack:
• Frontend: React
• Auth: AWS Cognito (User Pool)
• Compute: AWS Lambda (Node.js)
• Database: Amazon RDS ( MySQL)
• IaC & Hosting: AWS Amplify CLI / CloudFormation

––––––––––––––––––––––––––––––––––––––––––––––––––––––

## ENVIRONMENT VARIABLES & CONFIGURATION (all to go into a single .env or similar file)

### AWS:
```
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1 ← your region
```
### Amplify :
```
REACT_APP_GRAPHQL_API_URL=https://XXXXXXXX.appsync-api.us-east-1.amazonaws.com/graphql
```
### Cognito:
```
REACT_APP_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
REACT_APP_COGNITO_APP_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_COGNITO_IDENTITY_POOL_ID=us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
### RDS:
```
RDS_HOST=your-db-endpoint.abcdefg.us-east-1.rds.amazonaws.com
RDS_PORT=5432 ← or 3306 for MySQL
RDS_DATABASE=your_database_name
RDS_USERNAME=your_db_username
RDS_PASSWORD=your_db_password
```
### Lambda (if you need to reference function ARNs):
```
REACT_APP_ETL_LAMBDA_ARN=arn:aws:lambda:us-east-1:123456789012:function:yourFunctionName
```
––––––––––––––––––––––––––––––––––––––––––––––––––––––

## LOCAL SETUP STEPS

Clone the repo and cd into its folder

Run npm install to install React dependencies

Install and configure Amplify CLI (npm install -g @aws-amplify/cli)

Run amplify init to bootstrap your backend environment

Run amplify add auth to set up Cognito user pools

Run amplify add function to create any Lambda ETL functions

Run amplify push to deploy Cognito, AppSync, Lambda, RDS connections

Create a .env file with the variables listed above

Run npm start to launch the React dev server on localhost