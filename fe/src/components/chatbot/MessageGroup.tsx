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
      {/* 프로필 + 이름은 유저가 아닐 때만 보여줌 */}
      {!isUser && (
        <div className="flex items-center gap-2 mb-1">
          <Image src={profileUrl} alt={sender} width={36} height={36} className="rounded-full" />
          <span className="text-sm font-bold">{sender}</span>
        </div>
      )}

      {/* 말풍선들 */}
      <div className={`flex flex-col gap-1 ml-${isUser ? '0' : '[44px]'}`}>
        {items.map((msg) => (
          <ChatBubble
            key={msg.id}
            text={msg.content}
            type={msg.isUser ? 'user' : 'bot'}
          />
        ))}
        {/* 그룹 마지막에 시간 표시 */}
        <span className="text-xs text-gray-400 self-end mt-1">{formatTime(timestamp)}</span>
      </div>
    </div>
  );
};

export default MessageGroup;
