import Unauthorized from "@/unauthorized";

export const metadata = {
  title: "Unauthorized - Steelbuilder",
  description: "You don't have permission to access this page",
};

export default function UnauthorizedPage() {
  return <Unauthorized />;
}
