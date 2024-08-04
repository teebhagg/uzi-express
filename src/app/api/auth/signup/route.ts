import bcrypt from 'bcrypt';

import { NextResponse } from "next/server";
import { prisma } from "../../utils/prisma.client";
import { Prisma } from "@prisma/client";
import { sendEmail } from '../../utils/email';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    
    // If user exists
    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (userExists && userExists.isEmailVerified) {
      return NextResponse.json(
        { message: "User already exists" }, { status: 409 }
      );
    }

    const generateOTP = (): string => {
        const otpLength = 6;
        const digits = '0123456789';
        let otp = '';
      
        for (let i = 0; i < otpLength; i++) {
          const randomIndex = Math.floor(Math.random() * digits.length);
          otp += digits[randomIndex];
        }
        return otp;
    }
    const otp = generateOTP();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otpExpiry = new Date(Date.now() + 3600000);

    if (userExists && !userExists.isEmailVerified) {
        const updatedUser = await prisma.user.update({
            where: {
                email
            },
            data: {
                OTP: otp,
                OTPExpiry: otpExpiry
            }
        });

        await sendEmail(email, 'Verify Email', `Dear ${(name as string).split(' ')[0]}, \nYour OTP is: ${otp}. OTP is valid for 1 hour`);
        return NextResponse.json(
          { user: updatedUser }, { status: 200 }
        );
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            OTP: otp,
            OTPExpiry: otpExpiry
        }
    });
    await sendEmail(email, 'Verify Email', `Dear ${(name as string).split(' ')[0]}, \nYour OTP is: ${otp}. OTP is valid for 1 hour`);

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

export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
  try {

    if (!id) {
        return NextResponse.error();
    }

    // const { userId, name, email, password, phone, address } =
    //   await request.json();

    const body = await request.json()

    // if (password && password.length < 6) {
    //   return NextResponse.json(
    //     { message: "Password must be at least 6 characters" },
    //     { status: 400 }
    //   );
    // }

    const updatedUser = await prisma.user.update({
        where: {id},
        data: body
    });

    console.log(updatedUser);

    return NextResponse.json(
      {
        message: "User updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      console.error("Error during user update:", error);
      return NextResponse.error();
    }
  }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
  try {

    const { userId } = await request.json();

    const user = await prisma.user.delete({where: userId});

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during user/cart item deletion:", error);
    return NextResponse.error();
  }
}
