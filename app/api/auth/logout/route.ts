import { NextResponse } from 'next/server';
import { logoutUser } from '@/lib/auth';

export function POST() {
    try {
        const result = logoutUser();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Logout API error:', error);
        return NextResponse.json(
            { success: false, message: 'An error occurred during logout' },
            { status: 500 }
        );
    }
} 