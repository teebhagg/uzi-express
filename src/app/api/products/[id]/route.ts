import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../utils/prisma.client";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) {
        return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    try {
        const product = await prisma.product.findUnique({
            where: { id: id as string },
            include: {
                subCategory: true,
                categories: true,
                brand: true,
                orders: true
            }
        });
        return NextResponse.json( product );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode ?? 500 });
    }
}

export async function PATCH(request: Request) {
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
        return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    try {
        const product = await prisma.product.update({
            where: { id: id as string },
            data: body,
        });
        return NextResponse.json( product );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode ?? 500 });
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
        return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    try {
        const product = await prisma.product.delete({
            where: { id: id as string },
        });
        return NextResponse.json( product );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode ?? 500 });
    }
}

