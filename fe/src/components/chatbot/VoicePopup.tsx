import { useEffect } from "react";
import { useVoiceRecorder } from "@/hooks/chatbot/useVoiceRecorder";
import { useChatbot } from "@/hooks/chatbot/useChatbot"

export default function VoicePopup({ onClose }: { onClose: () => void }) {
  const { startRecording, stopRecording } = useVoiceRecorder();
  const { handleSend } = useChatbot();

  useEffect(() => {
    startRecording((blob, transcript) => {
      onClose();
      if (transcript.trim()) handleSend(transcript);
    });
  }, []);

  const handleStopClick = () => {
    stopRecording();
    onClose();
  };

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg px-6 py-4 text-center w-[300px]">
      <p className="text-base mb-3">말씀해주세요 🎙️</p>
      <button
        onClick={handleStopClick}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
      >
        녹음 중지
      </button>
    </div>
  );
}