import { Metadata } from "next";
import { RegisterForm } from "../components/RegisterForm";

export const metadata: Metadata = {
    title: "Register | YO-web",
    description: "Create a new account",
};

export default function RegisterPage() {
    return (
        <div className="page-container">
            <div className="w-full max-w-md">
                <RegisterForm />
            </div>
        </div>
    );
} 