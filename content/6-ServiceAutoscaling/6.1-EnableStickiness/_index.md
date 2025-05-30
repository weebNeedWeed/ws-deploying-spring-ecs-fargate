---
title : "Enable Stickiness"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 6.1 </b> "
---

Since our core application uses **session-based authentication**, users might **lose their session** if the Application Load Balancer routes their subsequent requests to different backend targets. To prevent this, we need to enable **Session Stickiness**. This feature ensures that requests from a specific user are consistently directed to the same target for a defined period, thereby preserving their session continuity. 

___

#### Enable Stickiness

1\. Navigate to the **EC2** console and find the **fcj-core-tg** target group. Click on it.

![image](/images/6.1/Group1.png)

2\. Select the **Attributes** tab and click **Edit**.

![image](/images/6.1/Group2.png)

3\. Scroll to **Stickiness** and check **Turn on stickiness**.

![image](/images/6.1/Group3.png)

4\. Click **Save changes**.

![image](/images/6.1/Group4.png)