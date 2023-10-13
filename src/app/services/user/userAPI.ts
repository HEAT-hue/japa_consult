// jshint esversion:6
import { emptySplitApi } from "../api";
import { GetUserProfileResponse } from "@/data/users";

export const userAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get user profile
        getUserProfile: builder.query<GetUserProfileResponse, void>({
            query: () => ({ url: "user/profile" }),
        }),
    })
})

export const { useLazyGetUserProfileQuery } = userAPI