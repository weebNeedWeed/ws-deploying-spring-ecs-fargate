---
title : "Serverless Containers: Deploying Your Application On ECS and Fargate"
date : "`r Sys.Date()`"
weight : 1
chapter : false
---

# Serverless Containers: Deploying Your Application On ECS and Fargate

Welcome to my workshop on **Amazon Elastic Container Service(Amazon ECS)** and **AWS Fargate**!

In this workshop, we will dive into the core concepts of Amazon ECS and AWS Fargate, exploring what they are and how they work. We will also apply our acquired knowledge by deploying a to-do application called **Momentum** on these services. Then, we will construct a CI/CD pipeline for our application utilizing AWS developer tools, such as **AWS CodePipeline**, **AWS CodeBuild**.

![hero](/images/container_hero.jpg)

#### Target Audience

This workshop is designed for beginners who are new to AWS and want to learn about Amazon ECS and AWS Fargate.

#### Prerequisites

You should have a basic understanding of AWS networking, as well as the fundamentals of Docker and containers. If you don't, no worries-I recommend you to take the following workshops first:

- [Amazon VPC and AWS Site-to-Site VPN Workshop](https://000003.awsstudygroup.com/)

- [What is a Container?](https://www.docker.com/resources/what-container/)

#### Time

This workshop might take up to **3 hours** to complete.

#### Workshop Modules

**1\. [Introduction](1-introduction/):** Introduce the to-do application, Momentum, that we will deploy. We will review the cloud architecture and examine the fundamentals of Amazon ECS and AWS Fargate.

**2\. [Networking Configuration](2-networking/):** Set up the foundational AWS networking infrastructure including VPC, subnets, internet gateway, NAT gateway, route tables, and security groups.

**3\. [Cluster Setup](3-cluster/):** Create and configure the Amazon ECS cluster, set up secrets management, deploy the core and admin applications, and enable service-to-service communication.

**4\. [Debugging With ECS Exec](4-ecsexec/):** Configure ECS Exec functionality to enable secure shell access to running containers for debugging and troubleshooting.

**5\. [Configure the Standard CI/CD Pipeline](5-cicd/):** Build a continuous integration and deployment pipeline using AWS CodePipeline and CodeBuild to automate application deployments.

**6\. [Configure Service Auto Scaling](6-serviceautoscaling/):** Implement automatic scaling policies to handle varying application loads efficiently.

**7\. [Cleanup](7-cleanup/):** Clean up all AWS resources created during the workshop to avoid ongoing costs.

#### Overall Architecture - Application & Networking Flow

![archi-user](/images/archi-user.svg)

#### Overall Architecture - Developer Flow

![archi-dev](/images/archi-dev.svg)