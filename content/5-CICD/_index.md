---
title : "Configure the Standard CI/CD Pipeline"
date :  "`r Sys.Date()`" 
weight : 5
chapter : false
pre : " <b> 5. </b> "
---

AWS offers a suite of developer services, including AWS CodePipeline, AWS CodeBuild, and AWS CodeDeploy, which are used to build CI/CD pipelines that natively integrate with other AWS services.

In this module, we'll use AWS CodePipeline and AWS CodeBuild to construct a CI/CD pipeline for our core application. We'll configure AWS CodeBuild to interact with other AWS services for building our container images. For instance, AWS CodeBuild can retrieve a database connection string from AWS Secrets Manager to initiate a connection to our database and apply migrations. However, since our database resides in a private subnet, AWS CodeBuild cannot connect to it directly over the public internet. Fortunately, AWS allows AWS CodeBuild projects to run within a VPC subnet. This enables AWS CodeBuild to access resources in private subnets, provided the subnet has appropriate network routing (e.g., via a NAT Gateway for internet access if needed for other tasks, or direct routing to the database).

After applying database migrations, AWS CodeBuild will build our container images and push them to our Amazon Elastic Container Registry (ECR) repository. Subsequently, AWS CodePipeline will trigger an update to our Amazon ECS cluster, deploying the newly pushed image.

![image](/images/archi-dev.svg)

___

#### AWS CodePipeline Overview

AWS CodePipeline is a continuous delivery service that enables you to model, visualize, and automate the stages involved in releasing your software. Essentially, AWS CodePipeline acts as an orchestrator, automating the continuous delivery of software changes. It coordinates other AWS services to perform specific tasks; for example, it can direct AWS CodeBuild to compile source code and build application artifacts (such as container images), and then initiate deployments to services like Amazon ECS or AWS Elastic Beanstalk.

___

#### AWS CodeBuild Overview

AWS CodeBuild is a fully managed build service in the cloud. It compiles your source code, runs unit tests, and produces artifacts that are ready to deploy. CodeBuild eliminates the need to provision, manage, and scale your own build servers. It provides prepackaged build environments for popular programming languages and build tools such as Apache Maven and Gradle. You can also customize build environments in CodeBuild to use your own build tools. CodeBuild scales automatically to meet peak build requests.