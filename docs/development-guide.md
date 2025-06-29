# Development Setup Guide

This guide is for developers setting up the social media backend project.

## Prerequisites

-   Node.js (v16 or higher)
-   PostgreSQL (v12 or higher)
-   npm or yarn package manager

## Quick Start

1. **Clone and install dependencies:**

    ```bash
    npm install
    ```

2. **Set up environment variables:**

    ```bash
    cp .env.example .env
    # Edit .env with your database credentials
    ```

3. **Create PostgreSQL database:**

    ```sql
    CREATE DATABASE social_media_db;
    ```

4. **Set up database tables:**

    ```bash
    npm run setup:db
    ```

5. **Start the development server:**
    ```bash
    npm run dev
    ```

## API Testing

1. **Register a new user**
2. **Copy the JWT token** from the response
3. **Use the token** in Authorization header: `Bearer <token>`
4. **Import** `docs/api-collection.json` into Postman for ready-to-use requests

## Development Commands

-   `npm run dev` - Start with nodemon (auto-reload)
-   `npm run start:verbose` - Start with verbose logging
-   `npm run start:critical` - Start with critical-only logging
-   `npm run setup:db` - Reset and seed database

## Database Access

The project uses PostgreSQL with connection pooling. Database queries are handled through the `src/utils/database.js` utility.
