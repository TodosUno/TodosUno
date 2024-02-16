import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const jwt = req.cookies.get("token")?.value;
  console.log("Requested URL:", req.nextUrl.pathname);
  console.log("JWT Token:", jwt);
  

  if (req.nextUrl.pathname === "/logo.png") {
    return NextResponse.next();
  }
  if (
    jwt &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")
  ) {
    try {
      await jwtVerify(jwt, new TextEncoder().encode("secreto"));
      console.log("Redirecting to /dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    } catch (error) {
      console.error("JWT Verification Error for Dashboard Redirect:", error);
    }
  }
  /*
  if (
    !jwt &&
    req.nextUrl.pathname !== "/login" &&
    req.nextUrl.pathname !== "/register"
  ) {
    console.log("Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
  // Bloquear el acceso a la ruta principal ("/") si no está logueado
 /*
  if (!jwt && req.nextUrl.pathname === "/") {
    console.log("Redirecting to /login (from /)");
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  } */

  // Redirigir al dashboard si está logueado y accede a la ruta principal ("/")
  /*
  
  if (jwt && req.nextUrl.pathname === "/") {
    console.log("Redirecting to /dashboard (from /)");
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  } */

  console.log("Allowing access to the requested URL");
  return NextResponse.next();
} 
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
