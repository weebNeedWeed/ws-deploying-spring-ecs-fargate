---
title : "Load Balancing For The Core Application"
date :  "`r Sys.Date()`" 
weight : 6
chapter : false
pre : " <b> 3.6 </b> "
---

#### The Application Load Balancer - Where It All Began

An Application Load Balancer (ALB) operates at the application layer (Layer 7) of the Open Systems Interconnection (OSI) model. When a request reaches the ALB, it first evaluates listener rules in priority order to determine the appropriate action. Based on this rule, it then selects a target from the designated target group. You can configure listener rules to intelligently route requests to different target groups based on application traffic content, such as the path or host. 

Routing is performed independently for each target group, even if a single target is part of multiple groups. At the target group level, you can specify the routing algorithm. The default is round robin, but you can also opt for the least outstanding requests algorithm.

ALBs offer great flexibility:

- You can add or remove targets as your needs evolve, without disrupting the overall request flow to your application.
- Elastic Load Balancing automatically scales your load balancer capacity in response to traffic changes, handling the vast majority of workloads seamlessly. 
- You can configure health checks to monitor the status of registered targets. This ensures the ALB only sends requests to healthy instances, improving your application's fault tolerance. 

___

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

6\. Expand Advanced health check settings.

![image](/images/3.6/Group66.png)

7\. For **Unhealthy threshold**, enter `5`.

![image](/images/3.6/Group183.png)

8\. Scroll to the bottom and click **Next**.

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