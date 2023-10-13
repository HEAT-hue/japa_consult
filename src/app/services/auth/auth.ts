// jshint esversion:6
import { emptySplitApi } from "../api";
import { AuthLoginResponse, AuthUserRegisterRequest, AuthUserRegisterResponse, AuthSendEmailToken } from "../../../data/global/auth";

export const authAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        // Define your user endpoints here
        login: builder.mutation<AuthLoginResponse, URLSearchParams>({
            query: (credentials) => ({
                url: 'auth/',
                method: 'POST',
                body: credentials,
            }),
        }),

        // Sign UP USER
        signup: builder.mutation<AuthUserRegisterResponse, AuthUserRegisterRequest>({
            query: (credentials) => ({
                url: 'user/register',
                method: 'POST',
                body: credentials,
            }),
        }),

        // Send Email token
        sendEmailToken: builder.mutation<unknown, AuthSendEmailToken>({
            query: (credentials) => ({
                url: 'auth/generate/emailToken',
                method: 'POST',
                body: credentials,
            }),
        }),
    })
})

export const { useLoginMutation, useSignupMutation, useSendEmailTokenMutation } = authAPI