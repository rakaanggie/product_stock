# Product Stock Management App

A simple **Node.js + DynamoDB** application to manage product stock by category.

It is designed for testing **AWS EC2 Auto Scaling and Load Balancing**, and displays the **instance hostname** serving each request.

---

# Requirements

Before running this application, make sure the following are available:

### 1. Node.js

Recommended version:

```
Node.js >= 18
```

Check installed version:

```
node -v
```

---

### 2. npm

npm is installed automatically with Node.js.

Check version:

```
npm -v
```

---

### 3. AWS DynamoDB Table

Create a DynamoDB table with the following configuration:

```
Table Name: product-stock
Partition Key: productId (String)
```

---

### 4. AWS Credentials

You need an AWS access key with permission to access DynamoDB.

Required permissions example:

```
dynamodb:PutItem
dynamodb:GetItem
dynamodb:Scan
dynamodb:UpdateItem
dynamodb:DeleteItem
```

---

### 5. Environment Configuration

Create a `.env` file in the project root.

Example:

```
PORT=3000

AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
AWS_REGION=ap-southeast-1

DYNAMODB_TABLE=product-stock
```

---

# Install Dependencies

Inside the project directory run:

```
npm install
```

---

# Run the Application

Start the server:

```
node app.js
```

The server will start on:

```
http://localhost:3000
```

---

# Access the Web UI

Open your browser:

```
http://localhost:3000
```

From the UI you can:

* Add products
* View products
* Delete products
* See which EC2 instance handled the request

Example display:

```
Served by instance: ip-10-0-1-24
```

This is useful when testing **AWS Load Balancer and Auto Scaling**.

---

# API Endpoint

Base API path:

```
/api/products
```


haircare
```
