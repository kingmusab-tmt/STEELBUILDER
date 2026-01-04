import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./components/AdminDashboard";

export const metadata = {
  title: "Home Page Management - Admin Dashboard",
  description:
    "Manage home page content, hero images, achievements, clients and testimonials",
};

export default async function AdminHomePage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "Admin") {
    redirect("/login");
  }

  return <AdminDashboard />;
}
