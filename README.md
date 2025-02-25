# Task Manager API

A full-stack task manager application with a React frontend and Express.js backend that allows users to create, update, delete, and retrieve tasks. The application features AI-powered step-by-step guides for tasks using OpenAI's API.

## Features

- Create and manage tasks
- Retrieve all tasks
- Update task completion status
- Delete tasks
- Generate AI-powered step-by-step guides for tasks
- Expandable/collapsible task steps in the UI
- Dark/Light mode toggle

## Installation

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Setup

Clone the repository and navigate to the project directory:
```sh
git clone https://github.com/IlieEfros07/Task-Manager-React
cd /Task-Manager-React
```

Install dependencies:
```sh
npm install
```

## Environment Variables

Create a `.env` file in the root directory and add your [Forefront](https://forefront.ai) API key:
```
FOREFRONT_API_KEY=your_forefront_api_key
```

## Running the Server

Start the Express server:
```sh
npm start
```

The server will run on `http://localhost:3107`.

## Running the Frontend

Navigate to the frontend directory and install dependencies:
```sh
cd front
npm install
```

Start the frontend development server:
```sh
npm run dev
```

The frontend will run on `http://localhost:5173` (or another available port).

## API Endpoints

### Task Management

- **GET /api/v1/tasks** → Get all tasks
- **POST /api/v1/tasks** → Create a new task (supports both simple tasks and tasks with step-by-step guides)
- **PUT /api/v1/tasks/:id** → Update a task (e.g., mark as completed)
- **DELETE /api/v1/tasks/:id** → Delete a task

### AI Task Suggestions

- **POST /api/v1/tasks/suggest** → Get a suggested step-by-step guide for a task

## Frontend Features

- **Step-by-Step Guides**: Request AI-generated task guides with detailed steps
- **Task Expansion**: Expandable and collapsible view for tasks with steps
- **Task Completion**: Mark tasks as completed or incomplete
- **Dark/Light Mode**: Toggle between dark and light interface modes

## Usage

### Creating a Task with Steps

1. Enter a task title in the input field
2. Click "Get Step-by-Step Guide" to generate detailed steps
3. Review the generated steps
4. Click "Save with Steps" to save the task with its steps
5. Use the "Show Steps" button to expand and collapse the steps view


## Technologies Used

- **Frontend**: React, React Query, Tailwind CSS
- **Backend**: Express.js, Node.js
- **AI Integration**: OpenAI API
