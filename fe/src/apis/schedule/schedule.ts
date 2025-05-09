import axiosInstance from "@/apis/common/axiosMainInstance";

export const registerSchedule = async (programId: number): Promise<boolean> => {
  const response = await axiosInstance.post(
    "/v1/schedule/register",
    {},
    {
      params: { programId },
    }
  );

  return response.data?.data;
};