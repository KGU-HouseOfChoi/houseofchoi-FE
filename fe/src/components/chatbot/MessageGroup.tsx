import Image from 'next/image';
import ChatBubble from './ChatBubble';
import { Message } from '@/types/message';
import type { FC } from 'react';
import { formatTime } from '@/lib/formatTime';

interface MessageGroupProps {
  sender: string;
  profileUrl: string;
  timestamp: string;
  isUser?: boolean;
  items: Message[];
}

const MessageGroup: FC<MessageGroupProps> = ({ sender, profileUrl, timestamp, isUser, items }) => {
  return (
    <div className="flex flex-col gap-1">
      {/* 프로필 (bot일 때만) */}
      {!isUser && (
        <div className="flex items-center gap-2 mb-1">
          <Image src={profileUrl} alt={sender} width={36} height={36} className="rounded-full" />
        </div>
      )}

      {/* 말풍선 그룹 */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1`}>
        {items.map((msg, idx) => {
          const isLast = idx === items.length - 1;
          const isDifferentNext =
            !isLast && (items[idx + 1].isUser !== msg.isUser);

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.isUser ? 'items-end' : 'items-start'
              } ${isDifferentNext ? 'mb-8' : ''}`} 
            >
              <ChatBubble
                text={msg.content}
                type={msg.isUser ? 'user' : 'bot'}
              />
              {isLast && (
                <span className="text-xs text-gray-400 mt-1">
                  {formatTime(timestamp)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageGroup;
