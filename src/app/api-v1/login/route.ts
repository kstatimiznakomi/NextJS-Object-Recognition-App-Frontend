"use server";

import { loginUserSchema } from "@/user-schema";
import { generateBoth, generateJwt, generateJwtRefresh } from "@/utils/session";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const { username, email, password } = loginUserSchema.parse(
      await req.json()
    );
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      },
    });

    if (!user)
      return NextResponse.json({
        msg: "Неверный логин или пароль!",
        status: 404,
      });

    if (!bcrypt.compareSync(password, user?.password))
      return NextResponse.json(
        { msg: "Неверный логин или пароль!" },
        { status: 500 }
      );

    var payload = { id: user.id, username: user.username };

    var token = await generateJwt(payload);
    var tokenRefresh = await generateJwtRefresh(payload);
    var cookieStore = await cookies();

    generateBoth(cookieStore, token, tokenRefresh);

    return NextResponse.json({ msg: "Успешно", status: 200 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          status: "fail",
          message: "user with that email already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
