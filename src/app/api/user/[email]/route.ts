import { NextResponse } from "next/server";
import { prisma } from "../../utils/prisma.client";
import bcrypt from 'bcrypt';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const identifier = url.pathname.split("/").pop();
  if (!identifier) {
    return NextResponse.json({ error: "Invalid identifier" }, { status: 400 });
  }
  const isEmail = identifier.includes("@");
  try {
    const user = await prisma.user.findUnique({
      where: isEmail ? { email: identifier as string} : { id: identifier as string},
    });

    console.log(user)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode ?? 500 }
    );
  }
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const identifier = url.pathname.split("/").pop();
  if (!identifier) {
    return NextResponse.json({ error: "Invalid identifier" }, { status: 400 });
  }
  const isEmail = identifier.includes("@");
  try {
    const user = await prisma.user.findUnique({
      where: isEmail ? { email: identifier as string} : { id: identifier as string},
    });

    if (!user) {
      return NextResponse.json({ error: "User not found or does not exist" }, { status: 404 });
    }

    const body = await request.json();
    if (body.oldPassword && body.password && body.confirmPassword) {
      if (!bcrypt.compareSync(body.oldPassword, user.password!)) {
        return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });
      }
      if (body.password !== body.confirmPassword) {
        return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
      }

      body.password = await bcrypt.hash(body.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: body,
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode ?? 500 }
    );
  }
}
