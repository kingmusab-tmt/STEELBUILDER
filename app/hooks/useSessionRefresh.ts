import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface UseSessionRefreshOptions {
  interval?: number; // Refresh interval in milliseconds
  onRoleChange?: (newRole: string) => void;
}

export function useSessionRefresh(options?: UseSessionRefreshOptions) {
  const { data: session, update } = useSession();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRole, setLastRole] = useState<string | undefined>(
    (session?.user?.role as string) || undefined
  );

  const refreshSession = async () => {
    if (isRefreshing) return;

    try {
      setIsRefreshing(true);
      const response = await fetch("/api/auth/refresh-session", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to refresh session");
      }

      const data = await response.json();

      // Check if role changed
      if (data.user.role !== lastRole) {
        setLastRole(data.user.role);
        options?.onRoleChange?.(data.user.role);
      }

      // Update the session in NextAuth
      await update({
        ...session,
        user: {
          ...session?.user,
          ...data.user,
        },
      });

      return data.user;
    } catch (error) {
      throw error;
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    setLastRole((session?.user?.role as string) || undefined);
  }, [session?.user?.role]);

  useEffect(() => {
    if (!options?.interval) return;

    const interval = setInterval(refreshSession, options.interval);
    return () => clearInterval(interval);
  }, [options?.interval, isRefreshing]);

  return { refreshSession, isRefreshing, session };
}
