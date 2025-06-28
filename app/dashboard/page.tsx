import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogoutButton } from "./logout-action";

export const metadata: Metadata = {
    title: "Dashboard | YO-web",
    description: "Your dashboard",
};

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="page-container">
            <div className="w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                <Card>
                    <CardHeader>
                        <CardTitle>Welcome, {user.name || user.email}!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">You are now logged in with {user.email}.</p>
                        <LogoutButton />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}