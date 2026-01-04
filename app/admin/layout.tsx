import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import React from "react";
import connectDB from "@/utils/connectDB";
import User from "@/models/user";

export const metadata = {
  title: "Admin Dashboard - Steelbuilder",
  description: "Admin dashboard for managing Steelbuilder content",
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(authOptions);

  // Check if user is authenticated
  if (!session) {
    redirect("/login");
  }

  // Verify admin status with fresh database check
  try {
    await connectDB();
    const user = await User.findOne({ email: session.user?.email });

    if (!user) {
      redirect("/unauthorized");
    }

    if (user.role !== "Admin") {
      redirect("/unauthorized");
    }
  } catch (error) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
