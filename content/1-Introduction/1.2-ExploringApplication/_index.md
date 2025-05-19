---
title : "Exploring The To-do Application"
date :  "`r Sys.Date()`" 
weight : 2 
chapter : false
pre : " <b> 1.2 </b> "
---

This section will show you what we are going to deploy in this workshop.

The **core application**, named **Momentum**, is built with **Spring Boot** and **PostgreSQL**. It is a to-do application that allows users to:

- Log in/Register
- Create to-dos
- Change the status of a to-do among **TODO**, **IN PROGRESS** and **DONE**
- Edit/Delete a to-do
- Sort to-dos based on the priority and date
- Filter to-dos based on the priority and status

To demonstrate inter-service connectivity, I also created a separate another application built in **React** for administrators (the **admin application**). The base application exposes REST APIs that the admin application consumes and renders the simple dashboard. Both the core and admin application include a Dockerfile for building their respective container image, so you won't need to write them from scratch.

#### The code

I have put it on a workshop's GitHub repository, within the **/application** folder. You can run the application in your local environment by navigating to the /application folder and running the `docker compose up -d` command. The core application will run at **localhost:8080** while the admin application will run at **localhost:9090**.

The default administrator credentials are **admin** for both the username and password.

https://github.com/weebNeedWeed/ws-deploying-spring-ecs-fargate/tree/master/application

#### The core application's screenshots

![1](/images/1.2/2.png)

![1](/images/1.2/1.png)

#### The admin application's screenshots

![1](/images/1.2/4.png)

![1](/images/1.2/3.png)