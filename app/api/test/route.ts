// app/api/test/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const count = await prisma.product.count();
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
