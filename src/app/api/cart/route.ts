// Cart API route
import { NextResponse } from "next/server";
import { prisma } from "../utils/prisma.client";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // if (!id) {
    //     return NextResponse.json({ error: 'Cart ID is required' }, { status: 400 });
    // }
    try {
        const cart = await prisma.cart.findMany({
            // where: { userId: id as string },
            // include: {
            //     items: {
            //         include: {
            //             product: true,
            //         }
            //     }
            // }
        });
        return NextResponse.json( cart );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode ?? 500 });
    }
}