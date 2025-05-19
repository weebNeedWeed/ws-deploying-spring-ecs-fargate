---
title : "What Inside An Amazon ECS Cluster"
date :  "`r Sys.Date()`" 
weight : 1 
chapter : false
pre : " <b> 1.1 </b> "
---

Let's take a look at the following architecture of an Amazon ECS cluster. Then, we will explore the core components of it.

![1](/images/1.1/1.svg)

To get started with Amazon ECS, you first create a new **cluster (1)**, which is a logical grouping of tasks or services that power your containerized applications. The fundamental deployable unit in a cluster is a **task (2)**. A task is an instantiation of a task definition, representing one or more containers that are launched together on a cluster. Each task runs one or more **containers (3)**, often including a main application container and potentially sidecar containers for logging, mornitoring, or other supporting functions. To define how your container should run, you use a blueprint called a **task definition (4)**. Within a task definition, you specify the details for each container that will be part of the task, including container names, image, port mappings, and the CPU and memory allocated to them. A service, which we will discuss later, will look at a task definition and create a desired number of tasks for you. 

Container images used for running tasks can come from multiple sources, such as Docker Hub, GitHub Container Registry (GHCR), etc. However, we prefer **Amazon Elastic Container Registry (Amazon ECR) (5)**, which is a service that allows us to create registries (or repositories) for our images and maintain them. Amazon ECR offers native integration with other AWS services, most notably is Amazon ECS, and provides a private and secure environment for our container images.

Although you can directly create a task, this approach is not recommended for production workloads. Instead, you typically create a **service (6)**. A service runs and maintains a desired number of tasks simultaneouly in a cluster, all based on a task definition. If one of your tasks fails or stops, the service launches another task to replace it. This helps maintain your desired number of tasks in the service. The service also offers various deployment strategies to ensure your application highly available (with minimal or no downtime) during the deployment of new the application versions. Amazon ECS facilitates the connection of multiple services by a feature called **Service Connect**. We will discuss it later.

The service can create tasks on either EC2 Instances (EC2 Mode) or **AWS Fargate (Fargate Mode)**, or both of them. In this workshop, we will focus on AWS Fargate. The [previous section](/1-introduction) have shown you the reason.

![2](/images/1.1/2.svg)