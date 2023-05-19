/* eslint-disable */


import { NextResponse } from "next/server";
import { encodeOptions } from "./middleUtils";

export default function middleware(request: any) {
    if (request.nextUrl.pathname === "/my-page") {
        const searchParams = request.nextUrl.searchParams;
        const path = encodeOptions({
            returnVisitor: Boolean(request.cookies.get("visitor")),
            country: request.geo?.country,
            page: searchParams.get("page"),
        });

        return NextResponse.rewrite(new URL(`/my-page/${path}`, request.nextUrl));
    }
    return NextResponse.next();
}