---
title : "Create Task Role for ECS Exec"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 4.1 </b> "
---
#### Create the Policy

1\. Navigate to the **IAM** console. In the left navigation pane, select **Policies**, then click **Create policy**.

![image](/images/4.1/Group145.png)

2\. In the policy editor, select the **JSON** tab.

![image](/images/4.1/Group146.png)

3\. Clear the existing content in the **Policy editor** and paste the following JSON policy document:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ssmmessages:CreateControlChannel",
                "ssmmessages:CreateDataChannel",
                "ssmmessages:OpenControlChannel",
                "ssmmessages:OpenDataChannel"
            ],
            "Resource": "*"
        }
    ]
}
```

This policy grants the necessary permissions for ECS Exec to establish secure shell sessions with containers.

![image](/images/4.1/Group147.png)

4\. Click **Next**.

![image](/images/4.1/Group148.png)

5\. In the **Policy details** section:
   - **Policy name**: Enter `ecsExecPolicy`

![image](/images/4.1/Group149.png)

6\. Review the policy configuration and click **Create policy**.

![image](/images/4.1/Group150.png)

___

#### Creating The Task Role

1\. In the **IAM** console left navigation pane, select **Roles**, then click **Create role**.

![image](/images/4.1/Group151.png)

2\. For **Trusted entity type**, select **AWS service**.

![image](/images/4.1/Group152.png)

3\. Configure the service and use case:
   - **Service or use case**: Select **Elastic Container Service**
   - **Use case**: Select **Elastic Container Service Task**
   - Click **Next**

![image](/images/4.1/Group153.png)

4\. In the **Add permissions** section, set **Filter by Type** to **Customer managed** to show only your created policies.

![image](/images/4.1/Group154.png)

5\. Search for and select the **ecsExecPolicy** you created, then click **Next**.

![image](/images/4.1/Group155.png)

6\. Configure the role details:
   - **Role name**: Enter `fcjEcsTaskRole`

![image](/images/4.1/Group156.png)

7\. Review the role configuration to ensure **ecsExecPolicy** is attached, then click **Create role**.

![image](/images/4.1/Group157.png)

8\. Verify the success message appears. The **fcjEcsTaskRole** is now ready for use with ECS tasks.
