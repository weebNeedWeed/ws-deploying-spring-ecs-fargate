---
title : "Cluster Setup"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 3. </b> "
---

In this section, we'll provision our Amazon ECS cluster and the necessary components to run our workloads. This includes an Application Load Balancer (ALB), an Amazon RDS PostgreSQL database, and AWS Secrets Manager for handling sensitive information. We'll also build our application container images and push them to Amazon Elastic Container Registry (ECR) for ECS to use. The following diagram illustrates the architecture we're about to set up.

![image](/images/3/1.svg)

Here's how the system will function:

1. Users access the application by entering the ALB's DNS name into their browser.
2. The ALB receives this traffic and routes it across the tasks managed by our ECS cluster.
3. The application running within these ECS tasks will connect to the PostgreSQL database (managed by Amazon RDS) to store user data and retrieve information to send back to the users.

For ECS tasks to be created, they need to:

1. Pull the container images we will build and push to Amazon ECR.
2. Retrieve a secret from AWS Secrets Manager. This secret contains the database connection string, allowing the application to connect to the RDS database and initially apply database migrations.

Initially, to manage database migrations without concurrency issues, we will configure our service to run only one task for the core application. This temporary setup prevents multiple tasks from attempting to apply migrations simultaneously. Later, in the CI/CD section, we'll refine this by moving the database migration step to the build phase of our pipeline, which is a more robust solution for handling migrations and allows for multiple running tasks. 

Each of these components will be discussed in the next sections.