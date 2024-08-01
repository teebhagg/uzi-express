import { NextResponse } from "next/server";
import { prisma } from "../../utils/prisma.client";


export const POST = async (req: Request) => {
    const { id } = await req.json();
    const body = await req.json();
    try {
        await prisma.cartItem.create({
            data: {
                ...body,
                cartId: id
            }
        })
        const cart = await prisma.cart.findUnique({
            where: { userId: id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })

        return NextResponse.json( cart );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}