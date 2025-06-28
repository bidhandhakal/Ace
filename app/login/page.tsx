import { Metadata } from "next";
import { LoginForm } from "../components/LoginForm";

export const metadata: Metadata = {
    title: "Login | YO-web",
    description: "Login to your account",
};

export default function LoginPage() {
    return (
        <div className="page-container">
            <div className="w-full max-w-md">
                <LoginForm />
            </div>
        </div>
    );
} 