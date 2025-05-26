---
title : "Load Balancing For The Core Application"
date :  "`r Sys.Date()`" 
weight : 6
chapter : false
pre : " <b> 3.6 </b> "
---

#### Creating the core application target group

1\. Navigate to **EC2** console.

![image](/images/3.6/Group56.png)

2\. In the left menu bar, scroll to the bottom and select **Target groups**. Click on **Create target group**.

![image](/images/3.6/Group63.png)

3\. Choose **Target type** as **IP Addresses**.

![image](/images/3.6/Group64.png)

4\. For **Target group name**, enter in **fcj-core-tg**. For **Protocol: Port**, use **HTTP** and `8080`.

![image](/images/3.6/Group65.png)

5\. For **Health check path**, enter `/health`.

![image](/images/3.6/Group182.png)

6\. Expand **Advanced health check settings**.

![image](/images/3.6/Group66.png)

7\. For **Healthy threshsold**, type in `2`.

![image](/images/3.6/Group67.png)

8\. For **Interval**, enter `10`.

![image](/images/3.6/Group69.png)

9\. Click on **Next**.

![image](/images/3.6/Group68.png)

___

#### Creating the Application Load Balancer

1\. Under **Load Balancing**, choose **Load Balancers** and click on **Create load balancer**.

![image](/images/3.6/Group57.png)

2\. **Create** a new **Application Load Balancer**.

![image](/images/3.6/Group58.png)

3\. For **Load balancer name**, enter in `fcj-alb`. For **Scheme**, select **Internet-facing**.

![image](/images/3.6/Group59.png)

4\. Scroll down to **Network mapping**, for **VPC**, choose **fcj-vpc**.

![image](/images/3.6/Group60.png)

5\. For **Availability Zones and subnets**, choose both AZs and then choose their respective public subnet.

![image](/images/3.6/Group61.png)

6\. Choose **fcj-public-sg** for **Security group**.

![image](/images/3.6/Group62.png)

7\. Under **Listeners and routing**. For **Default action - Forward To**, select **fcj-core-tg**.

![image](/images/3.6/Group70.png)

8\. Scroll to the bottom and click on **Create load balancer**. 

![image](/images/3.6/Group71.png)