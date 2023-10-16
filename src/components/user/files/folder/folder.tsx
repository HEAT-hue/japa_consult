// jshint esversion:6
import FolderImg from "@/assets/global/Folder.svg";
import { Link } from "react-router-dom"

type UserFolderProp = {
    name: string,
    url: string,
    numberOfItems: number
}

export const UserFolder: React.FC<UserFolderProp> = ({name, url, numberOfItems = 30}) => {
    return (
        <Link to={url}>
            <div className="w-[140px] h-[150px] bg-white border-[1px] border-gray-200 hover:border-brandColor p-3 rounded-md shadow-sm">
                {/* Folder Image Container */}
                <div className="mt-[25px] flex justify-center">
                    <img src={FolderImg} alt="Folder" />
                </div>

                {/* Description */}
                <p className="font-Inter-Bold text-sm mt-[15px]">{name}</p>
                <p className="text-xs">{`${numberOfItems} items`}</p>
            </div>
        </Link>
    )
}