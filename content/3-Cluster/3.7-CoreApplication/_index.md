---
title : "Getting The Core Application Up & Running"
date :  "`r Sys.Date()`" 
weight : 7
chapter : false
pre : " <b> 3.7 </b> "
---

#### Create The Core Application Task Definition

1\. Navigate to **Elastic Container Service**.

![image](/images/3.7/Group82.png)

2\. Select **Task definitions** and click on **Create new task definition**.

![image](/images/3.7/Group72.png)

3\. Enter in `fcj-core-fargate-td` for **Task definition family** and choose **AWS Fargate** as the **Launch type**.

![image](/images/3.7/Group73.png)

4\. For **CPU**, choose **.25vCPU**. For **Memory**, choose **.5GB**.

![image](/images/3.7/Group74.png)

5\. For **Task execution role**, select **fcjEcsTaskExecutionRole**.

![image](/images/3.7/Group75.png)

6\. **Open a new browser tab** and navigate to your **ECR** repository. Copy the **core** image URI.

![image](/images/3.7/Group76.png)

7\. Go back to the **Create new task definition** tab. Under **Container details**, for **Name**, enter in `core`. For **Image URI**, enter in the **core image URI you have copied**.

![image](/images/3.7/Group77.png)

8\. For **Container port**, enter in `8080`. For `Port name`, enter in `core-http`.

![image](/images/3.7/Group78.png)

9\. Scroll to the bottom and click on **Create**.

![image](/images/3.7/Group79.png)

___

#### Injecting The Secret

1\. **Open a new browser tab** and access the **Secrets Manager** console. Go to your secret and **copy the ARN** of it.

![image](/images/3.7/Group83.png)

2\. Go back to your ECS Task definition, **Create new revision with JSON** of **fcj-core-fargate-td**.

![image](/images/3.7/Group80.png)

3\. Navigate to the **containerDefinitions** array. Inside this array, find the specific container definition where you want to inject the secret. In our case, this is the first (and only) container definition with **"name": "core"**. Then **add the following secret block into it**.

- **Don't forget to replace `<secret-arn>` with your secret's ARN.**

```json
"secrets": [
    {
        "name": "SPRING_DATASOURCE_URL",
        "valueFrom": "<secret-arn>:DB_CONNECTION_STRING::"
    }
]
```

Your **containerDefinitions** array will look like this:

```json
"containerDefinitions": [
    {
        "name": "core",
        "image": "058264371769.dkr.ecr.ap-southeast-1.amazonaws.com/fcj-registry:core",
        "cpu": 0,
        "portMappings": [
            {
                "name": "core-http",
                "containerPort": 8080,
                "hostPort": 8080,
                "protocol": "tcp",
                "appProtocol": "http"
            }
        ],
        "essential": true,
        "environment": [],
        "mountPoints": [],
        "volumesFrom": [],
        "logConfiguration": {
            "logDriver": "awslogs",
            "options": {
                "awslogs-group": "/ecs/fcj-core-fargate-td",
                "mode": "non-blocking",
                "awslogs-create-group": "true",
                "max-buffer-size": "25m",
                "awslogs-region": "ap-southeast-1",
                "awslogs-stream-prefix": "ecs"
            }
        },
        "systemControls": [],
        "secrets": [
            {
                "name": "SPRING_DATASOURCE_URL",
                "valueFrom": "arn:aws:secretsmanager:ap-southeast-1:0123456789:secret:dev/fcj/momentum-75swok:DB_CONNECTION_STRING::"
            }
        ],
    }
]
```

4\. Click on **Create**. 

![image](/images/3.7/Group81.png)

5\. Now the latest revision should be 2.

![image](/images/3.7/Group85.png)

___

#### Launching The Core Application Service

1\. Access your cluster, scroll down to **Services** and click on **Create**.

![image](/images/3.7/Group84.png)

2\. For **Task definition family**, select **fcj-core-fargate-td**.For **Task definition revision**, select the **LATEST** version **(2)**.

![image](/images/3.7/Group86.png)

3\. For **Service name**, enter in `fcj-core-svc`.

![image](/images/3.7/Group87.png)

4\. For **Compute options**, select **Launch type** and then select **FARGATE**.

![image](/images/3.7/Group88.png)

5\. For **Desired tasks**, enter in `1`.

![image](/images/3.7/Group89.png)

6\. Scroll to **Networking** and expand it.

![image](/images/3.7/Group90.png)

7\. For **VPC**, select **fcj-vpc**. For **Subnets**, select the **two private subnets**.

![image](/images/3.7/Group91.png)

8\. For **Security group**, select **Use an existing security group** and then select **fcj-private-sg**.

![image](/images/3.7/Group92.png)

9\. Turn off **Public IP**.

![image](/images/3.7/Group93.png)

10\. Scroll down to **Load balancing**. Then, check **Use load balancing**. For **Load balancer type**, select **Application Load Balancer**.

![image](/images/3.7/Group94.png)

11\. Select **Use an existing load balancer** and select **fcj-alb**.

![image](/images/3.7/Group95.png)

12\. For **Listener**, select **Use an existing listener** and then select **HTTP:80**.

![image](/images/3.7/Group96.png)

13\. For **Target group**, select **Use an existing target group** and then select **fcj-core-tg**.

![image](/images/3.7/Group97.png)

14\. Scroll to the bottom and click on **Create**.

![image](/images/3.7/Group98.png)

15\. Wait for one task to be in **Running** state.

![image](/images/3.7/Group110.png)

16\. Then, go to your ALB. Copy the **DNS name** and paste into a new browser tab.

![image](/images/3.7/Group111.png)

17\. Here is the result. You can use `admin` for both **Username** and **Password** to log in.

![image](/images/3.7/Group112.png)
