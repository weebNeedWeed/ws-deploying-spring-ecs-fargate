---
title : "Cleanup"
date :  "`r Sys.Date()`" 
weight : 7
chapter : false
pre : " <b> 7. </b> "
---

#### Delete the CI/CD Pipeline

1\. Navigate to **CodePipeline**.

2\. Select **Pipelines** in the left navigation pane.

3\. Select **fcj-core-pipeline**.

4\. Click **Delete pipeline**.

![image](/images/7/Group1.png)

___

#### Delete the Build Project

1\. Navigate to **CodeBuild**.

2\. Select **Build projects**.

3\. Select **fcj-core-build**.

4\. Click **Actions** > **Delete**.

![image](/images/7/Group2.png)

___

#### Delete Roles and Policies

1\. Navigate to **IAM**.

2\. Select **Roles**.

3\. Delete all roles that start with **fcj** or contain **codepipeline** or **codebuild**.

4\. Select **Policies**.

5\. For **Filter by Type**, select **Customer managed**.

6\. Delete all custom policies.

![image](/images/7/Group3.png)

![image](/images/7/Group4.png)

___

#### Delete the VPC Endpoint

1\. Navigate to **VPC**.

2\. In the left navigation pane, select **Endpoints**.

3\. Select **fcj-ssmmessages-ep**.

4\. Click **Actions** > **Delete VPC endpoints**.

![image](/images/7/Group5.png)

___

#### Delete the ECS Cluster

1\. Navigate to **ECS**.

2\. Delete the **fcj-core-svc** and **fcj-admin-svc** services.

3\. Delete the cluster.

![image](/images/7/Group6.png)

![image](/images/7/Group7.png)

___

#### Delete the Load Balancer and Target Groups

1\. Navigate to **EC2** and select **Load Balancers**.

2\. Delete the load balancer.

3\. Wait for the load balancer to be deleted.

4\. Select **Target Groups**.

5\. Delete the **fcj-core-tg** and **fcj-admin-tg** target groups.

![image](/images/7/Group8.png)

![image](/images/7/Group9.png)

___

#### Delete the Database

1\. Navigate to **RDS** and select **Databases**.

2\. Select **fcj-db** and click **Actions** > **Delete**.

3\. Uncheck **Create final snapshot** and **Retain automated backups**.

4\. Click **Delete**.

![image](/images/7/Group10.png)

___

#### Delete the Secret

1\. Navigate to **Secrets Manager** and click **dev/fcj/momentum**.

2\. Click **Actions** > **Delete secret**.

3\. Set **Waiting period** to **7**.

4\. Click **Schedule deletion**.

![image](/images/7/Group13.png)

![image](/images/7/Group14.png)

___

#### Delete the NAT Gateway

1\. Navigate to **VPC**.

2\. In the left navigation pane, select **NAT Gateways**.

3\. Select **fcj-ngw** and click **Actions** > **Delete NAT gateway**.

4\. Wait for the NAT gateway to be completely deleted.

5\. In the left navigation pane, select **Elastic IPs**.

6\. Select the elastic IP and click **Actions** > **Release Elastic IP addresses**.

![image](/images/7/Group11.png)

![image](/images/7/Group12.png)

___

#### Delete the VPC

1\. Navigate to **VPC**.

2\. Select **Your VPCs**.

3\. Select **fcj-vpc** and click **Actions** > **Delete VPC**.

![image](/images/7/Group15.png)

___

#### Delete the CodePipeline S3 Bucket

1\. Navigate to **S3**.

2\. Select the bucket with a name that starts with **codepipeline**.

3\. **Empty** and then **Delete** the bucket.

![image](/images/7/Group16.png)

___

#### Delete the Cloud Map Namespace

1\. Navigate to **Cloud Map**.

2\. Select **fcj-ecs-cluster-ns**.

3\. Click **Delete**.

![image](/images/7/Group17.png)

