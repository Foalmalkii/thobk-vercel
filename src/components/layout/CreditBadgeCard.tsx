import { MessageSquareIcon, PhoneIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { User } from "@/lib/types";

export const CreditBadgeCard = ({ user }: { user: User }) => {
	const { type, amount } = user.tailor.credit;

	const isLow = amount <= 10;
	const isCritical = amount <= 5;

	const getStyles = () => {
		if (isCritical) {
			return {
				gradient: "bg-gradient-to-br from-red-50 via-red-100 to-rose-100",
				border: "border-red-200/60",
				text: "text-red-700",
				badge: "bg-red-500/10 text-red-700 border-red-300/50",
				glow: "shadow-red-100/50",
			};
		}
		if (isLow) {
			return {
				gradient:
					"bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-100",
				border: "border-yellow-200/60",
				text: "text-yellow-700",
				badge: "bg-yellow-500/10 text-yellow-700 border-yellow-300/50",
				glow: "shadow-yellow-100/50",
			};
		}
		return {
			gradient: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
			border: "border-blue-200/60",
			text: "text-blue-700",
			badge: "bg-blue-500/10 text-blue-700 border-blue-300/50",
			glow: "shadow-blue-100/50",
		};
	};

	const styles = getStyles();
	const CreditIcon = type === "sms" ? MessageSquareIcon : PhoneIcon;

	return (
		<Card
			className={`${styles.gradient} ${styles.border} border backdrop-blur-sm shadow-sm ${styles.glow} transition-all hover:shadow-md group-data-[state=collapsed]:p-0`}
			dir="rtl"
		>
			<CardContent className="p-3 group-data-[state=collapsed]:p-2">
				<div className="flex items-center justify-between gap-2 group-data-[state=collapsed]:flex-col group-data-[state=collapsed]:gap-1">
					<div className="flex items-center gap-2 group-data-[state=collapsed]:flex-col group-data-[state=collapsed]:gap-0.5">
						<div className={`p-1.5 rounded-lg ${styles.badge} border`}>
							<CreditIcon className="h-3.5 w-3.5" />
						</div>
						<span
							className={`text-xs font-medium ${styles.text} group-data-[state=collapsed]:hidden`}
						>
							{type === "sms" ? "SMS" : "WhatsApp"}
						</span>
					</div>
					<div className={`text-xl font-bold ${styles.text} tabular-nums`}>
						{amount}
					</div>
				</div>
				{(isLow || isCritical) && (
					<div
						className={`mt-2 text-[10px] font-medium ${styles.text} flex items-center gap-1 group-data-[state=collapsed]:hidden`}
					>
						<span className="text-xs">{isCritical ? "⚠️" : "⚡"}</span>
						<span className="opacity-80">
							{isCritical ? "شحن عاجل" : "رصيد منخفض"}
						</span>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
