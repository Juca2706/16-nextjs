import { stackServerApp } from "@/stack/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
    const user = await stackServerApp.getUser();
    const { pathname } = request.nextUrl;

    if (!user && pathname.includes('settings')) {
        return NextResponse.redirect(new URL(stackServerApp.urls.signIn, request.url));
    }

    if (!user) {
        return NextResponse.redirect(new URL(stackServerApp.urls.signIn, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/games/:path*',
        '/consoles/:path*',
        '/profile/:path*',
        '/handler/account-settings',
        '/handler/settings',
    ],
};
