import {
	CheckCircleIcon,
	ClockIcon,
	FileTextIcon,
	Loader2Icon,
	PlusIcon,
	PrinterIcon,
	ReceiptIcon,
	XCircleIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";

interface InvoiceItem {
	id: number;
	name: string;
	quantity: number;
	subtotal: number;
	total: number;
}

interface Invoice {
	id: number;
	invoiceNumber: string;
	documentType: string;
	subtotal: number;
	discount: number;
	vat: number;
	total: number;
	status: string;
	file: string;
	items: InvoiceItem[];
}

interface PaymentsProps {
	invoices: Invoice[];
	orderId: number;
}

const STATUS_CONFIG = {
	paid: {
		icon: CheckCircleIcon,
		bgClass: "bg-green-100",
		borderClass: "border-green-600",
		textClass: "text-green-600",
	},
	pending: {
		icon: ClockIcon,
		bgClass: "bg-yellow-100",
		borderClass: "border-yellow-600",
		textClass: "text-yellow-600",
	},
	cancelled: {
		icon: XCircleIcon,
		bgClass: "bg-red-100",
		borderClass: "border-red-600",
		textClass: "text-red-600",
	},
};

export const Payments = ({ invoices, orderId }: PaymentsProps) => {
	const t = useTranslations("payments");
	const { isInBranch } = useAuth({ middleware: "auth" });
	const [open, setOpen] = useState(false);
	const [amount, setAmount] = useState("");
	const [type, setType] = useState("deposit");
	const [isLoading, setIsLoading] = useState(false);

	const handlePrint = (fileUrl: string) => {
		if (fileUrl) {
			window.open(fileUrl, "_blank");
		} else {
			toast.error(t("error"), {
				description: t("no_file_available"),
			});
		}
	};

	const handleAddInvoice = async () => {
		if (!amount || parseFloat(amount) <= 0) {
			toast.error(t("error"), {
				description: t("invalid_amount"),
			});
			return;
		}

		setIsLoading(true);

		try {
			const response = await axios.post(
				`/api/v1/branch/${isInBranch}/order/${orderId}/invoices`,
				{
					amount: parseFloat(amount).toFixed(2),
					type: type,
				},
			);

			toast.success(t("invoice_added_successfully"), {
				description: `${t("invoice_number")}: ${response.data.invoiceNumber}`,
			});

			// Mutate SWR cache to refresh order data
			mutate(["get_order", isInBranch, orderId]);

			setOpen(false);
			setAmount("");
			setType("deposit");
		} catch (error: any) {
			const errorMessage =
				error?.response?.data?.message || t("invoice_add_failed");

			toast.error(t("error"), {
				description: errorMessage,
			});

			console.error("Failed to add invoice:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const getStatusBadge = (status: string) => {
		const config =
			STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ||
			STATUS_CONFIG.pending;
		const Icon = config.icon;

		return (
			<Badge
				variant="outline"
				className={`${config.bgClass} ${config.borderClass} ${config.textClass} gap-1.5 font-medium`}
			>
				<Icon className="w-3.5 h-3.5" />
				{t(`status_${status}`)}
			</Badge>
		);
	};

	const getDocumentTypeLabel = (docType: string) => {
		return t(`document_type_${docType}`);
	};

	// Calculate totals directly from props
	const totalPaid = invoices
		.filter((inv) => inv.status === "paid")
		.reduce((sum, inv) => sum + inv.total, 0);

	const totalPending = invoices
		.filter((inv) => inv.status === "pending")
		.reduce((sum, inv) => sum + inv.total, 0);

	return (
		<div className="space-y-6">
			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									{t("total_invoices")}
								</p>
								<p className="text-2xl font-bold mt-1">{invoices.length}</p>
							</div>
							<div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
								<ReceiptIcon className="h-6 w-6 text-blue-600" />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									{t("total_paid")}
								</p>
								<p className="text-2xl font-bold mt-1 text-green-600">
									{totalPaid.toFixed(2)} {t("currency")}
								</p>
							</div>
							<div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
								<CheckCircleIcon className="h-6 w-6 text-green-600" />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									{t("total_pending")}
								</p>
								<p className="text-2xl font-bold mt-1 text-yellow-600">
									{totalPending.toFixed(2)} {t("currency")}
								</p>
							</div>
							<div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
								<ClockIcon className="h-6 w-6 text-yellow-600" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Invoices List */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
					<div>
						<CardTitle className="text-xl">{t("invoices_list")}</CardTitle>
						<CardDescription>{t("invoices_description")}</CardDescription>
					</div>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<Button>
								<PlusIcon className="w-4 h-4" />
								{t("add_invoice")}
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>{t("add_new_invoice")}</DialogTitle>
								<DialogDescription>
									{t("add_invoice_description")}
								</DialogDescription>
							</DialogHeader>
							<div className="space-y-4 py-4">
								<div className="space-y-2">
									<Label htmlFor="amount">
										{t("amount")} ({t("currency")})
									</Label>
									<Input
										id="amount"
										type="number"
										step="0.01"
										min="0"
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
										placeholder="60.00"
										disabled={isLoading}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="type">{t("invoice_type")}</Label>
									<Select
										value={type}
										onValueChange={setType}
										disabled={isLoading}
									>
										<SelectTrigger id="type">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="deposit">
												{t("type_deposit")}
											</SelectItem>
											<SelectItem value="full">{t("type_full")}</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex gap-3 pt-4">
									<Button
										onClick={handleAddInvoice}
										disabled={isLoading}
										className="flex-1"
									>
										{isLoading ? (
											<>
												<Loader2Icon className="w-4 h-4 animate-spin" />
												{t("adding")}
											</>
										) : (
											t("add")
										)}
									</Button>
									<Button
										variant="outline"
										onClick={() => setOpen(false)}
										disabled={isLoading}
										className="flex-1"
									>
										{t("cancel")}
									</Button>
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</CardHeader>
				<CardContent>
					{invoices.length === 0 ? (
						<div className="text-center py-16">
							<div className="h-20 w-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
								<FileTextIcon className="w-10 h-10 text-muted-foreground" />
							</div>
							<h3 className="text-lg font-semibold mb-2">{t("no_invoices")}</h3>
							<p className="text-muted-foreground mb-4">
								{t("no_invoices_description")}
							</p>
							<Button onClick={() => setOpen(true)}>
								<PlusIcon className="w-4 h-4" />
								{t("add_first_invoice")}
							</Button>
						</div>
					) : (
						<div className="space-y-4">
							{invoices.map((invoice) => (
								<Card key={invoice.id} className="border-2">
									<CardContent className="p-6">
										<div className="flex items-start justify-between gap-4">
											<div className="flex-1 space-y-4">
												{/* Header */}
												<div className="flex items-center gap-3">
													<h3 className="text-lg font-bold">
														{invoice.invoiceNumber}
													</h3>
													{getStatusBadge(invoice.status)}
												</div>

												<Separator />

												{/* Details Grid */}
												<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
													<div>
														<p className="text-xs text-muted-foreground mb-1">
															{t("document_type")}
														</p>
														<p className="font-semibold">
															{getDocumentTypeLabel(invoice.documentType)}
														</p>
													</div>
													<div>
														<p className="text-xs text-muted-foreground mb-1">
															{t("subtotal")}
														</p>
														<p className="font-semibold">
															{invoice.subtotal?.toFixed(2)} {t("currency")}
														</p>
													</div>
													<div>
														<p className="text-xs text-muted-foreground mb-1">
															{t("vat")}
														</p>
														<p className="font-semibold">
															{invoice.vat?.toFixed(2)} {t("currency")}
														</p>
													</div>
													<div>
														<p className="text-xs text-muted-foreground mb-1">
															{t("total")}
														</p>
														<p className="font-bold text-primary text-lg">
															{invoice.total?.toFixed(2)} {t("currency")}
														</p>
													</div>
												</div>

												{/* Items */}
												{invoice.items && invoice.items.length > 0 && (
													<>
														<Separator />
														<div>
															<p className="text-xs font-semibold text-muted-foreground mb-2">
																{t("items")}:
															</p>
															<div className="space-y-1">
																{invoice.items.map((item) => (
																	<div
																		key={item.id}
																		className="text-sm flex justify-between"
																	>
																		<span>
																			• {item.name} (×{item.quantity})
																		</span>
																		<span className="font-medium">
																			{item.total?.toFixed(2)} {t("currency")}
																		</span>
																	</div>
																))}
															</div>
														</div>
													</>
												)}
											</div>

											{/* Print Button */}
											<Button
												variant="outline"
												onClick={() => handlePrint(invoice.file)}
												type="button"
												className="shrink-0"
											>
												<PrinterIcon className="w-4 h-4" />
												{t("print")}
											</Button>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};
