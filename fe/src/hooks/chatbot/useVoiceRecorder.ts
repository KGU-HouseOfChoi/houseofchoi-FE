import { useCallback, useRef } from "react";

export function useVoiceRecorder() {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = useCallback(
    async (onComplete: (blob: Blob, transcript: string) => void) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        recorderRef.current = recorder;

        const chunks: Blob[] = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: "audio/webm" });
          if (audioBlob.size === 0) {
            console.warn("❌ 녹음된 파일이 비어 있습니다.");
            return;
          }

          console.log("✅ 녹음 완료:", audioBlob);

          const formData = new FormData();
          formData.append("audio", audioBlob);

          const res = await fetch("/api/stt", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();
          console.log("📝 STT 결과:", data.text);
          onComplete(audioBlob, data.text);
        };

        recorder.start();
        console.log("🎙️ 녹음 시작");
        timeoutRef.current = setTimeout(() => {
          recorder.stop();
          console.log("🛑 자동 종료 (10초)");
        }, 10000);
      } catch (err) {
        console.error("❌ 마이크 접근 실패:", err);
      }
    },
    []
  );

  const stopRecording = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state === "recording") {
      recorderRef.current.stop();
      console.log("🛑 수동 종료");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, []);

  return { startRecording, stopRecording };
}
