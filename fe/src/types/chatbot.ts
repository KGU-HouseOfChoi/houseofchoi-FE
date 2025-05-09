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
  category: "indoor" | "outdoor";
}

export interface Tag {
  name: string;
}

export interface Center {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  tel: string;
}

export interface ChatRecommendResponse {
  id: number;
  name: string;
  fir_day: string;
  sec_day: string;
  thr_day: string;
  fou_day: string;
  fiv_day: string;
  start_time: string;
  end_time: string;
  price: number;
  main_category: string;
  sub_category: string;
  headcount: string;
  tags: Tag[];
  image_url: string;
  center: Center;
}

export interface STTResponse {
  user_message: string;
  chatbot_response: string;
}
