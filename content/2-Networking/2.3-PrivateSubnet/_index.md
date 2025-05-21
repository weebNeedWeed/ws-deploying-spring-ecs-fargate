---
title : "Configuring Private Subnets"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 2.3 </b> "
---

Private subnets are designed to be unreachable from the internet, as their route tables are not configured for direct outbound internet access, and also their resources don't possess public IP address for inbound connections. However, in certain scenarios, resources within these private subnets needs to access to the internet - for example, to download software patches, update packages, or retrieve external dependencies. Therefore, we need to configure a different resource called a **NAT gateway**. 

A NAT gateway is a Network Address Translation (NAT) service. You can use a NAT gateway so that instances in a private subnet can connect to services outside your VPC but external services can't initiate a connection with those instances.

![image](/images/2.3/1.svg)

The NAT gateway must be placed within a public subnet, allowing it to be assigned a public IP address for communicating with the internet. After creating the NAT gateway, we must configure a route in our private subnet's route table to direct outbound internet traffic through the NAT gateway. AWS recommend placing NAT gateways in atleast two AZs for increased resiliency, but in this workshop, we will deploy only one to minimize cost.