---
title : "Create CI/CD Pipeline with AWS CodePipeline"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 5.3 </b> "
---

#### Examine buildspec.yml

A buildspec is a collection of build commands and related settings, in YAML format, that AWS CodeBuild uses to run a build. You can include a buildspec file (typically named buildspec.yml) as part of your source code, or you can define the buildspec configuration directly when you create a build project. This workshop provides this file, so you don't have to write it from scratch. Let's examine its contents.

```yaml
version: 0.2

env:
  secrets-manager:
    FLYWAY_URL: "dev/fcj/momentum:DB_CONNECTION_STRING"

phases:
  pre_build:
    commands:
      # Display login message and AWS version info
      - echo Logging in to Amazon ECR...
      - aws --version
      # Authenticate Docker with Amazon ECR using AWS CLI
      - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
      # Set the ECR repository URI for the Docker image
      - REPOSITORY_URI=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$REPOSITORY_NAME
      # Extract first 7 characters of commit hash for image tagging
      - COMMIT_HASH=$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)
      # Create unique image tag using commit hash
      - IMAGE_TAG="core-$COMMIT_HASH"
      # Change to application directory
      - cd application/Momentum/
      # Make Maven wrapper executable
      - chmod +x mvnw
      # Run database migration using Flyway
      - ./mvnw flyway:migrate -Dflyway.url=$FLYWAY_URL
      # Return to previous directory
      - cd -
  build:
    commands:
      # Log build start time
      - echo Build started on `date`
      - echo Building the Docker image...
      # Build Docker image from the Momentum application directory
      - docker build -t $REPOSITORY_URI:core application/Momentum/
      # Tag the image with the commit-specific tag
      - docker tag $REPOSITORY_URI:core $REPOSITORY_URI:$IMAGE_TAG
  post_build:
    commands:
      # Log build completion time
      - echo Build completed on `date`
      - echo Pushing the Docker images...
      # Push the tagged image to ECR repository
      - docker push $REPOSITORY_URI:core
      - docker push $REPOSITORY_URI:$IMAGE_TAG
      # Create image definitions file for ECS deployment
      - echo Writing image definitions file...
      - printf '[{"name":"core","imageUri":"%s"}]' $REPOSITORY_URI:$IMAGE_TAG > imagedefinitions.json
# Specify the artifact file to be used by deployment pipeline
artifacts:
    files: imagedefinitions.json
```

___

#### Secret Injection Mechanism

As demonstrated in the buildspec.yml file, secrets from AWS Secrets Manager are made available to AWS CodeBuild by explicitly referencing them under the env.secrets-manager section. When the build process starts, AWS CodeBuild automatically fetches and injects these specified secrets as environment variables. For this mechanism to function correctly, the IAM role assumed by AWS CodeBuild must be granted the necessary permissions to access the designated secrets in AWS Secrets Manager.

```yaml
env:
  secrets-manager:
    FLYWAY_URL: "dev/fcj/momentum:DB_CONNECTION_STRING"
```

___

#### Create CI/CD Pipeline

1\. In the left navigation pane, under **Pipeline - CodePipeline**, select **Pipelines**. Click **Create pipeline**.

![image](/images/5.3/Group16.png)

2\. Select **Build custom pipeline** and click **Next**.

![image](/images/5.3/Group17.png)

3\. Configure pipeline settings:
   - **Pipeline name**: Enter `fcj-core-pipeline`

![image](/images/5.3/Group18.png)

4\. Click **Next**.

![image](/images/5.3/Group19.png)

5\. Configure the source stage:
   - **Source**: Select **GitHub (via GitHub App)**

![image](/images/5.3/Group20.png)

6\. Configure connection settings:
   - **Connection**: Select **fcj-gh-connection**

![image](/images/5.3/Group21.png)

7\. Select your forked repository.

![image](/images/5.3/Group22.png)

8\. Configure branch settings:
   - **Default branch**: Select **master**

![image](/images/5.3/Group23.png)

9\. Click **Next**.

![image](/images/5.3/Group24.png)

10\. Configure the build stage:
    - Select **Other build providers**
    - Select **AWS CodeBuild**

![image](/images/5.3/Group25.png)

11\. Click **Create project**. Another browser tab will open.

![image](/images/5.3/Group26.png)

12\. Configure project settings:
    - **Project name**: Enter `fcj-core-build`

![image](/images/5.3/Group27.png)

13\. In the **Environment** section, expand **Additional configuration**.

![image](/images/5.3/Group28.png)

14\. Check **Enable this flag if you want to build Docker images or want your builds to get elevated privileges**.

![image](/images/5.3/Group29.png)

15\. Configure VPC settings:
  - **VPC**: Select **fcj-vpc**

![image](/images/5.3/Group30.png)

16\. Configure network settings:
  - **Subnets**: Select the **two private subnets**
  - **Security group**: Select **fcj-private-sg**
  - Click **Validate VPC Settings** to verify subnet connectivity

![image](/images/5.3/Group31.png)

17\. Configure environment variables:
  - **Name**: Enter `AWS_ACCOUNT_ID`
  - **Value**: Enter your AWS account ID

![image](/images/5.3/Group32.png)

18\. Add another environment variable:
  - **Name**: Enter `REPOSITORY_NAME`
  - **Value**: Enter `fcj-registry`

![image](/images/5.3/Group33.png)

19\. Configure buildspec settings:
  - Select **Use a buildspec file**
  - **Buildspec name**: Enter `application/Momentum/buildspec.yml`

![image](/images/5.3/Group34.png)

20\. Scroll to the bottom and click **Continue to CodePipeline**.

![image](/images/5.3/Group35.png)

21\. Verify that the **fcj-core-build** project is automatically selected.

![image](/images/5.3/Group36.png)

22\. Click **Next**.

![image](/images/5.3/Group43.png)

23\. Skip the test stage by clicking **Skip test stage**.

![image](/images/5.3/Group37.png)

24\. Configure the deploy stage:
  - **Provider**: Select **Amazon ECS**

![image](/images/5.3/Group38.png)

25\. Configure deployment settings:
  - **Cluster name**: Select **fcj-ecs-cluster**
  - **Service name**: Select **fcj-core-svc**

![image](/images/5.3/Group39.png)

26\. Click **Next**.

![image](/images/5.3/Group42.png)

27\. Review your configuration and click **Create pipeline**.

![image](/images/5.3/Group40.png)

28\. Wait for the pipeline to be created. The build stage will fail initially because the CodeBuild service role lacks permissions to access AWS Secrets Manager and Amazon ECR. **We will configure the role and rerun the build stage in the next chapter**.

![image](/images/5.3/Group41.png)