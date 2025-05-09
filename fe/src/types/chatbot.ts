/* ───────────────────────────────
 * Chatbot 타입 선언 모음
 * ─────────────────────────────── */

/* ===== 공통 ===== */
export interface ButtonOption {
  label: string;
  value: string;
}

interface BaseMessage {
  id: string;
  sender: string;
  profileUrl?: string;
  timestamp: string;   // ISO 문자열
  isUser?: boolean;
}



/* ===== 메시지 타입들 ===== */
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
  content?: string;      // 버튼 위 설명이 필요할 때만
}

export interface ScheduleConfirmMessage extends BaseMessage {
  type: "schedule-confirm";
  // 카드 자체로 의미를 표현하므로 content 생략
}

/* ===== 통합 유니온 ===== */
export type Message =
  | TextMessage
  | ActivityMessage
  | ButtonMessage
  | ScheduleConfirmMessage;

export type MessageType = Message["type"];

/* ===== 추천 API 연관 타입 ===== */
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

/* ===== STT 응답 타입 ===== */
export interface STTResponse {
  user_message: string;
  chatbot_response: string;
}
