import { PrismaClient, Role, Category, Unit, TransactionType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function main() {
  console.log("🌱 Seeding database...");

  // Hash passwords
  const adminPassword = await hashPassword("Admin@123");
  const userPassword = await hashPassword("User@123");

  // Create Users
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword, // Hashed password
      role: Role.ADMIN,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "Regular User",
      email: "user@example.com",
      password: userPassword, // Hashed password
      role: Role.USER,
    },
  });

  // Create a Restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Tasty Bites",
      address: "123 Food Street, NY",
      userId: admin.id,
    },
  });

  // Create Inventory Items
  const milk = await prisma.inventory.create({
    data: {
      name: "Whole Milk",
      category: Category.DAIRY,
      description: "Fresh organic whole milk",
      price: 3.99,
      unit: Unit.LTRS,
      restaurantId: restaurant.id,
    },
  });

  const beef = await prisma.inventory.create({
    data: {
      name: "Beef Patty",
      category: Category.MEAT,
      description: "Frozen Angus beef patties",
      price: 8.49,
      unit: Unit.LBS,
      restaurantId: restaurant.id,
    },
  });

  // Create Transactions
  await prisma.transaction.createMany({
    data: [
      {
        userId: admin.id,
        itemId: milk.id,
        type: TransactionType.PURCHASE,
        quantity: 10,
        unit: Unit.LTRS,
        description: "Bought fresh milk",
        restaurantId: restaurant.id,
      },
      {
        userId: admin.id,
        itemId: beef.id,
        type: TransactionType.USAGE,
        quantity: 5,
        unit: Unit.LBS,
        description: "Used for burgers",
        restaurantId: restaurant.id,
      },
    ],
  });

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });