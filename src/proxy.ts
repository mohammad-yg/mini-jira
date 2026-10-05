import { auth } from "@/auth"
import { NextResponse } from "next/server"
import paths from "./lib/paths"

export default auth((request) => {
    const pathname = request.nextUrl.pathname
    const isAuthPage = pathname === "/auth" || pathname.startsWith("/auth/")

    if (isAuthPage || request.auth?.user) {
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL(paths.auth.signIn, request.url))
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
