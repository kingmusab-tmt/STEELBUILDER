import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./components/AdminDashboard";

export const metadata = {
  title: "Products Management - Admin Dashboard",
  description: "Manage products and images",
};

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "Admin") {
    redirect("/login");
  }

  return <AdminDashboard />;
}
