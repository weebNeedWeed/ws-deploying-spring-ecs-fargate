---
title : "Network Configuration"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 2. </b> "
---

An Amazon ECS cluster requires a virtual robust network foundation. This section outlines the network architecture we will configure, leveraging the core AWS networking components.

![image](/images/2/1.svg)

#### AWS Global Infrastructure: Regions and Availability Zones

AWS's global infrastructure is built around **Regions**, which are physical locations worldwide where AWS clusters its data centers. Each Region is a separate geographic area.

Within each Region, there are multiple isolated locations known as **Availability Zones (AZs)**. An AZ consists of one or more discrete data centers, each with redunant power, networking and connectivity. Using multiple AZs is key to designing highly available and fault-tolerant applications. 

![image](/images/2/2.svg)

Regions and AZs have unique codes. For example, the Singapore region is **ap-southeast-1**, and its AZs are **ap-southeast-1a**, **ap-southeast-1b** and **ap-southeast-1c**.

![image](/images/2/3.svg)

#### Your Private Network In The Cloud: Amazon VPC

To establish our own network on AWS, we will utilize **Amazon Virtual Private Cloud (VPC)**. A **VPC** is an isolated virtual network on AWS, logically separated from other virtual networks. It allows you to provision a private section on AWS where you can launch AWS resources in the network you define, closely resembling to the traditional on-premises network.

#### Organizing Your VPC: Subnets

Once a VPC is created, we partition it into **subnets**. A subnet is range of IP addresses within your VPC. Each subnet must reside within a single AZ. Deploying resources accross subnets in different AZs enhances fault tolerance. 

For our Amazon ECS deployment, we will configure **six subnets**, strategically distributed across two AZs for high availability.

- **Two public subnets:** Resources in these subnets can be directly accessible from the internet. They can be assigned public IP addresses.
- **Two private subnets:** These subnets will host our Amazon ECS cluster. Resources in private subnets cannot be directly reached from the internet and are not assigned public IP addresses. However, they can initiate outbound connections to the internet, typically via a Network Address Translation (NAT) Gateway (which we will discuss later). This setup enhances security by shielding your application instances from direct external access.
- **Two database subnets**: These are specialized private subnets designed to host our database instances securely. Like other private subnets, they restrict direct internet access, protecting your data layer.

This multi-subnet, multi-AZ architecture ensures that our application is resilient and secure.