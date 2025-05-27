---
title : "Testing The Pipeline"
date :  "`r Sys.Date()`" 
weight : 5
chapter : false
pre : " <b> 5.5 </b> "
---

1\. Open your forked GitHub repository, navigate to `application/Momentum/src/main/resources/templates/home.html`.

![image](/images/5.5/Group51.png)

2\. Click the **Pencil Icon** to edit `home.html`.

![image](/images/5.5/Group52.png)

3\. In **line 15**, change **MOMENTUM** to `MOMENTUM V2`.

![image](/images/5.5/Group53.png)

4\. **Commit** directly the change to master.

![image](/images/5.5/Group54.png)

5\. Go back to your pipeline. You can click on the build process to check the logs.

![image](/images/5.5/Group55.png)

6\. You can **View entire log** on Amazon CloudWatch or **Tail logs** to see the latest logs only.

![image](/images/5.5/Group56.png)

7\. Wait for the process to complete successfully. Here is the result.

![image](/images/5.5/Group57.png)

