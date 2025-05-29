---
title : "(Optional) Build CI/CD Pipeline for Admin Application"
date :  "`r Sys.Date()`" 
weight : 6
chapter : false
pre : " <b> 5.6 </b> "
---

#### Create CI/CD Pipeline for Admin Application

Follow the same process outlined in sections 5.3, 5.4, and 5.5 to create a CI/CD pipeline for the admin application, with the following key differences:

**Pipeline Configuration:**
- **Pipeline name**: `fcj-admin-pipeline`
- **Project name**: `fcj-admin-build`
- **Repository**: Use the same forked repository
- **Buildspec file**: `application/MomentumAdmin/buildspec.yml`
- **ECS Service**: Select `fcj-admin-svc` for deployment

**Key Differences:**
1. **Buildspec Location**: The buildspec file for the admin application is located at `application/MomentumAdmin/buildspec.yml` (already provided in the repository)
2. **Permissions**: You do **not** need to add SecretsManagerReadWrite permissions to the CodeBuild role for the admin application
3. **Required Permission**: Only add **AmazonEC2ContainerRegistryFullAccess** to the CodeBuild service role
4. **VPC Configuration**: Do not configure VPC settings for the CodeBuild project (leave VPC as default)

**Testing the Pipeline:**
To test the admin pipeline, modify any file in the `application/MomentumAdmin/` directory and commit the changes to trigger the pipeline.

{{% notice info %}}
**Why no Secrets Manager access?** The admin application is a React frontend that doesn't directly access the database. It communicates with the core application via Service Connect, so it doesn't need database connection secrets.
{{% /notice %}}