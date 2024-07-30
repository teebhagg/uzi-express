// Brand API Routes

import { NextResponse } from "next/server";
import { prisma } from "../utils/prisma.client";


export async function GET() {
    try {
        const brands = await prisma.brand.findMany({ include: { products: true } });
        return NextResponse.json( brands );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode ?? 500 });
    }
}