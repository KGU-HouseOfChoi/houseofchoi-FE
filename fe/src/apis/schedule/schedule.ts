import axiosInstance from "@/apis/common/axiosMainInstance";
import axios from "axios";

export const registerSchedule = async (programId: number): Promise<boolean> => {
  const res = await axiosInstance.post(
    "/v1/schedule/register",
    {},
    { params: { programId } }
  );
  return Boolean(res.data?.data);
};

export const checkScheduleExists = async (
  programId: number
): Promise<boolean> => {
  try {
    const res = await axiosInstance.get("/v1/schedule/exists", {
      params: { programId },
    });
    return Boolean(res.data?.exists);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 409) return true;
      if (e.response?.status === 404) return false;
    }
    throw e;
  }
};

export const getScheduleByDay = async (day: string) => {
  try {
    const res = await axiosInstance.get(
      `/v1/schedule/my-schedule-day/${encodeURIComponent(day.trim())}`
    );
    return res.data?.data ?? [];
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) return [];
    throw e;
  }
};

export const deleteSchedule = async (scheduleId: number): Promise<void> => {
  await axiosInstance.delete(`/v1/schedule/${scheduleId}`);
};
