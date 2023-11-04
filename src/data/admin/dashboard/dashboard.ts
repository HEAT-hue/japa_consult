import { USERROLES } from "@/data/global/auth"

export enum PAYMENT_STATUS {
    COMPLETED = "completed",
    PENDING = "pending",
    CANCELED = "canceled"
}

export type UserType = {
    "user_id": number,
    "name": string,
    "email": string,
    "phone_num": string,
    "role": USERROLES,
    "is_verified": boolean,
    "profile_pic": null | string,
    "date_joined": Date,
    "last_login": Date
}