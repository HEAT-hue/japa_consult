// jshint esversion:6
import FolderImg from "@/assets/global/Folder.svg";
import { useNavigate } from "react-router-dom";
// import { useGetFilesHook } from "@/hooks/user/files";
import { useLazyGetFileQuery } from "@/app/services/user/files";
// import { useGetFileQuery } from "@/app/services/user/files";
import { useEffect } from "react";

type UserFolderProp = {
    name: string,
    url: string,
    numberOfItems: number
}

export const UserFolder: React.FC<UserFolderProp> = ({ name, url }) => {

    // const [fileSize, setFileSize] = useState<number | undefined>(undefined);

    useEffect(() => {
        (async function () {
            await getFile({ folderName: name.toLowerCase() });
        })()
    }, [])

    const navigate = useNavigate();

    const [getFile, { isLoading: isFilesloading }] = useLazyGetFileQuery()

    // const { data: fileData, isLoading: isFilesloading } = useGetFileQuery({ folderName: name.toLowerCase() })

    return (
        <div
            className=""
            onClick={() => {
                navigate(url);
            }}>
            <div className="w-[140px] h-[150px] bg-white border-[1px] border-gray-200 hover:border-brandColor p-3 rounded-md shadow-sm">
                {/* Folder Image Container */}
                <div className="mt-[25px] flex justify-center">
                    <img src={FolderImg} alt="Folder" />
                </div>

                {/* Description */}
                <p className="font-Inter-Bold text-sm mt-[15px]">{name}</p>
                {isFilesloading ? (
                    <p>...</p>
                ) : (
                    <p></p>
                    // <p className="text-xs">{`${fileSize ?? 0} items`}</p>
                )}
            </div>
        </div >
    )
}