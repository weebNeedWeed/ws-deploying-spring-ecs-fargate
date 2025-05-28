---
title : "What Inside An Amazon ECS Cluster"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 1.2 </b> "
---

Let’s explore the **core components of an Amazon Elastic Container Service (ECS) architecture**, as illustrated in the following diagram.

![1](/images/1.2/1.svg)

To begin with Amazon ECS, you first establish a **cluster (1)**. A cluster is a **logical grouping of resources that host your containerized applications**. Within this cluster, the fundamental deployable unit is a **task (2)**. Each task is an active instance of a task definition and represents one or more **containers (3)** that are deployed and run together as a single unit. For example, a task might consist of your main application container alongside supporting sidecar containers for functions such as logging, monitoring, or other auxiliary processes.

To specify how your application should run, you create a **task definition (4)**. This **acts as a blueprint for your tasks**. Within the task definition, you **detail the specifics** for each container that will be part of the task, including **container names**, **the Docker image** to use (e.g., from Amazon ECR), **CPU and memory** allocations, **port** mappings, environment variables, and more.

While container images can be sourced from various public or private registries like Docker Hub or GitHub Container Registry, **Amazon Elastic Container Registry (ECR) (5)** is a **fully-manage container registry** that is **highly recommended** when working within the AWS ecosystem. ECR allows you to create private repositories for your container images, offering seamless integration with AWS services, most notably Amazon ECS. It provides a secure, scalable, and reliable place to store and manage your application images. When a task is launched, the specified container images are pulled from ECR (or another configured registry).

Although you can manually launch tasks based on a task definition, this direct approach is generally not recommended for production workloads due to the lack of automated management and resilience. Instead, **you typically define and use a service (6)**. An ECS **service is responsible for running and maintaining a desired number of instances of a task definition simultaneously** within your cluster. If any task managed by the service fails its health checks or stops unexpectedly, the ECS service automatically launches a replacement task to ensure the desired count is consistently maintained, thereby contributing to your application's high availability. Furthermore, **services facilitate various deployment strategies** (like rolling updates or blue/green deployments) **to update your application to new versions with minimal or no downtime**.

As shown in the diagram, the Admin Service and the To-do App Service are two distinct services running within the ECS Cluster. **Amazon ECS also simplifies inter-service communication using Service Connect**. This feature provides managed service discovery and traffic routing between your ECS services **without requiring you to configure and manage load balancers or complex DNS setups for internal traffic**. In this example, the Admin Service can make API calls to the To-do App Service via Service Connect, allowing them to interact securely and efficiently. This section will be discussed later.

![2](/images/1.2/2.svg)


Services can launch tasks on compute infrastructure that you manage (Amazon EC2 instances, known as EC2 Mode) or on serverless compute managed by AWS (AWS Fargate, referred to as Fargate Mode). **This particular architecture focuses on Fargate Mode**, where **AWS provisions and manages the underlying infrastructure** for your containers, **allowing you to focus solely on designing and building your applications without managing servers**. When using Fargate, the Admin Service and To-do App Service will have their tasks (and the containers within them) run on this serverless platform, with Fargate handling the image pulling from ECR and resource allocation as defined in the respective task definitions.