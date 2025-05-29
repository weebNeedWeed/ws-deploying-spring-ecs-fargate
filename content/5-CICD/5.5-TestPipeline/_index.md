---
title : "Test the CI/CD Pipeline"
date :  "`r Sys.Date()`" 
weight : 5
chapter : false
pre : " <b> 5.5 </b> "
---

1\. Open your forked GitHub repository and navigate to `application/Momentum/src/main/resources/templates/home.html`.

![image](/images/5.5/Group51.png)

2\. Click the **Pencil Icon** to edit `home.html`.

![image](/images/5.5/Group52.png)

3\. On **line 15**, change **MOMENTUM** to `MOMENTUM V2`.

![image](/images/5.5/Group53.png)

4\. **Commit** the change directly to the master branch. Now your pipeline is automatically triggered.

![image](/images/5.5/Group54.png)

5\. Navigate back to your pipeline. You can click on the build process to monitor the logs.

![image](/images/5.5/Group55.png)

6\. You can **View entire log** on Amazon CloudWatch or **Tail logs** to see the latest logs only.

![image](/images/5.5/Group56.png)

7\. Wait for the pipeline to complete successfully. The application should now display the updated content. Verify the changes by accessing your application through the load balancer DNS name. You should see "MOMENTUM V2" displayed on the homepage.

![image](/images/5.5/Group57.png)

