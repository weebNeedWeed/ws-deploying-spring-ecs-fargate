---
title : "Application Overview"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 1.3 </b> "
---

#### Workshop Applications Overview

We will be working with two key applications that you will learn to deploy on Amazon Elastic Container Service (ECS): a feature-rich **core application** and a complementary **admin application**. Understanding these applications will provide context for the ECS concepts and deployment steps we'll cover.

___

#### Core Application: "Momentum" (To-do App)

The primary application is "Momentum," a comprehensive to-do list manager. Users of the Momentum application can:

- Log in or Register for a new account
- Create new to-do items with a priority (e.g., `LOW`, `MEDIUM`, `HIGH`)
- Change the status of a to-do (e.g., `TODO`, `IN PROGRESS`, `DONE`)
- Edit or Delete existing to-dos
- Sort their to-dos based on priority and date
- Filter their to-dos based on priority and status

The backend of Momentum is built using Spring Boot, leveraging the Spring MVC framework for rapid web application development. It uses a PostgreSQL database to store user and to-do data.

For managing database schema changes (migrations), Momentum employs Flyway. This is a deliberate and important choice for production-like deployments. Flyway allows database migrations to be version-controlled and applied deterministically, typically during the CI/CD build phase before the application itself is deployed. This approach is critical in a containerized environment like ECS, as it prevents potential concurrency issues and errors that could arise if multiple instances of the application (running in separate containers/tasks) attempted to apply the same database migration simultaneously upon startup.

___

#### Admin Application (Dashboard)

The second application is a simple Admin Application designed as a dashboard. Administrators can:

- Provides an administrator login.
- Displays key operational metrics sourced from the Momentum application, such as:
  - The total number of registered users.
  - The total count of to-dos created.
  - The current operational status (e.g., "UP" or "DOWN") of the core Momentum application.

The Admin application's frontend is built using ReactJS.

A key learning objective for including the Admin Application in this workshop is to practically demonstrate Amazon ECS Service Connect. This ECS feature simplifies inter-service discovery and communication. You will configure Service Connect to enable the Admin application (running as one ECS service) to securely and easily consume the REST APIs exposed by the Momentum application (running as another ECS service).

Due to its focused role in demonstrating Service Connect, **some advanced deployment aspects for the Admin application are optional**:

1. **Step 5.6 (Optional)** Building CI/CD Pipeline For The Admin Application
2. **Step 6.4 (Optional)** Enabling Service Auto Scaling For The Admin Application 

The core exercises will concentrate on **3.8 Enabling Service Connect** and **3.9 Deploying The Admin Application**.

___

#### Accessing the Code and Running Locally

All the source code for both Momentum and the Admin application is available in this workshop’s GitHub repository, located within the `/application` folder:

https://github.com/weebNeedWeed/ws-deploying-spring-ecs-fargate/tree/master/application

To familiarize yourself with the applications before deploying them to ECS, you are encouraged to run them locally using Docker Compose.

1. Ensure you have Docker and Docker Compose installed.
2. Clone the GitHub repository.
3. Navigate to the `/application` directory within your cloned repository in your terminal.
4. Run the command: `docker compose up -d`. 

This will build and start both applications in detached mode:

- The core Momentum application will be accessible at `http://localhost:8080`.
- The Admin application will be accessible at `http://localhost:9090`.

The default login credentials for both applications are:

- Username: admin
- Password: admin

___

#### The Core Application's Screenshots

![1](/images/1.3/2.png)

![1](/images/1.3/1.png)

___

#### The Admin Application's Screenshots

![1](/images/1.3/4.png)

![1](/images/1.3/3.png)