import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const config = {
	matcher: "/((?!testing).*)",
};

export const locales: string[] = ["ar", "en", "hi", "bn"];

export default async function middleware(request: NextRequest) {
	const response = NextResponse.next();

	const locale = request.cookies.get("locale")?.value;
	if (!locale || !locales.includes(locale)) {
		response.cookies.set({
			name: "locale",
			value: "ar",
			path: "/",
			httpOnly: false,
		});
	}

	return response;
}
