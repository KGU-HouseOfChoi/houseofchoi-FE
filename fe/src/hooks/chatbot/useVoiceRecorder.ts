import { useCallback, useRef } from "react";
// @ts-ignore
import Recorder from "recorder-js";
import { fetchSpeechToText } from "@/apis/chatbot/stt"; 

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

          const transcript = await fetchSpeechToText(blob);
          console.log("📝 자동 STT 결과:", transcript);
          onComplete(blob, transcript);
        }, 4000);
      } catch (err) {
        console.error("❌ 마이크 접근 실패:", err);
      }
    },
    []
  );

  const stopRecording = useCallback(async () => {
    if (recorderRef.current && streamRef.current) {
      const { blob } = await recorderRef.current.stop();
      streamRef.current.getTracks().forEach((track) => track.stop());

      logBlobInfo(blob, "수동");

      const url = URL.createObjectURL(blob);
      console.log("🔗 수동 녹음 파일 URL:", url);

      const audio = new Audio(url);
      audio.play();

      const transcript = await fetchSpeechToText(blob);
      console.log("📝 수동 STT 결과:", transcript);
    }
  }, []);

  return { startRecording, stopRecording };
}
