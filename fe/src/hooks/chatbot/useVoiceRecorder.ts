import { useCallback, useRef } from "react";
// @ts-expect-error: Recorder는 타입 정의가 없는 라이브러리입니다.
import Recorder from "recorder-js";
import { fetchSpeechToText } from "@/apis/chatbot/stt";
import { STTResponse } from "@/types/chatbot";

export function useVoiceRecorder() {
  const recorderRef = useRef<Recorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isRecordingRef = useRef<boolean>(false);
  const isCancelledRef = useRef<boolean>(false);

  const stopAndProcess = async (
    onComplete: (blob: Blob, transcript: string) => void,
    isCancelled: boolean = false,
  ) => {
    if (!isRecordingRef.current) return;
    isRecordingRef.current = false;

    try {
      const recorder = recorderRef.current;
      const stream = streamRef.current;

      if (!recorder || !stream) return;

      const { blob } = await recorder.stop();
      stream.getTracks().forEach((track) => track.stop());

      console.log("녹음된 파일:", blob);

      if (isCancelled) {
        console.log("STT API 호출이 취소되었습니다.");
        onComplete(new Blob(), "");
        return;
      }

      const transcript: STTResponse = await fetchSpeechToText(blob);
      console.log("STT 응답 결과:", transcript);

      const text = transcript?.user_message ?? "";
      console.log("텍스트 추출 결과:", text);

      onComplete(blob, typeof text === "string" ? text : "");
      console.log("onComplete 호출 완료");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("녹음 처리 실패:", err.message);
      } else {
        console.error("녹음 처리 실패: 알 수 없는 오류 발생");
      }
      onComplete(new Blob(), "");
    }
  };

  const startRecording = useCallback(
    async (onComplete: (blob: Blob, transcript: string) => void) => {
      try {
        isCancelledRef.current = false;
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const audioContext = new (window.AudioContext ||
          (
            window as Window &
              typeof globalThis & { webkitAudioContext: typeof AudioContext }
          ).webkitAudioContext)();

        const recorder = new Recorder(audioContext);
        await recorder.init(stream);

        recorderRef.current = recorder;
        streamRef.current = stream;
        isRecordingRef.current = true;

        recorder.start();
        console.log("녹음 시작");

        setTimeout(() => {
          stopAndProcess(onComplete, isCancelledRef.current);
        }, 6000);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("마이크 접근 실패:", err.message);
        } else {
          console.error("마이크 접근 실패: 알 수 없는 오류 발생");
        }
      }
    },
    [],
  );

  const stopRecording = useCallback(
    (
      onComplete: (blob: Blob, transcript: string) => void,
      isCancelled: boolean = false,
    ) => {
      if (!isRecordingRef.current) return;
      isCancelledRef.current = isCancelled;
      stopAndProcess(onComplete, isCancelled);
    },
    [],
  );

  return {
    startRecording,
    stopRecording,
  };
}
