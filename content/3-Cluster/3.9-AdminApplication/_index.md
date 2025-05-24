---
title : "Deploying The Admin Application"
date :  "`r Sys.Date()`" 
weight : 9
chapter : false
pre : " <b> 3.9 </b> "
---

#### Enabling Service Connect For The Core Application

1\. Click on **Update service** to update **fcj-core-svc**.

![image](/images/3.9/Group118.png)

2\. Check **Force new deployment**.

![image](/images/3.9/Group114.png)

3\. Scroll down to **Service connect**. Check **Use Service Connect**. For **Service Connect configuration**, choose **Client and server**. For **Namespace**, select **fcj-ecs-cluster-ns**.

![image](/images/3.9/Group115.png)

4\. Under **Service Connect service - 1**, for **Port alias**, choose **core-http**. For discovery, enter in `core-http`. For **DNS**, enter in `core`. For **Port**, enter in `8080`.

![image](/images/3.9/Group116.png)

5\. Scroll to the bottom and click on **Update**.

![image](/images/3.9/Group117.png)

___

#### Creating The Admin Application Task Definition

1\. Click on **Create new task definition**.

![image](/images/3.9/Group119.png)

2\. For **Task definition family**, enter in `fcj-admin-fargate-td`. Choose **AWS Fargate** as **Launch type**.

![image](/images/3.9/Group120.png)

3\. For **CPU**, select **.25 vCPU**. For **Memory**, select **.5 GB**.

![image](/images/3.9/Group121.png)

4\. Select **fcjEcsTaskExecutionRole** as **Task execution role**.

![image](/images/3.9/Group122.png)

5\. **Open a new browser tab** for ECR and copy the **admin image URI**.

![image](/images/3.9/Group123.png)

6\. For container's **Name**, type in `admin`. For **Image URI**, enter in the image URI you have copied.

![image](/images/3.9/Group124.png)

7\. For **Container port**, use `80`. For **Port name**, use `admin-http`.

![image](/images/3.9/Group125.png)

8\. Click on **Add environment variable**.

![image](/images/3.9/Group126.png)

9\. For **key**, enter in `REACT_BASE_URL`. For **Value**, enter in `http://core:8080/api/`.

![image](/images/3.9/Group127.png)

10\. Scroll to the bottom and click on **Create**.

![image](/images/3.9/Group128.png)

___

#### Creating The Admin Application Service

1\. Click on **Create** to create a new service.

![image](/images/3.9/Group129.png)

2\. For **Task definition family**, select **fcj-admin-fargate-td**. For **Service name**, type in `fcj-admin-svc`.

![image](/images/3.9/Group130.png)

3\. Select **FARGATE** as **Launch type**.

![image](/images/3.9/Group131.png)

4\. For **Desired tasks**, enter in `1`.

![image](/images/3.9/Group132.png)

5\. For **VPC**, select **fcj-vpc**. Select the **two private subnets**.

![image](/images/3.9/Group133.png)

6\. For **Security group name**, select **fcj-private-vpc**. **Turn off Public IP**.

![image](/images/3.9/Group134.png)

7\. Check **Use Service Connect**. For **Service Connect configuration**, select **Client side only**. For **Namespace**, select **fcj-ecs-cluster-ns**.

![image](/images/3.9/Group135.png)

8\. Check **Use load balancing**.

![image](/images/3.9/Group139.png)

9\. Select **Use an existing load balancer**. Choose **fcj-alb**.

![image](/images/3.9/Group136.png)

10\. For **Listener**, **Create new listener**. For **Port**, enter in `81`. For **Target group**, **Create new target group**. For **Targer group name**, enter in `fcj-admin-tg`.

![image](/images/3.9/Group141.png)

11\. Scroll to the bottom and click on **Create**.

![image](/images/3.9/Group138.png)

12\. Wait a few minutes for the service to be successfully created. Then go to your ALB, copy the **DNS name** and then append `:81` into it. For example `fcj-alb-1993471058.ap-southeast-1.elb.amazonaws.com:81`.

![image](/images/3.9/Group142.png)

13\. Paste into your browser and here is the result.

![image](/images/3.9/Group143.png)

14\. Use `admin` as both username and password to log in. Here is the dashboard.

![image](/images/3.9/Group144.png)
