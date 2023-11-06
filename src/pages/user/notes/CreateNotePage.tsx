// jshint esversion:6
import { TextEditor } from "@/components/user/notes/TextEditor"
import { useState, useRef, useEffect } from "react"
import { useSaveUserNoteHook, useUpdateUserNoteHook, useSendNoteHook } from "@/hooks/user/notes"
import { useLocation, useNavigate } from "react-router-dom"
import { Toast } from "@/components/global"
import { SaveUserNotesResponse } from "@/data/users/notes"
import { MutationResultType } from "@/data/global"
import { NOTE_NAVIGATION } from "@/data/global"

export type NoteDataType = {
    title: string,
    content: string,
    date_created: Date
}

let timeoutID: any;

export const CreateNotePage: React.FC = () => {

    // Get Navigator
    const navigate = useNavigate();

    // Get State from Page
    const { state } = useLocation();

    // Ref to hold note ID
    const noteIDRef = useRef<number | null>(null);

    const noteType: NOTE_NAVIGATION = state.noteType;

    if (state != null) {
        noteIDRef.current = state.draft_id
    }

    // Error
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const [actionSuccess, setActionSuccess] = useState<string | undefined>(undefined);

    // State to hold data
    const [noteData, setNoteData] = useState<NoteDataType>({ title: state?.title ?? "Untitled note", content: state?.content ?? ' ', date_created: new Date() });

    // Save note feature
    const { saveUserNote, isLoading: isNoteSaveLoading, isError: isNoteSaveError, } = useSaveUserNoteHook();

    // Update note feature
    const { updateUserNote, isLoading: isNoteUpdateLoading, isError: isNoteUpdateError, } = useUpdateUserNoteHook();

    // Submit note feature
    const { sendNoteToUser, isLoading: isSendNoteLoading } = useSendNoteHook()

    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        }
    }, [])

    const NoteAPIProps = { isNoteSaveLoading: isNoteSaveLoading || isNoteUpdateLoading, isNoteSaveError: isNoteSaveError || isNoteUpdateError, submitNote, isSendNoteLoading: isSendNoteLoading || isNoteSaveLoading || isNoteUpdateLoading }

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
            navigate("/notes");
        }, 2000)
    }

    async function submitNote(toId: number): Promise<MutationResultType> {
        let response;

        // Save note first before submitting
        if (noteIDRef.current == null) {
            response = await saveUserNote({ ...noteData, date_created: noteData.date_created });

            // If not success
            if (!response?.success) {
                return response;
            }

            // Set the draft ID
            noteIDRef.current = (response.data as SaveUserNotesResponse).draft_id
        }

        // Submit Note
        return await sendNoteToUser({ draftId: noteIDRef.current, toId });
    }

    return (
        <>
            <div className="mt-7 h-5/6">
                <TextEditor noteData={noteData} noteType={noteType} setNoteData={setNoteData} NoteAPIProps={NoteAPIProps} saveNote={saveNote} />
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