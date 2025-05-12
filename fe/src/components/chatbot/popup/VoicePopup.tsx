"use client";

import { useEffect, useState } from "react";
import { useVoiceRecorder } from "@/hooks/chatbot/useVoiceRecorder";
import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/button/PopupButtons";
import DefaultboldvoiceCricle from "@/asset/icons/voice-cricle.svg";
import { X } from "lucide-react";

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
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isStopping, setIsStopping] = useState<boolean>(false);
  const [animatedText, setAnimatedText] =
    useState<string>("말씀을 이해하는 중이에요");

  useEffect(() => {
    if (isSending) {
      const messages = [
        "말씀을 이해하는 중이에요",
        "말씀을 이해하는 중이에요.",
        "말씀을 이해하는 중이에요..",
        "말씀을 이해하는 중이에요...",
      ];
      let index = 0;

      const dotsInterval = setInterval(() => {
        index = (index + 1) % messages.length;
        setAnimatedText(messages[index]);
      }, 500);

      return () => clearInterval(dotsInterval);
    }
  }, [isSending]);

  const handleStopClick = async () => {
    if (isStopping) return;
    setIsStopping(true);

    if (intervalId) clearInterval(intervalId);

    if (isSending) {
      console.warn("⚠️ 이미 STT 전송 중입니다. 중복 호출을 막습니다.");
      setIsStopping(false);
      return;
    }

    console.log("🛑 녹음 중지 요청");
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
      setIsRecording(false);
      setIsStopping(false);
      onClose();
    }
  };

  const handleStartClick = () => {
    if (isRecording) return;
    console.log("🎙️ 녹음 시작");
    setIsRecording(true);

    startRecording(async (blob, transcript) => {
      if (transcript.trim()) {
        console.log("📝 텍스트 추출 완료:", transcript);
        await handleSendWithLoading(transcript);
      }
    });

    const id = setInterval(() => {
      clearInterval(id);
      handleStopClick();
    }, 8000);

    setIntervalId(id);
  };

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

    setIsRecording(false);
    setIsSending(false);
    setIsStopping(false);
    onClose();
  };

  return (
    <BottomPopup isOpen={isOpen} onClose={onClose}>
      <div className="relative text-center flex flex-col items-center justify-center gap-y-5">
        <button
          onClick={onClose}
          className="absolute top-0 right-3 p-1 rounded hover:bg-bgColor-surface"
          aria-label="닫기"
          type="button"
        >
          <X className="w-6 h-6 text-iconColor-default" />
        </button>

        <p className="text-2xl mt-8 font-semibold">
          {isSending ? animatedText : "궁금한 내용을 말씀해주세요"}
        </p>
        <DefaultboldvoiceCricle />

        <PopupButtons
          onConfirm={isRecording ? handleStopClick : handleStartClick}
          onCancel={handleCancelClick}
          confirmLabel={isRecording ? "녹음 중지" : "녹음 시작"}
          cancelLabel="취소"
        />
      </div>
    </BottomPopup>
  );
}
