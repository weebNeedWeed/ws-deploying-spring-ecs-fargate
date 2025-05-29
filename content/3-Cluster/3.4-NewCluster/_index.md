---
title : "Create Amazon ECS Cluster"
date :  "`r Sys.Date()`" 
weight : 4
chapter : false
pre : " <b> 3.4 </b> "
---

1\. Navigate to Amazon ECS:
   - In the AWS Console search bar, type `ECS`
   - Select **Elastic Container Service** from the dropdown

![image](/images/3.4/Group29.png)

2\. In the ECS Dashboard, select **Clusters** from the left navigation panel, then click **Create cluster**.

![image](/images/3.4/Group28.png)

3\. Configure the cluster settings:
   - **Cluster name**: Enter `fcj-ecs-cluster`
   - **Infrastructure**: Select **AWS Fargate (serverless)** only

![image](/images/3.4/Group30.png)

4\. Configure monitoring:
   - Scroll down to **Monitoring**
   - Select **Use Container Insights**

![image](/images/3.4/Group31.png)

5\. Review your configuration and click **Create**.

![image](/images/3.4/Group32.png)

6\. **Verify creation**: Confirm that the **fcj-ecs-cluster** appears in your clusters list with "Active" status.

{{% notice info %}}
AWS Fargate is a serverless compute engine that eliminates the need to manage EC2 instances. Container Insights provides enhanced monitoring and observability for your containerized applications.
{{% /notice %}}

Your ECS cluster is now ready to host containerized applications. In the next sections, we'll create task definitions and services to deploy your Spring Boot applications.