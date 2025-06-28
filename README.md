# Next.js Login System with MongoDB

This is a Next.js application with a login/registration system connected to MongoDB, using Shadcn UI components.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Create a `.env.local` file in the root directory with your MongoDB connection string:

```
# MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/your-database?retryWrites=true&w=majority
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- User registration with email and password
- User login
- Protected dashboard page
- MongoDB integration for user data storage
- Modern UI with Shadcn UI components

## Important Notes

- This is a basic implementation. For production use, consider adding:
  - More robust password hashing (e.g., bcrypt)
  - Email verification
  - Password reset functionality
  - More comprehensive error handling
  - Rate limiting for login attempts

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
