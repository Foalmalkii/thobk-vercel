"use client";

import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { getDirection } from "@/lib/types";

interface PaginationProps {
	currentPage: number;
	totalItems: number;
	itemsPerPage?: number;
}

export const Pagination = ({
	currentPage,
	totalItems,
	itemsPerPage = 15,
}: PaginationProps) => {
	const t = useTranslations("pagination");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const locale = useLocale();
	const dir = getDirection(locale);
	const isRTL = dir === "rtl";

	const hasNextPage = totalItems === itemsPerPage;
	const hasPrevPage = currentPage > 1;

	const createPageURL = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", page.toString());
		return `${pathname}?${params.toString()}`;
	};

	const handlePageChange = (page: number) => {
		router.push(createPageURL(page));
	};

	// Don't show pagination if there's only one page
	/*if (totalItems < itemsPerPage && currentPage === 1) {
		return null;
	}*/

	// Icons based on direction
	const FirstPageIcon = isRTL ? ChevronsRightIcon : ChevronsLeftIcon;
	const PrevPageIcon = isRTL ? ChevronRightIcon : ChevronLeftIcon;
	const NextPageIcon = isRTL ? ChevronLeftIcon : ChevronRightIcon;
	const LastPageIcon = isRTL ? ChevronsLeftIcon : ChevronsRightIcon;

	return (
		<div className="flex items-center justify-between px-2 py-4" dir={dir}>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<span>
					{t("page")} {currentPage}
				</span>
				<span>•</span>
				<span>
					{totalItems} {t("items")}
				</span>
			</div>

			<div className="flex items-center gap-2">
				{/* First Page */}
				<Button
					variant="outline"
					size="icon"
					onClick={() => handlePageChange(1)}
					disabled={!hasPrevPage}
					aria-label={t("firstPage")}
				>
					<FirstPageIcon className="h-4 w-4" />
				</Button>

				{/* Previous Page */}
				<Button
					variant="outline"
					size="icon"
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={!hasPrevPage}
					aria-label={t("previousPage")}
				>
					<PrevPageIcon className="h-4 w-4" />
				</Button>

				{/* Current Page Display */}
				<div className="flex items-center gap-1">
					{currentPage > 1 && (
						<Button
							variant="outline"
							size="sm"
							onClick={() => handlePageChange(currentPage - 1)}
							aria-label={`${t("goToPage")} ${currentPage - 1}`}
						>
							{currentPage - 1}
						</Button>
					)}

					<Button variant="default" size="sm" disabled aria-current="page">
						{currentPage}
					</Button>

					{hasNextPage && (
						<Button
							variant="outline"
							size="sm"
							onClick={() => handlePageChange(currentPage + 1)}
							aria-label={`${t("goToPage")} ${currentPage + 1}`}
						>
							{currentPage + 1}
						</Button>
					)}
				</div>

				{/* Next Page */}
				<Button
					variant="outline"
					size="icon"
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={!hasNextPage}
					aria-label={t("nextPage")}
				>
					<NextPageIcon className="h-4 w-4" />
				</Button>

				{/* Last Page - Disabled since we don't know total */}
				<Button
					variant="outline"
					size="icon"
					disabled
					aria-label={t("lastPage")}
				>
					<LastPageIcon className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};
