import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const prisma = new PrismaClient();
    const hashedPass = await bcrypt.hash(res.password, 10);

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: res.email,
          },
          {
            username: res.username,
          },
        ],
      },
    });

    if (user)
      Response.json(
        { msg: "Такой пользователь уже зарегистрирован!" },
        { status: 500 }
      );

    // await prisma.user.create({
    //   data: {
    //     firstname: res.name,
    //     lastname: res.lastName,
    //     username: res.username,
    //     surname: res.surName,
    //     email: res.email,
    //     password: hashedPass,
    //   },
    // });

    return Response.json({ msg: "Регистрация прошла успешно!" });
  } catch (e) {
    console.log(e);
  }
}
