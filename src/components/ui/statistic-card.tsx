import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { Button } from "./button";
import StatisticCardWrapper from "./statistic-wrapper";

export const StatisticCard = ({
	title,
	href,
	children,
}: {
	title: string;
	href: string;
	children: React.ReactNode;
}) => {
	return (
		<StatisticCardWrapper>
			<StatisticCardWrapper.Title className="flex justify-between items-center">
				<span>{title}</span>
				<Link
					href={href}
					className="flex items-center text-sm text-blue-800 font-normal hover:underline max-md:hidden"
				>
					<Button variant={"outline"} className="h-auto px-3 py-1">
						التفاصيل <ChevronLeft />
					</Button>
				</Link>
			</StatisticCardWrapper.Title>
			<StatisticCardWrapper.Container>
				{children}
			</StatisticCardWrapper.Container>
			<Link
				href={href}
				className="flex items-center justify-end text-sm text-blue-800 font-normal hover:underline md:hidden mt-8"
			>
				<Button variant={"outline"}>
					التفاصيل <ChevronLeft />
				</Button>
			</Link>
		</StatisticCardWrapper>
	);
};
