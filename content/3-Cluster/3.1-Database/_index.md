---
title : "Creating The Amazon RDS PostgreSQL Database"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 3.1 </b> "
---

1\. Navigate to the **Aurora and RDS** console.

![image](/images/3.1/Group2.png)

2\. In the left menu bar, select **Subnet groups**. Click on **Create DB subnet group**.

![image](/images/3.1/Group3.png)

3\. For **Name** and **Description**, type in `fcj-db-subnet-group`. For **VPC**, choose **fcj-vpc**.

![image](/images/3.1/Group4.png)

4\. Scroll down. For **Availability Zones**, select AZ **a** and **b**, e.g. **ap-southeast-1a** and **ap-southeast-1b**. For **Subnets**, choose **fcj-db-subnet-01** and **fcj-db-subnet-02**.

![image](/images/3.1/Group5.png)

5\. Scroll to the bottom and click on **Create**.

![image](/images/3.1/Group6.png)

___

1\. In the left menu bar, select **Databases**. Click on **Create database**.

![image](/images/3.1/Group8.png)

2\. Choose **Standard create** and then choose **PostgreSQL**.

![image](/images/3.1/Group9.png)

3\. For **Templates**, select **Free tier**.

![image](/images/3.1/Group10.png)

4\. For **DB instance identifier**, type in `fcj-db`.

![image](/images/3.1/Group11.png)

5\. Select **Self managed** and type in `fcj-db-123` for both **Master password** and **Confirm master password**.

![image](/images/3.1/Group12.png)

6\. Under **Instance configuration**, for **DB instance class**, select **db.t3.micro**.

![image](/images/3.1/Group13.png)

7\. Under **Connectivity**, for **Virtual private cloud (VPC)**, choose **fcj-vpc**. For **DB subnet group**, choose **fcj-db-subnet-group**.

![image](/images/3.1/Group14.png)

8\. For **VPC security group (firewall)**, select **Choose existing** and select **fcj-db-sg**.

![image](/images/3.1/Group15.png)

9\. Scroll down to **Additional configuration** and expand it. For **Initial database name**, type in `FCJMomentum`.

![image](/images/3.1/Group16.png)

10\. Scroll to the bottom and click on **Create database**.

![image](/images/3.1/Group17.png)