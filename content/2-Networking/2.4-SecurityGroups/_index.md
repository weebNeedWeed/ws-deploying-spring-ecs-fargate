---
title : "Creating The Virtual Firewall - Security Groups"
date :  "`r Sys.Date()`" 
weight : 4
chapter : false
pre : " <b> 2.4 </b> "
---

Within a VPC, we utilize a component called a **security group**. A security group acts as a virtual firewall, controlling the inbound and outbound traffic for the resources it is associated with. For example, when you associate a security group with an EC2 instance, it precisely dictates what traffic can reach and leave that instance.

When you create a VPC, it automatically includes a default security group. You have the flexibility to create additional security groups within a VPC, each with its own set of inbound and outbound rules. For inbound rules, you can specify the source, port range, and protocol. Similarly, for outbound rules, you can define the destination, port range, and protocol.

![image](/images/2.4/2.png)

This diagram illustrates a VPC containing a subnet, an Internet Gateway, and a security group. The subnet holds an EC2 instance, and the security group is associated with this instance. As a virtual firewall, the security group ensures that only traffic explicitly allowed by its rules can reach the instance. For instance, if the security group contains a rule permitting ICMP traffic from your network, you can successfully ping the instance from your computer. Conversely, if no rule allows SSH traffic, you will be unable to connect to your instance using SSH.

![image](/images/2.4/1.png)

___

Our architecture will require three security groups. We will set up three distince security group: one for the public subnets, one for the private subnets and a third one is for the database subnets.

The private subnets security group will permit inbound traffic only from the public subnets security group.Similarly, the database subnets security group will permit only inbound traffic only from the private subnets security group. This configuration creates a secure, tiered architecture, ensuring that each layer can only be accessed by the preceding, authorized layer. The following illustration show how we will configure our security groups.

![image](/images/2.4/3.png)

___

#### Creating The Public Subnets Security Group

1\. On the left menu bar, under **Security**, select **Security groups**.

![image](/images/2.4/Group37.png)

2\. Click on **Create security group**.

![image](/images/2.4/Group36.png)

3\. For **Security group name**, enter in `fcj-public-sg`. For **VPC**, select **fcj-vpc**.
For **Description**, enter in `Allows inbound HTTP 80 from the internet`.

![image](/images/2.4/Group38.png)

4\. For **Inbound rules**, **add a new rule**. For **Type**, select **HTTP**. For **Source**, select **Anywhere-IPv4**. This rule will allow all inbound traffic from the internet to be routed to the public subnets. Scroll down and click on **Create security group**.

![image](/images/2.4/Group39.png)

___

#### Creating The Private Subnets Security Group

This security will allow all inbound traffic from the public subnets security group.

1\. On the left menu bar, under **Security**, select **Security groups**.

2\. Click on **Create security group**.

3\. For **Security group name**, enter in `fcj-private-sg`. For **VPC**, select **fcj-vpc**.
For **Description**, enter in `Allows all inbound traffic from fcj-public-sg`.

![image](/images/2.4/Group40.png)

4\. For **Inbound rules**, **add a new rule**. For **Type**, select **All traffic**. For **Source**, select **Custom** and then select **fcj-public-sg**. Scroll down and click on **Create security group**.

![image](/images/2.4/Group41.png)

___

#### Creating The Database Subnets Security Group

This security will allow all inbound traffic from the private subnets security group.

1\. On the left menu bar, under **Security**, select **Security groups**.

2\. Click on **Create security group**.

3\. For **Security group name**, enter in `fcj-db-sg`. For **VPC**, select **fcj-vpc**.
For **Description**, enter in `Allows all inbound traffic from fcj-private-sg`.

![image](/images/2.4/Group42.png)

4\. For **Inbound rules**, **add a new rule**. For **Type**, select **All traffic**. For **Source**, select **Custom** and then select **fcj-private-sg**. Scroll down and click on **Create security group**.

![image](/images/2.4/Group43.png)