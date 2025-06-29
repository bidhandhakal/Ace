import { Metadata } from "next";
import { LoginForm } from "../components/LoginForm";

export const metadata: Metadata = {
    title: "Login | YO-web",
    description: "Login to your account",
};

export default function LoginPage() {
    return (
        <div className="page-container px-4 py-8 md:py-12">
            <div className="w-full max-w-md mx-auto">
                <LoginForm />
            </div>
        </div>
    );
} 