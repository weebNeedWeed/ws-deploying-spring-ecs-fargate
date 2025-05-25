---
title : "Creating The VPC Endpoint For The Session Manager"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 4.3 </b> "
---

#### Enabling DNS Hostnames

1\. Access your VPC's console and click **Actions**.

![image](/images/4.3/Group166.png)

2\. Click **Edit VPC settings**.

![image](/images/4.3/Group167.png)

3\. **Enable** both **DNS resolution** and **DNS hostnames**. Click **Save**.

![image](/images/4.3/Group168.png)

___

#### Creating VPC Endpoint

1\. In the left navigation pane, scroll down and click **Endpoints**.

![image](/images/4.3/Group165.png)

2\. For **Name tag**, enter `fcj-ssmmessages-ep`. For **Type**, select **AWS services**.

![image](/images/4.3/Group169.png)

3\. Enter in the search box `ssmmessages`. Select the corresponding service.

![image](/images/4.3/Group170.png)

![image](/images/4.3/Group171.png)

4\. For **VPC**, select **fcj-vpc**.

![image](/images/4.3/Group172.png)

5\. For **Subnets**, select the **AZ a** and then select **fcj-private-subnet-01**.

![image](/images/4.3/Group173.png)

6\. For **Security groups**, select **fcj-private-sg**.

![image](/images/4.3/Group174.png)

7\. Scroll to the bottom and click **Create endpoint**.

![image](/images/4.3/Group175.png)

8\. Wait a couple of minutes for the endpoint to be created before going to the next step.