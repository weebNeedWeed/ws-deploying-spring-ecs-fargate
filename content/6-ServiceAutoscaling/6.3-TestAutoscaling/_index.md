---
title : "Test Auto Scaling"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 6.3 </b> "
---

#### Test Auto Scaling

1\. Copy the **DNS name** of the ALB for use with Apache Benchmark.

![image](/images/6.3/Group12.png)

2\. Open **CloudShell**.

![image](/images/6.3/Group11.png)

3\. Execute these commands to install the Apache Benchmark tool and run a load test:

- **Replace `<alb-dns-name>` with your ALB's DNS name.**

```bash
sudo yum install -y httpd-tools

ab -n 1000000 -c 50 http://<alb-dns-name>/health
```

![image](/images/6.3/Group13.png)

4\. Wait approximately 5-10 minutes for auto scaling to trigger. You will see the additional tasks being provisioned as CPU utilization increases.

![image](/images/6.3/Group14.png)

{{% notice info %}}
**Load Test Parameters:** The command sends 1,000,000 requests with 50 concurrent connections to the `/health` endpoint. This sustained load should cause CPU utilization to exceed the 30% threshold, triggering the auto scaling policy to create additional tasks.
{{% /notice %}}