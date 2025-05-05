import { useCallback, useRef } from "react";
// @ts-ignore
import Recorder from "recorder-js";
import { fetchSpeechToText } from "@/apis/chatbot/stt"; 
import { STTResponse } from "@/types/chatbot";

export function useVoiceRecorder() {
  const recorderRef = useRef<Recorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const logBlobInfo = (blob: Blob, context: string) => {
    console.log(`🎧 [${context}] 녹음된 파일 정보:`);
    console.log("📦 Type:", blob.type);
    console.log("📏 Size:", blob.size, "bytes");
    console.log("🧾 Name: recording.wav");
  };

  const startRecording = useCallback(
    async (onComplete: (blob: Blob, transcript: string) => void) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const recorder = new Recorder(audioContext);
        await recorder.init(stream);

        recorderRef.current = recorder;
        audioContextRef.current = audioContext;
        streamRef.current = stream;

        recorder.start();
        console.log("🎙️ 녹음 시작");

        setTimeout(async () => {
          const { blob } = await recorder.stop();
          stream.getTracks().forEach((track) => track.stop());

          logBlobInfo(blob, "자동");

          const url = URL.createObjectURL(blob);
          console.log("🔗 자동 녹음 파일 URL:", url);

          const transcript: STTResponse = await fetchSpeechToText(blob);
          console.log("📝 자동 STT 결과:", transcript);

          const text = transcript?.results?.utterances?.[0]?.msg;
          if (text && typeof text === "string") {
            onComplete(blob, text); // ✅ 자동으로 채팅 입력
          } else {
            console.warn("⚠️ 추출된 텍스트가 없음");
            onComplete(blob, ""); // 실패하더라도 종료
          }
        }, 6000);
      } catch (err) {
        console.error("❌ 마이크 접근 실패:", err);
      }
    },
    [],
  );

  const stopRecording = useCallback(() => {
    if (recorderRef.current) {
      recorderRef.current.stop();
      console.log("🛑 수동 녹음 중지");
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  }, []);

  return {
    startRecording,
    stopRecording,
  };
}
