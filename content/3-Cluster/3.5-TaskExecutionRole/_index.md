---
title : "The Task Execution Role"
date :  "`r Sys.Date()`" 
weight : 5
chapter : false
pre : " <b> 3.5 </b> "
---

1\. Navigate to the **IAM** Dashboard.

![image](/images/3.5/Group46.png)

2\. Select **Roles** and then click on **Create role**.

![image](/images/3.5/Group47.png)

3\. For **Trusted entity type**, select **AWS Service**.

![image](/images/3.5/Group48.png)

4\. For **Service or use case**, choose **Elastic Container Service**. Then, select **Elastic Container Service Task**. Click on **Next**.

![image](/images/3.5/Group49.png)

5\. Search for and check **AmazonECSTaskExecutionRolePolicy**.

![image](/images/3.5/Group50.png)

6\. Search for and check **AmazonEC2ContainerRegistryReadOnly**.

![image](/images/3.5/Group51.png)

7\. Search for and check **CloudWatchLogsFullAccess**.

![image](/images/3.5/Group51.png)

8\. Search for and check **SecretsManagerReadWrite**. Click on **Next**.

![image](/images/3.5/Group53.png)

9\. For **Role name**, enter in `fcjEcsTaskExecutionRole`. Scroll to the bottom and click on **Create role**.

![image](/images/3.5/Group54.png)
