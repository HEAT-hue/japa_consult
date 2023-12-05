// jshint esversion:6
import { UserFolder, UserUploadFile } from "@/components/user/files";
import UploadIcon from "@/assets/global/export.svg"
import {  useState } from "react";
import { Modal } from "@/components/global";
import { useUploadFileHook } from "@/hooks/user";
import { Notification } from "@/components/global";
import { useGetFilesHook } from "@/hooks/user/files";
import { RecentFileUploadWrapper } from "@/components/user/files/recentFileUpload";
// import { useLazyGetFileQuery } from "@/app/services/user/files";

// type folders = {
//     general: {
//         length: number | undefined
//     },
//     academics: {
//         length: number | undefined
//     },
//     billing: {
//         length: number | undefined
//     },
//     visa: {
//         length: number | undefined
//     },
//     contracts: {
//         length: number | undefined
//     },
// }

export const FilesPage: React.FC = () => {

    // const [folders, setFolders] = useState<folders>({
    //     general: {
    //         length: undefined
    //     },
    //     academics: {
    //         length: undefined
    //     },
    //     billing: {
    //         length: undefined
    //     },
    //     visa: {
    //         length: undefined
    //     },
    //     contracts: {
    //         length: undefined
    //     },
    // })

    // Get files hook
    const { data: academicFolder } = useGetFilesHook({ folderName: "academics" })
    const { data: generalFolder } = useGetFilesHook({ folderName: "general" })
    const { data: billingFolder } = useGetFilesHook({ folderName: "billing" })
    const { data: visaFolder } = useGetFilesHook({ folderName: "visa" })
    const { data: contractFolder } = useGetFilesHook({ folderName: "contracts" })

    // useEffect(() => {
    //     console.log("component mounts")
    //     // refetchAcademic();
    //     // refetchGeneral()
    //     // refetchBilling()
    //     // refetchVisa()
    //     // refetchContracts();
    //     return () => {
    //         console.log("component unmounts");
    //     }
    // }, [])

    // console.log(generalFolder);

    // Upload success
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

    // Error uploading files
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // File Uplaod Modal
    const [fileUploadModal, setFileUploadModal] = useState<boolean>(false);

    // File to upload
    const [filesUploaded, setFilesUploaded] = useState<File[]>([])

    // Upload File Hook
    const { uploadUserFile, isLoading: fileUploadLoading } = useUploadFileHook()

    async function submitFiles(folderName: string) {
        if (filesUploaded.length == 0) {
            return;
        }

        const response = await uploadUserFile({ folder_name: folderName, files: filesUploaded });

        if (!response.success) {
            setErrorMessage(response.message);
            return;
        }

        // success
        setUploadSuccess(true);

        // Reset files
        setFilesUploaded([]);
    }

    return (
        <div className="pt-3">

            <div className="flex flex-col-reverse md:flex-row justify-between gap-5 ">
                {/* Folder container */}
                <div className="flex flex-wrap gap-5">
                    <UserFolder name="General" url="file/general" numberOfItems={generalFolder == undefined ? 0 : generalFolder.length} />
                    <UserFolder name="Billing" url="file/billing" numberOfItems={billingFolder?.length ?? 0} />
                    <UserFolder name="Academics" url="file/academics" numberOfItems={academicFolder?.length ?? 0} />
                    <UserFolder name="Visa" url="file/visa" numberOfItems={visaFolder?.length ?? 0} />
                    <UserFolder name="Contract" url="file/contract" numberOfItems={contractFolder?.length ?? 0} />
                </div>

                {/* Upload Button */}
                <button onClick={() => setFileUploadModal(true)} className="self-end md:self-start flex justify-center w-[150px] h-[40px] items-center text-white bg-brandColor rounded shadow gap-x-3 hover:bg-brandColor/90">
                    <img src={UploadIcon} alt="icon" />
                    <span className="font-Inter-Regular text-sm">Upload File</span>
                </button>
            </div>

            {/* Recent file uploads */}
            <div className="mt-7">
                <RecentFileUploadWrapper />
            </div>

            {/* Modals */}
            {fileUploadModal && (
                <Modal closeModal={() => setFileUploadModal(false)}>
                    <UserUploadFile filesUploaded={filesUploaded} setFilesUploaded={setFilesUploaded} action={submitFiles} loading={fileUploadLoading} />
                </Modal>
            )}

            {/* Upload Error */}
            {errorMessage && (
                <Modal closeModal={() => setErrorMessage(undefined)}>
                    <Notification error title="Error" desc={<p className="text-sm text-error capitalize">{errorMessage}</p>} action={() => setErrorMessage(undefined)} buttonTitle="Close" />
                </Modal>
            )}

            {/* Upload Success */}
            {uploadSuccess && (
                <Modal closeModal={() => {
                    setUploadSuccess(false);
                    setFileUploadModal(false)
                }}>
                    <Notification title="Successs" desc={<p className="text-sm">You have successfuly uploaded your file</p>} action={() => {
                        setUploadSuccess(false)
                        setFileUploadModal(false)
                    }} buttonTitle="Close" />
                </Modal>
            )}
        </div>
    )
}