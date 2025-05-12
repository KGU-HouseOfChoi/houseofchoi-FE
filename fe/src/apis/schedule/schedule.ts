import axiosInstance from "@/apis/common/axiosMainInstance";
import axios from "axios";
import {
  RegisterScheduleRes,
  ExistsRes,
  ScheduleResponse,
} from "@/types/schedule";

/* ── 일정 등록 ── */
export const registerSchedule = async (programId: number): Promise<boolean> => {
  const { data } = await axiosInstance.post<RegisterScheduleRes>(
    "/v1/schedule/register",
    {},
    { params: { programId } },
  );
  return data.data;
};

/* ── 중복 여부 확인 ── */
export const checkScheduleExists = async (
  programId: number,
): Promise<boolean> => {
  try {
    const { data } = await axiosInstance.get<ExistsRes>("/v1/schedule/exists", {
      params: { programId },
    });
    return data.exists;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 409) return true;
      if (e.response?.status === 404) return false;
    }
    throw e;
  }
};

/* ── 요일별 일정 조회 ── */
export const getScheduleByDay = async (
  day: string,
): Promise<ScheduleResponse[]> => {
  try {
    const { data } = await axiosInstance.get<{ data: ScheduleResponse[] }>(
      `/v1/schedule/my-schedule-day/${encodeURIComponent(day.trim())}`,
    );
    return data.data ?? [];
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) return [];
    throw e;
  }
};

/* ── 일정 삭제 ── */
export const deleteSchedule = async (scheduleId: number): Promise<void> => {
  await axiosInstance.delete(`/v1/schedule/${scheduleId}`);
};
