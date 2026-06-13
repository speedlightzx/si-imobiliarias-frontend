import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const sessionToken = req.cookies.get('session_token')

    if(!sessionToken) {
        const redirectUrl = new URL('/', req.url)
        return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/home"
    ]
}