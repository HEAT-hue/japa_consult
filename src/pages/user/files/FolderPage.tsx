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

    console.log(data);

    console.log(error);

    // An error occurred, inform the user
    if (isError) {
        if ((error as any).status == 404) {
            return <p className="mt-9 flex items-center justify-center gap-x-2">No Files Uploaded in this folder: <span className="text-placeholder capitalize">{folderName}</span></p>
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