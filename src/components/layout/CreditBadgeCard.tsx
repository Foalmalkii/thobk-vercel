import { AlertTriangleIcon, CheckCircleIcon, MessageSquareIcon, PhoneIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { User } from "@/lib/types";

export const CreditBadgeCard = ({ user }: { user: User }) => {
	const t = useTranslations("credit");
	const { type, amount } = user.tailor.credit;

	const isLow = amount <= 10;
	const isCritical = amount <= 5;

	const CreditIcon = type === "sms" ? MessageSquareIcon : PhoneIcon;
	const StatusIcon = isCritical || isLow ? AlertTriangleIcon : CheckCircleIcon;

	return (
		<div
			className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden"
			dir="rtl"
		>
			{/* Expanded */}
			<div className="group-data-[state=collapsed]:hidden p-4 space-y-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
							<CreditIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
						</div>
						<span className="text-sm font-semibold text-white/80">
							{type === "sms" ? t("sms") : t("whatsapp")}
						</span>
					</div>
					<StatusIcon className="w-4 h-4 text-white/50" strokeWidth={2} />
				</div>

				<div className="flex items-baseline gap-2">
					<span className="text-3xl font-bold text-white tabular-nums">{amount}</span>
					<span className="text-xs text-white/50">{t("credits_remaining")}</span>
				</div>

				<div className="flex items-center gap-1.5 text-xs font-medium text-white/60">
					<StatusIcon className="w-3 h-3 shrink-0" strokeWidth={2} />
					<span>
						{isCritical ? t("critical_alert") : isLow ? t("low_alert") : t("good_status")}
					</span>
				</div>
			</div>

			{/* Collapsed */}
			<div className="hidden group-data-[state=collapsed]:flex flex-col items-center gap-2 p-3">
				<div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
					<CreditIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
				</div>
				<span className="text-xl font-bold text-white tabular-nums">{amount}</span>
				{(isLow || isCritical) && (
					<div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
				)}
			</div>
		</div>
	);
};
