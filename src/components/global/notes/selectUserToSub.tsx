// jshint esversion:6
import { USERROLES } from "@/data/global/auth"
import { useState, ChangeEvent, useEffect } from "react"
import { useLazyGetAllAdminsQuery, useLazyGetAllManagersQuery, useLazyGetAllStaffsQuery, useLazyGetAllUsersQuery, } from "@/app/services/admin/users"
import { UserType } from "@/data/admin/dashboard/dashboard"
import { getErrorMessage } from "@/utils/global"
import { BeatLoader } from "react-spinners";
import { CSSProperties } from "react"
import { getFormattedDate } from "@/utils/global"
import checkBoxIcon from "@/assets/admin/checkbox.png";
import { MutationResultType } from "@/data/global"
import { Toast } from ".."
import { useNavigate } from "react-router-dom"

type SelectUserToSubmitNoteProp = {
    role: USERROLES,
    submitNote(toId: number): Promise<MutationResultType>
    isSendNoteLoading: boolean
}

const override: CSSProperties = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "red",
};

let timeoutID: any;

export const SelectUserToSubmitNote: React.FC<SelectUserToSubmitNoteProp> = ({ submitNote, isSendNoteLoading }) => {

    const navigate = useNavigate()

    // Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Action success
    const [actionSuccess, setActionSuccess] = useState<string | undefined>(undefined);

    // Fetching list of users
    const [getAllAdmins, { isLoading: isAllAdminsLoading }] = useLazyGetAllAdminsQuery()
    const [getAllManagers, { isLoading: isAllManagersLoading }] = useLazyGetAllManagersQuery()
    const [getAllStaffs, { isLoading: isAllStaffsLoading }] = useLazyGetAllStaffsQuery()
    const [getAllUsers, { isLoading: isAllUsersLoading }] = useLazyGetAllUsersQuery()

    // Selected Users
    const [selectedUser, setSelectedUser] = useState<USERROLES | undefined>(undefined);

    // Selected User ID
    const [selectedUserId, setSelectedUserId] = useState<number | undefined>(undefined);

    // List to hold selected users
    const [usersList, setUsersList] = useState<UserType[]>([]);

    // Fetch users 
    useEffect(() => {
        if (!selectedUser) {
            return;
        }

        (async function () {
            switch (selectedUser) {
                // Fetch All Admins
                case USERROLES.ADMIN: {
                    try {
                        const data = await getAllAdmins().unwrap();
                        setUsersList(data);
                    } catch (error) {
                        setErrorMessage(getErrorMessage(error));
                    }
                    break;
                }

                // Fetch All Users
                case USERROLES.USER: {
                    try {
                        const data = await getAllUsers().unwrap();
                        setUsersList(data);
                    } catch (error) {
                        setErrorMessage(getErrorMessage(error));
                    }
                    break;
                }

                // Fetch All Managers
                case USERROLES.MANAGER: {
                    try {
                        const data = await getAllManagers().unwrap();
                        setUsersList(data);
                    } catch (error) {
                        setErrorMessage(getErrorMessage(error));
                    }
                    break;
                }

                // Fetch All Staffs
                case USERROLES.STAFF: {
                    try {
                        const data = await getAllStaffs().unwrap();
                        setUsersList(data);
                    } catch (error) {
                        setErrorMessage(getErrorMessage(error));
                    }
                    break;
                }
                default:
                    break;
            }
        })()

    }, [selectedUser])

    async function SendNoteToUser() {
        if (!selectedUserId) {
            return;
        }

        // Send note to user
        let response = await submitNote(selectedUserId);

        if (!response.success) {
            // An error occurred
            setErrorMessage(response.message);

            timeoutID = setTimeout(() => {
                setErrorMessage(undefined);
            }, 3000)

            return;
        }

        // Inform user
        setActionSuccess("Note successfully saved");

        timeoutID = setTimeout(() => {
            setActionSuccess(undefined);
            navigate("/admin/notes");
        }, 2000)
    }

    return (
        <div className="p-5">
            <div className="flex justify-between gap-x-5 items-center">
                <h3 className="font-Inter"><span className="text-brandColor font-Inter-Bold">Submit</span> note to:</h3>
                <select
                    className="p-2 bg-white border-[1px] border-brandColor rounded cursor-pointer"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setSelectedUser(e.target.value as USERROLES)
                        setUsersList([]);
                    }}
                >
                    <option value={undefined} selected disabled>Select User</option>
                    <option value={USERROLES.ADMIN}>Admin</option>
                    <option value={USERROLES.MANAGER}>Manager</option>
                    <option value={USERROLES.STAFF}>Staff</option>
                    <option value={USERROLES.USER}>User</option>
                </select>
            </div>

            {/* List of users */}
            <div className="h-80vh max-h-[400px] overflow-scroll">

                {/* Loader */}
                {(isAllAdminsLoading || isAllManagersLoading || isAllStaffsLoading || isAllUsersLoading) && (
                    <div className="w-full flex items-center justify-center">
                        <div className="my-[5rem] mx-auto">
                            <BeatLoader
                                color={"#E1AE3C"}
                                loading={isAllAdminsLoading || isAllManagersLoading || isAllStaffsLoading || isAllUsersLoading}
                                cssOverride={override}
                                size={20}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    </div>
                )}

                {usersList && usersList.map((user, index: number) => {
                    const { day, monthShort, year } = getFormattedDate(new Date(user.last_login));

                    return (
                        <div key={index} className="cursor-pointer bg-white border-b flex justify-between mt-3 pb-1" onClick={() => setSelectedUserId(user.user_id)}>
                            <div className="flex flex-col gap-y-">
                                <p className="text-placeholder text-sm">{`ID: ${user.user_id}`}</p>
                                <p className="text-placeholder text-[13px]">{`Email: ${user.email}`}</p>
                                <p className="font-Inter-Bold text-lg leading-tight">{user.name}</p>
                                <p className="text-placeholder  text-[13px]">{`Last login: ${day} ${monthShort}, ${year}`}</p>
                            </div>
                            <div>
                                {selectedUserId == user.user_id && (
                                    <img className="w-[25px] h-[25px]" src={checkBoxIcon} alt="sel" />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Submit Note */}
            <div className="flex justify-end mt-5">
                <button
                    onClick={SendNoteToUser}
                    disabled={!selectedUserId}
                    className={`mt-3 px-2 py-2 ${selectedUserId ? "bg-brandColor text-white" : "bg-formDisabledBg"}  font-Manrope-Regular rounded`}>{isSendNoteLoading ? "Submitting..." : "Submit Note"}</button>
            </div>


            {actionSuccess && (
                <Toast desc={actionSuccess ?? "Success"} action={() => {
                    setActionSuccess(undefined)
                    navigate("/admin/notes")
                }} />
            )}

            {errorMessage && (
                <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
            )}

        </div>
    )
}