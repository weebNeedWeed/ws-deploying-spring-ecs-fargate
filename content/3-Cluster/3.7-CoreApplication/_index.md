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

![image](/images/3.7/Group81.png)

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

![image](/images/3.7/Group82.png)