---
title : "Update Services to Use Task Role"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 4.2 </b> "
---

#### Update the Task Definitions

1\. In the **ECS** console, navigate to **Task definitions**. Select **fcj-core-fargate-td** and click **Create new revision**.

![image](/images/4.2/Group158.png)

2\. Scroll down to **Task role** and select **fcjEcsTaskRole** from the dropdown.

![image](/images/4.2/Group159.png)

3\. Scroll to the bottom and click **Create**.

![image](/images/4.2/Group160.png)

4\. Repeat the same process for **fcj-admin-fargate-td**:
   - Select **fcj-admin-fargate-td** and click **Create new revision**
   - Scroll down to **Task role** and select **fcjEcsTaskRole**
   - Click **Create**

___

#### Update the Services

1\. Navigate to your **ECS cluster** and click on the **Services** tab. Select the **fcj-core-svc** service and click **Update**.

![image](/images/4.2/Group161.png)

2\. In the **Update service** page, configure deployment settings:
   - Check **Force new deployment**
   - For **Task definition revision**, select **LATEST**

![image](/images/4.2/Group162.png)

3\. Leave all other settings unchanged, scroll to the bottom and click **Update**.

![image](/images/4.2/Group163.png)

4\. Wait for the service to be updated. You can monitor the deployment progress in the **Deployments** tab.

5\. Repeat the same process for **fcj-admin-svc** service:
   - Select **fcj-admin-svc** and click **Update**
   - Check **Force new deployment** and select **LATEST** for task definition revision
   - Click **Update** and wait for the deployment to complete