export type UploadUserFileRequest = {
    params: {
        folder_name: string,
    }
    body: FormData
}

export type UploadUserFileResponse = {
    "file_name": string,
    "file_url": string
}