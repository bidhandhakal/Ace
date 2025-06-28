import mongoose, { Schema } from "mongoose";

interface IUser {
    email: string;
    password: string;
    name?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },
        name: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

// Check if model already exists to prevent overwriting during hot reload
export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export type { IUser }; 