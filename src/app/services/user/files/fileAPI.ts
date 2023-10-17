// jshint esversion:6
import { emptySplitApi } from "../../api";
import { UploadUserFileRequest, UploadUserFileResponse } from "@/data/users/files";

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

    })
})

export const { useUploadFileMutation } = fileAPI