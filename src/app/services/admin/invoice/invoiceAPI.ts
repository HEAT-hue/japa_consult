// jshint esversion:6
import { emptySplitApi } from "../../api";
import {
    GetPaidInvoiceResponse, GetTotalRevenueResponse,
    GetAllInvoiceResponse, GetPendingInvoiceResponse,
    CreateInvoiceRequest, CreateInvoiceResponse
} from "@/data/admin";

export const invoiceAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get USER FILE
        getPaidInvoice: builder.query<GetPaidInvoiceResponse, void>({
            query: () => ({ url: "invoice/paidInvoice" }),
            providesTags: ['INVOICE']
        }),

        // Get Total revenue
        getTotalRevenue: builder.query<GetTotalRevenueResponse, void>({
            query: () => ({ url: "payments/totalRevenue" }),
        }),

        // Get Total revenue
        getAllInvoice: builder.query<GetAllInvoiceResponse, void>({
            query: () => ({ url: "invoice/all" }),
            providesTags: ['INVOICE']
        }),

        // Get Total revenue
        getPendingInvoice: builder.query<GetPendingInvoiceResponse, void>({
            query: () => ({ url: "invoice/pending" }),
            providesTags: ['INVOICE']
        }),

        createInvoice: builder.mutation<CreateInvoiceResponse, CreateInvoiceRequest>({
            query: (credentials) => ({
                url: `invoice/create`,
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ['INVOICE']
        }),
    })
})

export const {
    useGetPaidInvoiceQuery, useGetTotalRevenueQuery,
    useGetAllInvoiceQuery, useGetPendingInvoiceQuery,
    useCreateInvoiceMutation
} = invoiceAPI