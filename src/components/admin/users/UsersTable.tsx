// jshint esversion:6
import { UserType } from "@/data/admin/dashboard/dashboard"
import { getFormattedDate } from "@/utils/global";
import { useNavigate } from "react-router-dom";

type UsersTableProp = {
    userData: UserType[]
}

export const UsersTable: React.FC<UsersTableProp> = ({ userData }) => {

    const navigate = useNavigate();

    return (
        <>
            {/* Table */}
            <div className="w-full h-full mt-3 relative">
                <table className="w-full border-spacing-1 table-fixed  rounded-t-[20px] px-5 py-3">

                    {/* Table header */}
                    <thead>
                        <tr className="font-Inter-Bold [&>*]:p-2 [&>*]:py-4 pointer-events-none">
                            <th className="text-sm font-medium text-left w-[12%]">
                                <span>Name</span>
                            </th>
                            <th className="text-sm font-medium text-left w-[7%]">
                                <span>Role</span>
                            </th>
                            <th className="text-sm font-medium text-left w-[11%]">
                                <span>Email</span>
                            </th>
                            <th className="text-sm font-medium text-left w-[10%]">
                                <span>Last Login</span>
                            </th>
                            <th className="text-sm font-medium text-left w-[12%]">
                                <span>Phone number</span>
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y-[1px] font-Manrope-Regular">
                        {userData.map((user: UserType, index: number) => {

                            const { day, monthShort, year } = getFormattedDate(new Date(user.last_login))

                            return (
                                <tr
                                    key={index}
                                    className="font-Manrope-Regular text-[15px] [&>*]:p-2 [&>*]:py-3 cursor-pointer"
                                    onClick={() => navigate(`user/${user.user_id}`, { state: user })}
                                >
                                    {/* Name */}
                                    <td className={`w-full truncate capitalize`}>
                                        <span>{`${user.name.toLowerCase() ?? "<no name>"}`}</span>
                                    </td>

                                    {/* Role */}
                                    <td className="w-full truncate capitalize">
                                        <span>{user.role}</span>
                                    </td>

                                    {/* Email */}
                                    <td className="w-full truncate text-[#AFAFAF]">
                                        <span>{user.email}</span>
                                    </td>

                                    {/* Last login */}
                                    <td className="w-full truncate text-[#AFAFAF]">
                                        <span>{`${day} ${monthShort}, ${year}`}</span>
                                    </td>

                                    {/* Phone number */}
                                    <td className="w-full truncate text-[#AFAFAF]">
                                        <span>{user.phone_num}</span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div >
        </>
    )
}