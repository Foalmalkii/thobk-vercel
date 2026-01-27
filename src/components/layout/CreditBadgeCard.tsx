import {
	AlertTriangleIcon,
	CheckCircleIcon,
	MessageSquareIcon,
	PhoneIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { User } from "@/lib/types";
import { Card, CardContent } from "../ui/card";

export const CreditBadgeCard = ({ user }: { user: User }) => {
	const t = useTranslations("credit");
	const { type, amount } = user.tailor.credit;

	const isLow = amount <= 10;
	const isCritical = amount <= 5;

	const getStyles = () => {
		if (isCritical) {
			return {
				container: "bg-gradient-to-br from-red-500 to-rose-600",
				icon: "text-white/90",
				amount: "text-white",
				label: "text-white/80",
				statusIcon: AlertTriangleIcon,
				statusText: "text-white/90",
			};
		}
		if (isLow) {
			return {
				container: "bg-gradient-to-br from-amber-500 to-orange-600",
				icon: "text-white/90",
				amount: "text-white",
				label: "text-white/80",
				statusIcon: AlertTriangleIcon,
				statusText: "text-white/90",
			};
		}
		return {
			container: "bg-gradient-to-br from-blue-500 to-indigo-600",
			icon: "text-white/90",
			amount: "text-white",
			label: "text-white/80",
			statusIcon: CheckCircleIcon,
			statusText: "text-white/90",
		};
	};

	const styles = getStyles();
	const CreditIcon = type === "sms" ? MessageSquareIcon : PhoneIcon;
	const StatusIcon = styles.statusIcon;

	return (
		<Card
			className={`${styles.container} border-0 shadow-lg overflow-hidden group-data-[state=collapsed]:shadow-md`}
			dir="rtl"
		>
			<CardContent className="p-4 group-data-[state=collapsed]:p-3">
				{/* Expanded View */}
				<div className="group-data-[state=collapsed]:hidden space-y-3">
					{/* Header */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
								<CreditIcon
									className={`w-4 h-4 ${styles.icon}`}
									strokeWidth={2.5}
								/>
							</div>
							<span className={`text-sm font-semibold ${styles.label}`}>
								{type === "sms" ? t("sms") : t("whatsapp")}
							</span>
						</div>
						<StatusIcon
							className={`w-4 h-4 ${styles.statusText}`}
							strokeWidth={2.5}
						/>
					</div>

					{/* Amount Display */}
					<div className="flex items-baseline gap-2">
						<span
							className={`text-3xl font-bold ${styles.amount} tabular-nums`}
						>
							{amount}
						</span>
						<span className={`text-sm ${styles.label}`}>
							{t("credits_remaining")}
						</span>
					</div>

					{/* Status Message */}
					<div
						className={`text-xs font-medium ${styles.statusText} flex items-center gap-1.5`}
					>
						{isCritical ? (
							<>
								<span>⚠️</span>
								<span>{t("critical_alert")}</span>
							</>
						) : isLow ? (
							<>
								<span>⚡</span>
								<span>{t("low_alert")}</span>
							</>
						) : (
							<>
								<span>✓</span>
								<span>{t("good_status")}</span>
							</>
						)}
					</div>
				</div>

				{/* Collapsed View */}
				<div className="hidden group-data-[state=collapsed]:flex flex-col items-center gap-2">
					<div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
						<CreditIcon
							className={`w-5 h-5 ${styles.icon}`}
							strokeWidth={2.5}
						/>
					</div>
					<span className={`text-2xl font-bold ${styles.amount} tabular-nums`}>
						{amount}
					</span>
					{(isLow || isCritical) && (
						<div className="w-2 h-2 rounded-full bg-white animate-pulse" />
					)}
				</div>
			</CardContent>
		</Card>
	);
};
