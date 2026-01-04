import type { ActivityLog } from "../types/logs.types";
import api from "./axios";

export const getAllActivityLogs = async (): Promise<ActivityLog[]> => {
  const response = await api.get("/activity");
  return response.data;
};
