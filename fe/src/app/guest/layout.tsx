"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const storedToken = token ?? localStorage.getItem("accessToken");
    if (storedToken) {
      router.replace("/member");
    }
  }, [token, router]);

  return <>{children}</>;
}
