---
title : "(Optional) Create VPC Endpoint for Session Manager"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 4.3 </b> "
---

Instead of routing Amazon ECS Exec traffic through a NAT Gateway to the internet, you can create a VPC Endpoint. **This endpoint establishes a private connection between your VPC and the necessary AWS service** (like AWS Systems Manager for ECS Exec) **using elastic network interfaces (ENIs)** within your subnets.

When your resources communicate with the AWS service, DNS resolves the service's hostname to the **private IP addresses of these ENIs**. **Traffic is then directed to the AWS service securely over the AWS private network**, bypassing the public internet entirely. Thus, with a VPC Endpoint, **ECS Exec traffic remains within your VPC and the AWS network**, enhancing security and potentially reducing data transfer costs associated with a NAT Gateway.

___

#### Enable DNS Hostnames

1\. Navigate to the **VPC** console and select your VPC. Click **Actions**.

![image](/images/4.3/Group166.png)

2\. Click **Edit VPC settings**.

![image](/images/4.3/Group167.png)

3\. Enable both settings and save:
   - Check **Enable DNS resolution**
   - Check **Enable DNS hostnames**
   - Click **Save**

![image](/images/4.3/Group168.png)

___

#### Create VPC Endpoint

1\. In the left navigation pane, click **Endpoints**.

![image](/images/4.3/Group165.png)

2\. Click **Create endpoint** and configure the basic settings:
   - **Name tag**: Enter `fcj-ssmmessages-ep`
   - **Service category**: Select **AWS services**

![image](/images/4.3/Group169.png)

3\. In the search box, enter `ssmmessages` and select the corresponding service.

![image](/images/4.3/Group170.png)

![image](/images/4.3/Group171.png)

4\. For **VPC**, select **fcj-vpc**.

![image](/images/4.3/Group172.png)

5\. Configure subnet selection:
   - **Availability Zone**: Select **AZ a**
   - **Subnet**: Select **fcj-private-subnet-01**

![image](/images/4.3/Group173.png)

6\. For **Security groups**, select **fcj-private-sg**.

![image](/images/4.3/Group174.png)

7\. Review your configuration and click **Create endpoint**.

![image](/images/4.3/Group175.png)

8\. Wait for the endpoint to be created (this may take a few minutes) before proceeding to the next step.