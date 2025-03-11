# Backend Task Manager API

This is a Node.js backend API for managing tasks and users. The application is built using Express, Mongoose, and JWT for authentication. MongoDB is used as the database.

## Features

- **User Management**:
  - Create a user
  - Get all users with pagination
  - Update user
  - Delete user
  - Validate user with JWT

- **Task Management**:
  - Create a task
  - Get all tasks with pagination
  - Update task
  - Delete task

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Token) for authentication
- bcrypt for password hashing
- Jest for testing
- Supertest for API testing
- Express-validator for request validations

## Setup Instructions

### Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Download MongoDB](https://www.mongodb.com/try/download/community) or use a local instance

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/Jableed43/task-backend.git
cd task-backend
```

### 2. Install Dependencies

Run the following command to install all the necessary dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the following configuration:

```bash
MONGODB_URI="mongodb://127.0.0.1:27017/tasks-manager"
JWT_SECRET="SECRET"
```

- **MONGODB_URI**: URL for your local MongoDB instance
- **JWT_SECRET**: Secret key used to sign JWT tokens

### 4. Running the Server

To start the server in development mode using **nodemon** (for auto-reload on changes), run:

```bash
npm run dev
```

To start the server normally:

```bash
npm start
```

### 5. Running Tests

To run the tests using Jest and Supertest, run:

```bash
npm test
```

This will run all the tests defined in your test files.

---

## API Endpoints

### Task Routes

1. **GET** `/api/task` - Get all tasks (requires JWT authentication)
2. **POST** `/api/task/create` - Create a new task (requires JWT authentication)
   - Body: `{ "title": "Task title" }`
3. **PUT** `/api/task/update/:id` - Update a task by ID (requires JWT authentication)
   - Body: `{ "title": "Updated task title" }`
4. **DELETE** `/api/task/delete/:id` - Delete a task by ID (requires JWT authentication)

### User Routes

1. **POST** `/api/user/create` - Create a new user
   - Body: `{ "username": "username", "email": "email", "password": "password" }`
2. **GET** `/api/user` - Get all users
3. **PUT** `/api/user/update/:id` - Update user details by ID
4. **DELETE** `/api/user/delete/:id` - Delete a user by ID
5. **POST** `/api/user/validate` - Validate a user's credentials and get a JWT token
   - Body: `{ "email": "email", "password": "password" }`

---

## Testing

The application uses Jest for unit tests and Supertest for API testing.

### Running Tests

To run the tests, simply use the following command:

```bash
npm test
```

This will run the test suite, and you should see output for each test, indicating whether it passed or failed.

### Test Cases

#### Task API Tests

1. **Should create a new task**
   - **Route**: `POST /api/task/create`
   - **Test**: Verifies that a new task can be created with a valid JWT token.

2. **Should get all tasks**
   - **Route**: `GET /api/task`
   - **Test**: Verifies that all tasks can be retrieved with a valid JWT token.

3. **Should update task**
   - **Route**: `PUT /api/task/update/:id`
   - **Test**: Verifies that a task can be updated by ID with a valid JWT token.

4. **Should delete task**
   - **Route**: `DELETE /api/task/delete/:id`
   - **Test**: Verifies that a task can be deleted by ID with a valid JWT token.

#### User API Tests

1. **Should create a new user**
   - **Route**: `POST /api/user/create`
   - **Test**: Verifies that a new user can be created.

2. **Should get all users**
   - **Route**: `GET /api/user`
   - **Test**: Verifies that all users can be retrieved.

3. **Should update user**
   - **Route**: `PUT /api/user/update/:id`
   - **Test**: Verifies that user details can be updated by ID.

4. **Should delete user**
   - **Route**: `DELETE /api/user/delete/:id`
   - **Test**: Verifies that a user can be deleted by ID.
