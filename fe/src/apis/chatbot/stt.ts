import axiosInstance from "@/apis/common/axiosAiInstance";
import { STTResponse } from "@/types/chatbot";

export async function fetchSpeechToText(audioBlob: Blob, userId: string): Promise<STTResponse> {
  const formData = new FormData();
  formData.append("audio_file", audioBlob, "recording.wav");

  console.log("📤 STT API 요청 전송 중...");
  try {
    const res = await axiosInstance.post<STTResponse>("/chat/record", formData);
    console.log("📥 STT API 응답 수신 완료:", res.data);
    return res.data;
  } catch (e) {
    console.error("🛑 STT API 호출 실패:", e);
    throw new Error("음성 인식에 실패했습니다.");
  }
}
