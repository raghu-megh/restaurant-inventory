"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function inventoryTransactions(userId: string) {
  if (!userId) throw new Error("User ID is required");

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        inventoryItem: { select: { name: true, category: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
}