import Image from "next/image";
import ChatBubble from "@/components/chatbot/messages/ChatBubble";
import ButtonGroup from "@/components/chatbot/ButtonGroup";
import ScheduleConfirm from "@/components/chatbot/ScheduleConfirm";
import { formatTime } from "@/lib/chatbot/formatTime";
import type { FC } from "react";
import type { Message } from "@/types/chatbot";

interface MessageGroupProps {
  sender: string;
  profileUrl: string;
  isUser?: boolean;
  items: Message[];
  onButtonClick?: (value: string, label: string) => void;
}

const hm = (iso: string) => formatTime(iso); // "오후 6:37"

const MessageGroup: FC<MessageGroupProps> = ({
  sender,
  profileUrl,
  isUser,
  items,
  onButtonClick,
}) => {
  /* ───── 아바타 표시 여부 ───── */
  const showAvatar =
    !isUser &&
    !["button", "schedule-confirm", "activity"].includes(items[0].type) &&
    !!(items[0].profileUrl || profileUrl);

  return (
    <div className="flex flex-col gap-1">
      {showAvatar && (
        <div className="flex items-center gap-2 mb-1">
          <Image
            src={items[0].profileUrl || profileUrl}
            alt={sender}
            width={36}
            height={36}
            className="rounded-full align-top max-w-[60px] max-h-[60px]"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </div>
      )}

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        {items.map((msg, idx) => {
          const isFirst = idx === 0;
          const isLast  = idx === items.length - 1;
          const prevMsg = items[idx - 1];
          const nextMsg = items[idx + 1];

          /* ───── 카톡식 시각 표시 (텍스트/confirm 전용) ───── */
          const nextSameOwner = nextMsg && msg.isUser === nextMsg.isUser;
          const nextSameHM    = nextMsg && hm(msg.timestamp) === hm(nextMsg.timestamp);

          const shouldShowTime =
            msg.type !== "button" && // 버튼엔 절대 표시 안 함
            (
              !nextMsg ||                       // 그룹 마지막
              !nextSameOwner ||                // 발신자 달라짐
              !nextSameHM ||                   // 시:분 달라짐
              nextMsg.type === "button"        // 다음이 버튼이면 지금이 마지막 텍스트
            );

          /* ───── 위쪽 마진 ───── */
          const shouldAddTopMargin =
            !isFirst &&
            (msg.isUser !== prevMsg?.isUser ||
              ["button", "schedule-confirm"].includes(prevMsg?.type ?? ""));

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.isUser ? "items-end" : "items-start"} ${
                shouldAddTopMargin ? "mt-8" : "mt-4"
              }`}
            >
              {/* ───────── schedule-confirm 카드 ───────── */}
              {msg.type === "schedule-confirm" ? (
                <div
                  className={`flex items-end gap-2 ${
                    msg.isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <ScheduleConfirm
                    onConfirm={() => onButtonClick?.("yes", "예")}
                    onCancel={() => onButtonClick?.("no", "아니요")}
                  />
                  {shouldShowTime && (
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      {formatTime(msg.timestamp)}
                    </span>
                  )}
                </div>
              ) : /* ───────── 버튼 그룹 (시간 숨김) ───────── */
              msg.type === "button" && msg.buttons ? (
                <ButtonGroup
                  buttons={msg.buttons}
                  onClick={(value, label) => onButtonClick?.(value, label)}
                />
              ) : (
                /* ───────── 일반 텍스트 ───────── */
                <div
                  className={`flex items-end gap-2 ${
                    msg.isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <ChatBubble
                    text={msg.content}
                    type={msg.isUser ? "user" : "bot"}
                  />
                  {shouldShowTime && (
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      {formatTime(msg.timestamp)}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageGroup;
