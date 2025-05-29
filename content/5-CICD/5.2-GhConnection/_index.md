---
title : "Establish GitHub Connection"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 5.2 </b> "
---

#### Fork the Repository

1\. Open the workshop repository's URL in a new tab.

[Click to open Workshop Repository](https://github.com/weebNeedWeed/ws-deploying-spring-ecs-fargate)

2\. Click **Fork** to create a copy of this repository in your GitHub account.

![image](/images/5.2/Group15.png)

___

#### Connect AWS to GitHub

1\. Navigate to the AWS Console and search for **CodePipeline**.

![image](/images/5.2/Group8.png)

2\. In the left navigation pane, expand **Settings** and click **Connections**.

![image](/images/5.2/Group9.png)

3\. Click **Create connection**.

![image](/images/5.2/Group10.png)

4\. Configure the connection provider:
   - **Provider**: Select **GitHub**

![image](/images/5.2/Group11.png)

5\. Configure the connection details:
   - **Connection name**: Enter `fcj-gh-connection`

![image](/images/5.2/Group12.png)

6\. Click **Install a new app** and follow GitHub's instructions to install the application to your GitHub account.

![image](/images/5.2/Group13.png)

7\. After successfully installing, select the installation and click **Connect**.

![image](/images/5.2/Group14.png)

8\. Verify that the connection status shows as **Available**.
