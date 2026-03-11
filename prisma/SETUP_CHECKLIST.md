# Prisma 7 Project Setup Checklist

Use this checklist when setting up a new Prisma 7 project to avoid common issues.

## Pre-Project Setup

- [ ] Node.js v18+ installed
- [ ] PostgreSQL database running (local or Docker)
- [ ] Create `.gitignore` with `node_modules/`, `.env`, `generated/`

## Installation

- [ ] `npm install @prisma/client`
- [ ] `npm install --save-dev prisma @prisma/adapter-pg pg @types/pg tsx`

## Configuration Files

### prisma/schema.prisma

- [ ] Generator configured with `prisma-client-js`
- [ ] Generator has `output = "../generated/prisma"`
- [ ] Datasource set to `postgresql`
- [ ] **NO** `url` property in datasource
- [ ] Models defined with proper relationships

### prisma.config.ts

- [ ] `import "dotenv/config"` at the top
- [ ] Schema path set to `"prisma/schema.prisma"`
- [ ] Migrations path set to `"prisma/migrations"`
- [ ] Seed command set to `"tsx prisma/seed.ts"`
- [ ] Datasource URL pointing to `process.env["DATABASE_URL"]`

### .env

- [ ] DATABASE_URL set with PostgreSQL connection string
- [ ] Format: `postgresql://user:password@host:port/database?schema=public`
- [ ] File is in project root (not in version control)

### .env.example (for team collaboration)

- [ ] Create `.env.example` without sensitive data
- [ ] Use placeholder values for reference

## Database Setup

- [ ] Database created and accessible
- [ ] Docker container running (if using Docker)
- [ ] Connection string verified

## Prisma Setup

- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Check `prisma/migrations/` folder is created

## Seeding

### prisma/seed.ts

- [ ] Import `"dotenv/config"` at top
- [ ] Import `PrismaClient` from generated path
- [ ] Import `PrismaPg` adapter
- [ ] Create `Pool` with connection string
- [ ] Initialize `PrismaClient` with adapter
- [ ] Add error handling
- [ ] Close pool with `pool.end()`

### package.json

- [ ] Verify `"seed": "prisma db seed"` in scripts (optional but recommended)

## Running Seed

- [ ] Execute `npx prisma db seed`
- [ ] Check for success message: "🌱 The seed command has been executed."
- [ ] Verify data in database (e.g., using Prisma Studio)

## Prisma Studio (Optional)

- [ ] Run `npx prisma studio` to view and manage data
- [ ] Verify seeded data is present

## Common Issues & Solutions

| Issue                   | Check                                    |
| ----------------------- | ---------------------------------------- |
| DATABASE_URL not found  | `.env` in root dir, env var name correct |
| Adapter error           | `npm install @prisma/adapter-pg pg`      |
| Cannot find module      | Run `npx prisma generate`                |
| Connection refused      | Database running, credentials correct    |
| Schema validation error | `url` not in datasource block            |

## First Run Commands

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Run migrations
npx prisma migrate dev --name init

# 3. Seed database
npx prisma db seed

# 4. View data (optional)
npx prisma studio
```

## Next Steps

- [ ] Set up migrations workflow with team
- [ ] Document data model in README
- [ ] Configure CI/CD for migrations
- [ ] Set up pre-commit hooks for schema validation
