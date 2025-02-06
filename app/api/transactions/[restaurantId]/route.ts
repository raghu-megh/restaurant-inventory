import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch transactions by restaurantId
export async function GET(req: NextRequest, { params }: { params: Promise<{ restaurantId: string }> }) {
    try {
      const restaurantId = (await params).restaurantId;
  
      // Fetch transactions for the restaurant
      const transactions = await prisma.transaction.findMany({
        where: { restaurantId },
        include: {
          inventory: true, // Include inventory item details
          user: { select: { name: true, email: true } }, // Include user details
        },
        orderBy: { createdAt: "desc" }, // Order transactions by latest
      });
  
      return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
  }