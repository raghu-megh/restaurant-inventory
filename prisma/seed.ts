import { PrismaClient, Role, Category, Unit, TransactionType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create a User
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "securepassword", // Store hashed passwords in production
      role: Role.ADMIN,
    },
  });

  console.log(`✅ Created User: ${user.email}`);

  // Create Inventory Items
  const milk = await prisma.inventory.create({
    data: {
      name: "Milk",
      category: Category.DAIRY,
      description: "Fresh whole milk",
      price: 3.5,
      unit: Unit.LTRS,
      userId: user.id,
    },
  });

  const beef = await prisma.inventory.create({
    data: {
      name: "Beef",
      category: Category.MEAT,
      description: "Grass-fed beef",
      price: 10.99,
      unit: Unit.LBS,
      userId: user.id,
    },
  });

  console.log(`✅ Created Inventory Items: Milk, Beef`);

  // Create Transactions
  await prisma.transaction.createMany({
    data: [
      {
        userId: user.id,
        itemId: milk.id,
        type: TransactionType.PURCHASE,
        quantity: 10,
        unit: Unit.LTRS,
        description: "Bought fresh milk stock",
      },
      {
        userId: user.id,
        itemId: milk.id,
        type: TransactionType.USAGE,
        quantity: 2,
        unit: Unit.LTRS,
        description: "Used milk for coffee",
      },
      {
        userId: user.id,
        itemId: beef.id,
        type: TransactionType.PURCHASE,
        quantity: 5,
        unit: Unit.LBS,
        description: "Bought premium beef",
      },
      {
        userId: user.id,
        itemId: beef.id,
        type: TransactionType.WASTAGE,
        quantity: 1,
        unit: Unit.LBS,
        description: "Discarded expired beef",
      },
    ],
  });

  console.log("✅ Created Transactions");

  console.log("🎉 Database seeding completed!");
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
  })
  .finally(() => {
    prisma.$disconnect();
  });