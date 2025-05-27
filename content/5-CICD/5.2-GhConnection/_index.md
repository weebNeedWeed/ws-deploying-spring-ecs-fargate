---
title : "GitHub Connection"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 5.2 </b> "
---

#### Forking The Repository

1\. Open the workshop repository's URL in a new tab.

[Click to open Workshop Repository](https://github.com/weebNeedWeed/ws-deploying-spring-ecs-fargate)

2\. Click **Fork** to make a clone of this repository in your GitHub account.

![image](/images/5.2/Group15.png)

___

#### Connecting AWS To GitHub

1\. Go back to the AWS dashboard. Find **CodePipeline**.

![image](/images/5.2/Group8.png)

2\. Expand **Settings** and click **Connections**.

![image](/images/5.2/Group9.png)

3\. Click **Create connection**.

![image](/images/5.2/Group10.png)

4\. Select **Github** as **provider**.

![image](/images/5.2/Group11.png)

5\. For **Connection name**, enter `fcj-gh-connection`.

![image](/images/5.2/Group12.png)

6\. Click **Install a new app** and follow the GitHub's instruction to install the application to your GitHub account.

![image](/images/5.2/Group13.png)

7\. Affer successfully installing, select the installation and click **Connect**.

![image](/images/5.2/Group14.png)
