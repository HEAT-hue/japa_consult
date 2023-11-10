// jshint esversion:6
import { getFormattedDate } from "@/utils/global"
import { PaymentStatusColor } from "@/data/admin/invoice"
import { PaymentResponse } from "@/data/admin/payments"
import { PendingPaymentResponse } from "@/data/admin/payments"
import { PAYMENT_NAVIGATION } from "@/data/admin/payments"


type PaymentActivityMVProp = {
    data: PaymentResponse[] | PendingPaymentResponse[]
    type: PAYMENT_NAVIGATION
    handlePaymentClick(payment: PaymentResponse | PendingPaymentResponse): void
}

export const AdminPaymentMV: React.FC<PaymentActivityMVProp> = ({ data, type: PaymentType, handlePaymentClick }) => {


    return (
        <div className="flex flex-col gap-y-2 divide-y divide-gray-300">
            {
                data.map((paymentData: PaymentResponse | PendingPaymentResponse, index: number) => {

                    const { day, monthShort, year } = getFormattedDate(new Date())

                    return (
                        <div key={index} className="p-4 px-5 flex justify-between" onClick={() => handlePaymentClick(paymentData)}>
                            <div className="flex flex-col gap-y-1">

                                {/* Invoice number */}
                                <p className="text-placeholder text-sm">{paymentData.invoice_id}</p>

                                {/* Payer Name */}
                                <p className="font-Inter-Bold text-lg">
                                    {PaymentType == PAYMENT_NAVIGATION.ALL && (
                                        <span>{`${(paymentData as PaymentResponse).paid_by.toLowerCase() ?? "<no name>"}`}</span>
                                    )}
                                    {PaymentType == PAYMENT_NAVIGATION.PENDING && (
                                        // <span>{`${(paymentData as PendingPaymentResponse).paid_by.toLowerCase() ?? "<no name>"}`}</span>
                                        <span>{`John Doe`}</span>
                                    )}
                                </p>

                                {/* Time */}
                                <p className="text-placeholder text-sm">{`Date: ${day} ${monthShort}, ${year}`}</p>
                            </div>

                            <div className="flex flex-col gap-y-1 items-end">

                                {/* Status */}
                                <p className="rounded flex justify-between items-center p-2 py-1 gap-x-3 text-sm" style={{
                                    color: PaymentStatusColor[paymentData.paid ? "completed" : "pending"]?.color ?? "#333",
                                    backgroundColor: PaymentStatusColor[paymentData.paid ? "completed" : "pending"]?.backgroundColor ?? "#fff"
                                }}>
                                    <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: PaymentStatusColor[paymentData.paid ? "completed" : "pending"]?.color ?? "#333" }}></div>
                                    {(paymentData.paid ? "completed" : "pending").toLocaleLowerCase()}
                                </p>

                                {/* Amount */}
                                <p>
                                    {/* <span>&#8358;</span>
                                    <span>{`${Number(activity.amount).toLocaleString()}`}</span> */}
                                    {PaymentType == PAYMENT_NAVIGATION.ALL && (
                                        <span>{`${Number((paymentData as PaymentResponse).amount).toLocaleString() ?? "N / A"}`}</span>
                                    )}
                                    {PaymentType == PAYMENT_NAVIGATION.PENDING && (
                                        <span>N / A</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}