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

___

#### Creating The NAT Gateway

1\. Select **NAT gateways** on the left menu bar. Click on **Create nat gateway**.

![image](/images/2.3/Group27.png)

2\. For **Name**, enter in `fcj-ngw`. For **Subnet**, choose **fcj-public-subnet-01**.

![image](/images/2.3/Group28.png)

3\. Scroll down and click on **Allocate Elastic IP**. This is the public IP address that our NAT gateway will use to direct outbound traffic to the internet. Click on **Create NAT gateway**.

![image](/images/2.3/Group29.png)

___

#### Configuring The Private Route Table

Next, we will configure our private route table to route outbound traffic from the private subnets (and also the database subnets, as they are private too) through the NAT gateway.

1\. Select **Route tables**. Click on **Create route table**.

![image](/images/2.3/Group30.png)

2\. For **Name**, enter in `fcj-private-rtb`. For **VPC**, choose **fcj-vpc**. Click on **Create route table**.

![image](/images/2.3/Group31.png)

3\. Click on **Edit routes**.

![image](/images/2.3/Group32.png)

4\. **Add a new route**. For **Destination**, select **0.0.0.0/0**. For **Target**, choose **NAT gateway** then choose **fcj-ngw**. Click on **Save changes**.

![image](/images/2.3/Group33.png)

5\. Click on **Actions** then select **Edit subnet associations**.

![image](/images/2.3/Group34.png)

6\. Check **all private and database subnets**. Click on **Save associations**.

![image](/images/2.3/Group35.png)