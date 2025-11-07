import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const path = req.nextUrl.pathname;

    const isAuthPage = path === "/login";
    const isRootPage = path === "/";

    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (token && isRootPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // console.log('Token:', token)

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/dashboard/:path*"],
};