import { useCallback, useRef } from "react";
// @ts-ignore
import Recorder from "recorder-js";
import { fetchSpeechToText } from "@/apis/chatbot/stt";
import { STTResponse } from "@/types/chatbot";

export function useVoiceRecorder() {
  const recorderRef = useRef<Recorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isRecordingRef = useRef<boolean>(false);

  const stopAndProcess = async (
    onComplete: (blob: Blob, transcript: string) => void,
    userId: string
  ) => {
    if (!isRecordingRef.current) return;
    isRecordingRef.current = false;

    try {
      const recorder = recorderRef.current;
      const stream = streamRef.current;

      if (!recorder || !stream) return;

      const { blob } = await recorder.stop();
      stream.getTracks().forEach((track) => track.stop());

      console.log("🎧 녹음된 파일:", blob);

      const transcript: STTResponse = await fetchSpeechToText(blob, userId);
      const text = transcript?.results?.utterances?.[0]?.msg ?? "";

      onComplete(blob, typeof text === "string" ? text : "");
    } catch (err) {
      console.error("❌ 녹음 처리 실패:", err);
      onComplete(new Blob(), "");
    }
  };

  const startRecording = useCallback(
    async (
      onComplete: (blob: Blob, transcript: string) => void,
      userId: string
    ) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const recorder = new Recorder(audioContext);
        await recorder.init(stream);

        recorderRef.current = recorder;
        streamRef.current = stream;
        isRecordingRef.current = true;

        recorder.start();
        console.log("🎙️ 녹음 시작");

        
        setTimeout(() => {
          stopAndProcess(onComplete, userId);
        }, 6000);
      } catch (err) {
        console.error("❌ 마이크 접근 실패:", err);
      }
    },
    []
  );

  const stopRecording = useCallback(
    (
      onComplete: (blob: Blob, transcript: string) => void,
      userId: string
    ) => {
      if (!isRecordingRef.current) return;
      stopAndProcess(onComplete, userId);
    },
    []
  );

  return {
    startRecording,
    stopRecording,
  };
}
