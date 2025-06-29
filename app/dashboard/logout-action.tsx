"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                cache: 'no-store',
            });

            if (!response.ok) {
                throw new Error("Logout failed");
            }

            // Use startTransition for a smoother navigation experience
            startTransition(() => {
                // Prefetch the login route
                router.prefetch("/login");
                // Navigate to login
                router.push("/login");
                // Refresh the router cache
                router.refresh();
            });
        } catch (error) {
            console.error("Logout error:", error);
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleLogout}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 transition-all duration-200"
            disabled={isLoading || isPending}
        >
            {isLoading || isPending ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging out...
                </span>
            ) : "Logout"}
        </Button>
    );
}