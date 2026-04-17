# lush-graphql-api
Backend CRUD API to manage a list of tasks using GraphQL.
This project uses Node.js, TypeScript, Prisma, and GraphQL Yoga with Pothos for the schema.
(Take home project: backend structure, GraphQL design and working with a database in a typed environment.)

## Tech Stack!
-Node.js
-TypeScript
-GraphQL Yoga
-Pothos
-Prisma
-SQLite
-Zod

## Project Structure
src/
  index.ts          # server entry point
  prisma.ts         # Prisma client instance
  schema/
    builder.ts      # Pothos schema builder
    task.ts         # Task type + queries + mutations

## API Features

### Queries
-Get all tasks
-Get a single task by ID

### Mutations
-Create a task
-Toggle task completion
-Delete a task

## Data Model:
A Task has:
-id(string, uuid)
-title(string)
-completed(boolean)
-createdAt (date)
-updatedAt (date)

## Setup
### 1. Install dependencies
npm install

### 2. Run database migration
npx prisma migrate dev--name init

### 3. Start server
npm run dev

### 4. Open GraphQL

## GraphQL playground:
https://psychic-doodle-66pv9rg9j57f5696-4000.app.github.dev/graphql

## Environment

DATABASE_URL is defined in .env (used by Prisma)

## Things I Learned!
How to structure a GraphQL API using Pothos, how Prisma works (in general) but also with a real life database,
how to validate inputs using Zod (https://zod.dev/), how context works in GraphQL resolvers, and how TypeScript helps catch backend mistakes early on.

## Improvements
Perhaps task filtering (like completed vs incomplete, and definitely a switch from SQLite to Postgres)

## Summary
This is a simple CRUD GraphQL API, but it really helped me understand how backend systems connect together--schema design, database access and structure in one place.
