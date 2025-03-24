import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    var cookieStore = await cookies();
    cookieStore.delete('JWT');
    cookieStore.delete('JWT_refresh');

    return NextResponse.redirect(`${process.env.BASE_URL}`)
}