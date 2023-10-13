import { USERROLES } from "../global/auth"

export type GetUserProfileResponse = {
    "name": string,
    "email": string,
    "phone_num": string,
    "role": USERROLES
}