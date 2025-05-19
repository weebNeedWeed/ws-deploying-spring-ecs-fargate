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

You must have knowledge about the networking basics on AWS, and also the fundamentals of Docker and containers. If you don't, no worries, you should take the following workshops first:

- [Amazon VPC and AWS Site-to-Site VPN Workshop](https://000003.awsstudygroup.com/)

- [What is a Container?](https://www.docker.com/resources/what-container/)

#### Time

This workshop might take up to **3 hours** to complete.

#### Workshop Modules

**1\. [Introduction](1-introduction/):** Introduce the to-do application, Momentum, that we will deploy. We will review the cloud architecture and examine the fundamentals of Amazon ECS and AWS Fargate.

#### Overall Architecture - Application & Networking Flow

![archi-user](/images/archi-user.svg)

#### Overall Architecture - Developer Flow

![archi-dev](/images/archi-dev.svg)