---
title : "Building The Standard CICD Pipeline With CodePipeline"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 5.3 </b> "
---

1\. In the left navigation pane, under **Pipeline - CodePipeline**, click select **Pipelines**. Click **Create pipeline**.

![image](/images/5.3/Group16.png)

2\. Select **Build custom pipeline** and click **Next**.

![image](/images/5.3/Group17.png)

3\. For **Pipeline name**, enter `fcj-core-pipeline`.

![image](/images/5.3/Group18.png)

4\. Click **Next**.

![image](/images/5.3/Group19.png)

5\. In the **Source stage**, for **Source**, select **GitHub (via GitHub App)**.

![image](/images/5.3/Group20.png)

6\. For **Connection**, select **fcj-gh-connection**.

![image](/images/5.3/Group21.png)

7\. Select your forked repository.

![image](/images/5.3/Group22.png)

8\. For **Default branch**, use **master**.

![image](/images/5.3/Group23.png)

9\. Click **Next**.

![image](/images/5.3/Group24.png)

10\. In the **Build stage**, select **Other build providers** and then select **AWS CodeBuild**.

![image](/images/5.3/Group25.png)

11\. Click on **Create project**. Another browser tab will open.

![image](/images/5.3/Group26.png)

12\. For **Project name**, enter `fcj-core-build`.

![image](/images/5.3/Group27.png)

13\. In the end of the **Environment** section, expand **Additional configuration**.

![image](/images/5.3/Group28.png)

14\. Check **Enable this flag if you want to build Docker images or want your builds to get elevated privileges**.

![image](/images/5.3/Group29.png)

15\. For **VPC**, choose **fcj-vpc**.

![image](/images/5.3/Group30.png)

16\. Select the **two private subnets** and the **private security group**. Click on **Validate VPC Settings** to see if your subnets are reachable by the Internet.

![image](/images/5.3/Group31.png)

17\. Scroll to **Environment variables**. For **Name**, enter **AWS_ACCOUNT_ID**. For **Value**, copy your account ID and paste it into the text box.

![image](/images/5.3/Group32.png)

18\. **Add another variable**. For **Name**, enter **REPOSITORY_NAME**. For **Value**, enter `fcj-registry`.

![image](/images/5.3/Group33.png)

19\. Select **Use a buildspec file**. For **Buildspec name**, enter `application/Momentum/buildspec.yml`.

![image](/images/5.3/Group34.png)

20\. Scroll to the bottom and click **Continue to CodePipeline**.

![image](/images/5.3/Group35.png)

21\. The **fcj-core-build** project will be automatically selected.

![image](/images/5.3/Group36.png)

22\. Click **Next**.

![image](/images/5.3/Group43.png)

23\. **Skip test stage**.

![image](/images/5.3/Group37.png)

24\. Select **Amazon ECS** as **Provider**.

![image](/images/5.3/Group38.png)

25\. For **Cluster name**, use **fcj-ecs-cluster**. For **Service name**, use **fcj-core-svc**.

![image](/images/5.3/Group39.png)

26\. Click **Next**.

![image](/images/5.3/Group42.png)

27\. Click **Create pipeline**.

![image](/images/5.3/Group40.png)

28\. Wait a couple of minutes. You will soon find that **the build stage is unable to run**. This is because the role that the build stage uses, does not have read access to AWS Secrets Manager and write access to Amazon ECR. **We will configure the role and rerun the build stage in the next chapter**. 

![image](/images/5.3/Group41.png)