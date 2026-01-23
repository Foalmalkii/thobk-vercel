import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";
import React from "react";

export const DeleteOrderConfirmation = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="border-red-600 border text-red-600 bg-red-100 w-full flex justify-between items-center hover:bg-red-200">
					<span>حذف</span>
					<TrashIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>متاكد</DialogTitle>
			</DialogContent>
		</Dialog>
	);
};
