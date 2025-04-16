import { useEffect } from "react";
import { createPortal } from "react-dom";

interface BottomPopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomPopup({ isOpen, onClose, children }: BottomPopupProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onClick={onClose}
    >
      <div
  className="w-full max-w-[375px] h-[330px] rounded-t-[20px] bg-white animate-slide-up"
  onClick={(e) => e.stopPropagation()}
>
  {children}
</div>

    </div>,
    document.body
  );
}
