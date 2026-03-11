/**
 * Prisma 7 Database Seed Template
 *
 * This is a production-ready seed template for Prisma 7 with PostgreSQL adapter.
 * Copy this file and customize the seeding logic in the main() function.
 */

import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Validate environment variables
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Initialize database connection pool
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/**
 * Main seeding function
 * Add your data creation logic here
 */
async function main() {
  console.log("🌱 Starting database seed...");

  try {
    // Example: Delete existing data (be careful in production!)
    // await prisma.product.deleteMany();
    // await prisma.category.deleteMany();

    // Example: Create categories
    // const electronics = await prisma.category.create({
    //   data: { name: "Electronics", slug: "electronics" },
    // });
    // console.log(`✅ Created category: ${electronics.name}`);

    // Example: Create products
    // const product = await prisma.product.create({
    //   data: {
    //     name: "Laptop",
    //     description: "High-performance laptop",
    //     categoryId: electronics.id,
    //   },
    // });
    // console.log(`✅ Created product: ${product.name}`);

    console.log("✅ Seed data created successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

/**
 * Execute the seed function with proper error handling
 */
main()
  .then(async () => {
    await pool.end();
    console.log("📦 Database connection closed.");
  })
  .catch(async (error) => {
    console.error("Fatal error:", error);
    await pool.end();
    process.exit(1);
  });
