"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2Icon, LockIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

const passwordSchema = z
	.object({
		currentPassword: z.string().min(1, "Current password is required"),
		newPassword: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
				"Password must contain uppercase, lowercase, number and special character",
			),
		newPasswordConfirmation: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.newPassword === data.newPasswordConfirmation, {
		message: "Passwords do not match",
		path: ["newPasswordConfirmation"],
	});

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
	const { isInBranch } = useAuth({ middleware: "auth" });
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<PasswordFormData>({
		resolver: zodResolver(passwordSchema),
	});

	const router = useRouter();
	const onSubmit = async (data: PasswordFormData) => {
		setIsSubmitting(true);

		try {
			await axios.post("/change-password", {
				currentPassword: data.currentPassword,
				newPassword: data.newPassword,
				newPasswordConfirmation: data.newPasswordConfirmation,
			});

			toast.success("Password changed successfully", {
				description: "Your password has been updated.",
			});

			router.refresh();

			reset();
			setShowCurrentPassword(false);
			setShowNewPassword(false);
			setShowConfirmPassword(false);
		} catch (error: any) {
			const errorMessage =
				error?.response?.data?.message ||
				error?.response?.data?.error ||
				"Failed to change password";

			console.log(error);

			toast.error("Password change failed", {
				description: errorMessage,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-2xl mx-auto">
				<div className="bg-white rounded-lg border border-gray-200 shadow-sm">
					{/* Header */}
					<div className="border-b border-gray-200 px-6 py-4">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-gray-900 rounded-lg">
								<LockIcon className="w-5 h-5 text-white" />
							</div>
							<div>
								<h1 className="text-xl font-semibold text-gray-900">
									Change Password
								</h1>
								<p className="text-sm text-gray-500">
									Update your password to keep your account secure
								</p>
							</div>
						</div>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
						{/* Current Password */}
						<div className="space-y-2">
							<Label
								htmlFor="currentPassword"
								className="text-sm font-medium text-gray-900"
							>
								Current Password
							</Label>
							<div className="relative">
								<Input
									id="currentPassword"
									type={showCurrentPassword ? "text" : "password"}
									{...register("currentPassword")}
									className={`pr-10 ${
										errors.currentPassword
											? "border-red-500 focus-visible:ring-red-500"
											: "border-gray-300 focus-visible:ring-gray-900"
									}`}
									placeholder="Enter your current password"
									disabled={isSubmitting}
								/>
								<button
									type="button"
									onClick={() => setShowCurrentPassword(!showCurrentPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
									disabled={isSubmitting}
								>
									{showCurrentPassword ? (
										<EyeOffIcon className="w-4 h-4" />
									) : (
										<EyeIcon className="w-4 h-4" />
									)}
								</button>
							</div>
							{errors.currentPassword && (
								<p className="text-sm text-red-500">
									{errors.currentPassword.message}
								</p>
							)}
						</div>

						{/* Divider */}
						<div className="border-t border-gray-200"></div>

						{/* New Password */}
						<div className="space-y-2">
							<Label
								htmlFor="newPassword"
								className="text-sm font-medium text-gray-900"
							>
								New Password
							</Label>
							<div className="relative">
								<Input
									id="newPassword"
									type={showNewPassword ? "text" : "password"}
									{...register("newPassword")}
									className={`pr-10 ${
										errors.newPassword
											? "border-red-500 focus-visible:ring-red-500"
											: "border-gray-300 focus-visible:ring-gray-900"
									}`}
									placeholder="Enter your new password"
									disabled={isSubmitting}
								/>
								<button
									type="button"
									onClick={() => setShowNewPassword(!showNewPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
									disabled={isSubmitting}
								>
									{showNewPassword ? (
										<EyeOffIcon className="w-4 h-4" />
									) : (
										<EyeIcon className="w-4 h-4" />
									)}
								</button>
							</div>
							{errors.newPassword && (
								<p className="text-sm text-red-500">
									{errors.newPassword.message}
								</p>
							)}
							<p className="text-xs text-gray-500">
								Password must be at least 8 characters and include uppercase,
								lowercase, number, and special character
							</p>
						</div>

						{/* Confirm New Password */}
						<div className="space-y-2">
							<Label
								htmlFor="newPasswordConfirmation"
								className="text-sm font-medium text-gray-900"
							>
								Confirm New Password
							</Label>
							<div className="relative">
								<Input
									id="newPasswordConfirmation"
									type={showConfirmPassword ? "text" : "password"}
									{...register("newPasswordConfirmation")}
									className={`pr-10 ${
										errors.newPasswordConfirmation
											? "border-red-500 focus-visible:ring-red-500"
											: "border-gray-300 focus-visible:ring-gray-900"
									}`}
									placeholder="Confirm your new password"
									disabled={isSubmitting}
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
									disabled={isSubmitting}
								>
									{showConfirmPassword ? (
										<EyeOffIcon className="w-4 h-4" />
									) : (
										<EyeIcon className="w-4 h-4" />
									)}
								</button>
							</div>
							{errors.newPasswordConfirmation && (
								<p className="text-sm text-red-500">
									{errors.newPasswordConfirmation.message}
								</p>
							)}
						</div>

						{/* Submit Button */}
						<div className="flex justify-end pt-4">
							<Button
								type="submit"
								disabled={isSubmitting}
								className="bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
							>
								{isSubmitting ? (
									<>
										<Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
										Updating Password...
									</>
								) : (
									"Update Password"
								)}
							</Button>
						</div>
					</form>
				</div>

				{/* Security Tips */}
				<div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
					<h2 className="text-sm font-semibold text-gray-900 mb-3">
						Password Security Tips
					</h2>
					<ul className="space-y-2 text-sm text-gray-600">
						<li className="flex items-start gap-2">
							<span className="text-gray-400 mt-0.5">•</span>
							<span>Use a unique password that you don't use elsewhere</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-gray-400 mt-0.5">•</span>
							<span>Avoid common words and personal information</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-gray-400 mt-0.5">•</span>
							<span>Consider using a password manager</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-gray-400 mt-0.5">•</span>
							<span>Change your password regularly</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
