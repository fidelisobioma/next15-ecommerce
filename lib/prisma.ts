import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
/**
 * EXPLANATION:
 *
 * This file implements a singleton pattern for the Prisma Client to prevent multiple instances.
 *
 * Why this matters:
 * - In development, Next.js hot reloads cause modules to re-import
 * - Without a singleton, each re-import creates a new Prisma Client
 * - Multiple instances exhaust the connection pool and cause warnings
 *
 * How it works:
 * 1. Checks if a global Prisma instance already exists
 * 2. If it does, reuses it; if not, creates a new one
 * 3. In development, stores the instance globally for hot reload reuse
 * 4. In production, each instance is isolated for better performance
 *
 * Usage: import { prisma } from "@/lib/prisma"
 */
