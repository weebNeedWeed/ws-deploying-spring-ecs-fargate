---
title : "Creating The Secret Containing The Database Connection String"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 3.2 </b> "
---

1\. **Wait 2 minutes** for your database instance to be initiated. Then, click on your database.

![image](/images/3.2/Group19.png)

2\. Under **Connectivity & security**, copy your database's **Endpoint** for use later.

![image](/images/3.2/Group20.png)

3\. Navigate to **Secrets Manager**.

![image](/images/3.2/Group1.png)

4\. Click on **Store a new secret**.

![image](/images/3.2/Group18.png)

5\. For **Secret type**, choose **Other type of secret**.

![image](/images/3.2/Group21.png)

6\. In **Key/value**, the **Key** will be `DB_CONNECTION_STRING`. The **Value** will be `jdbc:postgresql://<DATABASE_ENDPOINT>:5432/FCJMomentum?user=postgres&password=fcj-db-123`. **Don't forget to replace `<DATABASE_ENDPOINT>` with your database's endpoint**.

![image](/images/3.2/Group22.png)

7\. Click on **Next**.

![image](/images/3.2/Group27.png)

8\. For **Secret name**, enter in `dev/fcj/momentum`;

![image](/images/3.2/Group23.png)

9\. Scroll to the bottom and click on **Next**.

![image](/images/3.2/Group24.png)

10\. Keep the **Configure rotation** default. Scroll down and click on **Next**.

![image](/images/3.2/Group25.png)

11\. Review the configuration and click on **Store**.

![image](/images/3.2/Group26.png)