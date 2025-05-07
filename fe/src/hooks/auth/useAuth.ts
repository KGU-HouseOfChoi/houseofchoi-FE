import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export function useAuth() {
  const {
    isLoggedIn,
    userId,
    name,
    phoneNumber,
    birthday,
    setIsLoggedIn,
    reset,
  } = useAuthStore();

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return {
    hydrated,
    isLoggedIn,
    isGuest: hydrated ? !isLoggedIn : true,
    userId,
    name,
    phoneNumber,
    birthday,
    login: () => setIsLoggedIn(true),
    logout: reset,
  };
}
