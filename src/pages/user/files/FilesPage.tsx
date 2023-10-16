// jshint esversion:6
import { UserFolder, UserUploadFile } from "@/components/user/files";
import UploadIcon from "@/assets/global/export.svg"
import { useState } from "react";
import { Modal } from "@/components/global";

export const FilesPage: React.FC = () => {

    // File Uplaod Modal
    const [fileUploadModal, setFileUploadModal] = useState<boolean>(false);

    return (
        <div className="pt-3">

            <div className="flex flex-col-reverse md:flex-row justify-between gap-5 ">
                {/* Folder container */}
                <div className="flex flex-wrap gap-5">
                    <UserFolder name="General" url="general" numberOfItems={30} />
                    <UserFolder name="Billing" url="billing" numberOfItems={12} />
                    <UserFolder name="Academics" url="academics" numberOfItems={8} />
                    <UserFolder name="Visa" url="visa" numberOfItems={16} />
                    <UserFolder name="Contract" url="contract" numberOfItems={25} />
                </div>

                {/* Upload Button */}
                <button onClick={() => setFileUploadModal(true)} className="self-end md:self-start flex justify-center w-[150px] h-[40px] items-center text-white bg-brandColor rounded shadow gap-x-3 hover:bg-brandColor/90">
                    <img src={UploadIcon} alt="icon" />
                    <span className="font-Inter-Regular text-sm">Upload File</span>
                </button>
            </div>

            {/* Modals */}
            {fileUploadModal && (
                <Modal closeModal={() => setFileUploadModal(false)}>
                    <UserUploadFile />
                </Modal>
            )}
        </div>
    )
}