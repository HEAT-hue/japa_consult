// jshint esversion:6
import { useState, useEffect, CSSProperties } from "react"
import { AllAdminsOverviewBox, AllManagersOverviewBox, AllStaffsOverviewBox, AllUsersOverviewBox } from "@/components/global/overviewBox/AdminUsersOverviewBox"
import { useLazyGetAllAdminsQuery, useLazyGetAllManagersQuery, useLazyGetAllStaffsQuery, useLazyGetAllUsersQuery, } from "@/app/services/admin/users"
import { UserType } from "@/data/admin/dashboard/dashboard"
import { USERROLES } from "@/data/global/auth"
import { getErrorMessage } from "@/utils/global"
import { UsersTable, UsersTableMV } from "@/components/admin/users"
import { Toast } from "@/components/global"
import { BeatLoader } from "react-spinners"

let timeoutID: any;

const override: CSSProperties = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "red",
};

export const AdminUsersPage: React.FC = () => {

    // Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Fetching list of users
    const [getAllAdmins, { isLoading: isAllAdminsLoading }] = useLazyGetAllAdminsQuery()
    const [getAllManagers, { isLoading: isAllManagersLoading }] = useLazyGetAllManagersQuery()
    const [getAllStaffs, { isLoading: isAllStaffsLoading }] = useLazyGetAllStaffsQuery()
    const [getAllUsers, { isLoading: isAllUsersLoading }] = useLazyGetAllUsersQuery()

    // Selected Users
    const [selectedUser, setSelectedUser] = useState<USERROLES | undefined>(USERROLES.ADMIN);

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
                        setUsersList([]);
                        setErrorMessage(getErrorMessage(error));
                        timeoutID = setTimeout(() => {
                            setErrorMessage(undefined);
                        }, 2000)
                    }
                    break;
                }

                // Fetch All Users
                case USERROLES.USER: {
                    try {
                        const data = await getAllUsers().unwrap();
                        setUsersList(data);
                    } catch (error) {
                        setUsersList([]);
                        timeoutID = setTimeout(() => {
                            setErrorMessage(undefined);
                        }, 2000)
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
                        setUsersList([]);
                        timeoutID = setTimeout(() => {
                            setErrorMessage(undefined);
                        }, 2000)
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
                        setUsersList([]);
                        timeoutID = setTimeout(() => {
                            setErrorMessage(undefined);
                        }, 2000)
                        setErrorMessage(getErrorMessage(error));
                    }
                    break;
                }
                default:
                    break;
            }
        })()

        return () => {
            clearTimeout(timeoutID);
        }

    }, [selectedUser])

    return (
        <div className="py-5">

            {/* Overview boxes */}
            <div className="w-full flex [&>*]:shrink-0 flex-nowrap gap-x-3 overflow-x-auto">

                {/* All Admins */}
                <div onClick={() => setSelectedUser(USERROLES.ADMIN)}>
                    <AllAdminsOverviewBox active={selectedUser == USERROLES.ADMIN} />
                </div>

                {/* All Managers */}
                <div onClick={() => setSelectedUser(USERROLES.MANAGER)}>
                    <AllManagersOverviewBox active={selectedUser == USERROLES.MANAGER} />
                </div>

                {/* All Staffs */}
                <div onClick={() => setSelectedUser(USERROLES.STAFF)}>
                    <AllStaffsOverviewBox active={selectedUser == USERROLES.STAFF} />
                </div>

                {/* All Users */}
                <div onClick={() => setSelectedUser(USERROLES.USER)}>
                    <AllUsersOverviewBox active={selectedUser == USERROLES.USER} />
                </div>
            </div>

            {/* Users Wrapper */}
            {(isAllAdminsLoading || isAllManagersLoading || isAllStaffsLoading || isAllUsersLoading) ? (
                <div className="w-full flex items-center justify-center">
                    <div className="my-[5rem] mx-auto">
                        <BeatLoader
                            color={"#E1AE3C"}
                            loading={true}
                            cssOverride={override}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
            ) : (

                <div className="mt-5">
                    {usersList.length == 0 ? (
                        <div>
                            No User Data found
                        </div>
                    ) : (
                        <div>
                            <div className="hidden sm:block">
                                <UsersTable userData={usersList} />
                            </div>
                            <div className="sm:hidden">
                                <UsersTableMV userData={usersList} />
                            </div>
                        </div>
                    )}
                </div>
            )
            }


            {
                errorMessage && (
                    <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
                )
            }
        </div >
    )
}