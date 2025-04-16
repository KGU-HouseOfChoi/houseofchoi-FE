import BottomPopup from "@/components/common/popup/BottomPopup";
import { LogIn, X } from "lucide-react"; 

interface LoginGuidePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinClick: () => void;
}

export default function LoginGuidePopup({
  isOpen,
  onClose,
  onJoinClick,
}: LoginGuidePopupProps) {
  return (
    <BottomPopup isOpen={isOpen} onClose={onClose}>
      <div className="relative flex flex-col items-center text-center w-full h-[330px] px-6 pt-5 pb-4 justify-center gap-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <LogIn className="w-10 h-10 text-brand-normal" />

        <h2 className="text-2xl font-semibold font-pretendard">
          로그인하고 더 편하게
        </h2>

        <p className="text-xl text-grayscale-50 font-pretendard leading-relaxed">
          관심 있는 활동을 저장하고<br />
          가족과 함께 일정을 확인할 수 있어요.
        </p>

        <button
          onClick={onJoinClick}
          className="w-full h-[58px] rounded-[16px] bg-brand-normal text-white text-2xl font-semibold font-pretendard"
        >
          전화번호로 시작하기
        </button>

        <button
          onClick={onClose}
          className="text-grayscale-40 text-lg font-pretendard underline h-[44px] px-2"
        >
          나중에 할게요
        </button>
      </div>
    </BottomPopup>
  );
}
