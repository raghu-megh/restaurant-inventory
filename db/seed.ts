import { PrismaClient, Role, Category, Unit, TransactionType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function main() {
  console.log("🧹 Clearing existing data...");

  // Delete data in reverse order to prevent foreign key conflicts
  await prisma.transaction.deleteMany({});
  await prisma.inventory.deleteMany({});
  await prisma.restaurant.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("✅ Database cleared successfully!");

  console.log("🌱 Seeding new data...");

  // Hash passwords
  const adminPassword = await hashPassword("Admin@123");
  const userPassword = await hashPassword("User@123");

  // Create Users
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Regular User",
      email: "user@example.com",
      password: userPassword,
      role: Role.USER,
    },
  });

  // Create Restaurants
  const restaurant1 = await prisma.restaurant.create({
    data: { name: "Tasty Bites", address: "123 Food Street, NY", userId: admin.id },
  });

  const restaurant2 = await prisma.restaurant.create({
    data: { name: "Gourmet Delights", address: "456 Main Avenue, LA", userId: user.id },
  });

  // Create Inventory Items
  let milk = await prisma.inventory.create({
    data: {
      name: "Whole Milk",
      category: Category.DAIRY,
      description: "Fresh organic whole milk",
      price: 3.99,
      unit: Unit.LTRS,
      restaurantId: restaurant1.id,
    },
  });

  let beef = await prisma.inventory.create({
    data: {
      name: "Beef Patty",
      category: Category.MEAT,
      description: "Frozen Angus beef patties",
      price: 8.49,
      unit: Unit.LBS,
      restaurantId: restaurant1.id,
    },
  });

  milk = await prisma.inventory.create({
    data: {
      name: "Whole Milk",
      category: Category.DAIRY,
      description: "Fresh organic whole milk",
      price: 3.99,
      unit: Unit.LTRS,
      restaurantId: restaurant2.id,
    },
  });

  beef = await prisma.inventory.create({
    data: {
      name: "Beef Patty",
      category: Category.MEAT,
      description: "Frozen Angus beef patties",
      price: 8.49,
      unit: Unit.LBS,
      restaurantId: restaurant2.id,
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
        restaurantId: restaurant1.id,
      },
      {
        userId: admin.id,
        itemId: beef.id,
        type: TransactionType.USAGE,
        quantity: 5,
        unit: Unit.LBS,
        description: "Used for burgers",
        restaurantId: restaurant1.id,
      },
    ],
  });

  await prisma.transaction.createMany({
    data: [
      {
        userId: admin.id,
        itemId: milk.id,
        type: TransactionType.PURCHASE,
        quantity: 15,
        unit: Unit.LTRS,
        description: "Bought fresh milk",
        restaurantId: restaurant2.id,
      },
      {
        userId: admin.id,
        itemId: beef.id,
        type: TransactionType.USAGE,
        quantity: 8,
        unit: Unit.LBS,
        description: "Used for burgers",
        restaurantId: restaurant2.id,
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