---
title : "Debugging With ECS Exec"
date :  "`r Sys.Date()`" 
weight : 4
chapter : false
pre : " <b> 4. </b> "
---

With Amazon ECS Exec, you can directly interact with your containers—running commands or accessing a shell—without needing to first interact with the host container operating system, open inbound ports, or manage SSH keys. You can use ECS Exec with containers running on an Amazon EC2 instance or AWS Fargate. This capability simplifies collecting diagnostic information and quickly troubleshooting errors. For example, in a development context, you can use ECS Exec to easily interact with various processes in your containers and troubleshoot your applications. In production scenarios, you can use it to gain break-glass access to your containers to debug critical issues.

To enable ECS Exec for a service, its tasks must operate in one of the following network configurations:

1. Public subnets and be assigned public IP addresses.
2. Private subnets with a configured NAT gateway.
3. Private subnets with an AWS Systems Manager VPC endpoint, if a NAT gateway isn't used for this traffic.

Since our private subnets already have a route to a NAT gateway, completing step [4.3 - Creating The VPC Endpoint For The Session Manager](4.3-vpcendpoint/) is technically optional for ECS Exec functionality. However, it is highly recommended to implement the VPC endpoint. This approach provides a more secure and direct path for ECS Exec by keeping traffic to AWS Systems Manager Session Manager within the AWS network, bypassing the NAT gateway for these connections, which can also be more cost-effective.

___

#### How Amazon ECS Exec Works

Amazon ECS Exec utilizes AWS Systems Manager (SSM) Session Manager to establish a connection with the running container and employs AWS Identity and Access Management (IAM) policies to control access for executing commands within it. This is achieved by bind-mounting the necessary SSM agent binaries directly into the container. The Amazon ECS or AWS Fargate agent is then responsible for starting this SSM core agent inside the container, allowing it to run alongside your application code.

For auditing purposes, you can track which user accessed a container via the ExecuteCommand event in AWS CloudTrail. Additionally, every command executed and its corresponding output can be logged to Amazon S3 or Amazon CloudWatch Logs.