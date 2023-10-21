// jshint esversion:6
import PlusIcon from "@/assets/global/Plus.svg";
import { Link } from "react-router-dom";
import { useGetUserNotesHook } from "@/hooks/user/notes";
import { NotePreview } from "@/components/user/notes/NotePreview";
import { LineLoader } from "@/components/global/loader";
import { getErrorMessage } from "@/utils/global";

export const NotePage: React.FC = () => {
    // Note API
    const { data: notesData, isFetching: isNotesFetching, isError, error } = useGetUserNotesHook();

    return (
        <>
            <div className="py-5">

                {/* Create Note */}
                <Link to={"create"}>
                    <div className="w-[140px] h-[140px] bg-white flex items-center justify-center rounded-md border border-gray-200">
                        <img src={PlusIcon} alt="Add note" />
                    </div>
                    <p className="font-Inter-Regular text-sm mt-2">Create new note</p>
                </Link>

                <h1 className="font-Inter-Bold text-lg mt-5">Recent notes</h1>

                {/* Recent Notes */}
                <div className="flex gap-5 flex-wrap pt-3">
                    {isError ? (
                        <p className="text-placeholder mt-9 text-sm">{getErrorMessage(error)}</p>
                    ) : (
                        notesData?.map((note, index: number) => {
                            return (
                                <NotePreview key={index} data={note} />
                            )
                        })
                    )}
                </div>
            </div>

            {/* Line Loader */}
            {isNotesFetching && (
                <LineLoader />
            )}
        </>
    )
}