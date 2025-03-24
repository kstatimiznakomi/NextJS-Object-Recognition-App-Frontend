import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  generateBoth,
  generateJwt,
  generateJwtRefresh,
  verifyJwtRefresh,
} from "./utils/session";

export async function middleware(req: NextRequest) {
  var cookieStore = await cookies();
  if (
    req.nextUrl.pathname === "/login" &&
    (cookieStore.get("JWT") || cookieStore.get("JWT_refresh"))
  ) {
    return NextResponse.redirect(`${process.env.BASE_URL}/upload`);
  }

  if (
    req.nextUrl.pathname === "/login" &&
    !cookieStore?.get("JWT") &&
    !cookieStore?.get("JWT_refresh")
  ) {
    return NextResponse.next();
  }

  if (
    req.nextUrl.pathname === "/register" &&
    !cookieStore?.get("JWT") &&
    !cookieStore?.get("JWT_refresh")
  ) {
    return NextResponse.next();
  }

  if (
    req.nextUrl.pathname === "/register" &&
    (cookieStore.get("JWT") || cookieStore.get("JWT_refresh"))
  ) {
    return NextResponse.redirect(`${process.env.BASE_URL}/upload`);
  }

  if (!cookieStore.get("JWT")) {
    if (!cookieStore.get("JWT_refresh")) {
      console.log(111);
      return NextResponse.redirect(`${process.env.BASE_URL}/login`);
    } else {
      var verifiedUser = await verifyJwtRefresh(
        cookieStore.get("JWT_refresh")?.value
      );
      var payload = { id: verifiedUser?.id, username: verifiedUser?.username };
      var token = await generateJwt(payload);
      var refreshToken = await generateJwtRefresh(payload);
      generateBoth(cookieStore, token, refreshToken);
    }
  }

  if (
    req.nextUrl.pathname === "/detections" &&
    (cookieStore?.get("JWT") || cookieStore?.get("JWT_refresh"))
  ) {
    return NextResponse.next();
  }

  if (
    req.nextUrl.pathname === "/detections" &&
    !cookieStore?.get("JWT") &&
    !cookieStore?.get("JWT_refresh")
  ) {
    return NextResponse.redirect(`${process.env.BASE_URL}/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/detections", "/login", "/register", "/upload"],
};
