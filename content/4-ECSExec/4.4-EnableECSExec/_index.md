---
title : "Enable and Verify ECS Exec Functionality"
date :  "`r Sys.Date()`" 
weight : 4
chapter : false
pre : " <b> 4.4 </b> "
---

#### Enable ECS Exec

1\. Click the **CloudShell** button to open CloudShell.

![image](/images/4.4/Group176.png)

2\. Execute the following commands to enable ECS Exec for both services:

```bash
aws ecs update-service --cluster fcj-ecs-cluster --enable-execute-command --force-new-deployment --service fcj-core-svc

aws ecs update-service --cluster fcj-ecs-cluster --enable-execute-command --force-new-deployment --service fcj-admin-svc
```

![image](/images/4.4/Group177.png)

{{% notice info %}}
The `--force-new-deployment` flag ensures that new tasks are created with ECS Exec capabilities enabled.
{{% /notice %}}

3\. Wait approximately 3-5 minutes for the services to be redeployed with new tasks. You can monitor the deployment progress in the ECS console.

4\. Execute these commands to verify that ECS Exec is enabled:

```bash
aws ecs describe-services --cluster fcj-ecs-cluster --service fcj-core-svc | grep enableExecuteCommand

aws ecs describe-services --cluster fcj-ecs-cluster --service fcj-admin-svc | grep enableExecuteCommand
```

You should see `"enableExecuteCommand": true` in the output for both services.

![image](/images/4.4/Group178.png)

___

#### Test ECS Exec

1\. Navigate to the **ECS Console** and go to the **fcj-core-svc** service. Click the **Tasks** tab and copy the **Task ID** of the running task.

![image](/images/4.4/Group179.png)

{{% notice tip %}}
You can copy either the Task ID (short format) or the full Task ARN. Both will work with the execute-command.
{{% /notice %}}

2\. Return to **CloudShell** and execute the following command to connect to the container:

- **Replace `<task-id>` with the actual task ID you copied.**

```bash
aws ecs execute-command --cluster fcj-ecs-cluster \
    --task <task-id> \
    --container core \
    --interactive \
    --command "/bin/sh"
```

You should see a shell prompt indicating successful connection to the container.

![image](/images/4.4/Group180.png)

3\. Type `exit` to disconnect from the container when finished testing.

4\. Repeat the same process with the **fcj-admin-svc** service:
   - Navigate to the admin service and copy the running task ID
   - Execute the command below (replace `<task-id>` and change container to `admin`)

```bash
aws ecs execute-command --cluster fcj-ecs-cluster \
    --task <task-id> \
    --container admin \
    --interactive \
    --command "/bin/sh"
```

![image](/images/4.4/Group181.png)