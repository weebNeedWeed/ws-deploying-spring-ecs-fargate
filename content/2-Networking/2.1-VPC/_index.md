---
title : "Setting Up VPC And Subnets"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 2.1 </b> "
---

#### Creating A VPC

1\. Log in to the AWS Console. Choose the region in which you want to create resources. 

![image](/images/2.1/Group1.png)

2\. Navigate to the VPC Console.

![image](/images/2.1/Group2.png)

3\. Select **Your VPCs** and click on **Create VPC**.

![image](/images/2.1/Group3.png)

4\. For **Name tag**, type in `fcj-vpc`. For **IPv4 CIDR**, type in `10.10.0.0/16`. 

![image](/images/2.1/Group5.png)

5\. Scroll down and click on **Create VPC**.

![image](/images/2.1/Group4.png)

#### Creating Subnets

We need total of six subnets, each with a specific IP addresses range. AWS preserves five IP addresses of each subnet by default. Therefore, the **Usable Host IP Addresses** is calculated by substracting 5 from the **Total Host IP Addresses** within that subnet.

| Subnet name           | CIDR          | Usable Host IP Addresses |
| --------------------- | ------------- | ------------------------ |
| fcj-public-subnet-01  | 10.10.0.0/24  | 249                      |
| fcj-public-subnet-01  | 10.10.1.0/24  | 249                      |
| fcj-private-subnet-01 | 10.10.16.0/20 | 4089                     |
| fcj-private-subnet-02 | 10.10.32.0/20 | 4089                     |
| fcj-db-subnet-01      | 10.10.2.0/24  | 249                      |
| fcj-db-subnet-02      | 10.10.3.0/24  | 249                      |

Why are our private subnets provisioned with a larger IP addresses range compared to the others? This is because the private subnets are designated for hosting the core compute resources of our Amazon ECS cluster, including the Elastic Network Interfaces (ENIs) for Fargate tasks. Since each task is assigned a unique IP address, ensuring a sufficient and larger allocation of IP addresses in these subnets is crucial to support the dynamic scaling requirements of our application.

Our public subnets are designated for public-facing components and services, such as the Elastic Network Interfaces for the Application Load Balancer and a NAT Gateway. These services typically consumes fewer IP addresses. Consequently, we can allocate smaller IP address range for the public subnets.

Let's create these subnets.

___

##### **Public Subnets**

1\. Choose **Subnets** and click on **Create subnet**.

![image](/images/2.1/Group6.png)

2\. For **VPC ID**, choose **fcj-vpc**.

![image](/images/2.1/Group8.png)

3\. For **Subnet name**, type in `fcj-public-subnet-01`. For **Availability Zone**, choose the **AZ a (e.g. ap-southeast-1a)**. For **IPv4 VPC CIDR block**, type in `10.10.0.0/24`.

![image](/images/2.1/Group7.png)

4\. Scroll down and click on **Create subnet**.

![image](/images/2.1/Group9.png)

5\. Click on **Create subnet** to create the second public subnet. For **VPC ID**, choose **fcj-vpc**.

6\. For **Subnet name**, type in `fcj-public-subnet-02`. For **Availability Zone**, choose the **AZ b (e.g. ap-southeast-1b)**. For **IPv4 VPC CIDR block**, type in `10.10.1.0/24`. 

![image](/images/2.1/Group10.png)

7\. Scroll down and click on **Create subnet**. 

___

##### **Private Subnets**

1\. Choose **Subnets** and click on **Create subnet**. For **VPC ID**, choose **fcj-vpc**.

2\. For **Subnet name**, type in `fcj-private-subnet-01`. For **Availability Zone**, choose the **AZ a (e.g. ap-southeast-1a)**. For **IPv4 VPC CIDR block**, type in `10.10.16.0/20`.

![image](/images/2.1/Group11.png)

3\. Scroll down and click on **Create subnet**.

4\. Click on **Create subnet** to create the second private subnet. For **VPC ID**, choose **fcj-vpc**.

5\. For **Subnet name**, type in `fcj-private-subnet-02`. For **Availability Zone**, choose the **AZ b (e.g. ap-southeast-1b)**. For **IPv4 VPC CIDR block**, type in `10.10.32.0/20`.

![image](/images/2.1/Group13.png)

6\. Scroll down and click on **Create subnet**.

___

##### **Database Subnets**

1\. Choose **Subnets** and click on **Create subnet**. For **VPC ID**, choose **fcj-vpc**.

2\. For **Subnet name**, type in `fcj-db-subnet-01`. For **Availability Zone**, choose the **AZ a (e.g. ap-southeast-1a)**. For **IPv4 VPC CIDR block**, type in `10.10.2.0/24`.

![image](/images/2.1/Group14.png)

3\. Scroll down and click on **Create subnet**.

4\. Click on **Create subnet** to create the second private subnet. For **VPC ID**, choose **fcj-vpc**.

5\. For **Subnet name**, type in `fcj-db-subnet-02`. For **Availability Zone**, choose the **AZ b (e.g. ap-southeast-1b)**. For **IPv4 VPC CIDR block**, type in `10.10.3.0/24`.

![image](/images/2.1/Group15.png)

6\. Scroll down and click on **Create subnet**.

___

Here is what we have created.

![image](/images/2.1/Group16.png)