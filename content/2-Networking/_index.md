---
title : "Networking Setup"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 2. </b> "
---

An Amazon ECS cluster must be placed within a virtual network. Let's examine the following diagram to visualize the network architecture we are about to configure.

![image](/images/2/1.svg)

Let's discuss a bit about the global infrastructure of AWS. We will begin by discussing **regions**, which serve as the foundational of AWS's global infrastructure. AWS has the concept of a region, which is a physical location around the world where AWS cluster its data centers. Withing each region, AWS has logical isolated locations known as **Availability Zones (AZs)**. An AZ is one or more discrete data centers with redundant power, networking, and connectivity within an AWS Region.

![image](/images/2/2.svg)

Each region and AZ is assigned with a unique code. For example, the Singapore region has the code **ap-southeast-1** and its AZs are designated, respectively, **ap-southeast-1a**, **ap-southeast-1b** and **ap-southeast-1c**.

![image](/images/2/3.svg)

To setup our own network on AWS, we will utilize **Amazon Virtual Private Cloud VPC**. A **VPC** is a virtual network that closely resembles a traditional network that you'd operate in your own data center. After you create a VPC, you can add **subnets**. A subnet is a range of IP addresses in your VPC. A subnet must reside in a single Availability Zone. After you add subnets, you can deploy AWS resources in your VPC, such as Amazon ECS Cluster, database, etc. 

After creating a VPC, we need to add subnets into it. We will require total of six subnets: two public subnets, two private subnets and two database subnets. 

So, what is the different between a public and a private subnet? A public subnet allows resources within it to be directly reachable from the internet, and these resources can be assigned public IP addresses. On the other hand, resources in a private subnet can initiate abound connection to the internet (typically through a NAT Gateway, we will talk about it later), but they cannot neither be directly accessed or reached from the internet nor assigned public IP addresses; this means external users cannot directly connect to them.

> chen cai hinh o day

As in the diagram, The database subnets (Db subnets) are also private, specifically designated for hosting our database instances. Meanwhile, the private subnets will be used for deploying our ECS Cluster.