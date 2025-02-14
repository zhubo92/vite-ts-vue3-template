import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {ElMessage} from "element-plus";
import {getMessageInfo} from "@/http/status";

// BaseResponse 为 res.data 的类型
// T 为 res.data.data 的类型 不同的接口会返回不同的 data 所以我们加一个泛型表示
// 和后端商量而定
interface BaseResponse<T = any> {
    code: number | string;
    message: string;
    data: T
}

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASEURL,
    timeout: 15000,
});

// 拦截请求
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    return config;
}, (error: AxiosError) => {
    return Promise.reject(error);
});

// 拦截响应
service.interceptors.response.use((response: AxiosResponse) => {
    if (response.status === 200) return response.data;
    ElMessage({
        message: getMessageInfo(response.status),
        type: "error"
    });
}, (error: any) => {
    const {response} = error;
    if (response) {
        ElMessage({
            message: getMessageInfo(response.status),
            type: "error"
        });
        return Promise.reject(response.data);
    }
    ElMessage({
        message: "网络连接异常，请稍后重试！",
        type: "error"
    });
    return Promise.reject(error);
});

// 此处相当于二次响应拦截
// 为响应数据进行定制化处理
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
    const conf = config;
    return new Promise((resolve, reject) => {
        service
            .request<any, AxiosResponse<BaseResponse>>(conf)
            .then((res: AxiosResponse<BaseResponse>) => {
                const {code, message, data} = res.data;
                // 如果 data.code 为错误代码返回 message 信息
                if (code != 1) {
                    ElMessage({
                        message: message,
                        type: "error",
                    });
                    reject(message);
                } else {
                    ElMessage({
                        message: message,
                        type: "success",
                    });
                    // 此处返回 data 信息 也就是 api 中配置好的 Response类型
                    resolve(data as T);
                }
            });
    });
};

// 在最后使用封装过的axios导出不同的请求方式
export function get<T = any, U = any>(
    config: AxiosRequestConfig,
    url: string,
    params?: U
): Promise<T> {
    return requestInstance({ ...config, url, method: 'GET', params });
}

export function post<T = any, U = any>(
    config: AxiosRequestConfig,
    url: string,
    data: U
): Promise<T> {
    return requestInstance({ ...config, url, method: 'POST', data });
}

export function put<T = any, U = any>(
    config: AxiosRequestConfig,
    url: string,
    params?: U
): Promise<T> {
    return requestInstance({ ...config, url, method: 'PUT', params });
}

export function del<T = any, U = any>(
    config: AxiosRequestConfig,
    url: string,
    data: U
): Promise<T> {
    return requestInstance({ ...config, url, method: 'DELETE', data });
}

export default service;
