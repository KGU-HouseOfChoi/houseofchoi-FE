'use client'

import { useState } from "react";
import LoginGuidePopup from "@/components/main/LoginGuidePopup";

export default function SomePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>팝업 열기</button>
      <LoginGuidePopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onJoinClick={() => {
          // 전화번호 인증 페이지 이동 등 처리
          console.log("회원가입으로 이동");
        }}
      />
    </>
  );
}

