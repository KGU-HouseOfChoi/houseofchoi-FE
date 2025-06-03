"use client";

import { useRouter } from "next/navigation";
import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/button/PopupButtons";
import { Calendar, X } from "lucide-react";
import axiosMainInstance from "@/apis/common/axiosMainInstance";

interface FamilyDeleteConfirmPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FamilyDeleteConfirmPopup({
  isOpen,
  onClose,
}: FamilyDeleteConfirmPopupProps) {
  const router = useRouter();

  const handleDeleteAndRedirect = async () => {
    try {
      await axiosMainInstance.delete("/v1/user/relation/delete");
      onClose();
      router.replace("/member/family");
    } catch (error) {
      console.error("❌ 가족 삭제 실패:", error);
    }
  };

  return (
    <BottomPopup isOpen={isOpen} onClose={onClose}>
      <div className="relative flex flex-col items-center text-center w-full max-w-[327px] min-h-[330px] px-6 pt-5 pb-4 mx-auto justify-center gap-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded hover:bg-bgColor-surface"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-iconColor-sub" />
        </button>

        <Calendar className="w-10 h-10 text-brand-normal" />

        <h2 className="text-2xl font-semibold text-textColor-heading">
          가족 정보를 수정할까요?
        </h2>

        <p className="text-base text-textColor-sub leading-relaxed whitespace-pre-line">
          수정하면 기존 가족 정보는 삭제되고{"\n"}새로운 가족을 연동할 수 있어요.
        </p>

        <PopupButtons
          onConfirm={handleDeleteAndRedirect}
          onCancel={onClose}
          confirmLabel="가족 수정하기"
          cancelLabel="취소"
        />
      </div>
    </BottomPopup>
  );
}
