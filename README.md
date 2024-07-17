# Credit-Wallet-Service

## Introduction
Demo Credit is a mobile lending app that requires wallet functionality. This MVP wallet service allows users to create accounts, fund their accounts, transfer funds, and withdraw funds. Users in the Lendsqr Adjutor Karma blacklist cannot be onboarded.

## Features
1. Create an account
2. Fund an account
3. Transfer funds to another user’s account
4. Withdraw funds from an account
5. Prevent onboarding of users in the Lendsqr Adjutor Karma blacklist

## Tech Stack
- NodeJS (LTS version)
- KnexJS ORM
- MySQL database
- TypeScript

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/demo-credit-wallet.git

# Navigate to the project directory
cd demo-credit-wallet

# Install dependencies
npm install

# Set up environment variables in a .env file
cp .env.example .env

# Run the migrations
npx knex migrate:latest

# Start the development server
npm run dev


API Endpoints
1. Create an Account
URL: /api/v1/accounts
Method: POST
Request Body: