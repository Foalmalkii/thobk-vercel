import { Building2, Plus, MousePointerClick } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export const BranchLoading = () => {
	const t = useTranslations("noBranch");

	return (
		<div
			className="min-h-screen bg-slate-50 flex items-center justify-center p-6"
			dir="rtl"
		>
			<div className="max-w-lg w-full space-y-8">
				{/* Main Card */}
				<Card className="border border-slate-200 shadow-sm">
					<CardContent className="p-10 text-center space-y-6">
						{/* Icon */}
						<div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full">
							<Building2
								className="w-10 h-10 text-slate-400"
								strokeWidth={1.5}
							/>
						</div>

						{/* Title */}
						<div className="space-y-2">
							<h1 className="text-2xl font-semibold text-slate-900">
								{t("title")}
							</h1>
							<p className="text-slate-600 text-sm leading-relaxed">
								{t("description")}
							</p>
						</div>

						{/* Divider */}
						<div className="border-t border-slate-200 my-6" />

						{/* Instructions */}
						<div className="bg-slate-50 rounded-lg p-6 space-y-4 text-right">
							<div className="flex items-start gap-4">
								<div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
									1
								</div>
								<div className="flex-1">
									<p className="text-slate-900 font-medium">{t("step1")}</p>
									<p className="text-slate-600 text-sm mt-1">
										{t("step1_hint")}
									</p>
								</div>
							</div>

							<div className="flex items-start gap-4">
								<div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
									2
								</div>
								<div className="flex-1">
									<p className="text-slate-900 font-medium">{t("step2")}</p>
									<p className="text-slate-600 text-sm mt-1">
										{t("step2_hint")}
									</p>
								</div>
							</div>
						</div>

						{/* Footer Note */}
						<p className="text-xs text-slate-500 pt-2">{t("footer_note")}</p>
					</CardContent>
				</Card>

				{/* Helper Indicator */}
				<div className="flex items-center justify-center gap-2 text-slate-600">
					<MousePointerClick className="w-4 h-4" />
					<p className="text-sm font-medium">{t("click_hint")}</p>
				</div>
			</div>
		</div>
	);
};
