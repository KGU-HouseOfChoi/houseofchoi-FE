"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BottomPopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomPopup({
  isOpen,
  onClose,
  children,
}: BottomPopupProps) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTarget(document.body);
  }, []);

  if (!isOpen || !target) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex justify-center items-end bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-t-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    target,
  );
}
