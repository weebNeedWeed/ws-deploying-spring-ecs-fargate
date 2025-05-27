---
title : "Turning Off Flyway"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 5.1 </b> "
---

#### Updating The Task Definition

1\. Access the **ECS** dashboard. On the left navigation pane, click **Task definitions**. Select **fcj-core-fargate-td** and click **Create new revision**.

![image](/images/5.1/Group1.png)

2\. Scroll to **Environment variables**. Click **Add environment variable**.

![image](/images/5.1/Group2.png)

3\. For **Key**, enter `SPRING_FLYWAY_ENABLED`. For **Value type**, select **Value**. For **Value**, enter `false`.

![image](/images/5.1/Group3.png)

4\. Scroll to the bottom and click **Create**.

![image](/images/5.1/Group4.png)

___

#### Redeploying The Service

1\. Navigate to the dashboard of your cluster. Select the **fcj-core-svc** service. Click **Update**.

![image](/images/5.1/Group5.png)

2\. Check **Force new deployment** and select the **latest task definition revision**.

![image](/images/5.1/Group6.png)

3\. Scroll to the bottom and click **Update**.

![image](/images/5.1/Group7.png)

4\. Wait a couple of minutes for the deployment to succeed.