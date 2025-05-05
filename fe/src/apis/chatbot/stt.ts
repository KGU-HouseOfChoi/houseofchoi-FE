import axiosInstance from "@/apis/chatbot/axios";
import { STTResponse } from "@/types/chatbot";

export async function fetchSpeechToText(audioBlob: Blob): Promise<STTResponse> {
  const formData = new FormData();
  formData.append("audio_file", audioBlob, "recording.wav");

  try {
    const res = await axiosInstance.post<STTResponse>("/ai/chat/record", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (e) {
    console.error("🛑 STT API 호출 실패:", e);
    throw new Error("음성 인식에 실패했습니다.");
  }
}