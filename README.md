# 📦 E-COMMERCE Admin Dashboard - Backend API

This repository contains the backend API for the E-COMMERCE Admin Dashboard. It is built using **Node.js**, **Express**, and connected to a database using **Prisma**.

## 🚀 Getting Started

Follow these steps to set up and run the backend locally.

### 1. Prerequisites

Ensure you have the following installed:

* **Node.js** (LTS version recommended)
* **npm** (Node Package Manager)
* A running instance of your **PostgreSQL/MySQL/SQLite** database (as configured in your `schema.prisma`).

### 2. Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/LOGANATHANTECH/e-COMMERCE-Admin-Dashboard-backend.git
    cd e-COMMERCE-Admin-Dashboard/server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a file named `.env` in the root of the `/server` directory and add your database connection string and other secrets:

    ```env
    # Database Connection String (Example for PostgreSQL)
    DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
    
    # Port to run the Express server on
    PORT=5000
    
    # Secret Key for JWT (if you implement authentication later)
    # JWT_SECRET="your_strong_secret_key"
    ```

### 3. Database Setup (Prisma)

1.  **Migrate the database schema:**
    This command reads your `prisma/schema.prisma` file, checks the database, and applies any necessary changes (creates tables, etc.).

    ```bash
    npx prisma migrate dev --name init
    ```

2.  **Generate the Prisma Client:**
    This ensures the Prisma client is updated and available for use in your services.

    ```bash
    npx prisma generate
    ```

## ▶️ Running the Server

Start the server in development mode using `nodemon` (if configured in your `package.json`):

```bash
npm run dev
# OR (if using the standard start command)
npm start
