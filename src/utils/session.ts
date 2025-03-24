import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);
const encodedRefreshKey = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET
);

export async function generateJwt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(encodedKey);
}

export async function generateJwtRefresh(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 week")
    .sign(encodedRefreshKey);
}

export async function getNewTokens(req: NextRequest) {
  var user = await verifyJwtRefresh(req.cookies.get("JWT_refresh")?.value);
  var payload = { id: user?.id, username: user?.username };
  var newToken = await generateJwt(payload);
  var newRefreshToken = await generateJwtRefresh(payload);
  var cookieStore = await cookies();

  generateBoth(cookieStore, newToken, newRefreshToken);
}

export async function generateBoth(
  cookieStore: ReadonlyRequestCookies,
  newToken: string,
  newRefreshToken: string
) {
  cookieStore.set({
    maxAge: 86400,
    expires: 86400000,
    name: "JWT",
    value: newToken,
    httpOnly: true,
  });

  cookieStore.set({
    maxAge: 604800,
    expires: 604800000,
    name: "JWT_refresh",
    value: newRefreshToken,
    httpOnly: true,
  });
}

export async function generateBaseTokens(req: NextRequest) {
  var { id, username } = await verifyJwt(req.cookies.get("JWT")?.value);
  var payload = { id: id, username: username };
  var newToken = await generateJwt(payload);
  var newRefreshToken = await generateJwtRefresh(payload);

  generateBoth(newToken, newRefreshToken);
}

export async function verifyJwt(jwt: string) {
  try {
    const { payload } = await jwtVerify(jwt, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function verifyJwtRefresh(jwt: string) {
  try {
    const { payload } = await jwtVerify(jwt, encodedRefreshKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}
