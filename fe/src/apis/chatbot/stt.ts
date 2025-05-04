import axiosInstance from "@/apis/chatbot/axios"; 

export async function fetchSpeechToText(audioBlob: Blob): Promise<string> {
    const formData = new FormData();
    formData.append("audio_file", audioBlob, "recording.wav"); 
  
    try {
      const response = await axiosInstance.post("/test/stt", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data; 
    } catch (error: any) {
      console.error("🛑 STT API 호출 실패:", error);
      throw new Error("음성 인식에 실패했습니다.");
    }
  }
