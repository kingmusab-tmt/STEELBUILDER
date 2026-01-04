import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./components/AdminDashboard";

export const metadata = {
  title: "Gallery Management - Admin Dashboard",
  description: "Manage gallery images",
};

export default async function AdminGalleryPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "Admin") {
    redirect("/login");
  }

  return <AdminDashboard />;
}
