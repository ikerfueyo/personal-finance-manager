### Personal Finance Manager


## Overview
Personal Finance Manager is a full-stack web application that helps users manage their personal finances by tracking expenses, incomes, and providing secure user authentication. The app includes features such as user registration and login, transaction management, and expense tracking.

This project is built using Node.js, Express.js, Sequelize, and PostgreSQL on the backend, and React on the frontend.

## Features
- User Authentication: Secure registration and login using JWT.
- Expense and Income Management: Users can add, edit, and delete transactions for income and expenses.
- Dashboard: View an overview of recent transactions.
- Responsive UI: User-friendly interface built with React.
- Data Persistence: Utilizes PostgreSQL as the database to store user information and transaction history.

## Technologies
- Backend: Node.js, Express.js, Sequelize ORM, PostgreSQL
- Frontend: React, React Router DOM, Axios
- Authentication: JWT (JSON Web Token)
- Dev Tools: Jest, Nodemon, Supertest

## Installation
Prerequisites:
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn
Backend Setup:
1. Clone repository
    `git clone https://github.com/ikerfueyo/personal-finance-manager.git`
    `cd personal-finance-manager`
2. Install backend dependencies
    `cd server`
    `npm install`
3. Set up PostgreSQL database. Update `server/config.json` with your database credentials or create a `.env` file
    `DB_USERNAME=your_username`
    `DB_PASSWORD=your_password`
    `DB_NAME=finance_manager`
    `DB_HOST=localhost`
    `DB_DIALECT=postgres`
    `JWT_SECRET=your_jwt_secret_key`
4. Run database migrations
    `npx sequelize-cli db:migrate`
Frontend Setup:
1. Navigate to the `client`directory
    `cd client`
2. Install frontend dependencies
    `npm install`

## Configuration
Environment Variables:
- Create a `.env` file in the root of the `server` directory with
    `DB_USERNAME=your_username`
    `DB_PASSWORD=your_password`
    `DB_NAME=your_database`
    `DB_HOST=localhost`
    `JWT_SECRET=your_jwt_secret_key`
    `PORT=5000`

## Running
1. Start backend server
    `npm run server`
2. Backend will be running at http://localhost:5000.
3. Start frontend React app
    `cd client`
    `npm start`
4. React app will be available at http://localhost:3000.

## API Routes
Auth Routes:
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Log in an existing user
Expense Routes:
- POST `/api/expenses` - Create a new expense
- GET `/api/expenses` - Get all expenses for the logged-in user
- PUT `/api/expenses/:id` - Update an expense
- DELETE `/api/expenses/:id` - Delete an expense
Income Routes:
- POST `/api/incomes` - Create a new income
- GET `/api/incomes` - Get all incomes for the logged-in user
- PUT `/api/incomes/:id` - Update an income
- DELETE `/api/incomes/:id` - Delete an income


## Testing
Run backend tests with Jest and Supertest:
    `npm test`
