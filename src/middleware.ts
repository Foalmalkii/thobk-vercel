import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/((?!testing).*)",
};

export const locales: string[] = ["ar", "en"];

export default function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const locale = request.cookies.get("locale")?.value;
  if (locale != undefined && locales.includes(locale)) {
    return response;
  } else {
    response.cookies.set({
      name: "locale",
      value: "ar",
      path: "/",
      httpOnly: false,
    });
  }

  return response;
}
