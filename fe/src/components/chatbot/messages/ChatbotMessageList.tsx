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

  /* 🔹 State 정의 */
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* 🔹 사용자 이름 가져오기 */
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

  /* 🔹 에러 핸들링 */
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

  /* 🔹 메시지 전송 핸들링 */
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

  /* 🔹 버튼 클릭 핸들링 (타입 체크 추가됨) */
  const handleButtonClickWithErrorHandling = async (
    value: string,
    label: string,
  ) => {
    try {
      // 🔹 indoor 혹은 outdoor만 허용
      if (value === "indoor" || value === "outdoor") {
        await handleButtonClick(value as "indoor" | "outdoor", label);
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
      {/* ─────────── 채팅 본체 ─────────── */}
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          {/* 🔥 로딩 상태 */}
          {loading && (
            <div className="text-center text-gray-500">로딩 중입니다...</div>
          )}

          {/* 🔥 사용자 이름 표시 */}
          {!loading && username && <ChatbotGreeting username={username} />}

          {/* 🔥 에러 메시지 표시 */}
          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-2 mb-2 rounded">
              {errorMessage}
            </div>
          )}

          {/* 🔥 메시지 그룹 렌더링 */}
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
        onConfirm={goToCalendar}
        onCancel={handlePopupCancel}
      />
    </>
  );
};

export default ChatbotMessageList;
