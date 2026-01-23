import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import { TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { toast } from "sonner";
import { mutate } from "swr";

export const DeleteOrderConfirmation = ({ orderId }: { orderId: number }) => {
	const t = useTranslations("messages");
	const { isInBranch } = useAuth({ middleware: "auth" });

	const deleteOrder = async () => {
		await axios.delete(`/api/v1/branch/${isInBranch}/order/${orderId}`)
		.then(() => {toast.success(t("deleted_success"), {position: "top-center"})
	mutate(["list_orders", isInBranch])})
		.catch(() => toast.error(t("error_happened")));
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="border-red-600 border text-red-600 bg-red-100 w-full flex justify-between items-center hover:bg-red-200">
					<span>حذف</span>
					<TrashIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>{t("ask_confirmation")}</DialogTitle>
				<DialogDescription>
					{t("description_confirmation_delete")}
				</DialogDescription>
				<DialogFooter className="justify-end gap-2">
					<DialogTrigger>
						<Button variant={"outline"} >رجوع</Button>
					</DialogTrigger>
					<DialogTrigger>
					<Button onClick={() => deleteOrder()} className="border-red-600 border text-red-600 bg-red-100 hover:bg-red-200">
						حذف
					</Button>
					</DialogTrigger>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
