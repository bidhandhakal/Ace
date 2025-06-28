import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Email and password are required' },
                { status: 400 }
            );
        }

        const result = await loginUser(email, password);

        if (!result.success) {
            return NextResponse.json(
                { success: false, message: result.message },
                { status: 401 }
            );
        }

        return NextResponse.json({ success: true, user: result.user });
    } catch (error) {
        console.error('Login API error:', error);
        return NextResponse.json(
            { success: false, message: 'An error occurred during login' },
            { status: 500 }
        );
    }
} 