import { FileResponseType } from "@/data/users/files/file"

export type GetAllFilesUploadedResponse = {
    "academics": FileResponseType[],
    "billing": FileResponseType[],
    "contracts": FileResponseType[],
    "general": FileResponseType[],
    "visa": FileResponseType[]
}
