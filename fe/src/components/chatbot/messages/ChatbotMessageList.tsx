"use client";

import { useChatbot } from "@/hooks/chatbot/useChatbot";
import ChatbotGreeting from "@/components/chatbot/layout/ChatbotGreeting";
import ChatbotBottom from "@/components/chatbot/layout/ChatbotBottom";
import MessageGroup from "@/components/chatbot/messages/MessageGroup";
import { useState } from "react";
import { AxiosError } from "axios";

const ChatbotMessageList = () => {
  const {
    groupedMessages,
    handleSend,
    handleButtonClick,
    handleScheduleConfirm,
    bottomRef,
  } = useChatbot();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSendWithErrorHandling = async (text: string) => {
    try {
      await handleSend(text);
      setErrorMessage(null);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        console.error("에러 발생:", error.message);
        setErrorMessage(
          "메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.",
        );
      } else if (error instanceof Error) {
        console.error("에러 발생:", error.message);
        setErrorMessage(error.message);
      } else {
        console.error("알 수 없는 오류 발생");
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleButtonClickWithErrorHandling = async (
    value: string,
    label: string,
  ) => {
    try {
      await handleButtonClick(value, label);
      setErrorMessage(null);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        console.error("에러 발생:", error.message);
        setErrorMessage(
          "추천 프로그램 조회 중 오류가 발생했습니다. 다시 시도해주세요.",
        );
      } else if (error instanceof Error) {
        console.error("에러 발생:", error.message);
        setErrorMessage(error.message);
      } else {
        console.error("알 수 없는 오류 발생");
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        <ChatbotGreeting username="최서희" />

        {/* 에러 메시지 표시 */}
        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-2 mb-2 rounded">
            {errorMessage}
          </div>
        )}

        {groupedMessages.map((group, idx) => (
          <MessageGroup
            key={idx}
            {...group}
            onButtonClick={(value, label) => {
              if (value === "yes" || value === "no") {
                handleScheduleConfirm(value);
              } else {
                handleButtonClickWithErrorHandling(value, label);
              }
            }}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatbotBottom onSend={handleSendWithErrorHandling} />
    </div>
  );
};

export default ChatbotMessageList;
