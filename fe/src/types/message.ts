// types/message.ts
export type MessageType = 'text' | 'activity';

export interface Message {
  id: string;
  sender: string;
  profileUrl: string;
  type: MessageType;
  content: string;
  timestamp: string;
  isUser?: boolean;
}
