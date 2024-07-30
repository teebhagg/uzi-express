// Product Route
import { NextResponse } from "next/server";
import { prisma } from "../utils/prisma.client";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                subCategory: true,
                categories: true,
                brand: true,
                orders: true
            }
        });
        return NextResponse.json( products );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode ?? 500 });
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    try {
        const product = await prisma.product.create({ data: body });
        return NextResponse.json( product );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode ?? 500 });
    }
}
