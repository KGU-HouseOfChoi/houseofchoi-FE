export type MessageType = "text" | "activity" | "button" | "system" | "schedule-confirm";

export interface ButtonOption {
  label: string;
  value: string;
}

export interface Message {
  id: string;
  sender: string;
  profileUrl: string;
  type: MessageType;
  content: string;
  timestamp: string;
  isUser?: boolean;
  buttons?: ButtonOption[];
}

export interface ChatRecommendRequest {
  type: string; 
}

export interface ChatRecommendResponse {
  name: string;
  date: string;
  price: number;
  place: string;
}