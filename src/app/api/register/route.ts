import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismdb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing Information", { status: 404 });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashPassword,
      },
    });

    return  NextResponse.json(user);
  } catch (error:any) {
        console.log(error,"Registration Error")
        return new NextResponse("Internal error", {status:500})
  }
}
