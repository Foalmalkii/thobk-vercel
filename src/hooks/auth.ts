"use client";
import axios from "@/lib/axios";
import { User } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useAuth = ({
	middleware,
	redirectIfAuthenticated,
}: {
	middleware: string;
	redirectIfAuthenticated?: string;
}) => {
	const router = useRouter();
	const params = useParams();

	const {
		data: user,
		mutate: mutateUser,
		isLoading,
		isValidating,
		error,
	} = useSWR<User>(
		"/user",
		() =>
			axios
				.get("/api/v1/user")
				.then((res) => res.data.data)
				.catch((error) => {
					if (error.response?.status !== 409 && error.response?.status !== 401)
						throw error;
				}),
		{ revalidateOnFocus: false },
	);

	const csrf = () => axios.get("/sanctum/csrf-cookie");

	const isAdmin = user?.role === "admin";

	const isInBranch = user?.preferences?.activeBranchId ?? null;

	const login = async ({ ...props }) => {
		await csrf();

		axios
			.post("/login", props)
			.then(() => mutateUser(undefined, { revalidate: true }))
			.catch((error) => {
				if (error.response.status !== 422) throw error;
			});
	};
	const logout = async () => {
		await csrf();
		if (!error) {
			await axios.post("/logout").then(() => mutateUser());
		}

		window.location.pathname = "/login";
	};
	useEffect(() => {
		// Only run redirects when not loading
		if (isLoading) return;

		if (middleware === "guest" && redirectIfAuthenticated && user) {
			router.push(redirectIfAuthenticated);
		}

		if (middleware === "auth" && error) {
			logout();
		}
	}, [user, error, isLoading, middleware]);
	return {
		user,
		login,
		logout,
		isLoading,
		isValidating,
		isAdmin,
		isInBranch,
		mutateUser,
	};
};
