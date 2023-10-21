// jshint esversion:6
import { useGetFileQuery } from "@/app/services/user/files";

// Specify the page you want to view
type UseGetTradeDetailProps = {
    folderName: string
}

// GET the User Files
export const useGetFilesHook = ({ folderName }: UseGetTradeDetailProps) => {

    // Fetch the trade detail
    const { data, isError, isLoading, error, isSuccess, isFetching } = useGetFileQuery({ folderName });

    return (
        { data, isError, isLoading, error, isSuccess, isFetching }
    );
}
