---
title : "Deploy Admin Application"
date :  "`r Sys.Date()`" 
weight : 9
chapter : false
pre : " <b> 3.9 </b> "
---

#### Enable Service Connect for the Core Application

1\. Click **Update service** to update **fcj-core-svc**.

![image](/images/3.9/Group118.png)

2\. Check **Force new deployment**.

![image](/images/3.9/Group114.png)

3\. Scroll down to **Service connect** and configure:
   - Check **Use Service Connect**
   - **Service Connect configuration**: Select **Client and server**
   - **Namespace**: Select **fcj-ecs-cluster-ns**

![image](/images/3.9/Group115.png)

4\. Click **Add port mappings and applications**. Under **Service Connect service - 1**, configure:
   - **Port alias**: Select **core-http**
   - **Discovery name**: Enter `core-http`
   - **DNS**: Enter `core`
   - **Port**: Enter `8080`

This configuration allows the admin application to make requests to the core application using the URI `http://core:8080`, which corresponds to the specified **DNS** and **Port**.

![image](/images/3.9/Group116.png)

5\. Scroll to the bottom and click **Update**.

![image](/images/3.9/Group117.png)

___

#### Create the Admin Application Task Definition

1\. Click **Create new task definition**.

![image](/images/3.9/Group119.png)

2\. Configure the basic settings:
   - **Task definition family**: `fcj-admin-fargate-td`
   - **Launch type**: **AWS Fargate**

![image](/images/3.9/Group120.png)

3\. Set the resource allocation:
   - **CPU**: **.25 vCPU**
   - **Memory**: **.5 GB**

![image](/images/3.9/Group121.png)

4\. For **Task execution role**, select **fcjEcsTaskExecutionRole**.

![image](/images/3.9/Group122.png)

5\. **Open a new browser tab** and navigate to **Amazon ECR**. Copy the **admin image URI**.

![image](/images/3.9/Group123.png)

6\. Return to the task definition tab. In the **Container details** section, configure:
   - **Name**: `admin`
   - **Image URI**: Paste the **admin image URI** you copied

![image](/images/3.9/Group124.png)

7\. Configure the container networking:
   - **Container port**: `80`
   - **Port name**: `admin-http`

![image](/images/3.9/Group125.png)

8\. Click **Add environment variable**.

![image](/images/3.9/Group126.png)

9\. Configure the environment variable:
   - **Key**: `REACT_BASE_URL`
   - **Value**: `http://core:8080/api/`

![image](/images/3.9/Group127.png)

10\. Review your configuration and click **Create**.

![image](/images/3.9/Group128.png)

___

#### Creating The Admin Application Service

1\. Click **Create** to create a new service.

![image](/images/3.9/Group129.png)

2\. Configure the task definition and service:
   - **Task definition family**: Select **fcj-admin-fargate-td**
   - **Service name**: Enter `fcj-admin-svc`

![image](/images/3.9/Group130.png)

3\. Configure compute options:
   - **Launch type**: Select **FARGATE**

![image](/images/3.9/Group131.png)

4\. For **Desired tasks**, enter `1`.

![image](/images/3.9/Group132.png)

5\. Configure networking:
   - **VPC**: Select **fcj-vpc**
   - **Subnets**: Select the **two private subnets**

![image](/images/3.9/Group133.png)

6\. Configure security and IP settings:
   - **Security group**: Select **fcj-private-sg**
   - **Public IP**: **Disable**

![image](/images/3.9/Group134.png)

7\. Configure Service Connect:
   - Check **Use Service Connect**
   - **Service Connect configuration**: Select **Client side only**
   - **Namespace**: Select **fcj-ecs-cluster-ns**

![image](/images/3.9/Group135.png)

8\. Check **Use load balancing**.

![image](/images/3.9/Group139.png)

9\. Configure load balancer:
   - Select **Use an existing load balancer**
   - Choose **fcj-alb**

![image](/images/3.9/Group136.png)

10\. Configure listener and target group:
  - **Listener**: Select **Create new listener**
  - **Port**: Enter `81`
  - **Target group**: Select **Create new target group**
  - **Target group name**: Enter `fcj-admin-tg`

![image](/images/3.9/Group141.png)

11\. Review your configuration and click **Create**.

![image](/images/3.9/Group138.png)

12\. Wait for the service to be created (this may take a few minutes). Navigate to your ALB, copy the **DNS name**, and append `:81` to it.

**Example**: `fcj-alb-1993471058.ap-southeast-1.elb.amazonaws.com:81`

![image](/images/3.9/Group142.png)

13\. Paste the URL into your browser to access the admin application.

![image](/images/3.9/Group143.png)

14\. Use `admin` for both **Username** and **Password** to log in and access the dashboard.

![image](/images/3.9/Group144.png)
