"use client";

import { useEffect, useState } from "react";
import { useVoiceRecorder } from "@/hooks/chatbot/useVoiceRecorder";
import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/button/PopupButtons";
import DefaultboldvoiceCricle from "@/asset/icons/voice-cricle.svg";

interface VoicePopupProps {
  isOpen: boolean;
  onClose: () => void;
  handleSend: (text: string) => void;
}

export default function VoicePopup({
  isOpen,
  onClose,
  handleSend,
}: VoicePopupProps) {
  const { startRecording, stopRecording } = useVoiceRecorder();
  const [remainingTime, setRemainingTime] = useState<number>(6);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    setIsRecording(true);
    console.log("🎙️ 녹음 시작");

    startRecording(async (blob, transcript) => {
      if (transcript.trim()) {
        console.log("📝 텍스트 추출 완료:", transcript);
        await handleSendWithLoading(transcript);
      }
    });

    const id = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          handleStopClick();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(id);

    return () => {
      clearInterval(id);
      setIsRecording(false);
      stopRecording((blob, transcript) => {
        if (transcript.trim()) {
          handleSend(transcript);
        }
      });
    };
  }, [isOpen, handleSend, onClose, startRecording, stopRecording]);

  const handleSendWithLoading = async (transcript: string) => {
    console.log("🚀 STT 전송 시작");
    setIsSending(true);

    await new Promise((resolve) => setTimeout(resolve, 0));

    try {
      await handleSend(transcript);
    } finally {
      setIsSending(false);
      onClose();
    }
  };

  const handleCancelClick = () => {
    console.log("🛑 녹음 취소 버튼 클릭됨");
    if (intervalId) clearInterval(intervalId);

    if (isRecording) {
      stopRecording(() => {
        console.log("🛑 STT 전송이 차단되었습니다.");
      }, true);
    }

    setRemainingTime(6);
    setIsRecording(false);
    setIsSending(false);
    onClose();
  };

  const handleStopClick = async () => {
    if (intervalId) clearInterval(intervalId);

    if (isSending) return;

    await new Promise((resolve) => {
      setIsSending(true);
      setTimeout(resolve, 0);
    });

    try {
      await new Promise<void>((resolve) => {
        stopRecording(async (blob, transcript) => {
          if (transcript.trim()) {
            await handleSend(transcript);
          }
          resolve();
        });
      });
    } catch (err) {
      console.error("STT 전송 중 에러 발생:", err);
    } finally {
      setIsSending(false);
      onClose();
      setRemainingTime(6);
    }
  };

  return (
    <BottomPopup isOpen={isOpen} onClose={onClose}>
      <div className="text-center flex flex-col items-center justify-center gap-y-5">
        <p className="text-2xl mt-8 font-semibold">
          {isSending ? "잠시만 기다려주세요 ..." : "궁금한 내용을 말씀해주세요"}
        </p>
        <DefaultboldvoiceCricle />
        <div className="text-lg font-medium text-gray-600">
          <span>남은 시간: </span>
          <span className="text-primary-500">{remainingTime}초</span>
        </div>
        <PopupButtons
          onConfirm={handleStopClick}
          onCancel={handleCancelClick}
          confirmLabel="녹음 중지"
          cancelLabel="취소"
        />
      </div>
    </BottomPopup>
  );
}
