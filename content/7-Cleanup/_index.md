---
title : "Cleanup"
date :  "`r Sys.Date()`" 
weight : 7
chapter : false
pre : " <b> 7. </b> "
---

#### Deleting The CI/CD Pipeline

1\. Navigate to **CodePipeline**.

2\. Select Pipelines in the left navigation pane.

3\. Select **fcj-core-pipeline**.

4\. Click **Delete pipeline**.

![image](/images/7/Group1.png)

#### Deleting The Build Project

1\. Navigate to **CodeBuild**.

2\. Select **Build projects**.

3\. Select **fcj-core-build**.

4\. Click **Actions** > **Delete**.

![image](/images/7/Group2.png)

#### Deleting Roles And Policies

1\. Navigate to **IAM**.

2\. Select **Roles**.

3\. Delete all roles that start with **fcj** or have **codepipeline** or **codebuild**.

4\. Select **Policies**.

5\. For **Filter by Type**, choose **Customer managed**.

6\. Delete all of those policies.

![image](/images/7/Group3.png)

![image](/images/7/Group4.png)

#### Deleting The VPC Endpoint

1\. Go to **VPC**.

2\. In the left navigation pane, select **Endpoint**.

3\. Select the **fcj-ssmmessages-ep**.

4\. Click **Actions** > **Delete VPC endpoints**.

![image](/images/7/Group5.png)

#### Deleting The ECS Cluster

1\. Go to **ECS**.

2\. Delete the **fcj-core-svc** and the **fcj-admin-svc** service.

3\. Delete the cluster.

![image](/images/7/Group6.png)

![image](/images/7/Group7.png)

#### Deleting The Load Balancer And Target Groups

1\. Go to **EC2** then select **Load Balancers**.

2\. Delete the load balancer.

3\. Wait for the load balancer to be deleted.

4\. Select **Target Groups**. 

5\. Delete the **fcj-core-tg** and the **fcj-admin-tg** target group.

![image](/images/7/Group8.png)

![image](/images/7/Group9.png)

#### Deleting The Database

1\. Go to **RDS** then select **Databases**.

2\. Select **fcj-db** and then click **Actions** > **Delete**.

3\. Uncheck **Create final snapshot** and **Retain automated backups**.

4\. click **Delete**.

![image](/images/7/Group10.png)

#### Deleting The Secret

1\. Go to **Secrets Manager** then click on **dev/fcj/momentum**.

2\. Click **Actions** > **Delete secret**.

3\. Set **Waiting period** to 7.

4\. Click **Schedule deletion**.

![image](/images/7/Group13.png)

![image](/images/7/Group14.png)

#### Deleting The NAT Gateway

1\. Go to **VPC**.

2\. In the left navigation pane, select **NAT Gateways**.

3\. Select **fcj-ngw** and click **Actions** > **Delete NAT gateway**.

4\. Wait for the NAT gateway to be completely deleted.

5\. In the left navigation pane, select **Elastic IPs**.

6\. Check the IP and click **Actions** > **Release Elastic IP addresses**.

![image](/images/7/Group11.png)

![image](/images/7/Group12.png)

#### Deleting The VPC

1\. Go to **VPC**.

2\. Select **Your VPCs**.

3\. Select **fcj-vpc** and click **Actions** > **Delete VPC**.

![image](/images/7/Group15.png)

