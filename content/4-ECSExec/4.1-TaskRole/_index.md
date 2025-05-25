---
title : "Creating Task Role for ECS Exec"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 4.1 </b> "
---
#### Creating The Policy

1\. Navigate to the **IAM** console. In the left navigation pane, choose **Policies**, then click **Create policy**.

![image](/images/4.1/Group145.png)

2\. In the policy editor, select the **JSON** tab.

![image](/images/4.1/Group146.png)

3\. Clear the existing content in the **Policy editor**. Copy and paste the following JSON policy document:

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

4\. Review the policy, then click **Next**.

![image](/images/4.1/Group148.png)

5\. In the **Policy details** section, enter `ecsExecPolicy` for the **Policy name**. Optionally, add a description such as "Policy for ECS Exec functionality".

![image](/images/4.1/Group149.png)

6\. Review the policy configuration, then click **Create policy** to complete the creation.

![image](/images/4.1/Group150.png)

---
#### Creating The Task Role

1\. In the **IAM** console left navigation pane, go to **Roles**. Click **Create role**.

![image](/images/4.1/Group151.png)

2\. For **Trusted entity type**, select **AWS service**.

![image](/images/4.1/Group152.png)

3\. For **Service or use case**, select **Elastic Container Service**. For **Use case**, select **Elastic Container Service Task**. Click **Next**.

![image](/images/4.1/Group153.png)

4\. In the **Add permissions** section, for **Filter by Type**, select **Customer managed** to show only the policies you created.

![image](/images/4.1/Group154.png)

5\. Search for and check the **ecsExecPolicy** that you created in the previous step. Click **Next**.

![image](/images/4.1/Group155.png)

6\. In the **Role details** section, for **Role name**, enter `fcjEcsTaskRole`. Optionally, add a description such as "Task role for ECS containers with exec capabilities".

![image](/images/4.1/Group156.png)

7\. Review the role configuration to ensure the **ecsExecPolicy** is attached, then scroll to the bottom and click **Create role**.

![image](/images/4.1/Group157.png)

8\. After creation, you should see a success message. The **fcjEcsTaskRole** is now ready to be used with your ECS tasks to enable ECS Exec functionality.

