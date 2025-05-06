"use client";

import { useEffect } from "react";
import { useVoiceRecorder } from "@/hooks/chatbot/useVoiceRecorder";
import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/Button/PopupButtons";
import DefaultboldvoiceCricle from "@/asset/icons/voice-cricle.svg";

interface VoicePopupProps {
  isOpen: boolean;
  onClose: () => void;
  handleSend: (text: string) => void; 
}

export default function VoicePopup({ isOpen, onClose, handleSend }: VoicePopupProps) {
  const { startRecording, stopRecording } = useVoiceRecorder();

  useEffect(() => {
    if (!isOpen) return;

    startRecording((blob, transcript) => {
      if (transcript.trim()) {
        handleSend(transcript); 
      }
      onClose();
    });

    return () => {
      stopRecording((blob, transcript) => {
        if (transcript.trim()) {
          handleSend(transcript);
        }
      });
    };
  }, [isOpen, handleSend, onClose, startRecording, stopRecording]);

  const handleStopClick = () => {
    stopRecording((blob, transcript) => {
      if (transcript.trim()) {
        handleSend(transcript);
      }
      onClose();
    });
  };

  return (
    <BottomPopup isOpen={isOpen} onClose={onClose}>
      <div className="text-center flex flex-col items-center justify-center gap-y-5">
        <p className="text-2xl mt-8 font-semibold">궁금한 내용을 말씀해주세요</p>
        <DefaultboldvoiceCricle />
        <PopupButtons
          onConfirm={handleStopClick}
          onCancel={onClose}
          confirmLabel="녹음 중지"
          cancelLabel="취소"
        />
      </div>
    </BottomPopup>
  );
}
