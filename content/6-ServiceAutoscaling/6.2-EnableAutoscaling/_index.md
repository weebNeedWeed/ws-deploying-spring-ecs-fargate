---
title : "Enable Auto Scaling for the Core Application"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 6.2 </b> "
---

1\. **Update** the **fcj-core-svc** service.

![image](/images/6.2/Group5.png)

2\. Scroll to **Service auto scaling** and expand it.

![image](/images/6.2/Group6.png)

3\. Configure auto scaling settings:
   - Check **Use service auto scaling**
   - **Minimum number of tasks**: Enter `1`
   - **Maximum number of tasks**: Enter `3`

![image](/images/6.2/Group7.png)

4\. Click **Add scaling policies**.

![image](/images/6.2/Group8.png)

5\. Configure the scaling policy:
   - **Policy name**: Enter `fcj-core-scaling-policy`
   - **ECS service metric**: Select **ECSServiceAverageCPUUtilization**
   - **Target value**: Enter `30`

![image](/images/6.2/Group9.png)

{{% notice note %}}
The scaling policy automatically adjusts the number of running tasks based on CPU utilization. When average CPU usage exceeds 30%, new tasks will be launched (up to the maximum of 3). When CPU usage drops below 30%, tasks will be terminated (down to the minimum of 1). This ensures optimal resource utilization and cost efficiency.
{{% /notice %}}

6\. Click **Update**.

![image](/images/6.2/Group10.png)


