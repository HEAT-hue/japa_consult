// jshint esversion:6
import { emptySplitApi } from "../../api";

import {
    GetPaidInvoiceResponse, GetTotalRevenueResponse,
    GetAllInvoiceResponse, GetPendingInvoiceResponse,
    CreateInvoiceRequest, CreateInvoiceResponse, UpdateInvoiceStatusRequest,
    UpdateInvoiceStatusResponse, AdminDeleteInvoiceRequest, AdminDeleteInvoiceResponse
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

        // Get All invoice
        getAllInvoice: builder.query<GetAllInvoiceResponse, void>({
            query: () => ({ url: "invoice/all" }),
            providesTags: ['INVOICE']
        }),

        // Get Total revenue
        getPendingInvoice: builder.query<GetPendingInvoiceResponse, void>({
            query: () => ({ url: "invoice/pending" }),
            providesTags: ['INVOICE']
        }),

        // Create Invoice
        createInvoice: builder.mutation<CreateInvoiceResponse, CreateInvoiceRequest>({
            query: (credentials) => ({
                url: `invoice/create`,
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ['INVOICE']
        }),

        updateInvoiceStatus: builder.mutation<UpdateInvoiceStatusResponse, UpdateInvoiceStatusRequest>({
            query: (params) => ({
                url: `invoice/manualUpdate`,
                method: "PATCH",
                params,
            }),
            invalidatesTags: ['INVOICE']
        }),

        deleteInvoice: builder.mutation<AdminDeleteInvoiceResponse, AdminDeleteInvoiceRequest>({
            query: (params) => ({
                url: `/invoice/thrashInvoice`,
                method: "DELETE",
                params,
            }),
            invalidatesTags: ['INVOICE']
        }),
    })
})

export const {
    useGetPaidInvoiceQuery, useGetTotalRevenueQuery,
    useGetAllInvoiceQuery, useGetPendingInvoiceQuery,
    useCreateInvoiceMutation, useUpdateInvoiceStatusMutation, useDeleteInvoiceMutation
} = invoiceAPI