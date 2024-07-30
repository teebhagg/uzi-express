// Brand API Routes

import { NextResponse } from "next/server";
import { prisma } from "../utils/prisma.client";


export async function GET() {
    try {
        const categories = await prisma.category.findMany({ include: { subCategories: true, products: true } });
        return NextResponse.json( categories );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode ?? 500 });
    }
}