---
title : "Prepare Container Images"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 3.3 </b> "
---

#### Amazon ECR Overview

Amazon Elastic Container Registry (Amazon ECR) is a fully managed AWS container image registry service. It is designed to be secure, scalable, and reliable, allowing you to store, manage, and deploy container images.

Key features of Amazon ECR include:

- Private Repositories: ECR supports private repositories, with access controlled through resource-based permissions using AWS Identity and Access Management (IAM). This ensures that only specified IAM users or roles (e.g., those assumed by Amazon EC2 instances or ECS tasks) can access your container repositories and images.
- Broad Compatibility: You can use your preferred command-line interface (CLI) — such as the Docker CLI or AWS CLI — to push, pull, and manage Docker images, Open Container Initiative (OCI) images, and OCI-compatible artifacts.

In this workshop, we will first create an ECR repository. Then, we will build and push two distinct container images to this repository: a core image (for our core application) and an admin image (for our admin application).

___

#### Create Repository

1\. Navigate to Amazon ECR:
   - In the AWS Console search bar, type `ECR`
   - Select **Elastic Container Registry** from the dropdown

![image](/images/3.3/Group33.png)

2\. Click **Create repository**.

![image](/images/3.3/Group34.png)

3\. Configure the repository settings:
   - **Visibility settings**: Leave as **Private** (default)
   - **Repository name**: Enter `fcj-registry`
   - Leave other settings as default

![image](/images/3.3/Group35.png)

4\. Scroll to the bottom and click **Create repository**.

![image](/images/3.3/Group36.png)

5\. **Verify creation**: Confirm that the **fcj-registry** repository appears in your ECR console. Note the repository URI as you'll need it for pushing images.

![image](/images/3.3/Group37.png)

{{% notice info %}}
You can optionally view the push commands by clicking on **View push commands**, but we'll provide detailed instructions in the next section.
{{% /notice %}}

___

#### Explore the Dockerfiles

The Dockerfiles used to build the core and admin images have been written, documented, and pushed to our GitHub repository.

Take a moment to explore them by visiting the following links:
- **Core Image Dockerfile**: [View on GitHub](https://github.com/weebNeedWeed/ws-deploying-spring-ecs-fargate/blob/master/application/Momentum/Dockerfile)
- **Admin Image Dockerfile**: [View on GitHub](https://github.com/weebNeedWeed/ws-deploying-spring-ecs-fargate/blob/master/application/MomentumAdmin/Dockerfile)

{{% notice tip %}}
Understanding these Dockerfiles will help you see how the Spring Boot applications are containerized for deployment on ECS Fargate.
{{% /notice %}}

___

#### Build and Push Container Images

1\. **Copy the repository URI**: In your ECR repository page, copy the **URI** of the repository. You'll need this for pushing container images.

![image](/images/3.3/Group40.png)

2\. **Open CloudShell**: Click on **CloudShell** in the bottom left corner to open AWS CloudShell.

![image](/images/3.3/Group38.png)

3\. **(Optional) Clear previous data**: Click on **Actions**, then **Delete** to clear any data from previous sessions.

![image](/images/3.3/Group39.png)

##### **Building and Pushing the Core Application**

4\. **Authenticate with ECR**: Execute the following command to authenticate Docker with your ECR registry.

- Replace the placeholders with your actual values:
  - `<your-region>`: Your AWS region (e.g., `ap-southeast-1`)
  - `<account-id>`: Your AWS account ID (the numbers before `.dkr.ecr` in your repository URI)

```bash
sudo su

aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<your-region>.amazonaws.com
```

![image](/images/3.3/Group41.png)

5\. **Clone the repository and navigate to core application**:

```bash
git clone https://github.com/weebNeedWeed/ws-deploying-spring-ecs-fargate.git

cd /home/cloudshell-user/ws-deploying-spring-ecs-fargate/application/Momentum
```

![image](/images/3.3/Group42.png)

6\. **Build the core application image**:

```bash
docker build -t core .
```

![image](/images/3.3/Group43.png)

7\. **Tag and push the core image**:

- **Replace `<repo-uri>` with your full repository URI (e.g., `123456789012.dkr.ecr.ap-southeast-1.amazonaws.com/fcj-registry`)**

```bash
docker tag core <repo-uri>:core

docker push <repo-uri>:core
```

![image](/images/3.3/Group44.png)

##### **Building and Pushing the Admin Application**

8\. **Navigate to admin application directory**:

```bash
cd /home/cloudshell-user/ws-deploying-spring-ecs-fargate/application/MomentumAdmin
```

9\. **Build, tag, and push the admin application image**:

```bash
docker build -t admin .

docker tag admin <repo-uri>:admin

docker push <repo-uri>:admin
```

10\. **Verify your images**: Return to the ECR console and refresh your repository. You should see both images with their respective tags.

![image](/images/3.3/Group45.png)

You have successfully built and pushed both container images to Amazon ECR:
- **core**: Contains the main Spring Boot application
- **admin**: Contains the administrative interface

Both images are now ready to be deployed to Amazon ECS.
