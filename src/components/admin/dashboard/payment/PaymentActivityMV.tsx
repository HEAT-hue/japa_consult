// jshint esversion:6
import { PaymentActivityType } from "@/data/admin/invoice"
import { getFormattedDate } from "@/utils/global"
import { PaymentStatusColor } from "@/data/admin/invoice"

type PaymentActivityMVProp = {
    data: PaymentActivityType[]
}

export const PaymentActivityMV: React.FC<PaymentActivityMVProp> = ({ data }) => {


    return (
        <div className="flex flex-col gap-y-2">
            {
                data.map((activity: PaymentActivityType, index: number) => {
                    const { day, monthShort, year } = getFormattedDate(new Date())

                    return (
                        <div key={index} className="bg-white p-3 px-5 rounded flex justify-between">
                            <div className="flex flex-col gap-y-1">
                                <p className="text-placeholder text-sm">{activity.invoiceID}</p>
                                <p className="font-Inter-Bold text-lg">{activity.name}</p>
                                <p className="text-placeholder text-sm">{`Date: ${day} ${monthShort}, ${year}`}</p>
                            </div>
                            <div className="flex flex-col gap-y-1 items-end">
                                {/* Status */}
                                <p className="rounded flex justify-between items-center p-2 py-1 gap-x-3 text-sm" style={{
                                    color: PaymentStatusColor[activity.status]?.color ?? "#333",
                                    backgroundColor: PaymentStatusColor[activity.status]?.backgroundColor ?? "#fff"
                                }}>
                                    <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: PaymentStatusColor[activity.status]?.color ?? "#333" }}></div>
                                    {activity.status.toLocaleLowerCase()}
                                </p>

                                {/* Amount */}
                                <p>
                                    <span>&#8358;</span>
                                    <span>{`${Number(activity.amount).toLocaleString()}`}</span>
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}