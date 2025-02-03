import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: { inventoryItem: true, user: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error fetching transactions" }, { status: 500 });
  }
}