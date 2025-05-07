"use client";

interface PopupButtonsProps {
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

/**
 * Renders a pair of vertically stacked buttons for confirming or canceling an action.
 *
 * @param onConfirm - Callback invoked when the confirm button is clicked.
 * @param onCancel - Callback invoked when the cancel button is clicked.
 * @param confirmLabel - Optional label for the confirm button. Defaults to "확인".
 * @param cancelLabel - Optional label for the cancel button. Defaults to "취소".
 *
 * @returns A React element containing confirm and cancel buttons.
 */
export default function PopupButtons({
  onConfirm,
  onCancel,
  confirmLabel = "확인",
  cancelLabel = "취소",
}: PopupButtonsProps) {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <button
        onClick={onConfirm}
        className="w-full h-[58px] rounded-2xl bg-brand-normal text-white text-2xl font-semibold font-pretendard hover:bg-brand-hover active:bg-brand-active"
      >
        {confirmLabel}
      </button>

      <button
        onClick={onCancel}
        className="h-[44px] px-2 text-lg font-pretendard text-grayscale-40 underline hover:text-grayscale-60"
      >
        {cancelLabel}
      </button>
    </div>
  );
}
