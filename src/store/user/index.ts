import {defineStore} from "pinia";
import pinia from "@/store";
import {LoginRequest, refreshUserInfoApi, userLoginApi} from "@/api/user";
import {IUserState} from "@/store/user/types";

export const useUserStoreHook = defineStore(
    "user",
    {
        state: ():IUserState => ({
            username: "张三",
            accessToken: "",
            refreshToken: "",
            roles: ["common"],
        }),
        getters: {},
        actions: {
            storeUserLogin(data: LoginRequest) {
                return userLoginApi(data).then((res) => {
                    this.username = res.username;
                    this.roles = res.roles;
                    this.accessToken = res.accessToken;
                    return res;
                })
            },
            storeRefreshUserInfo() {
                return refreshUserInfoApi({
                    accessToken: this.accessToken,
                }).then((res) => {
                    this.username = res.username;
                    this.roles = res.roles;
                    this.accessToken = res.accessToken;
                    return res;
                }).catch(() => {
                    this.accessToken = "";
                })
            }
        },
        persist: [{
            key: 'userInfo',
            storage: sessionStorage,
            pick: ['accessToken'],
        }]
    }
);

export function useUserStore() {
    return useUserStoreHook(pinia);
}
