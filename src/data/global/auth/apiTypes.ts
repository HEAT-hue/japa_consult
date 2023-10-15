import { USERROLES } from "."
import { USERSTATUS } from "./auth"

export type AuthLoginRequest = {
    username: string
    password: string
}

export type AuthLoginResponse = {
    "detail"?: "Invalid credentials"
    "access_token"?: "string",
    "token_type"?: "string"
}

export type AuthUserRegisterRequest = {
    "name": string,
    "email": string,
    "password": string,
    "phone_num": string,
    "role": USERROLES
}

export type AuthUserRegisterResponse = {
    "detail"?: string,
    "details"?: string,
    "status": USERSTATUS,
    "token": "string"
}

export type AuthSendEmailToken = {
    "mail": string
}

export type AuthVerifyEmailTokenRequest = {
    token: string
}

export type AuthVerifyEmailTokenResponse = {
    detail?: string,
    msg?: string
}

export type AuthLogoutResponse = {
    "msg": string
}