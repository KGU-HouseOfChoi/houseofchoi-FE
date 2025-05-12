"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Toast from "@/components/common/Toast";
import { useLogout } from "@/hooks/auth/useLogout";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useAuthStore((state) => state.accessToken);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { logout } = useLogout();

  useEffect(() => {
    const storedToken = token ?? localStorage.getItem("accessToken");
    if (!storedToken) {
      router.replace("/guest");
    }
  }, [token, router]);

  useEffect(() => {
    setToastMessage(null);
  }, []);

  const confirmLogout = () => {
    logout("/guest").then(({ success }) => {
      setShowLogoutConfirm(false);
      if (success) {
        setToastMessage("로그아웃 되었습니다.");
      } else {
        setToastMessage("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    });
  };

  return (
    <>
      {children}

      {showLogoutConfirm && (
        <Toast
          message="로그아웃하시겠습니까?"
          actions={[
            { label: "취소", onClick: () => setShowLogoutConfirm(false) },
            { label: "로그아웃", onClick: confirmLogout },
          ]}
          onClose={() => setShowLogoutConfirm(false)}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </>
  );
}
