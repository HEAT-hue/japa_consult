// jshint esversion:6
import { useGetFilesHook } from "@/hooks/user/files"
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getErrorMessage } from "@/utils/global";
import { LineLoader } from "@/components/global/loader";
import { UserFile } from "@/components/user/files";
import { FileResponseType } from "@/data/users/files/file";

export const FolderPage: React.FC = () => {

    // Get the ID
    const { folderName } = useParams();

    console.log(folderName);

    if (!folderName) {
        return <Navigate to="/files" />
    }

    // Get files hook
    const { data, isError, error, isFetching: isGetFileFetching } = useGetFilesHook({ folderName })

    // An error occurred, inform the user
    if (isError) {
        if ((error as any).status == 404) {
            return (
                <div className="h-[70vh] flex flex-col justify-center items-center gap-y-5">

                    {/* No file found Icon */}
                    <div className="text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-file-earmark-excel" viewBox="0 0 16 16">
                            <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z" />
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                        </svg>
                    </div>

                    {/* No files found */}
                    <p className="flex items-center justify-center gap-x-2">No Files Uploaded in this folder: <span className="text-placeholder capitalize">{folderName}</span></p>
                </div>
            )
            // return 
        }
        return (
            <p className="mt-9 text-center">{getErrorMessage(error)}</p>
        )
    }


    return (
        <div className="mt-5">
            {isGetFileFetching && (
                <LineLoader />
            )}

            <section className="flex flex-wrap gap-4">
                {data?.map((file: FileResponseType, index: number) => {
                    return (
                        <UserFile key={index} name={file.name} url={file.file_url} />
                    )
                })}
            </section>
        </div>
    )
}