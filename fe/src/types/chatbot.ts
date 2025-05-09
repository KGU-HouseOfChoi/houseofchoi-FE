export type MessageType = "text" | "activity" | "button" | "schedule-confirm";

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
  requestType: "activity";
  category: "indoor" | "outdoor";
}

export interface ChatRecommendResponse {
  name: string;
  date: string;
  price: number;
  place: string;
}

export interface STTResponse {
  user_message: string;
  chatbot_response: string;
}
