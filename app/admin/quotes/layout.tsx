import { getToken } from "next-auth/jwt";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default async function QuotesLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
