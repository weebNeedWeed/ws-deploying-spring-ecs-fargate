---
title : "Introduction"
date :  "`r Sys.Date()`" 
weight : 1 
chapter : false
pre : " <b> 1. </b> "
---

Amazon Elastic Container Service (Amazon ECS) is a fully managed container orchestration service that helps you easily deploy, manage, and scale containerized applications. One element people choose Amazon ECS is that they are able to run their applications, or their workloads on ECS **without the complexity of managing a control plane (the component that orchestrates the containers)**.

The key benefits of Amazon ECS:

1. Launch containers on AWS at scale without worrying about the underlying infrastructure.
2. Reduce costs with automatic scaling and pay-as-you-go pricing across multiple AWS compute options.
3. Deploy faster and focus on your applications by using Amazon ECS with **AWS Fargate serverless compute** for containers.
4. Optimize for security and compliance.

![1](/images/1/1.svg?width=40pc)

Amazon ECS provides **two main methods** for launching containers: through **Amazon Elastic Compute Cloud (Amazon EC2)** and through **AWS Fargate**.

**Amazon EC2** is a service that allows you to create and manage your own virtual machines (or virtual servers). In order to work with Amazon ECS, you first create one or more EC2 instances (an instance is a virtual machine), manually or through auto-scalling, then configure them to work with Amazon ECS. Then, Amazon ECS will launch your desired containers inside those EC2 instances. Although this way gives you more control over your applications, but **it comes with one drawback, you have to manage the infrastructure by your own**. Let's imagine a simple situation where you have to specify the resources needed (in memory and vCPU) for containers that are going to run on an EC2 instance. You must manually calculate the amount vCPU and memory that containers need, which is time-consuming and can easily result in over- or under-allocation.

Instead of manually provisioning the infrastruction layer for your containers to run, you can **delegate those hard tasks to AWS** by using **AWS Fargate**. AWS Fargate is a serverless, pay-as-you-go compute engine that lets you focus on building applications without managing servers. When running your applications using AWS Fargate, you are **effectively moving tasks such as server management, resource allocation, and scaling to AWS**, thereby **accelerateing** the process of going from idea to production on the cloud, and **lowering** the total cost of ownership.

![1](/images/1/2.svg?width=40pc)

Now, we have covered the comprehensive overview of Amazon ECS and AWS Fargate. You should be able to understand why AWS Fargate is often chosen instead of Amazon EC2. Let's take a deeper dive in the next section.