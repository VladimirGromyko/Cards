import {AxiosResponse} from "axios";
import {instance} from "./instance";

const model: RecoveryModelType = {
    email: '',
    from: 'test-front-admin <vl-mailbox@mail.ru>',
    message: `<div style="background-color: #dff5e0; padding: 15px; font-size: 14px">
                        Password recovery link for project "Cards for test":
                        <a href='http://172.31.13.204:3000/cards#/change-pass/$token$'>
<!--                        <a href='https://vladimirgromyko.github.io/cards-for-test#/change-pass/$token$'>-->
<!--                        <a href='http://localhost:3000/cards-for-test#/change-pass/$token$'>-->
                        click-on-the-link</a>
                       </div >`
}
export const authAPI = {
    // getAuth() {
    //     return instance.post(`auth/me`)
    // },
    login(payload: LoginType) {
        return instance.post('auth/login', payload)
    },
    logout() {
        return instance.delete('auth/me')
    },
    me() {
        return instance.post<{}, AxiosResponse<UserDataType>>(`/auth/me`, {})
    },
    // updateUser(name: string) {
    //     return instance.put<{ name: string }, AxiosResponse<ResponseType>>('auth/me', {name});
    // },
    recoverPass(email: string) {
        return instance.post <RecoveryModelType, AxiosResponse<RecoverPassResponseType>>
        (`/auth/forgot`, {...model, email: email})
    },
    setNewPass(payload: RecoverPassRequestType) {
        return instance.post <RecoverPassRequestType, AxiosResponse<RecoverPassResponseType>>
        (`/auth/set-new-password`, payload)
    },
    registrationUser(payload: RegistrationType) {
        return instance.post(`auth/register`, payload);
    },
}
export type LoginType = {
    email: string,
    password: string,
    rememberMe: boolean
}
export type RegistrationType = {
    email: string,
    password: string
}
export type RecoverPassRequestType = {
    password: string,
    resetPasswordToken: string | undefined
}

export type RecoverPassResponseType = {
    info: string
    error: string
}
export type RecoveryModelType = {
    email: string,
    from: string,
    message: string
}
export type UserDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

