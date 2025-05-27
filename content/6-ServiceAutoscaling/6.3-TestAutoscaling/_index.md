---
title : "Triggering Auto Scaling"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 6.3 </b> "
---

1\. Copy the **DNS name** of the ALB for use with Apache Benchmark.

![image](/images/6.3/Group12.png)

2\. Open **CloudShell**.

![image](/images/6.3/Group11.png)

3\. Execute these command to install the Apache Benchmark tool and load test. 

- **Replace `<alb-dns-name>` with your ALB's DNS name.**

```bash
sudo yum install -y httpd-tools

ab -n 1000000 -c 50 http://<alb-dns-name>/health
```

![image](/images/6.3/Group13.png)

4\. Wait around 5 - 10 minutes for auto scaling. You will see that the other two tasks are provisioning.

![image](/images/6.3/Group14.png)