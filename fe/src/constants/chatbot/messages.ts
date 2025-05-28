export const CHATBOT_MESSAGES = {
  GREETING: "어떤 활동을 찾고 계신가요?",
  FOLLOWUP: "직접 입력하거나 버튼을 눌러 추천받아 보세요!",
  ADD_SCHEDULE: "일정을 추가하시겠습니까?",
  CANCEL: "궁금한 게 있다면 질문해주세요!",
} as const;

export const CONFIRM_KEYWORDS = {
  YES: "네",
  NO: "아니요",
  SCHEDULE_KEYWORDS: ["일정", "등록", "추가","추천", "참여"] as const,
  CALENDAR_KEYWORDS: ["달력", "캘린더"] as const,
  PERSONALITY_KEYWORDS: ["성향"] as const,
} as const;

export function containsKeywords(text: string, keywords: readonly string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}
