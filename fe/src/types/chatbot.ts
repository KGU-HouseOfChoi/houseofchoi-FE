export interface ButtonOption {
  label: string;
  value: string;
}

interface BaseMessage {
  id: string;
  sender: string;
  profileUrl?: string;
  timestamp: string;
  isUser?: boolean;
}

export interface TextMessage extends BaseMessage {
  type: "text";
  content: string;
}

export interface ActivityMessage extends BaseMessage {
  type: "activity";
  content: string;
  programId: number;
}

export interface ButtonMessage extends BaseMessage {
  type: "button";
  buttons: ButtonOption[];
  content?: string;
}

export interface ScheduleConfirmMessage extends BaseMessage {
  type: "schedule-confirm";
}

export type Message =
  | TextMessage
  | ActivityMessage
  | ButtonMessage
  | ScheduleConfirmMessage;

export type MessageType = Message["type"];

export interface ChatRecommendRequest {
  sub_category: "실내" | "실외";
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
