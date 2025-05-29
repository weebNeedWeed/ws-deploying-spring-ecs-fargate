---
title : "(Optional) Enable Auto Scaling for Admin Application"
date :  "`r Sys.Date()`" 
weight : 4
chapter : false
pre : " <b> 6.4 </b> "
---

Follow the same process outlined in sections 6.2 and 6.3 to enable auto scaling for the admin application, with the following configuration:

**Auto Scaling Configuration:**
- **Service**: `fcj-admin-svc`
- **Minimum number of tasks**: `1`
- **Maximum number of tasks**: `3`
- **Policy name**: `fcj-admin-scaling-policy`
- **ECS service metric**: **ECSServiceAverageCPUUtilization**
- **Target value**: `30`

**Load Testing:**
To test the admin application auto scaling, use the following command in CloudShell:

**Replace `<alb-dns-name>` with your ALB's DNS name.**

```bash
ab -n 1000000 -c 50 http://<alb-dns-name>:81/
```

{{% notice info %}}
**Admin Application Testing:** The admin application runs on port 81 of the load balancer. The load test targets the root path (`/`) instead of `/health` since the React application structure differs from the core Spring Boot application.
{{% /notice %}}