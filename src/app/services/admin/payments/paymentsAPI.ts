// jshint esversion:6
import { emptySplitApi } from "../../api";
import {
    GetAllPaymentsResponse, GetPendingPaymentsResponse,
    GetCancelledPaymentsResponse, GetPaidPaymentsResponse
} from "@/data/admin/payments";

export const paymentsAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get USER FILE
        getAllPayments: builder.query<GetAllPaymentsResponse, void>({
            query: () => ({
                url: "payments/all"
            }),
            // providesTags: ['INVOICE']
        }),

        // Get USER FILE
        getPendingPayments: builder.query<GetPendingPaymentsResponse, void>({
            query: () => ({
                url: "payments/pending"
            }),
            // providesTags: ['INVOICE']
        }),

        // Get USER FILE
        getCancelledPayments: builder.query<GetCancelledPaymentsResponse, void>({
            query: () => ({
                url: "payments/cancelledPayments"
            }),
            // providesTags: ['INVOICE']
        }),

        // Get USER FILE
        getPaidPayments: builder.query<GetPaidPaymentsResponse, void>({
            query: () => ({
                url: "payments/paid"
            }),
            // providesTags: ['INVOICE']
        }),
    })
})

export const {
    useGetAllPaymentsQuery, useLazyGetAllPaymentsQuery,
    useGetPendingPaymentsQuery, useLazyGetPendingPaymentsQuery,
    useGetCancelledPaymentsQuery, useLazyGetCancelledPaymentsQuery,
    useGetPaidPaymentsQuery, useLazyGetPaidPaymentsQuery
} = paymentsAPI