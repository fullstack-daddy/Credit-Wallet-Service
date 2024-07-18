# Lendsqr Credit Wallet Service

## Project Overview

Lendsqr Credit Wallet Service is a RESTful API for managing user accounts in a credit wallet system. This service allows users to create accounts, fund accounts, transfer funds between accounts, and withdraw funds from accounts.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
5. [Running the Application](#running-the-application)
   - [Development Server](#development-server)
   - [Production Server](#production-server)
6. [API Endpoints](#api-endpoints)
7. [Testing](#testing)
8. [License](#license)

## Features

- User Authentication (Signup/Login)
- Account Creation and Management
- Fund Deposit
- Fund Withdrawal
- Fund Transfer Between Accounts
- Blacklist Checking

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for Node.js
- **TypeScript**: Typed superset of JavaScript
- **Knex.js**: SQL query builder for Node.js
- **MySQL**: Relational database management system
- **Jest**: JavaScript testing framework
- **Sinon**: Standalone test spies, stubs, and mocks for JavaScript
- **Mocha**: JavaScript test framework for Node.js programs
- **Bcrypt** for password hashing
- **JSON Web Tokens (JWT)** for authentication

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MySQL (v5.7 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fullstack-daddy/Credit-Wallet-Service.git
   cd credit-wallet-service
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following environment variables:
   ```env
   DATABASE_HOST=your_database_host
   DATABASE_USER=your_database_user
   DATABASE_PASSWORD=your_database_password
   DATABASE_NAME=your_database_name
   JWT_SECRET=your_secret
   ```

## Running the Application

### Development Server

To start the development server, run:
```bash
npm run dev
```
This will start the server using `nodemon` for automatic restarts on file changes.

### Production Server

To start the production server, run:
```bash
npm start
```

## API Endpoints

The following endpoints are available in the Credit Wallet Service:

1.**Sign Up**
    - **URL**: `/signup`
   - **Method**: `POST`
   - **Description**: Creates a new user.
   - **Body Parameters**:
     ```json
     {
       "name": "string",
       "email": "string"
       "password": "string"
     }
     ```
2. **Login**
    - **URL**: `/login`
   - **Method**: `POST`
   - **Description**: Login and authenticates a user.
   - **Body Parameters**:
     ```json
     {
       "email": "string"
       "password": "string"
     }
     ```
3. **Create Account**
   - **URL**: `/accounts`
   - **Method**: `POST`
   - **Description**: Creates a new account.
   - **Body Parameters**:
     ```json
     {
       "name": "string",
       "email": "string"
       "balance": "number"
     }
     ```
     
4. **Fund Account**
   - **URL**: `/accounts/fund`
   - **Method**: `POST`
   - **Description**: Funds an existing account.
   - **Body Parameters**:
     ```json
     {
       "accountId": "number",
       "amount": "number"
     }
     ```

5. **Transfer Funds**
   - **URL**: `/accounts/transfer`
   - **Method**: `POST`
   - **Description**: Transfers funds between accounts.
   - **Body Parameters**:
     ```json
     {
       "fromAccountId": "number",
       "toAccountId": "number",
       "amount": "number"
     }
     ```

6. **Withdraw Funds**
   - **URL**: `/accounts/withdraw`
   - **Method**: `POST`
   - **Description**: Withdraws funds from an account.
   - **Body Parameters**:
     ```json
     {
       "accountId": "number",
       "amount": "number"
     }
     ```

## Testing

To run the tests, use the following command:
```bash
npm test
```

This will execute the test suite using Jest and Mocha.
```

**ER DIAGRAM**

Here's a textual representation of an Entity-Relationship (E-R) Diagram for the Credit Wallet Service project:

![ER Diagram]([https://url-to-your-hosted-image.png](https://www.planttext.com/api/plantuml/png/dP5DIyGm443l_HLZlBJGnRkKibsmiEZ1mtgMCHdPG9AMVEZ2hl_TIKjrnGN1N99vaqdU9EiGqSTaJN6bw5KxWbstURWh7Lgg5GLPWJGO0cG0641aAA1feDpLrttVyQYWRR_g7-_BGmLDQW_DJVh6_OnrnhejYlcQfq0-r22cMLHmB20Ve5K5jw1Tv90iQiFH6tgvHyzaP9_tmQiVSF8x1z8JHbBF61b7ROaxjICdqgWk9JuMfqxA8RcOjPRbPJDkAR7tzWpXNB3zm-rtJozeqCcyIv7K5it_EfZU4KwdrMeumcBFcyGUWoZMv1H_zIS0))

```

This E-R Diagram represents the core data structure of THE Credit Wallet Service. It allows for user management and account operations while maintaining a clear separation between user authentication data and financial account information.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

This README document provides a comprehensive guide for setting up and running the Lendsqr Credit Wallet Service. It covers the necessary steps to get started, including installation, running the application, and details of the available API endpoints. It also provides information on testing and licensing.
