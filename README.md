# Task Management API
## Project Overview
This project is a RESTful API for managing tasks. It allows users to create, read, update, and delete tasks. Each task is associated with a user, and authentication is required to access the API.
**Key Features:**
*   User authentication and authorization.
*   CRUD operations for tasks.
*   Task status management (pending, in-progress, completed).
*   Filtering tasks by status.
**Requirements:**
*   Node.js (version 18 or higher)
*   MongoDB
## Getting Started
### Installation
1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd task-api
    ```
    
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    
3.  **Configure environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```
    
    *   `PORT`: The port the server will listen on (default: 5000).
    *   `MONGO_URI`: The MongoDB connection string.
    *   `JWT_SECRET`: A secret key used for signing JWT tokens.  Choose a strong, random value.
    *   `JWT_EXPIRES_IN`: The expiration time for JWT tokens (e.g., '1d' for 1 day).
4.  **Run the application:**
    ```bash
    npm start
    ```
    
### Dependencies
*   **express:** Web framework for Node.js.
*   **mongoose:** MongoDB object modeling tool.
*   **dotenv:** Loads environment variables from a `.env` file.
*   **jsonwebtoken:** JSON Web Token implementation for authentication.
*   **cors:** Middleware to enable Cross-Origin Resource Sharing.
*   **mongodb:** MongoDB driver.
## API Documentation
### User Routes
#### POST /users
*   **Description:** Creates a new user.
*   **Input:**
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
    ```
    
*   **Output (Success - 201 Created):**
    ```json
    {
      "user": {
        "_id": "6543210abcdef6543210abc",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "__v": 0
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQzMjEwYWJjZGVmNjU0MzIxMGFiYyIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2OTg3NjU0MzIsImV4cCI6MTY5ODg1MTgzMn0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
    ```
*   **Output (Error - 400 Bad Request):**
    ```json
    {
      "message": "Name and email are required"
    }
    ```
    ![Screenshot 2025-05-23 002826](https://github.com/user-attachments/assets/351dd116-f9e0-48bf-b733-553b2f9aaa1d)

#### GET /users/:id
*   **Description:** Retrieves a user by ID.
*   **Authentication:** Required (Bearer token in the `Authorization` header).
*   **Input:**  `id` (user ID in the URL path)
*   **Output (Success - 200 OK):**
    ```json
    {
      "_id": "6543210abcdef6543210abc",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "__v": 0
    }
    ```
*   **Output (Error - 404 Not Found):**
    ```json
    {
      "message": "User not found"
    }
    ```
*   **Output (Error - 403 Forbidden):**
    ```json
    {
      "message": "Access denied"
    }
    ```
    ![image](https://github.com/user-attachments/assets/fb6cd0fa-d1d5-4399-9821-c4b6a1671356)

#### GET /users
*   **Description:** Retrieves all users.
*   **Authentication:** Required (Bearer token in the `Authorization` header).
*   **Output (Success - 200 OK):**
    ```json
    [
      {
        "_id": "6543210abcdef6543210abc",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "__v": 0
      },
      {
        "_id": "6543210abcdef6543210abd",
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "__v": 0
      }
    ]
    ```
    ![Screenshot 2025-05-22 202152](https://github.com/user-attachments/assets/c15c9381-d102-4f7e-9e1f-dcb6ec6a0c27)

### Task Routes
#### POST /tasks
*   **Description:** Creates a new task.
*   **Authentication:** Required (Bearer token in the `Authorization` header).
*   **Input:**
    ```json
    {
      "title": "Grocery Shopping",
      "description": "Buy groceries for the week",
      "dueDate": "2024-11-15T00:00:00.000Z",
      "status": "pending"
    }
    ```
*   **Output (Success - 201 Created):**
    ```json
    {
      "_id": "6543210abcdef6543210abe",
      "title": "Grocery Shopping",
      "description": "Buy groceries for the week",
      "dueDate": "2024-11-15T00:00:00.000Z",
      "status": "pending",
      "assignedUserId": "6543210abcdef6543210abc",
      "__v": 0
    }
    ```
*   **Output (Error - 400 Bad Request):**
    ```json
    {
      "message": "Title is required"
    }
    ```
    ![Screenshot 2025-05-22 203036](https://github.com/user-attachments/assets/1ecb7230-5c7a-4640-8e90-782b659f463e)

#### GET /tasks/:id
*   **Description:** Retrieves a task by ID.
*   **Authentication:** Required (Bearer token in the `Authorization` header).
*   **Input:** `id` (task ID in the URL path)
*   **Output (Success - 200 OK):**
    ```json
    {
      "_id": "6543210abcdef6543210abe",
      "title": "Grocery Shopping",
      "description": "Buy groceries for the week",
      "dueDate": "2024-11-15T00:00:00.000Z",
      "status": "pending",
      "assignedUserId":"6543210abcdef6543210abc",
      "__v": 0
    }
    ```
*   **Output (Error - 404 Not Found):**
    ```json
    {
      "message": "Task not found"
    }
    ```

#### PUT /tasks/:id
*   **Description:** Updates a task by ID.
*   **Authentication:** Required (Bearer token in the `Authorization` header).
*   **Input:** `id` (task ID in the URL path), task data in the request body.
    ```json
    {
      "title": "Grocery Shopping",
      "status": "in-progress"
    }
    ```
*   **Output (Success - 200 OK):**
    ```json
    {
      "_id": "6543210abcdef6543210abe",
      "title": "Grocery Shopping",
      "description": "Buy groceries for the week",
      "dueDate": "2024-11-15T00:00:00.000Z",
      "status": "in-progress",
      "assignedUserId": "6543210abcdef6543210abc",
      "__v": 0
    }
    ```
*   **Output (Error - 404 Not Found):**
    ```json
    {
      "message": "Task not found"
    }
    ```
#### DELETE /tasks/:id
*   **Description:** Deletes a task by ID.
*   **Authentication:** Required (Bearer token in the `Authorization` header).
*   **Input:** `id` (task ID in the URL path)
*   **Output (Success - 200 OK):**
    ```json
    {
      "message": "Task deleted successfully"
    }
    ```
*   **Output (Error - 404 Not Found):**
    ```json
    {
      "message": "Task not found"
    }
    ```

