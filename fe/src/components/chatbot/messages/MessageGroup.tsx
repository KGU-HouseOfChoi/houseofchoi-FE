import Image from "next/image";
import ChatBubble from "@/components/chatbot/messages/ChatBubble";
import { Message } from "@/types/chatbot";
import ButtonGroup from "@/components/chatbot/ButtonGroup";
import type { FC } from "react";
import { formatTime } from "@/lib/chatbot/formatTime";
import ScheduleConfirm from "@/components/chatbot/ScheduleConfirm";

interface MessageGroupProps {
  sender: string;
  profileUrl: string;
  isUser?: boolean;
  items: Message[];
  onButtonClick?: (value: string, label: string) => void;
}

const getTimeHM = (iso: string) => formatTime(iso);

const MessageGroup: FC<MessageGroupProps> = ({
  sender,
  profileUrl,
  isUser,
  items,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {/* 프로필 (bot일 때만) */}
      {!isUser && items[0].type !== "button" && (
        <div className="flex items-center gap-2 mb-1">
          <Image
            src={profileUrl}
            alt={sender}
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>
      )}

      {/* 메시지 묶음 */}
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        {items.map((msg, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === items.length - 1;
          const prevMsg = items[idx - 1];
          const nextMsg = items[idx + 1];

          const currTime = getTimeHM(msg.timestamp);
          const nextTime = nextMsg ? getTimeHM(nextMsg.timestamp) : null;

          const shouldShowTime =
            idx === 1 ||
            isLast ||
            msg.isUser !== nextMsg?.isUser ||
            currTime !== nextTime;

          const shouldAddTopMargin =
            !isFirst &&
            (
              msg.isUser !== prevMsg?.isUser ||
              prevMsg?.type === "button" ||
              prevMsg?.type === "schedule-confirm"
            );

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.isUser ? "items-end" : "items-start"} ${
                shouldAddTopMargin ? "mt-8" : "mt-4"
              }`}
            >
              {msg.type === "schedule-confirm" ? (
                <div className="flex flex-col items-end relative w-fit">
                  <ScheduleConfirm
                    onConfirm={() => onButtonClick?.("yes", "예")}
                    onCancel={() => onButtonClick?.("no", "아니요")}
                  />
                  {shouldShowTime && (
                    <span className="mt-1 text-sm text-gray-400 self-end">
                      {formatTime(msg.timestamp)}
                    </span>
                  )}
                </div>
              ) : msg.type === "button" && msg.buttons ? (
                <div className="mt-0 mb-2">
                  <ButtonGroup
                    buttons={msg.buttons}
                    onClick={(value, label) => {
                      onButtonClick?.(value, label);
                    }}
                  />
                </div>
              ) : (
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
