import {get, post} from "@/http/request";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    username: string;
    roles: string[];
    accessToken: string;
}

export interface ReLoginRequest {
    username: string;
    password: string;
}

// 定义的接口
export const userLogin = async (data?: LoginRequest) => {
    return post<LoginResponse>({}, "/login", data);
}

export const refreshUserInfo = async (params?: ReLoginRequest) => {
    return get<LoginResponse>({}, "/getUserInfo", params);
}
