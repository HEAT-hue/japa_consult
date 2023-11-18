// jshint esversion:6
import { emptySplitApi } from "../../api";
import {
    BankTransferPaymentRequest, BankTransferPaymentResponse,
    VerifyBankPaymentRequest, VerifyBankPaymentResponse, GetUserTotalSpendResponse,
    CardPaymentRequest, CardPaymentResponse, VerifyCardPaymentRequest,
    VerifyCardPaymentResponse, GetRaveCheckoutLinkRequest, GetRaveCheckoutResponse,
    VerifyRaveCheckoutPayment
} from "@/data/users/payments";

export const paymentsAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({

        // Get user profile
        userTotalSpend: builder.query<GetUserTotalSpendResponse, void>({
            query: () => ({
                url: `payments/totalSpend`,
            }),
        }),

        // Get user profile
        bankTransferPay: builder.query<BankTransferPaymentResponse, BankTransferPaymentRequest>({
            query: (params) => ({
                url: `bankTransfer/pay`,
                params
            }),
        }),

        verifyTransfer: builder.query<VerifyBankPaymentResponse, VerifyBankPaymentRequest>({
            query: (params) => ({
                url: `bankTransfer/verifyTransfer`,
                params,
            }),
        }),

        cardPayment: builder.mutation<CardPaymentResponse, CardPaymentRequest>({
            query: (credentials) => ({
                url: "card/pay",
                method: "POST",
                params: credentials.params,
                body: credentials.body
            }),
        }),

        verifyCardPayment: builder.mutation<VerifyCardPaymentResponse, VerifyCardPaymentRequest>({
            query: (credentials) => ({
                url: "card/verify",
                method: "POST",
                body: credentials
            }),
        }),

        raveCheckoutPay: builder.query<GetRaveCheckoutResponse, GetRaveCheckoutLinkRequest>({
            query: (params) => ({
                url: `raveCheckout/pay`,
                params
            }),
        }),

        verifyCheckoutPay: builder.query<VerifyRaveCheckoutPayment, void>({
            query: () => ({
                url: `raveCheckout/verifyPayments`,
            }),
        }),


    })
})

export const {
    useLazyBankTransferPayQuery, useVerifyTransferQuery,
    useLazyVerifyTransferQuery, useCardPaymentMutation,
    useVerifyCardPaymentMutation, useUserTotalSpendQuery,
    useRaveCheckoutPayQuery, useLazyVerifyCheckoutPayQuery
} = paymentsAPI