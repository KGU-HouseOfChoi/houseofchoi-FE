"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
  actions?: { label: string; onClick: () => void }[];
}

export default function Toast({ message, onClose, actions }: ToastProps) {
  useEffect(() => {
    if (!actions || actions.length === 0) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [onClose, actions]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* ✅ 백드롭 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 pointer-events-auto"
        onClick={(e) => e.stopPropagation()} // 백드롭 클릭 시 이벤트 막음
      />

      {/* ✅ 토스트 박스 */}
      <div className="relative px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium shadow-lg animate-fade-in z-50 max-w-xs w-full text-center">
        <p>{message}</p>

        {actions && actions.length > 0 && (
          <div className="mt-2 flex gap-2 justify-center">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className="px-3 py-1 rounded bg-white text-gray-900 text-xs font-semibold hover:bg-gray-200 active:bg-gray-300"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
