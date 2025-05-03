"use client";

import BottomPopup from "../../common/popup/BottomPopup";
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
      <div className="relative pt-6 pb-3">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded hover:bg-gray-100"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <h3 className="text-xl font-semibold text-gray-900 text-left px-6 mb-6">
          통신사를 선택해주세요
        </h3>

        <div className="flex flex-col">
          {CARRIERS.map((carrier) => (
            <button
              key={carrier}
              onClick={() => onSelect(carrier)}
              className="w-full text-left py-4 px-6 text-lg text-gray-800 transition
                         hover:bg-gray-100 active:bg-gray-200"
            >
              {carrier}
            </button>
          ))}
        </div>
      </div>
    </BottomPopup>
  );
}
