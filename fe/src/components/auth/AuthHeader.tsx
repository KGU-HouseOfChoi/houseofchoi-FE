"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GuestConfirmPopup from "@/components/auth/popup/GuestConfirmPopup";

/**
 * Renders a fixed signup header with a guest access option and confirmation popup.
 *
 * Displays a header bar titled "회원가입" (Sign Up) and a button allowing users to proceed as a guest. When the guest button is clicked, a confirmation popup appears. Confirming guest access closes the popup and navigates the user to the guest page.
 */
export default function AuthHeader() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleGuestConfirm = () => {
    setIsPopupOpen(false);
    router.push("/guest");
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[60px] z-10">
        <div className="max-w-[414px] w-full mx-auto px-6 flex justify-between items-center h-full">
          <h1 className="text-xl font-bold text-textColor-heading">회원가입</h1>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="inline-flex items-center gap-1 text-lg text-textColor-sub hover:text-brand-normal"
          >
            <span>비회원으로 이용하기</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </header>

      <GuestConfirmPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handleGuestConfirm}
      />
    </>
  );
}
