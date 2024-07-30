import { NextResponse } from "next/server";
import { prisma } from "../../utils/prisma.client";


export async function POST(request: Request) {
    const brandData = await request.json();
    try {
        const brands = await prisma.brand.createMany({ data: brandData });
        return NextResponse.json( brands );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode ?? 500 });
    }
}