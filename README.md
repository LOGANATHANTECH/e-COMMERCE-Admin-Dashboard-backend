# 📋 E-COMMERCE ADMIN DASHBOARD Axios, CORS, file uploads , prisma , neon PostgreSQL Online DB

## 1. Project Overview & Status

This is a full-stack, single-page application (SPA) designed to manage product inventory for an e-commerce platform. Both the frontend and backend are deployed, fully functional, and communicating correctly.

| Component | Technology | Deployment Platform | Status |
| :--- | :--- | :--- | :--- |
| **Frontend** | React, Vite, React Router | **Netlify** | Deployed & Live |
| **Backend (API)** | Node.js, Express, **Prisma (Neon Adapter)** | **Render (Web Service)** | Deployed & Live |
| **Database** | PostgreSQL | **Neon Postgres** (via Neon Adapter) | Deployed & Migrated |

### 🌐 Public URLs

| Service | URL |
| :--- | :--- |
| **Frontend (Dashboard)** | `https://ecommercedashbored.netlify.app` |
| **Backend API Base** | `https://e-commercedashboard-backend.onrender.com/api` |
| **test api available for no origin(your browser),   ${BASE_API_URL}/users,  ${BASE_API_URL}/users/admin,  ${BASE_API_URL}/products,  ${BASE_API_URL}/products/4** | `BASE_API_URL="https://e-commercedashboard-backend.onrender.com/api"` |

***

## 2. Technical Implementation Summary

### 2.1. Backend Architecture (`/server`)

* **Database ORM:** **Prisma** is used for type-safe interaction with the PostgreSQL database, utilizing the **Neon adapter** for efficient, serverless-friendly connections.
* **Connection Management:** The **Prisma Global Singleton Pattern** is implemented to prevent database connection pool exhaustion in production and during local hot-reloading.
* **CORS Policy:** Access is strictly controlled via `cors` middleware, allowing requests only from the deployed **Netlify frontend domain** (`https://ecommercedashbored.netlify.app`).
* **Deployment Scripting:** The `package.json` is optimized for production deployment on Render, using `"start": "node server.js"`.

### 2.2. Frontend & Deployment

* **Routing Fix (SPA):** The **Netlify Redirect rule** (`/* /index.html 200`) is configured to ensure proper loading and refreshing of all client-side routes without 404 errors.
* **API URL:** The frontend is configured to consume data from the live Render API endpoint.

***

## 3. Project Setup (Local Development)

### 3.1. Prerequisites

Ensure you have the following installed:

* **Node.js** (LTS version recommended)
* **npm** (Node Package Manager)
* A running instance of your database (as configured in your `schema.prisma`).

### 3.2. Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/LOGANATHANTECH/e-COMMERCE-Admin-Dashboard-backend.git](https://github.com/LOGANATHANTECH/e-COMMERCE-Admin-Dashboard-backend.git)
    cd e-COMMERCE-Admin-Dashboard/server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a file named `.env` in the root of the `/server` directory and add your connection string and development secrets:

    ```env
    # Database Connection String 
    DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
    
    # Port to run the Express server on
    PORT=5000
    ```

### 3.3. Database Setup (Prisma)

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

## 4. Running the Server

Start the server in development mode:

```bash
npm run dev
# OR (if using the standard start command for local testing)
npm start