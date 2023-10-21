// jshint esversion:6
import { TextEditor } from "@/components/user/notes/TextEditor"
import { useState, useRef, useEffect } from "react"
import { useSaveUserNoteHook, useUpdateUserNoteHook } from "@/hooks/user/notes"
import { useLocation } from "react-router-dom"
import { Toast } from "@/components/global"

export type NoteDataType = {
    title: string,
    content: string,
    date_created: Date
}

let timeoutID: any;

export const CreateNotePage: React.FC = () => {

    // Get State from Page
    const { state } = useLocation();

    // Ref to hold note ID
    const noteIDRef = useRef<number | null>(null);

    if (state != null) {
        console.log(state);
        noteIDRef.current = state.draft_id
    }

    // Error
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const [actionSuccess, setActionSuccess] = useState<string | undefined>(undefined);

    // State to hold data
    const [noteData, setNoteData] = useState<NoteDataType>({ title: state?.title ?? "Untitled note", content: state?.content ?? ' ', date_created: new Date() });

    // Save note feature
    const { saveUserNote, isLoading: isNoteSaveLoading, isError: isNoteSaveError, } = useSaveUserNoteHook();

    const { updateUserNote, isLoading: isNoteUpdateLoading, isError: isNoteUpdateError, } = useUpdateUserNoteHook();

    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        }
    }, [])

    const NoteAPIProps = { isNoteSaveLoading: isNoteSaveLoading || isNoteUpdateLoading, isNoteSaveError: isNoteSaveError || isNoteUpdateError }

    async function saveNote() {
        let response;

        // Create new note
        if (noteIDRef.current == null) {
            response = await saveUserNote({ ...noteData, date_created: noteData.date_created });
        } else {
            response = await updateUserNote({ ...noteData, date_created: noteData.date_created, draft_id: noteIDRef.current })
            console.log(response);
        }

        // Set the Note ID
        // Some code here

        if (!response.success) {
            // An error occurred
            setErrorMessage(response.message);

            timeoutID = setTimeout(() => {
                setErrorMessage(undefined);
            }, 5000)

            return;
        }

        // Inform user
        setActionSuccess("Note successfully saved");

        timeoutID = setTimeout(() => {
            setActionSuccess(undefined);
        }, 2000)
    }

    return (
        <>
            <div className="mt-7 h-5/6">
                <TextEditor noteData={noteData} setNoteData={setNoteData} NoteAPIProps={NoteAPIProps} saveNote={saveNote} />
            </div>

            {actionSuccess && (
                <Toast desc={actionSuccess ?? "Success"} action={() => setActionSuccess(undefined)} />
            )}

            {errorMessage && (
                <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
            )}
        </>
    )
}