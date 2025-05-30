---
title : "Configure Service Auto Scaling"
date :  "`r Sys.Date()`" 
weight : 6
chapter : false
pre : " <b> 6. </b> "
---

**Amazon ECS Service Auto Scaling** automatically **adjusts the desired count of tasks running** in your Amazon ECS service. This helps you maintain application availability and performance while optimizing costs. 

Amazon ECS Service Auto Scaling primarily utilizes the following types of scaling policies, which you can configure for your workloads:
- **Target Tracking Scaling**: This is often the **simplest and most recommended approach**. You set a **target value for a specific metric** (e.g., 60% average CPU utilization or 75% average Memory utilization). Service Auto Scaling then **automatically adjusts the number of tasks to keep the metric at, or near, that target value**.
- **Step Scaling**: This policy allows you to define different scaling adjustments based on the size of an CloudWatch alarm breach. For example, if CPU utilization is between 70-80%, add 1 task; if it's above 80%, add 3 tasks.
- **Scheduled Scaling**: This allows you to scale your service based on predictable load changes. You can set schedules for when to increase or decrease the number of tasks (e.g., scale up during business hours and scale down at night).
- **Predictive Scaling**: This uses machine learning to forecast future traffic and proactively adjust capacity. It analyzes historical workload data to predict upcoming demand.

In this workshop, we will configure Target Tracking Scaling for the core service. You can apply the same process for the admin service.