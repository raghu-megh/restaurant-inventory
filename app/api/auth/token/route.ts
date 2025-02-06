import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    
      return NextResponse.json({
        message: "Token retrieved successfully",
        email: token.email,
      });
}