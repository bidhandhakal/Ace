import { NextResponse } from 'next/server';
import { logoutUser } from '@/lib/auth';

export async function POST() {
    try {
        await logoutUser();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Logout API error:', error);
        return NextResponse.json(
            { success: false, message: 'An error occurred during logout' },
            { status: 500 }
        );
    }
} 