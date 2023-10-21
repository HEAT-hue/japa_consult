// jshint esversion:6
import { UserNoteResponse } from "@/data/users/notes/apiTypes";
import ReactHtmlParser from 'react-html-parser';
import DotsOutline from "@/assets/global/DotsVerticalOutline.svg";
import { getFormattedDate, getFileDate } from "@/utils/global";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "@/components/global";
import { useDeleteUserNoteHook } from "@/hooks/user/notes";

type NotePreviewProp = {
    data: UserNoteResponse
}

let timeoutID: any;

export const NotePreview: React.FC<NotePreviewProp> = ({ data }) => {
    // Error uploading files
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Get Time Info
    const { year, monthShort, day, } = getFormattedDate(new Date(data.last_updated ?? new Date()));

    // Show more note info
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    // Delete note
    const { deleteUserNote, isLoading } = useDeleteUserNoteHook();

    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        }
    }, [])


    async function handleDeleteNoteClick() {
        const response = await deleteUserNote({ d_id: data.draft_id })

        console.log(response);

        if (!response.success) {
            setErrorMessage("Cannot delete note")
            timeoutID = setTimeout(() => {
                setErrorMessage(undefined);
            }, 3000)
            return;
        }

        // Close modal
        setModalOpen(false);
    }

    return (
        <>
            <div>
                <Link to={"create"} state={{
                    draft_id: data.draft_id,
                    title: data.title,
                    content: data.content,
                }}>
                    {/* Note Preview */}
                    <div className="w-[140px] h-[170px] p-3 bg-white overflow-hidden text-[7px] rounded border border-gray-200">
                        <div> {ReactHtmlParser(`<div>${data.content}</div>`)} </div>
                    </div>
                </Link>

                {/* Note details */}
                <div className="pl-1 cursor-pointer" onClick={(e) => {
                    e.stopPropagation();
                    setModalOpen(true);
                }}>
                    {/* Note title */}
                    <p className="font-Inter-Medium text-xs mt-1">{data.title}</p>

                    <div className="flex justify-between items-center mt-">

                        <p className="text-placeholder font-Inter-Regular text-xs">{`${monthShort} ${day}, ${year}`}</p>

                        {/* outline */}
                        <img src={DotsOutline} alt="dot" />
                    </div>
                </div>
            </div>

            {/* Modal for previewing notes! */}
            {modalOpen && (
                <Modal bare closeModal={() => setModalOpen(false)}>
                    <div className="rounded overflow-hidden">
                        <div className="p-4 font-Inter-Regular flex flex-col gap-y-2">
                            <div className="flex items-center gap-x-2">
                                <p className="text-placeholder">ID:</p>
                                <p className="text-black text-sm">{data.draft_id}</p>
                            </div>
                            <div className="flex gap-x-2">
                                <p className="text-placeholder">Title:</p>
                                <p className="text-black">{data.title}</p>
                            </div>
                            <div className="flex gap-x-2">
                                <p className="text-placeholder">Date created:</p>
                                <p className="text-black text-sm">{getFileDate(data.date_created ?? new Date())}</p>
                            </div>
                            <div className="flex gap-x-2">
                                <p className="text-placeholder">Date modified:</p>
                                <p className="text-black text-sm">{getFileDate(data.last_updated ?? new Date())}</p>
                            </div>
                        </div>

                        {errorMessage && (<p className="text-error text-sm text-center">{errorMessage ?? "An error occurred"}</p>)}

                        {/* Delete note */}
                        <div className="flex justify-end p-2 py-4">
                            <button onClick={handleDeleteNoteClick} className="py-2 px-3 w-max bg-error text-white rounded-sm">{isLoading ? "Deleting..." : "Delete note"}</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}