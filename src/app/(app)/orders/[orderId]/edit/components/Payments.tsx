import { CheckCircle, Clock, FileText, Plus, Printer } from "lucide-react";
import React, { useState } from "react";
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
}

export const Payments = ({ invoices: initialInvoices }: PaymentsProps) => {
	const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
	const [open, setOpen] = useState(false);
	const [amount, setAmount] = useState("");
	const [type, setType] = useState("deposit");
	const [isLoading, setIsLoading] = useState(false);

	const handlePrint = (fileUrl: string) => {
		window.open(fileUrl, "_blank");
	};

	const handleAddInvoice = async () => {
		setIsLoading(true);

		const response = await axios.post("/api/v1/branch/1/order/1/invoices", {
			amount: parseFloat(amount).toFixed(2),
			type: type,
		});

		setInvoices([...invoices, response.data]);
		setOpen(false);
		setAmount("");
		setType("deposit");
		setIsLoading(false);
	};

	const getStatusBadge = (status: string) => {
		const statusConfig = {
			paid: { label: "مدفوع", variant: "default" as const, icon: CheckCircle },
			pending: {
				label: "قيد الانتظار",
				variant: "secondary" as const,
				icon: Clock,
			},
			cancelled: {
				label: "ملغي",
				variant: "destructive" as const,
				icon: FileText,
			},
		};

		const config =
			statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
		const Icon = config.icon;

		return (
			<Badge variant={config.variant} className="gap-1">
				<Icon className="w-3 h-3" />
				{config.label}
			</Badge>
		);
	};

	const getDocumentTypeLabel = (type: string) => {
		const types: Record<string, string> = {
			invoice_deposit: "فاتورة دفعة مقدمة",
			invoice_full: "فاتورة كاملة",
			invoice: "فاتورة",
		};
		return types[type] || type;
	};

	return (
		<Card className="shadow-none">
			<CardHeader className="flex flex-row items-center justify-between space-y-0">
				<div>
					<CardTitle className="text-2xl">إدارة المدفوعات</CardTitle>
					<CardDescription>عرض وإدارة الفواتير والمدفوعات</CardDescription>
				</div>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button>
							<Plus className="w-4 h-4 ml-2" />
							إضافة فاتورة جديدة
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>إضافة فاتورة جديدة</DialogTitle>
						</DialogHeader>
						<div className="space-y-4 py-4">
							<div className="space-y-2">
								<Label htmlFor="amount">المبلغ (ر.س)</Label>
								<Input
									id="amount"
									type="number"
									step="0.01"
									min="0"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									placeholder="60.00"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="type">نوع الفاتورة</Label>
								<Select value={type} onValueChange={setType}>
									<SelectTrigger id="type">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="deposit">دفعة مقدمة</SelectItem>
										<SelectItem value="full">دفعة كاملة</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="flex gap-3 pt-4">
								<Button
									onClick={handleAddInvoice}
									disabled={isLoading}
									className="flex-1"
								>
									{isLoading ? "جاري الإضافة..." : "إضافة"}
								</Button>
								<Button
									variant="outline"
									onClick={() => setOpen(false)}
									disabled={isLoading}
									className="flex-1"
								>
									إلغاء
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</CardHeader>
			<CardContent>
				{invoices.length === 0 ? (
					<div className="text-center py-12">
						<FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
						<p className="text-muted-foreground">لا توجد فواتير حالياً</p>
					</div>
				) : (
					<div className="space-y-4">
						{invoices.map((invoice) => (
							<Card key={invoice.id}>
								<CardContent className="p-5">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-3">
												<h3 className="text-lg font-semibold">
													{invoice.invoiceNumber}
												</h3>
												{getStatusBadge(invoice.status)}
											</div>

											<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
												<div>
													<p className="text-muted-foreground">نوع المستند</p>
													<p className="font-medium mt-1">
														{getDocumentTypeLabel(invoice.documentType)}
													</p>
												</div>
												<div>
													<p className="text-muted-foreground">
														المجموع الفرعي
													</p>
													<p className="font-medium mt-1">
														{invoice.subtotal?.toFixed(2)} ر.س
													</p>
												</div>
												<div>
													<p className="text-muted-foreground">
														ضريبة القيمة المضافة
													</p>
													<p className="font-medium mt-1">
														{invoice.vat?.toFixed(2)} ر.س
													</p>
												</div>
												<div>
													<p className="text-muted-foreground">المجموع الكلي</p>
													<p className="font-bold text-primary mt-1 text-lg">
														{invoice.total?.toFixed(2)} ر.س
													</p>
												</div>
											</div>

											<div className="mt-4 pt-4 border-t">
												<p className="text-xs font-medium text-muted-foreground mb-2">
													البنود:
												</p>
												{invoice.items?.map((item) => (
													<div key={item?.id} className="text-sm">
														• {item?.name} (الكمية: {item?.quantity})
													</div>
												))}
											</div>
										</div>

										<Button
											variant="outline"
											onClick={() => handlePrint(invoice?.file)}
											type="button"
											className="mr-4"
										>
											<Printer className="w-4 h-4 ml-2" />
											طباعة
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
};
