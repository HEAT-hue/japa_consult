// jshint esversion:6
import FileImg from "@/assets/global/file.png";
import DownloadIcon from "@/assets/global/logout.svg";

type UserFolderProp = {
    name: string,
    url: string,
}

export const UserFile: React.FC<UserFolderProp> = ({ name, url }) => {
    const onButtonClick = () => {
        const fileLink = url;
        const link = document.createElement("a");
        link.href = fileLink;
        link.download = name; // specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-[140px] h-[150px] bg-white border-[1px] border-gray-200 hover:border-brandColor p-3 rounded-md shadow-sm relative">
            
            {/* Folder Image Container */}
            <div className="mt-[25px] flex justify-center">
                <img className="w-[60px] h-[60px]" src={FileImg} alt="Folder" />
            </div>

            {/* Description */}
            <p className="font-Inter-Bold text-sm mt-[15px] truncate">{name}</p>

            {/* Download icon */}
            <button className="absolute top-2 right-2" onClick={onButtonClick}>
                <img src={DownloadIcon} className="w-[20px] h-[20px]" alt="download" />
            </button>
        </div>
    )
}