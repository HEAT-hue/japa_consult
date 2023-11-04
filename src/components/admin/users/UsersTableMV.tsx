// jshint esversion:6
import { UserType } from "@/data/admin/dashboard/dashboard"
import { getFormattedDate } from "@/utils/global";
import { useNavigate } from "react-router-dom";

type UsersTableProp = {
    userData: UserType[]
}

export const UsersTableMV: React.FC<UsersTableProp> = ({ userData }) => {

    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-col gap-y-2">
                {
                    userData.map((user: UserType, index: number) => {
                        const { day, monthShort, year } = getFormattedDate(new Date(user.last_login))

                        return (
                            <div
                                key={index}
                                className="bg-white p-4 px-5 rounded flex justify-between cursor-pointer"
                                onClick={() => navigate(`user/${user.user_id}`, { state: user })}
                            >
                                <div className="flex flex-col gap-y-1">
                                    {/* <p className="text-placeholder text-sm">{user.user_id}</p> */}
                                    <p className="text-placeholder text-sm">{user.email}</p>
                                    <p className="font-Inter-Bold text-lg">{user.name}</p>
                                    <p className="text-placeholder text-sm">{`Last login: ${day} ${monthShort}, ${year}`}</p>
                                </div>
                                <div className="flex flex-col gap-y-1 items-end">
                                    {/* Amount */}
                                    <p className="uppercase">
                                        {user.role}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}