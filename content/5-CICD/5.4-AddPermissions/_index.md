---
title : "Add Permissions to CodeBuild Service Role"
date :  "`r Sys.Date()`" 
weight : 4
chapter : false
pre : " <b> 5.4 </b> "
---

1\. Navigate to the **IAM** console and select **Roles**.

![image](/images/5.4/Group44.png)

2\. Find the **CodeBuild service role** and click on it.

![image](/images/5.4/Group45.png)

3\. Click **Add permissions**, then select **Attach policies**.

![image](/images/5.4/Group46.png)

4\. Search for and select **AmazonEC2ContainerRegistryFullAccess**.

![image](/images/5.4/Group47.png)

5\. Search for and select **SecretsManagerReadWrite**. Click **Add permissions**.

![image](/images/5.4/Group48.png)

6\. Navigate back to your pipeline and rerun the build stage.

![image](/images/5.4/Group49.png)

7\. Wait approximately 10 minutes for the deploy stage to complete successfully.

![image](/images/5.4/Group50.png)

{{% notice tip %}}
**Pipeline Process Overview:** AWS CodeBuild creates a new container image and pushes it to the Amazon ECR repository. During the deploy stage, the **fcj-core-fargate-td** task definition is updated with a new revision containing the latest container image. The ECS service then updates to use this new task definition revision.
{{% /notice %}}
