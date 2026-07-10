
import { cookies } from "next/headers";
import { NextRequest } from "next/server"


const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login']
export default async function middleware(req:NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute =  protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    //get the session from the cookie to decide what the user can access

const cookie = cookies().get('session')?.value;

const session = await decrypt(cookie);
  
}

