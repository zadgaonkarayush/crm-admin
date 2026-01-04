import type { SignupRequest, SignupResponse, User } from "../types/user.types";
import api from "./axios";

export const createUser = async(
    payload:SignupRequest
):Promise<SignupResponse>=>{
  const response = await api.post<SignupResponse>(
    "/auth/signup",
    payload
  )
  return response.data
}

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<{ users: User[] }>("/users");
  return response.data.users;
};

export const deleteUser = async (userId:string):Promise<{message:string}>=>{
  const response = await api.delete<{ message: string }>(
    `/users/${userId}`
  );
  return response.data
}
export const deleteBulkUser = async (userIds:string[]):Promise<{message:string, deletedCount: number}>=>{
  const response = await api.delete<{ message: string, deletedCount: number }>(
    `/users`,
    {
      data:{userIds}
    }
  );
  return response.data
}