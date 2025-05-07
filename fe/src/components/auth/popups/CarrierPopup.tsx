"use client";

import BottomPopup from "../../common/popups/BottomPopup";
import { X } from "lucide-react";

interface CarrierPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (carrier: string) => void;
}

const CARRIERS = ["SKT", "KT", "LGU+", "알뜰폰"];

export default function CarrierPopup({
  isOpen,
  onClose,
  onSelect,
}: CarrierPopupProps) {
  return (
    <BottomPopup isOpen={isOpen} onClose={onClose}>
      <div className="relative w-full max-w-[327px] mx-auto pt-6 pb-3">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded hover:bg-bgColor-surface"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-iconColor-sub" />
        </button>

        <h3 className="text-xl font-semibold text-textColor-heading text-left px-6 mb-6">
          통신사를 선택해주세요
        </h3>

        <div className="flex flex-col">
          {CARRIERS.map((carrier) => (
            <button
              key={carrier}
              onClick={() => onSelect(carrier)}
              className="w-full text-left py-4 px-6 text-lg text-textColor-body transition-colors
                         hover:bg-bgColor-light active:bg-bgColor-surface"
            >
              {carrier}
            </button>
          ))}
        </div>
      </div>
    </BottomPopup>
  );
}
