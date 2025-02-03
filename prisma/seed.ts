import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const inventoryItem = await prisma.inventory.create({
    data: {
      name: "Milk",
      quantity: 50,
      unit: "liters",
      expiryDate: new Date("2025-06-01"),
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        inventoryItemId: inventoryItem.id,
        type: "purchase",
        quantity: 20,
        description: "Stock refill",
      },
      {
        inventoryItemId: inventoryItem.id,
        type: "usage",
        quantity: 5,
        description: "Used for coffee",
      },
    ],
  });

  console.log("Database seeded!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());