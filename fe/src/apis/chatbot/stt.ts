import axiosInstance from "@/apis/chatbot/axios";
import { STTResponse } from "@/types/chatbot";

export async function fetchSpeechToText(audioBlob: Blob, userId: string): Promise<STTResponse> {
  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("audio_file", audioBlob, "recording.wav");

  try {
    const res = await axiosInstance.post<STTResponse>("/chat/record", formData);
    return res.data;
  } catch (e) {
    console.error("🛑 STT API 호출 실패:", e);
    throw new Error("음성 인식에 실패했습니다.");
  }
}
