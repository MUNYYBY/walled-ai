import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from "jwt-decode";

export function middleware(req: NextRequest) {
    const userInfo : any = localStorage.getItem('userInfo');
    const token = JSON.parse(userInfo)?.access_token;
    console.log("Token" , token)

    const isTokenValid = () => {
        const decodedToken : any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    }


    if (!token && isTokenValid()) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}