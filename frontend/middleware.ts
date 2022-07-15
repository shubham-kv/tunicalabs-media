import {NextFetchEvent, NextRequest, NextResponse} from "next/server"

export default function middleware(
	request: NextRequest, ev: NextFetchEvent
) {
	if(request.nextUrl.pathname === '/dashboard') {
		return NextResponse.redirect(new URL('/dashboard/view-students', request.url))
	}
	return NextResponse.next()
}
