// jshint esversion:6
import { emptySplitApi } from "../../api";
import { GetAllFilesUploadedResponse, GetUserFilesRequest, GetUserFilesResponse } from "@/data/admin/files";

export const fileAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllFilesUploaded: builder.query<GetAllFilesUploadedResponse, void>({
            query: () => ({
                url: `documents/allFiles`,
            }),
            providesTags: ['GET_ALL_FILES']
        }),

        // Get USER FILE
        getUserFile: builder.query<GetUserFilesResponse, GetUserFilesRequest>({
            query: (params) => ({
                url: `documents/userfiles`,
                params,
            }),
            providesTags: ['GET_USER_FILES']
        }),

        // Get Recent File Uploads
        // getUserRecentFileUploads: builder.query<GetRecentFilesUploadedResponse, GetRecentFilesUploadedRequest>({
        //     query: (params) => ({
        //         url: `documents/recentFiles`,
        //         params,
        //     }),
        //     providesTags: ['GET_FILES']
        // }),
    })
})

export const { useGetAllFilesUploadedQuery, useGetUserFileQuery, useLazyGetUserFileQuery } = fileAPI