// Product Route
import { NextResponse } from "next/server";
import { prisma } from "../../utils/prisma.client";


export async function POST(request: Request) {
    const body = await request.json();
    try {
        const product = await prisma.subCategory.createMany({ data: body });
        return NextResponse.json( product );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode ?? 500 });
    }
}
