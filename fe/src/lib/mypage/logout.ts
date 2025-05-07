"use client";

import { useAuthStore } from "@/store/useAuthStore";

export function logout() {
  const { reset, setIsLoggedIn } = useAuthStore.getState();

  reset();
  setIsLoggedIn(false);
  localStorage.removeItem("userCode");
}
