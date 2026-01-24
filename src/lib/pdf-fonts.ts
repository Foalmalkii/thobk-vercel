// lib/pdf-fonts.ts
import { Font } from "@react-pdf/renderer";

let fontsRegistered = false;

export const registerPDFFonts = () => {
	if (fontsRegistered) return; // Prevent duplicate registration

	Font.register({
		family: "IBMPlexSansArabic",
		fonts: [
			{ src: "/fonts/IBMPlexSansArabic-ExtraLight.ttf", fontWeight: 200 },
			{ src: "/fonts/IBMPlexSansArabic-Light.ttf", fontWeight: 300 },
			{ src: "/fonts/IBMPlexSansArabic-Regular.ttf", fontWeight: 400 },
			{ src: "/fonts/IBMPlexSansArabic-Medium.ttf", fontWeight: 500 },
			{ src: "/fonts/IBMPlexSansArabic-SemiBold.ttf", fontWeight: 600 },
			{ src: "/fonts/IBMPlexSansArabic-Bold.ttf", fontWeight: 700 },
		],
	});

	fontsRegistered = true;
};
