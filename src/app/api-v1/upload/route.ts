"use server";

import { getNewTokens, verifyJwt, verifyJwtRefresh } from "@/utils/session";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(req: NextRequest) {
  try {
    var prisma = new PrismaClient();
    var images: File | null = (await req.formData()).get("images");
    if (!images) {
      return NextResponse.json({ error: "Требуется файл" }, { status: 400 });
    }

    var { id } = await verifyJwt(req.cookies.get("JWT")?.value);

    const buffer = Buffer.from(await images.arrayBuffer());

    const dir = "/images/";
    const uploadDir = join(process.cwd(), "public", dir);

    const filename = images.name;

    var fileLink = `http://localhost:3000/images/${filename}`;
    var filePath = `${uploadDir}${filename}`;

    var { detected_image } = await prisma.users_Images.findFirst({
      where: {
        image: fileLink,
      },
    });

    if (detected_image)
      return NextResponse.json({ msg: detected_image });

    await writeFile(filePath, buffer);

    const fd = new FormData();
    fd.append("file_path", filePath);
    fd.append("upload_dir", uploadDir);
    fd.append("file_name", filename.replace(".jpg", ""));
    const res = await axios
      .post("http://localhost:8000/api-v1/detect/img", fd)
      .then((res) => {
        return res.data;
      });

    await prisma.users_Images.create({
      data: {
        user_id: id,
        image: fileLink,
        detected_image: res,
      },
    });

    return NextResponse.json({ msg: res });
  } catch (err) {
    console.log(err);
  }
}
