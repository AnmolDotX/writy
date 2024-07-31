import { NextRequest, NextResponse } from "next/server";
import { toast } from "sonner";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicPath =
    path === "/" ||
    path == "/publicRoute/signup" ||
    path == "/publicRoute/signin";

  const accessToken = req.cookies.get("token")?.value ?? "";

  if (!accessToken && !isPublicPath) {
    toast.error("Unauthorized");
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (accessToken && isPublicPath) {
    toast.error("You can't go to login or Signup page without logout");
    return NextResponse.redirect(new URL("/blogs", req.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/publicRoute/signup",
    "/publicRoute/signin",
    "/blogs/:id*",
    "/blogs/create-blog",
    "/blogs"
  ],
};
