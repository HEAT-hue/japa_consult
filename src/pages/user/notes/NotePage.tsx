// jshint esversion:6
import PlusIcon from "@/assets/global/Plus.svg";
import { Link } from "react-router-dom";
// import { useGetUserNotesHook } from "@/hooks/user/notes";
import { RecentNote } from "@/components/global/notes";
// import { CSSProperties } from "react";
// import { useGetReceivedNotesQuery } from "@/app/services/user/notes";
import { useState, } from "react";
// import { UserNoteResponse } from "@/data/users/notes/apiTypes";
import { NOTE_NAVIGATION } from "@/data/global";
// import { ReceivedNoteResponse } from "@/data/users/notes/apiTypes";
import { RecievedNote } from "@/components/global/notes";


export const NotePage: React.FC = () => {

    const [noteType, setNoteType] = useState<NOTE_NAVIGATION>(NOTE_NAVIGATION.RECENT)

    // Fetch users 
    // useEffect(() => {
    //     if (!noteType) {
    //         return;
    //     }

    //     (async function () {
    //         switch (noteType) {

    //             // Fetch All files in General
    //             case NOTE_NAVIGATION.RECENT: {
    //                 setNoteData(notesData ?? []);
    //                 break;
    //             }
    //             case NOTE_NAVIGATION.RECEIVED: {
    //                 setNoteData(receivedNotesData ?? []);
    //                 break;
    //             }

    //             default:
    //                 break;
    //         }
    //     })()

    // }, [noteType, notesData, receivedNotesData])

    // Handle navigation click
    // function handleNavigationClick(navigation: NOTE_NAVIGATION) {
    //     switch (navigation) {
    //         case NOTE_NAVIGATION.RECENT: {
    //             // if (notesData) {
    //             //     setNoteData(notesData)
    //             // }
    //             setNoteType(NOTE_NAVIGATION.RECENT)
    //             break;
    //         }
    //         case NOTE_NAVIGATION.RECEIVED: {
    //             // if (notesData) {
    //             //     setNoteData(notesData)
    //             // }
    //             setNoteType(NOTE_NAVIGATION.RECEIVED)
    //             break;
    //         }

    //         default:
    //             setNoteType(NOTE_NAVIGATION.RECENT)
    //             break;
    //     }
    // }

    return (
        <>
            <div className="py-5">

                {/* Create Note */}
                <Link to={"create"} state={{ noteType: NOTE_NAVIGATION.RECENT }}>
                    <div className="w-[140px] h-[140px] bg-white flex items-center justify-center rounded-md border border-gray-200">
                        <img src={PlusIcon} alt="Add note" />
                    </div>
                    <p className="font-Inter-Regular text-sm mt-2">Create new note</p>
                </Link>

                <div className="flex gap-x-2 mt-5">
                    <h3 onClick={() => setNoteType(NOTE_NAVIGATION.RECENT)} className={`hidden sm:block cursor-pointer w-max py-1 ${noteType == NOTE_NAVIGATION.RECENT && "border-b-[2px] border-brandColor"}`}>Recent Notes</h3>
                    <h3 onClick={() => setNoteType(NOTE_NAVIGATION.RECEIVED)} className={`hidden sm:block cursor-pointer w-max py-1 ${noteType == NOTE_NAVIGATION.RECEIVED && "border-b-[2px] border-brandColor"}`}>Received Notes</h3>
                </div>

                {noteType == NOTE_NAVIGATION.RECENT && (
                    <RecentNote />
                )}

                {noteType == NOTE_NAVIGATION.RECEIVED && (
                    <RecievedNote />
                )}
            </div>


        </>
    )
}