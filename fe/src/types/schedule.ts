export interface ScheduleResponse {
  scheduleId: number;
  programId: number;
  name: string;
}

export interface RegisterScheduleRes {
  data: boolean;
}

export interface ExistsRes {
  exists: boolean;
}

export interface ScheduleItem {
  id: number;
  period: string;
  title: string;
  time: string;
  location: string;
}
