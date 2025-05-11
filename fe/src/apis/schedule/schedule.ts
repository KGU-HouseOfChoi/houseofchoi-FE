import axiosInstance from "@/apis/common/axiosMainInstance";
import axios from "axios";

export const registerSchedule = async (programId: number): Promise<boolean> => {
  const res = await axiosInstance.post(
    "/v1/schedule/register",
    {},
    { params: { programId } }
  );
  return res.data?.data;
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
