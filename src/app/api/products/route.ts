// Product Route
import { NextResponse } from "next/server";
import { prisma } from "../utils/prisma.client";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const category = url.searchParams.get("category");
  const brand = url.searchParams.get("brand");

  if (search) {
    try {
      const products = await prisma.product.findMany({
        where: {
          title: {
            contains: search,
          },
        },
        include: {
          subCategory: true,
          categories: true,
          brand: true,
          orders: true,
        },
      });
      return NextResponse.json(products);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode ?? 500 }
      );
    }
  }

  if (category) {
    try {
      const products = await prisma.product.findMany({
        where: {
          categories: {
            some: {
              title: category,
            },
          },
        },
        include: {
          subCategory: true,
          categories: true,
          brand: true,
          orders: true,
        },
      });
      return NextResponse.json(products);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode ?? 500 }
      );
    }
  }

  if (brand) {
    try {
      const products = await prisma.product.findMany({
        where: {
          brand: {
            title: brand,
          },
        },
        include: {
          subCategory: true,
          categories: true,
          brand: true,
          orders: true,
        },
      });
      return NextResponse.json(products);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode ?? 500 }
      );
    }
  }

  try {
    const products = await prisma.product.findMany({
      include: {
        subCategory: true,
        categories: true,
        brand: true,
        orders: true,
      },
    });
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode ?? 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const product = await prisma.product.create({ data: body });
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode ?? 500 }
    );
  }
}
