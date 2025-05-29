---
title : "Turn Off Flyway"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 5.1 </b> "
---

We are moving the database migration process to the build phase of our CI/CD pipeline. Consequently, Flyway (or your specific migration tool) will be disabled within the application itself, preventing it from attempting to apply database migrations each time a container launches. This change resolves the concurrency issue where multiple containers might simultaneously attempt to apply the same migrations. 

___

#### Update the Task Definition

1\. Navigate to the **ECS** console. In the left navigation pane, select **Task definitions**. Select **fcj-core-fargate-td** and click **Create new revision**.

![image](/images/5.1/Group1.png)

2\. Scroll to **Environment variables** and click **Add environment variable**.

![image](/images/5.1/Group2.png)

3\. Configure the environment variable:
   - **Key**: Enter `SPRING_FLYWAY_ENABLED`
   - **Value type**: Select **Value**
   - **Value**: Enter `false`

![image](/images/5.1/Group3.png)

4\. Scroll to the bottom and click **Create**.

![image](/images/5.1/Group4.png)

#### Redeploy the Service

1\. Navigate to your ECS cluster dashboard. Select the **fcj-core-svc** service and click **Update**.

![image](/images/5.1/Group5.png)

2\. Configure deployment settings:
   - Check **Force new deployment**
   - For **Task definition revision**, select the **latest** revision

![image](/images/5.1/Group6.png)

3\. Scroll to the bottom and click **Update**.

![image](/images/5.1/Group7.png)

4\. Wait for the deployment to complete (this may take a few minutes).