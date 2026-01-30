"use client";

import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

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

	return (
		<div className="flex items-center justify-between px-2 py-4">
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
				>
					<ChevronsLeftIcon className="h-4 w-4" />
				</Button>

				{/* Previous Page */}
				<Button
					variant="outline"
					size="icon"
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={!hasPrevPage}
				>
					<ChevronLeftIcon className="h-4 w-4" />
				</Button>

				{/* Current Page Display */}
				<div className="flex items-center gap-1">
					{currentPage > 1 && (
						<Button
							variant="outline"
							size="sm"
							onClick={() => handlePageChange(currentPage - 1)}
						>
							{currentPage - 1}
						</Button>
					)}

					<Button variant="default" size="sm" disabled>
						{currentPage}
					</Button>

					{hasNextPage && (
						<Button
							variant="outline"
							size="sm"
							onClick={() => handlePageChange(currentPage + 1)}
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
				>
					<ChevronRightIcon className="h-4 w-4" />
				</Button>

				{/* Last Page - Disabled since we don't know total */}
				<Button variant="outline" size="icon" disabled>
					<ChevronsRightIcon className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};
