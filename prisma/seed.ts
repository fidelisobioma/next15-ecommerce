import "dotenv/config";
import { Product, User } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
// import { Pool } from "pg";
import { hashPassword } from "@/lib/auth";
import { PrismaClient } from "../generated/prisma";

// Validate environment variables
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Initialize database connection

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...");

  try {
    // Clear existing data in correct order
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    // Seed categories
    const electronics = await prisma.category.create({
      data: { name: "Electronics", slug: "electronics" },
    });
    console.log(`✅ Created category: ${electronics.name}`);

    const clothing = await prisma.category.create({
      data: { name: "Clothing", slug: "clothing" },
    });
    console.log(`✅ Created category: ${clothing.name}`);

    const home = await prisma.category.create({
      data: { name: "Home", slug: "home" },
    });
    console.log(`✅ Created category: ${home.name}`);

    console.log("✅ Seeding completed successfully.");

    const products: Product[] = [
      {
        id: "1",
        name: "wireless headphones",
        price: 199.99,
        description:
          "Premium noise-cancelling wireless headphones with long battery life.",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoryId: electronics.id,
        slug: "wireless-headphones",
        inventory: 0,
      },
      {
        id: "2",
        name: "Smart watch",
        price: 149.99,
        description:
          "Fitness tracker with heart rate monitoring and sleep analysis..",
        image:
          "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoryId: electronics.id,
        slug: "smart-watch",
        inventory: 75,
      },
      {
        id: "3",
        name: "Running Shoes",
        price: 89.99,
        description: "Comfortable running shoes for everyday use.",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoryId: clothing.id,
        slug: "running-shoes",
        inventory: 120,
      },
      {
        id: "4",
        name: "Ceramic Mug",
        price: 24.99,
        description: "Handcrafted ceramic mug perfect for your morning coffee.",
        image:
          "https://images.unsplash.com/photo-1616241673347-67fb5dfa3167?q=80&w=1456&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoryId: home.id,
        slug: "ceramic-mug",
        inventory: 30,
      },
      {
        id: "5",
        name: "Leather Backpacks",
        price: 79.99,
        description: "Comfortable leather backpack for everyday use.",
        image:
          "https://images.unsplash.com/photo-1622560257067-108402fcedc0?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoryId: clothing.id,
        slug: "leather-backpacks",
        inventory: 60,
      },
    ];

    for (const product of products) {
      await prisma.product.create({ data: product });
      console.log(`✅ Created product: ${product.name}`);
    }
  } catch (error) {
    console.error("❌ Seeding error:", error);
    throw error;
  }

  const users: User[] = [
    {
      id: "1",
      email: "admin@example.com",
      password: "password123",
      name: "Admin User",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      email: "user@example.com",
      password: "user123",
      name: "Regular User",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const user of users) {
    const hashedPassword = await hashPassword(user.password);
    await prisma.user.create({ data: { ...user, password: hashedPassword } });
  }
  console.log("Created users");
}

main()
  .then(async () => {
    // await pool.end();
    console.log("📦 Database connection closed.");
  })
  .catch(async (error) => {
    console.error("❌ Fatal error:", error);
    // await pool.end();
    process.exit(1);
  });
