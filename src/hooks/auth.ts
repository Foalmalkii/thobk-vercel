"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import useSWR from "swr";
import axios from "@/lib/axios";
import type { User } from "@/lib/types";

const clearAuthCookies = () => {
	Cookies.remove("XSRF-TOKEN", { path: "/" });
	Cookies.remove("laravel_session", { path: "/" });
};

export const useAuth = ({
	middleware,
	redirectIfAuthenticated,
}: {
	middleware: string;
	redirectIfAuthenticated?: string;
}) => {
	const router = useRouter();

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
					if (error.response?.status !== 409) throw error;
				}),
		{ shouldRetryOnError: false },
	);

	const csrf = () => axios.get("/sanctum/csrf-cookie");

	const isAdmin = user?.role === "admin";

	const isInBranch = user?.preferences?.activeBranchId ?? null;

	const login = async ({ ...props }) => {
		await csrf();

		return axios
			.post("/login", props)
			.then(() => mutateUser(undefined, { revalidate: true }))
			.catch((error) => {
				throw error;
			});
	};

	const logout = useCallback(async () => {
		await axios.post("/logout").catch(() => null);
		clearAuthCookies();
		mutateUser(undefined, false);
		router.push("/login");
	}, [mutateUser, router]);

	useEffect(() => {
		if (isLoading) return;

		if (middleware === "guest" && redirectIfAuthenticated && user) {
			router.push(redirectIfAuthenticated);
		}

		if (middleware === "auth" && error) {
			logout();
		}
	}, [user, error, isLoading, middleware, redirectIfAuthenticated, logout, router]);

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
