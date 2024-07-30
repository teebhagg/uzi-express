// Product Route
import { NextResponse } from "next/server";
import { prisma } from "../utils/prisma.client";

export async function GET() {
    try {
        const products = await prisma.subCategory.findMany();
        return NextResponse.json( products );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode ?? 500 });
    }
}