// jshint esversion:6
import FileImg from "@/assets/global/file.png";
// import DownloadIcon from "@/assets/global/logout.svg";
import { TrashSVG } from "@/components/global/svg/trash"
import { useState, useEffect } from "react";
import { FileResponseType } from "@/data/users/files/file";
import { useDeleteFileHook } from "@/hooks/user/files";
import { Toast } from "@/components/global";
import { DeleteConfirmation } from "@/components/admin/users";
import { Modal } from "@/components/global";

type UserFolderProp = {
    file: FileResponseType
}

type ActionConsent = {
    status: boolean,
    data: FileResponseType | undefined
}

let timeoutID: any;

export const UserFile: React.FC<UserFolderProp> = ({ file }) => {
    const onButtonClick = () => {
        const fileLink = file.file_url;
        const link = document.createElement("a");
        link.href = fileLink;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const { deleteFile, isLoading: isDeleteFileLoading } = useDeleteFileHook();

    // Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Consnt to delete file
    const [actionConsent, setActionConsent] = useState<ActionConsent>({ status: false, data: undefined });

    // Clear error state
    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        }
    }, [])

    // Delete user file
    async function deleteUSerFile(file: FileResponseType | undefined) {
        if (!file) {
            return;
        }

        const response = await deleteFile({ fileId: file.file_id });

        if (!response.success) {
            setErrorMessage(response.message);
            timeoutID = setTimeout(() => {
                setErrorMessage(undefined);
            }, 3000)
        }


        // Close consent modal
        setActionConsent({ status: false, data: undefined })
    }

    return (
        <>
            <div className="block relative">

                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        setActionConsent({ status: true, data: file })
                    }}
                    className="w-max ml-auto absolute top-3 right-3 z-[300] truncate cursor-pointer text-[#AFAFAF]">
                    <TrashSVG width={23} height={23} />
                </div>

                <div className="w-[140px] h-[150px] bg-white border-[1px] border-gray-200 hover:border-brandColor p-3 rounded-md shadow-sm relative">

                    {/* Folder Image Container */}
                    <div className="mt-[25px] flex justify-center ">
                        <img className="w-[60px] h-[60px] cursor-pointer" onClick={onButtonClick} src={FileImg} alt="Folder" />
                    </div>

                    {/* Description */}
                    <p className="font-Inter-Bold text-sm mt-[15px] text-center truncate">{file.name}</p>
                </div>
            </div>

            {/* Consent modal */}
            {actionConsent.status && (
                <Modal closeModal={() => setActionConsent({ status: false, data: undefined })}>
                    <DeleteConfirmation
                        title="Delete File"
                        desc="Are you sure you want to delete this file?"
                        cancel={() => setActionConsent({ status: false, data: undefined })}
                        next={() => deleteUSerFile(actionConsent.data)}
                        isLoading={isDeleteFileLoading}
                        loadingTitle="Deleting..."
                    />
                </Modal>
            )}

            {/* Error deletinh */}
            {errorMessage && (
                <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
            )}
        </>
    )
}