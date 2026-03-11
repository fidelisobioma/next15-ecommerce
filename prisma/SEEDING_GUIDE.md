# Prisma 7 Seeding Guide

## Overview

This guide documents the proper way to set up database seeding in Prisma 7 projects.

## Requirements

### 1. Dependencies

For PostgreSQL projects, install the Prisma adapter:

```bash
npm install @prisma/adapter-pg pg
npm install --save-dev @types/pg
```

### 2. Environment Variables (.env)

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/your_database?schema=public"
```

### 3. Prisma Configuration (prisma.config.ts)

```typescript
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

### 4. Prisma Schema (prisma/schema.prisma)

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

**Important**: Do NOT add `url` to the datasource block. The URL is configured in `prisma.config.ts`.

### 5. Seed File (prisma/seed.ts)

The seed file must use the adapter pattern for Prisma 7:

```typescript
import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Your seeding logic here
  console.log("Seeding started...");

  // Example:
  // await prisma.user.deleteMany();
  // await prisma.user.create({ data: { email: "test@example.com" } });
}

main()
  .then(async () => {
    console.log("✅ Seeding completed successfully.");
    await pool.end();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await pool.end();
    process.exit(1);
  });
```

## Setup Steps for New Projects

1. **Install dependencies**:

   ```bash
   npm install @prisma/client @prisma/adapter-pg pg
   npm install --save-dev prisma @types/pg tsx
   ```

2. **Create configuration files**:
   - `prisma.config.ts` with datasource URL
   - `prisma/schema.prisma` with your models
   - `.env` with DATABASE_URL

3. **Generate Prisma Client**:

   ```bash
   npx prisma generate
   ```

4. **Run migrations**:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run seeding**:
   ```bash
   npx prisma db seed
   ```

## Understanding Pool and PrismaPg

### Pool (Connection Pool)

The `Pool` from the `pg` library manages database connections efficiently:

- **Reuses connections** instead of creating new ones for each query (improves performance)
- **Handles multiple concurrent requests** by maintaining a pool of ready connections
- **Manages connection lifecycle** automatically
- **Must be closed** when done with `pool.end()` to prevent resource leaks

```typescript
const pool = new Pool({ connectionString });
// ... perform queries ...
await pool.end(); // Always close the pool
```

### PrismaPg (PostgreSQL Adapter)

The `PrismaPg` adapter bridges Prisma and PostgreSQL:

- **Converts Prisma queries** into PostgreSQL-specific SQL commands
- **Uses the connection pool** to execute those queries
- **Allows Prisma 7 to work with PostgreSQL** in the adapter pattern

```typescript
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
```

**Together**: PrismaClient → PrismaPg → Pool → PostgreSQL

For more details, see [DATABASE_CONNECTION.md](DATABASE_CONNECTION.md).

## Key Points to Remember

✅ **Do's**:

- Use `prisma.config.ts` for datasource URL configuration
- Import `dotenv/config` at the top of seed.ts
- Use the `PrismaPg` adapter for PostgreSQL
- Create a `Pool` instance and properly close it with `pool.end()`
- Add environment variable validation
- Install `@types/pg` for TypeScript support

❌ **Don'ts**:

- Don't add `url` to the datasource in schema.prisma
- Don't create PrismaClient without an adapter in Prisma 7
- Don't forget to close the pool connection
- Don't skip the `prisma generate` command

## Troubleshooting

| Error                          | Solution                                                 |
| ------------------------------ | -------------------------------------------------------- |
| "datasources is not supported" | Use adapter pattern instead                              |
| "DATABASE_URL is not set"      | Check .env file and make sure it's in the root directory |
| "Cannot find module"           | Run `npx prisma generate`                                |
| "Connection refused"           | Make sure database is running (docker-compose up -d)     |

## References

- [Prisma 7 Client Configuration](https://pris.ly/d/prisma7-client-config)
- [Prisma Seeding](https://www.prisma.io/docs/orm/prisma-migrate/seed)
- [Prisma Adapter Pattern](https://pris.ly/d/adapter)
