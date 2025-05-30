---
title : "Enable Service Connect"
date :  "`r Sys.Date()`" 
weight : 8
chapter : false
pre : " <b> 3.8 </b> "
---

#### Service Connect Overview

**Service Connect is an Amazon ECS feature**, **recommended by AWS**, that simplifies service discovery, connectivity, and traffic monitoring for your containerized applications. With Service Connect, **your applications can use short, logical names** (e.g., http://myservice:port) and standard ports **to connect to other ECS services**. This **facilitates communication within the same cluster** or even across different clusters and VPCs in the same AWS Region. A key benefit is enhanced visibility into service-to-service traffic directly within the ECS console, providing metrics like request counts, error rates, and latency for traffic flowing through the Service Connect proxy.

When configuring a service with Service Connect, you have **two primary options**:

##### **Client Service**
This configuration is typically for services that **only need to initiate connections to other services and do not need to receive direct incoming requests** from other Service Connect-enabled services. For instance, a frontend application, reverse proxy, or load balancer that receives external traffic (e.g., via an Application Load Balancer) but needs to connect to backend services would use this mode.

##### **Client-Server Service**

This mode is for services that **need to both provide an endpoint for other services to call and potentially connect to other services**. If any containers in your service expose and listen on a port for network traffic from other services within the Service Connect mesh, choose this configuration.

- **Use Cases**: Backend services, middleware, business logic tiers, or most microservices generally fit this model. Frontend applications or reverse proxies can also use this mode if they need to receive traffic from other services within the same Service Connect namespace.
- **Configuration**: When choosing this type, you must **define a port mapping** for your service, specifying a **DNS name** (e.g., core) and a **port** (e.g., 8080). Other services within the namespace can then connect to this service using a simple URI, like **http://core:8080**. Even if a client-server service is primarily acting as a provider and doesn't actively initiate connections to other Service Connect services, it's still configured with client-side discovery capabilities, allowing Service Connect to manage its network configuration and make it discoverable within the namespace.

___

#### Create a New Service Connect Namespace

**A Service Connect namespace** acts as a logical boundary for service discovery. Services within the same namespace can easily discover and connect to each other using the short names defined in their Service Connect configuration. You typically create a namespace per logical grouping of services (e.g., per application or environment).

1\. Click **Update cluster**.

![image](/images/3.8/Group99.png)

2\. Scroll down to **Service Connect default** and expand the section.

![image](/images/3.8/Group100.png)

3\. Click **Create a new namespace**.

![image](/images/3.8/Group101.png)

4\. Configure the namespace settings:
   - **Namespace name**: `fcj-ecs-cluster-ns`
   - **Instance discovery**: Select **API calls**

![image](/images/3.8/Group102.png)

5\. Click **Create namespace**.

![image](/images/3.8/Group106.png)

6\. Wait for the namespace creation to complete (this may take a few minutes).

![image](/images/3.8/Group104.png)

7\. Select **fcj-ecs-cluster-ns** as the **Namespace**.

![image](/images/3.8/Group103.png)

8\. Scroll down and click **Update** to apply the changes.

![image](/images/3.8/Group105.png)

___

#### Configure Security Group for Inter-service Connectivity

The **fcj-private-sg** security group is currently configured with **a single rule permitting inbound traffic only from fcj-public-sg**. However, for Service Connect to function effectively and **for tasks within private subnets** (associated with **fcj-private-sg**) **to communicate with each other**, an explicit rule allowing this **internal traffic is necessary**. Without it, the admin application service, for example, cannot connect to the core service via Service Connect.

1\. Navigate to **VPC** in the AWS Console, then locate **fcj-private-sg**.

![image](/images/3.8/Group107.png)

2\. Click **Edit inbound rules**.

![image](/images/3.8/Group108.png)

3\. Add a new security group rule:
   - Click **Add rule**
   - **Type**: Select **All traffic**
   - **Source**: Select **Custom**, then choose **fcj-private-sg**
   - Click **Save rules**

![image](/images/3.8/Group109.png)