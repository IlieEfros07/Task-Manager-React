# Task Manager API

A simple task manager API built with Express.js that allows users to create, update, delete, and retrieve tasks. Additionally, it includes AI-powered task suggestions using OpenAI's API.

## Features
- Create tasks
- Retrieve all tasks
- Update task completion status
- Delete tasks
- Generate task suggestions using OpenAI

## Installation

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Setup
Clone the repository and navigate to the project directory:
```sh
git clone <https://github.com/IlieEfros07/Task-Manager-React>
cd /Task-Manager-React
```

Install dependencies:
```sh
npm install
```

## Environment Variables
Create a `.env` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key
```

## Running the Server
Start the Express server:
```sh
npm start
```
The server will run on `http://localhost:3107`.

Running the Frontend

Navigate to the frontend directory and install dependencies:

cd front
npm install

Start the frontend development server:

npm run dev

The frontend will run on http://localhost:5173 (or another available port).

## API Endpoints

### Task Management
- **GET /api/v1/tasks** → Get all tasks
- **POST /api/v1/tasks** → Create a new task
- **PUT /api/v1/tasks/:id** → Update a task (e.g., mark as completed)
- **DELETE /api/v1/tasks/:id** → Delete a task

### AI Task Suggestions
- **POST /api/v1/tasks/suggest** → Get a suggested task based on input



