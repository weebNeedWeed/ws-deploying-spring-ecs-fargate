---
title : "Setting Up VPC And Subnets"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 2.1 </b> "
---

#### Creating A VPC

1\. Log in to the AWS Console. **Choose a consistent region** (e.g., `us-east-1` or `ap-southeast-1`) where you want to create all resources for this workshop. Make note of your selected region as you'll need to use the same region throughout.

![image](/images/2.1/Group1.png)

2\. In the AWS Console search bar, type `VPC` and select **VPC** from the dropdown, or navigate to **Services > Networking & Content Delivery > VPC**.

![image](/images/2.1/Group2.png)

3\. In the VPC Dashboard, select **Your VPCs** from the left navigation panel, then click **Create VPC**.

![image](/images/2.1/Group3.png)

4\. Configure the VPC settings:
   - **Resources to create**: Select **VPC only**
   - **Name tag**: Enter `fcj-vpc`
   - **IPv4 CIDR block**: Enter `10.10.0.0/16`
   - **IPv6 CIDR block**: Leave as **No IPv6 CIDR block**
   - **Tenancy**: Leave as **Default**

![image](/images/2.1/Group5.png)

5\. Review your settings and click **Create VPC**.

![image](/images/2.1/Group4.png)

6\. **Verify creation**: You should see a success message. The new VPC **fcj-vpc** should appear in your VPC list with the CIDR block **10.10.0.0/16**.

#### Creating Subnets

We need total of six subnets, each with a specific IP addresses range. AWS preserves five IP addresses of each subnet by default. Therefore, the **Usable Host IP Addresses** is calculated by subtracting 5 from the **Total Host IP Addresses** within that subnet.

| Subnet name           | CIDR          | Usable Host IP Addresses |
| --------------------- | ------------- | ------------------------ |
| fcj-public-subnet-01  | 10.10.0.0/24  | 249                      |
| fcj-public-subnet-02  | 10.10.1.0/24  | 249                      |
| fcj-private-subnet-01 | 10.10.16.0/20 | 4089                     |
| fcj-private-subnet-02 | 10.10.32.0/20 | 4089                     |
| fcj-db-subnet-01      | 10.10.2.0/24  | 249                      |
| fcj-db-subnet-02      | 10.10.3.0/24  | 249                      |

Why are our private subnets provisioned with a larger IP addresses range compared to the others? This is because the private subnets are designated for hosting the core compute resources of our Amazon ECS cluster, including the Elastic Network Interfaces (ENIs) for Fargate tasks. Since each task is assigned a unique IP address, ensuring a sufficient and larger allocation of IP addresses in these subnets is crucial to support the dynamic scaling requirements of our application.

Our public subnets are designated for public-facing components and services, such as the Elastic Network Interfaces for the Application Load Balancer and a NAT Gateway. These services typically consume fewer IP addresses. Consequently, we can allocate smaller IP address ranges for the public subnets.

Let's create these subnets.

___

##### **Public Subnets**

1\. In the VPC Dashboard, select **Subnets** from the left navigation panel and click **Create subnet**.

![image](/images/2.1/Group6.png)

2\. Configure the first public subnet:
   - **VPC ID**: Select **fcj-vpc**
   - **Subnet name**: Enter `fcj-public-subnet-01`
   - **Availability Zone**: Choose the **first AZ** (e.g., ap-southeast-1a)
   - **IPv4 subnet CIDR block**: Enter `10.10.0.0/24`

![image](/images/2.1/Group8.png)
![image](/images/2.1/Group7.png)

3\. Scroll down and click **Create subnet**.

![image](/images/2.1/Group9.png)

4\. **Create the second public subnet** by clicking **Create subnet** again and configure:
   - **VPC ID**: Select **fcj-vpc** 
   - **Subnet name**: Enter `fcj-public-subnet-02`
   - **Availability Zone**: Choose the **second AZ** (e.g., ap-southeast-1b)
   - **IPv4 subnet CIDR block**: Enter `10.10.1.0/24`

![image](/images/2.1/Group10.png)

5\. Scroll down and click **Create subnet**.

{{% notice note %}}
Ensure you're using different Availability Zones for each subnet to provide high availability across your infrastructure.
{{% /notice %}}

___

##### **Private Subnets**

1\. In the VPC Dashboard, select **Subnets** from the left navigation panel and click **Create subnet**.

2\. Configure the first private subnet:
   - **VPC ID**: Select **fcj-vpc**
   - **Subnet name**: Enter `fcj-private-subnet-01`
   - **Availability Zone**: Choose the **first AZ** (e.g., ap-southeast-1a)
   - **IPv4 subnet CIDR block**: Enter `10.10.16.0/20`

![image](/images/2.1/Group11.png)

3\. Scroll down and click **Create subnet**.

4\. **Create the second private subnet** by clicking **Create subnet** again and configure:
   - **VPC ID**: Select **fcj-vpc**
   - **Subnet name**: Enter `fcj-private-subnet-02`
   - **Availability Zone**: Choose the **second AZ** (e.g., ap-southeast-1b)
   - **IPv4 subnet CIDR block**: Enter `10.10.32.0/20`

![image](/images/2.1/Group13.png)

5\. Scroll down and click **Create subnet**.

{{% notice tip %}}
Private subnets use larger CIDR blocks (/20) to accommodate more IP addresses for ECS Fargate tasks, which each require a unique IP address for scaling.
{{% /notice %}}

___

##### **Database Subnets**

1\. In the VPC Dashboard, select **Subnets** from the left navigation panel and click **Create subnet**.

2\. Configure the first database subnet:
   - **VPC ID**: Select **fcj-vpc**
   - **Subnet name**: Enter `fcj-db-subnet-01`
   - **Availability Zone**: Choose the **first AZ** (e.g., ap-southeast-1a)
   - **IPv4 subnet CIDR block**: Enter `10.10.2.0/24`

![image](/images/2.1/Group14.png)

3\. Scroll down and click **Create subnet**.

4\. **Create the second database subnet** by clicking **Create subnet** again and configure:
   - **VPC ID**: Select **fcj-vpc**
   - **Subnet name**: Enter `fcj-db-subnet-02`
   - **Availability Zone**: Choose the **second AZ** (e.g., ap-southeast-1b)
   - **IPv4 subnet CIDR block**: Enter `10.10.3.0/24`

![image](/images/2.1/Group15.png)

5\. Scroll down and click **Create subnet**.

{{% notice info %}}
Database subnets are private subnets designed for hosting database instances like RDS. They require subnets in at least two Availability Zones for Multi-AZ deployments and high availability.
{{% /notice %}}

___

Here is what we have created.

![image](/images/2.1/Group16.png)