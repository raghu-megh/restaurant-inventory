import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req : NextRequest,
    { params }: { params: Promise<{ restaurantId: string }> }) {

    const restaurantId = (await params).restaurantId
    console.log("Restaurant Id is " + restaurantId)

    const userId = restaurantId;

    const transactions = await prisma.transaction.findMany({
        where: { userId },
        include: {
          inventoryItem: { select: { name: true, category: true } },
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(transactions);
}