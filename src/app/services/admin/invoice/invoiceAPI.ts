// jshint esversion:6
import { emptySplitApi } from "../../api";
import { GetPaidInvoiceResponse } from "@/data/admin";

export const invoiceAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get user profile
        // uploadFile: builder.mutation<UploadUserFileResponse, UploadUserFileRequest>({
        //     query: (credentials) => ({
        //         url: `documents/upload`,
        //         method: 'POST',
        //         params: credentials.params,
        //         body: credentials.body,
        //     }),
        //     invalidatesTags: ['GET_FILES']

        // }),

        // Get USER FILE
        getPaidInvoice: builder.query<GetPaidInvoiceResponse, void>({
            query: () => ({ url: "invoice/paidInvoice" }),
        }),
    })
})

export const { useGetPaidInvoiceQuery } = invoiceAPI