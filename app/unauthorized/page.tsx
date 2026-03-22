import Unauthorized from "@/unauthorized";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unauthorized - Steelbuilder",
  description: "You don't have permission to access this page",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: "https://www.steelbuilderstechengltd.com.ng/unauthorized",
  },
};

export default function UnauthorizedPage() {
  return <Unauthorized />;
}
