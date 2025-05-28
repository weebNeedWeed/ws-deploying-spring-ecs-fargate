---
title : "Amazon Elastic Container Service"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 1.1 </b> "
---

#### Amazon ECS: Effortless Container Deployment On AWS

**Amazon Elastic Container Service (Amazon ECS)** is a fully managed container orchestration service designed to simplify the deployment, management, and scaling of containerized applications. A significant reason for choosing Amazon ECS is its ability to run applications and workloads without the user needing to manage the complex control plane — the underlying component that orchestrates the containers.

Key Benefits of Amazon ECS:

- **Scalable Container Launch**: Deploy containers on AWS at scale without managing the underlying infrastructure.
- **Cost Efficiency**: Reduce costs through automatic scaling and pay-as-you-go pricing across various AWS compute options.
- **Accelerated Deployment**: Deploy faster and concentrate on application development by using Amazon ECS with AWS Fargate serverless compute for containers.
- **Optimized Security and Compliance**: Leverage AWS's robust security features and maintain compliance.

![1](/images/1.1/1.svg?width=40pc)

Amazon ECS offers **two primary methods (launch types)** for running your containers:
1. **Amazon Elastic Compute Cloud (Amazon EC2)** Launch Type
2. **AWS Fargate** Launch Type

___

#### Amazon EC2 Launch Type

With the Amazon EC2 launch type, you provision and manage a cluster of virtual servers (EC2 instances) on which your containers will run. You can create these instances manually or using auto-scaling groups and then configure them to register with your Amazon ECS cluster. Amazon ECS then schedules and launches your containers on these EC2 instances.

While this approach offers granular control over the server environment, its primary drawback is the responsibility of **managing the infrastructure yourself**. For example, you would need to **determine the appropriate instance types, patch operating systems, and meticulously calculate the vCPU and memory resources required by your containers**. This manual resource management can be time-consuming and prone to over- or under-provisioning.

___

#### AWS Fargate Launch Type

Alternatively, the AWS Fargate launch type allows you to **run containers without managing the underlying virtual machines or server clusters**. **Fargate is a serverless, pay-as-you-go compute engine that lets you focus solely on designing and building your applications**.

When using AWS Fargate with Amazon ECS, you **delegate server management, resource allocation, and scaling directly to AWS**. This significantly accelerates the process of moving applications from development to production on the cloud and can lower the total cost of ownership by eliminating the need for infrastructure provisioning and maintenance.

![1](/images/1.1/2.svg?width=40pc)

This overview of Amazon ECS and its launch types should clarify why AWS Fargate is often the preferred choice for many users seeking to minimize operational overhead. In the next section, we will delve deeper into these concepts.