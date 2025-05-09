import Image from "next/image";
import ChatBubble from "./messages/ChatBubble";
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

      {/* 말풍선 그룹 */}
      <div
        className={`flex flex-col ${isUser ? "items-end" : "items-start"} gap-2`}
      >
        {items.map((msg, idx) => {
          const isDifferentNext =
            idx !== items.length - 1 && items[idx + 1].isUser !== msg.isUser;

          const nextDisplayable = items
            .slice(idx + 1)
            .find((m) => m.type !== "button");

          const currTime = getTimeHM(msg.timestamp);
          const nextTime = nextDisplayable
            ? getTimeHM(nextDisplayable.timestamp)
            : null;

          const shouldShowTime = currTime !== nextTime;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.isUser ? "items-end" : "items-start"
              } ${isDifferentNext ? "mb-8" : ""}`}
            >
              {msg.type === "schedule-confirm" ? (
                <div className="flex flex-col items-end relative w-fit">
                  <ScheduleConfirm
                    onConfirm={() => onButtonClick?.("yes", "예")}
                    onCancel={() => onButtonClick?.("no", "아니요")}
                  />
                  {shouldShowTime && (
                    <span className="absolute right-1 -bottom-5 text-xs text-gray-400">
                      {formatTime(msg.timestamp)}
                    </span>
                  )}
                </div>
              ) : msg.type === "button" && msg.buttons ? (
                <div className="mt-[8px] mb-4">
                  <ButtonGroup
                    buttons={msg.buttons}
                    onClick={(value, label) => {
                      onButtonClick?.(value, label);
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-end relative w-fit">
                  <ChatBubble
                    text={msg.content}
                    type={msg.isUser ? "user" : "bot"}
                  />
                  {shouldShowTime && (
                    <span className="absolute right-1 -bottom-5 text-sm text-gray-400">
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
