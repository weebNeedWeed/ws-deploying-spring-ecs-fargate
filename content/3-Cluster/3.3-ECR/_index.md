---
title : "Preparing The Container Images"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 3.3 </b> "
---

1\. Navigate to the **Elastic Container Registry** console.

![image](/images/3.3/Group33.png)

2\. Click on **Create**.

![image](/images/3.3/Group34.png)

3\. For **Repository name**, enter in **fcj-registry**.

![image](/images/3.3/Group35.png)

4\. Scroll to the bottom and click on **Create**.

![image](/images/3.3/Group36.png)

5\. We will provide the commands for pushing container images onto Amazon ECR in the next section. You can optionally view them by clicking on **View push commands**. 

![image](/images/3.3/Group37.png)

___

1\. **Copy the URI** of the repository. It will be used for pushing our container images.

![image](/images/3.3/Group40.png)

1\. Click on **CloudShell** in the bottem left to open CloudShell.

![image](/images/3.3/Group38.png)

2\. (Optionally) Click on **Actions** then click on **Delete** to clear the data of the old sections.

![image](/images/3.3/Group39.png)

3\. Execute these following commands one by one to build and push the **core application** image onto your Amazon ECR Repository. 

- **Replace `<your-region>` with your region, e.g. ap-southeast-1**. 
- **Replace `<repo-uri-without-'/fcj-registy'>` with URI of your repository without '/fcj-registy', e.g. 0123456789.dkr.ecr.ap-southeast-1.amazonaws.com**. 
- **Replace `<repo-uri>` with full URI of your repository, e.g. 0123456789.dkr.ecr.ap-southeast-1.amazonaws.com/fcj-registy**

```bash
sudo su

aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <repo-uri-without-'/fcj-registy'>
```

![image](/images/3.3/Group41.png)

```bash
git clone https://github.com/weebNeedWeed/ws-deploying-spring-ecs-fargate.git

cd /home/cloudshell-user/ws-deploying-spring-ecs-fargate/application/Momentum
```

![image](/images/3.3/Group42.png)

```bash
docker build -t core .
```

![image](/images/3.3/Group43.png)

```bash
docker tag core <repo-uri>:core

docker push <repo-uri>:core
```

![image](/images/3.3/Group44.png)

3\. Execute these following commands one by one to build and push the **admin application** image onto your Amazon ECR Repository. 

- **Replace `<repo-uri>` with full URI of your repository, e.g. 0123456789.dkr.ecr.ap-southeast-1.amazonaws.com/fcj-registy**

```bash
cd /home/cloudshell-user/ws-deploying-spring-ecs-fargate/application/MomentumAdmin

docker build -t admin .

docker tag admin <repo-uri>:admin

docker push <repo-uri>:admin
```

4\. Your repository will look like this.

![image](/images/3.3/Group45.png)
