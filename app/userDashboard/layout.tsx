import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import React from "react";
import connectDB from "@/utils/connectDB";
import User from "@/models/user";

export const metadata = {
  title: "Dashboard - Steelbuilder",
  description: "User dashboard for Steelbuilder",
};

interface UserDashboardLayoutProps {
  children: React.ReactNode;
}

export default async function UserDashboardLayout({
  children,
}: UserDashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  // Check if user is authenticated
  if (!session) {
    redirect("/login");
  }

  // Check if user is Admin and redirect to admin dashboard
  try {
    await connectDB();
    const user = await User.findOne({ email: session.user?.email });

    if (user?.role === "Admin") {
      redirect("/admin");
    }
  } catch (error) {
    throw error;
  }

  return <>{children}</>;
}
