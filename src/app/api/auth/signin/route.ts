import bcrypt from 'bcrypt';

import { NextResponse } from "next/server";
import { prisma } from "../../utils/prisma.client";
import { Prisma } from "@prisma/client";
import { sendEmail } from '../../utils/email';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    return NextResponse.json(
      { user }, { status: 201 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      console.error("Error during signup:", error);
      return NextResponse.error();
    }
  }
}