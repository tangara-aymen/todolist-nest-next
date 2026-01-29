# todolist-nest-next

Todo list application (todoapp-aymen) built with **Next.js** (frontend), **NestJS** (backend API), **MySQL**, and **TypeORM**.

## Project structure

- **`frontend/`** – Next.js app (React, TypeScript, Tailwind CSS)
- **`backend/`** – NestJS API with TypeORM and MySQL

## Prerequisites

- Node.js 18+
- MySQL 8+ (or MariaDB)
- npm

## Setup

### 1. MySQL database

Create a database:

```sql
CREATE DATABASE todoapp_aymen;
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MySQL credentials (DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE)
npm install
npm run start:dev
```

API runs at **http://localhost:4000**. TypeORM will create the `todos` table when the app starts (synchronize is enabled in development).

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local
# Optional: set NEXT_PUBLIC_API_URL if the API is not at http://localhost:4000
npm install
npm run dev
```

App runs at **http://localhost:3000**.

## API endpoints

| Method | Path       | Description        |
|--------|------------|--------------------|
| GET    | /todos     | List all todos     |
| GET    | /todos/:id | Get one todo       |
| POST   | /todos     | Create a todo      |
| PATCH  | /todos/:id | Update a todo      |
| DELETE | /todos/:id | Delete a todo      |

## Environment variables

**Backend** (`backend/.env`):

- `PORT` – API port (default: 4000)
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`

**Frontend** (`frontend/.env.local`):

- `NEXT_PUBLIC_API_URL` – Backend API URL (default: http://localhost:4000)

## Scripts

- **Backend:** `npm run start:dev` (watch mode), `npm run build`, `npm run start:prod`
- **Frontend:** `npm run dev`, `npm run build`, `npm run start`
