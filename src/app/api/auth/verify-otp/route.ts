import bcrypt from 'bcrypt';

import { NextResponse } from "next/server";
import { prisma } from "../../utils/prisma.client";
import { Prisma } from "@prisma/client";
import { sendEmail } from '../../utils/email';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
        throw new Error('User not found');
    }

    if (!user.OTPExpiry || new Date() > new Date(user.OTPExpiry) || !user.OTP) {
        throw new Error('OTP has expired. Please register again');
    }

    if (user.OTP !== otp) {
        throw new Error('Invalid OTP');
    }

    if (user.OTP === otp) {
        prisma.user.update({
            where: { email },
            data: { isEmailVerified: true }
        })
    }

    return NextResponse.json(
      { user, message: "OTP verified successfully" }, { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      console.error("Error during signup:", error);
      return NextResponse.json({message: error.message}, { status: 500 });
    }
  }
}