// jshint esversion:6
import { emptySplitApi } from "../../api";
import { GetAllUsersResponse } from "@/data/admin/users";

export const usersAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllUsers: builder.query<GetAllUsersResponse, void>({
            query: () => ({
                url: `/user/allUsers`,
            }),
            providesTags: ['GET_ALL_USERS']
        }),

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
        // getFile: builder.query<GetFilesResponse, GetFilesRequest>({
        //     query: (params) => ({
        //         url: `documents/myfiles`,
        //         params,
        //     }),
        //     providesTags: ['GET_FILES']
        // }),

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

export const { useGetAllUsersQuery } = usersAPI