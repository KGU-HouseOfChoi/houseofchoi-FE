/** 서버가 내려주는 ‘내 일정’ 한 건 */
export interface ScheduleResponse {
  scheduleId: number;
  programId: number;
  name: string; // 일정명 (= 프로그램명)
}

/** POST /v1/schedule/register 응답 */
export interface RegisterScheduleRes {
  data: boolean; // true = 등록 성공
}

/** GET /v1/schedule/exists 응답 */
export interface ExistsRes {
  exists: boolean; // true = 이미 존재
}

/** 요일별 일정 카드에 쓰는 가공형 데이터 */
export interface ScheduleItem {
  id: number;
  period: string;
  title: string;
  time: string;
  location: string;
}
