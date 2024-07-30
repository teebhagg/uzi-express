// Brand API Routes

import { NextResponse } from "next/server";
import { prisma } from "../../utils/prisma.client";


export async function POST(request: Request) {
    const categoryData = await request.json();
    try {
        const categories = await prisma.category.createMany({ data: categoryData });
        return NextResponse.json( categories );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode ?? 500 });
    }
}