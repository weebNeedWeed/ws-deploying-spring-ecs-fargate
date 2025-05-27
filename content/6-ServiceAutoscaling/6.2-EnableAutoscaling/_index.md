---
title : "Enabling Service Auto Scaling"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 6.2 </b> "
---

1\. **Update** the **fcj-core-svc** service.

![image](/images/6.2/Group5.png)

2\. Scroll to **Service auto scaling** and expand it.

![image](/images/6.2/Group6.png)

3\. Check **Use service auto scaling**. For **Minimum number of tasks**, enter `1`. For **Maximum number of tasks** enter `3`.

![image](/images/6.2/Group7.png)

4\. Click **Add scaling policies**.

![image](/images/6.2/Group8.png)

5\. For **Policy name**, enter `fcj-core-scaling-policy`. For **ECS service metric**, select **ECSServiceAverageCPUUtilization**. For **Target value**, enter `30`.

![image](/images/6.2/Group9.png)

6\. Click **Update**.

![image](/images/6.2/Group10.png)


