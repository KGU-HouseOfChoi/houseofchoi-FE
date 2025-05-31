"use client";

import { useChatbot } from "@/hooks/chatbot/useChatbot";
import ChatbotGreeting from "@/components/chatbot/layout/ChatbotGreeting";
import ChatbotBottom from "@/components/chatbot/layout/ChatbotBottom";
import MessageGroup from "@/components/chatbot/messages/MessageGroup";
import SchedulePopup from "@/components/chatbot/popup/SchedulePopup";
import { getUserName } from "@/apis/main/user";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";

const ChatbotMessageList = () => {
  const {
    groupedMessages,
    handleSend,
    handleButtonClick,
    handleScheduleConfirm,
    bottomRef,
    popupOpen,
    handlePopupCancel,
    goToCalendar,
  } = useChatbot();

  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        setLoading(true);
        const name = await getUserName();
        setUsername(name);
      } catch (error) {
        console.error("이름 불러오기 실패: ", error);
        setErrorMessage("사용자 이름을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  const handleError = (error: unknown, defaultMessage: string) => {
    if (error instanceof AxiosError && error.response) {
      console.error("에러 발생:", error.message);
      setErrorMessage(defaultMessage);
    } else if (error instanceof Error) {
      console.error("에러 발생:", error.message);
      setErrorMessage(error.message);
    } else {
      console.error("알 수 없는 오류 발생");
      setErrorMessage("알 수 없는 오류가 발생했습니다.");
    }
  };

  const handleSendWithErrorHandling = async (text: string) => {
    try {
      await handleSend(text);
      setErrorMessage(null);
    } catch (error: unknown) {
      handleError(
        error,
        "메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.",
      );
    }
  };

  const handleButtonClickWithErrorHandling = async (
    value: string,
    label: string,
  ) => {
    try {
      if (value === "실내" || value === "실외") {
        await handleButtonClick(value as "실내" | "실외", label);
        setErrorMessage(null);
      } else {
        console.error(`유효하지 않은 값: ${value}`);
        setErrorMessage("유효하지 않은 활동 선택입니다.");
      }
    } catch (error: unknown) {
      handleError(
        error,
        "추천 프로그램 조회 중 오류가 발생했습니다. 다시 시도해주세요.",
      );
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 pb-[130px] min-h-0">
          {loading && (
            <div className="text-center text-gray-500">로딩 중입니다...</div>
          )}

          {!loading && username && <ChatbotGreeting username={username} />}

          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-2 mb-2 rounded">
              {errorMessage}
            </div>
          )}

          {groupedMessages.map((group, idx) => (
            <MessageGroup
              key={idx}
              sender={group.sender}
              profileUrl={group.profileUrl}
              isUser={group.isUser}
              items={group.items}
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

      <SchedulePopup
        isOpen={popupOpen}
        onConfirm={() => goToCalendar()}
        onCancel={handlePopupCancel}
      />
    </>
  );
};

export default ChatbotMessageList;
