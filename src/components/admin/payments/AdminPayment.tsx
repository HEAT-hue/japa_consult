// jshint esversion:6
import { getFormattedDate } from "@/utils/global"
import { PaymentStatusColor } from "@/data/admin/invoice"
import { PaymentResponse } from "@/data/admin/payments"
import { PendingPaymentResponse } from "@/data/admin/payments"
import { PAYMENT_NAVIGATION } from "@/data/admin/payments"

type PaymentActivityProp = {
    data: PaymentResponse[] | PendingPaymentResponse[]
    type: PAYMENT_NAVIGATION
    handlePaymentClick(payment: PaymentResponse | PendingPaymentResponse): void
}

export const AdminPayment: React.FC<PaymentActivityProp> = ({ data, type: PaymentType, handlePaymentClick }) => {

    const { day, monthShort, year } = getFormattedDate(new Date())

    return (
        <>
            <>
                {/* Table */}
                <div className="w-full h-full mt-3 relative">
                    <table className="w-full border-spacing-1 table-fixed px-5 py-3">

                        {/* Table header */}
                        <thead>
                            <tr className="font-Inter-Bold [&>*]:p-2 [&>*]:py-4 pointer-events-none">
                                <th className="text-sm font-medium text-left w-[12%]">
                                    <span>Name</span>
                                </th>
                                <th className="text-sm font-medium text-left w-[9%]">
                                    <span>Invoice ID</span>
                                </th>
                                <th className="text-sm font-medium text-left w-[9%]">
                                    <span>Amount</span>
                                </th>
                                <th className="text-sm font-medium text-left w-[10%]">
                                    <span>Status</span>
                                </th>
                                <th className="text-sm font-medium text-left w-[10%]">
                                    <span>Date</span>
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y-[1px] font-Manrope-Regular">
                            {data.map((paymentData: PaymentResponse | PendingPaymentResponse, index: number) => {

                                return (

                                    // Trade Item Data
                                    <tr
                                        key={index}
                                        className="font-Manrope-Regular text-[15px] [&>*]:p-2 [&>*]:py-3 cursor-pointer"
                                        onClick={() => handlePaymentClick(paymentData)}
                                    >
                                        <td className={`w-full truncate capitalize`}>
                                            {PaymentType == PAYMENT_NAVIGATION.ALL &&  (
                                                <span>{`${(paymentData as PaymentResponse)?.paid_by.toLowerCase() ?? "<no name>"}`}</span>
                                            )}
                                            {PaymentType == PAYMENT_NAVIGATION.PENDING && (
                                                // <span>{`${(paymentData as PendingPaymentResponse).paid_by.toLowerCase() ?? "<no name>"}`}</span>
                                                <span>{`John Doe`}</span>
                                            )}
                                        </td>
                                        <td className="w-full truncate capitalize">
                                            <span>{paymentData.invoice_id}</span>
                                        </td>
                                        <td className="w-full truncate text-[#AFAFAF]">
                                            {PaymentType == PAYMENT_NAVIGATION.ALL && (
                                                <span>{`${Number((paymentData as PaymentResponse).amount).toLocaleString() ?? "N / A"}`}</span>
                                            )}
                                            {PaymentType == PAYMENT_NAVIGATION.PENDING && (
                                                <span>N / A</span>
                                            )}
                                        </td>
                                        <td className={`w-full truncate capitalize`}>
                                            <span
                                                className="rounded-full py-1 px-3 flex gap-x-2 items-center w-max"
                                                style={{
                                                    color: PaymentStatusColor[paymentData.paid ? "completed" : "pending"]?.color ?? "#333",
                                                    backgroundColor: PaymentStatusColor[paymentData.paid ? "completed" : "pending"]?.backgroundColor ?? "#fff"
                                                }}
                                            >
                                                <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: PaymentStatusColor[paymentData.paid ? "completed" : "pending"]?.color ?? "#333" }}></div>
                                                {(paymentData.paid ? "completed" : "pending").toLocaleLowerCase()}
                                            </span>
                                        </td>
                                        <td className="w-full truncate text-[#AFAFAF]">
                                            <span>{`${day} ${monthShort}, ${year}`}</span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div >
            </>
        </>
    )
}