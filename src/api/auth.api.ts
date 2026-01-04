import api from "./axios";

import { type LoginPayload, type LoginResponse } from '../types/auth.types';

export const loginapi = async(
    payload:LoginPayload
):Promise<LoginResponse>=>{
    const response = await api.post<LoginResponse>(
        "/auth/login",
        payload
    )
    return response.data;
}