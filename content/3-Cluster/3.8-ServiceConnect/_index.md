---
title : "Enabling Service Connect"
date :  "`r Sys.Date()`" 
weight : 8
chapter : false
pre : " <b> 3.8 </b> "
---

#### Creating A New Namespace

1\. Click on **Update cluster**.

![image](/images/3.8/Group99.png)

2\. Scroll down to **Service Connect default** and expand it.

![image](/images/3.8/Group100.png)

3\. Click on **Create a new namespace**.

![image](/images/3.8/Group101.png)

4\. For **Namespace name**, enter in `fcj-ecs-cluster-ns`. For **Instance discovery**, select **API calls**.

![image](/images/3.8/Group102.png)

5\. Click on **Create namespace**.

![image](/images/3.8/Group106.png)

6\. Wait a couple of minutes for your namespace to be created.

![image](/images/3.8/Group104.png)

7\. Select **fcj-ecs-cluster-ns** as **Namespace**. 

![image](/images/3.8/Group103.png)

8\. Scroll down and click on **Create**.

![image](/images/3.8/Group105.png)

___

#### Configuring Security Group For Inter-service Connectivity

1\. Access **VPC**, then find **fcj-private-sg**.

![image](/images/3.8/Group107.png)

2\. Click on **Edit inbound rules**

![image](/images/3.8/Group108.png)

3\. **Add a new row**. For **Type**, select **All traffic**. For **Source**, select **Custom** and then select **fcj-private-sg**. Then, **Save rules**.

![image](/images/3.8/Group109.png)