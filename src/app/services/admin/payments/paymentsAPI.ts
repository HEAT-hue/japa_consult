// jshint esversion:6
import { emptySplitApi } from "../../api";
import { GetAllPaymentsResponse, GetPendingPaymentsResponse } from "@/data/admin/payments";

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

        // Create Invoice
        // createInvoice: builder.mutation<CreateInvoiceResponse, CreateInvoiceRequest>({
        //     query: (credentials) => ({
        //         url: `invoice/create`,
        //         method: "POST",
        //         body: credentials,
        //     }),
        //     invalidatesTags: ['INVOICE']
        // }),
    })
})

export const { useGetAllPaymentsQuery, useLazyGetAllPaymentsQuery,
    useGetPendingPaymentsQuery, useLazyGetPendingPaymentsQuery } = paymentsAPI