// jshint esversion:6
import { emptySplitApi } from "../../api";
import { UploadUserFileRequest, UploadUserFileResponse, GetFilesRequest, GetFilesResponse } from "@/data/users/files";

export const fileAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get user profile
        uploadFile: builder.mutation<UploadUserFileResponse, UploadUserFileRequest>({
            query: (credentials) => ({
                url: `documents/upload`,
                method: 'POST',
                params: credentials.params,
                body: credentials.body,
            }),
        }),

        // Get USER FILE
        getFile: builder.query<GetFilesResponse, GetFilesRequest>({
            query: (params) => ({
                url: `documents/myfiles`,
                params,
            }),
        }),
    })
})

export const { useUploadFileMutation, useGetFileQuery } = fileAPI