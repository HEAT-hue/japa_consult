// jshint esversion:6
import FolderAddIcon from "@/assets/global/folder-add.svg"
import InfoIcon from "@/assets/global/info-circle.svg"

export const UserUploadFile: React.FC = () => {
    return (
        <>
            <h3 className="font-CabinetGrotesk-Bold">Upload File </h3>

            {/* Upload File */}
            <div className="mt-3 flex items-center justify-center border-[1px] border-dashed border-[#DBDBDB] w-[300px] h-[200px] bg-[#F1F1F1] rounded">
                <div className="flex flex-col gap-y-2">
                    <img className="w-[50px] h-[50px] mx-auto" src={FolderAddIcon} alt="add File" />
                    <p className="text-sm text-center">Drag or drop your file or <span className="text-brandColor">click to Upload</span></p>
                    <p className="font-Inter-Regular text-[14px] text-center text-placeholder">JPG,  PDF, PNG, SVG only</p>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <select name="folder" className="p-2 bg-white border-[1px] border-[#DBDBDB] rounded cursor-pointer">
                    <option value="general">General</option>
                    <option value="billing">Billing</option>
                    <option value="academics">Academics</option>
                    <option value="visa">Visa</option>
                    <option value="Contract">Contract</option>
                </select>
                <p className="flex gap-x-2 justify-end text-sm"><img src={InfoIcon} alt="info" /> <span>Maximum size: 10MB</span></p>
            </div>
        </>
    )
}