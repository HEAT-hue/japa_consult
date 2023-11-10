// jshint esversion:6
import { emptySplitApi } from "../../api";
import { BankTransferPaymentRequest, BankTransferPaymentResponse, VerifyBankPaymentRequest, VerifyBankPaymentResponse } from "@/data/users/payments";

export const paymentsAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({

        // Get user profile
        bankTransferPay: builder.mutation<BankTransferPaymentResponse, BankTransferPaymentRequest>({
            query: (params) => ({
                url: `bankTransfer/pay`,
                method: 'POST',
                params
            }),
            // invalidatesTags: ['GET_FILES']

        }),

        verifyTransfer: builder.query<VerifyBankPaymentResponse, VerifyBankPaymentRequest>({
            query: (params) => ({
                url: `bankTransfer/verifyTransfer`,
                params,
            }),
        }),


    })
})

export const { useBankTransferPayMutation, useVerifyTransferQuery, useLazyVerifyTransferQuery } = paymentsAPI