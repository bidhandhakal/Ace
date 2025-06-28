import { connectToDatabase } from './db';
import { User } from './models/User';
import { cookies } from 'next/headers';

// In a real application, use a proper password hashing library like bcrypt
// For this example, we'll use a simple hash function
const hashPassword = (password: string): string => {
    // This is NOT secure - in a real app use bcrypt or Argon2
    return Buffer.from(password).toString('base64');
};

const verifyPassword = (password: string, hashedPassword: string): boolean => {
    // This is NOT secure - in a real app use bcrypt or Argon2
    return Buffer.from(password).toString('base64') === hashedPassword;
};

export async function registerUser(email: string, password: string, name?: string) {
    await connectToDatabase();

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return { success: false, message: "User already exists" };
        }

        const hashedPassword = hashPassword(password);

        const newUser = new User({
            email,
            password: hashedPassword,
            name,
        });

        await newUser.save();

        // Set a simple cookie for authentication
        const cookieStore = await cookies();
        cookieStore.set('user_email', email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        return { success: true, user: { email, name } };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, message: "Registration failed" };
    }
}

export async function loginUser(email: string, password: string) {
    await connectToDatabase();

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return { success: false, message: "Invalid credentials" };
        }

        const isPasswordValid = verifyPassword(password, user.password);

        if (!isPasswordValid) {
            return { success: false, message: "Invalid credentials" };
        }

        // Set a simple cookie for authentication
        const cookieStore = await cookies();
        cookieStore.set('user_email', email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        return {
            success: true,
            user: {
                email: user.email,
                name: user.name
            }
        };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: "Login failed" };
    }
}

export async function logoutUser() {
    const cookieStore = await cookies();
    cookieStore.delete('user_email');
    return { success: true };
}

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get('user_email')?.value;

    if (!userEmail) {
        return null;
    }

    await connectToDatabase();

    try {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return null;
        }

        return {
            email: user.email,
            name: user.name
        };
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
} 