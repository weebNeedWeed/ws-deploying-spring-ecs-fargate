---
title : "Configuring Public Subnets"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 2.2 </b> "
---

For those resources in the public subnets to be reachable from the internet, we must add to our VPC a resource named **internet gateway**.An internet gateway is a horizontally scaled, redundant, and highly available VPC component that allows communication between your VPC and the internet.

![image](/images/2.2/1.svg)

The application load balancer (we will discuss it later) is deployed across two AZs and functions as a public resource. Its Elastic Network Interfaces (ENIs) reside in atleast two public subnets. An Internet Gateway must be attached to the VPC to enable these ENIs to accquire public IP addresses, allowing them to receive traffic from the internet. 

___

#### Creating The Internet Gateway

1\. Select **Internet gateways** on the side menu bar. Click on **Create internet gateway**.

![image](/images/2.2/Group17.png)

2\. For **Name tag**, enter in **fcj-igw**. Click on **Create internet gateway**.

![image](/images/2.2/Group18.png)

3\. Click on **Actions**. Select **Attach to VPC**.

![image](/images/2.2/Group19.png)

4\. For **VPC** select **fcj-vpc**. Click on **Attach internet gateway**.

![image](/images/2.2/Group18.png)

___

#### Creating The Public Route Table

Although the internet gateway has been attached to our VPC, the resources within the public subnets are still unreachable from the internet. This is because we haven't yet configured a route table for the public subnets. This route table will acts as a virtual router, directing all internet-bound traffic from the public subnets to the internet gateway.

Our public route table will have two routes. One is the local (10.10.0.0/16 -> local) route, which is automatically created and enables communication between resources within the VPC. The other route (0.0.0.0/0 -> internet gateway) allows traffic destined for the internet to be sent via the internet gateway.

> chen hinh

1\. Select **Route tables** and click on **Create route table**.

![image](/images/2.2/Group21.png)

2\. For **Name**, type in **fcj-route-table**. For **VPC**, select **fcj-vpc**. Click on **Create route table**.

![image](/images/2.2/Group22.png)

3\. Click on **Edit routes**.

![image](/images/2.2/Group23.png)

4\. Click on **Add route**. For **Destination**, choose **0.0.0.0/0**. For **Target**, choose **Internet gateway** then choose **fcj-igw**. Click on **Save changes**.

![image](/images/2.2/Group24.png)

5\. Click on **Actions** then click on **Edit subnet associations**.

![image](/images/2.2/Group25.png)

6\. Check **two public subnets** and click on **Save associations**.

![image](/images/2.2/Group26.png)

Now the resources in two public subnets are reachable. 