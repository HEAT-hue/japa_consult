// jshint esversion:6
import { PaidInvoiceType } from "@/data/admin/invoice/invoice"
import { getFormattedDate } from "@/utils/global"
import { InvoiceInfotype } from "@/pages/admin/invoices/AdminInvoicePage"
import { useAppSelector } from "@/hooks/typedHooks"
import { USERROLES } from "@/data/global/auth"
import { useNavigate } from "react-router-dom"
import checkBoxIcon from "@/assets/admin/checkbox.png";
import { TrashSVG } from "@/components/global/svg/trash"
// import { useLazyVerifyPaymentQuery } from "@/app/services/user/payments"
// import { PAYMENT_STATUS } from "@/data/admin/dashboard"

type InvoiceView = {
    invoiceData: PaidInvoiceType[]
    handleInvoiceClick: (data: InvoiceInfotype) => void
    deleteInvoice?: (invoiceId: string) => void
}

export const AdminInvoiceView: React.FC<InvoiceView> = ({ invoiceData, handleInvoiceClick, deleteInvoice }) => {

    const navigate = useNavigate();

    // // Verfy Transfer
    // const [verifyPayment, { isLoading: isVerificationLoading }] = useLazyVerifyPaymentQuery()

    // function verifyInvoicePayment(invoiceId: string) {

    // }

    const { userProfile } = useAppSelector((state) => state.auth);

    return (
        <>
            <div className="w-full h-full mt-3 relative">
                <table className="w-full border-spacing-1 table-fixed  rounded-t-[20px] px-5 py-3">

                    {/* Table header */}
                    <thead>
                        <tr className="font-Inter-Bold [&>*]:p-2 [&>*]:py-4 pointer-events-none">

                            <th className="text-sm font-medium text-left w-[12%]">
                                <span>Title</span>
                            </th>

                            <th className="text-sm font-medium text-left w-[7%]">
                                <span>Amount</span>
                            </th>

                            <th className="text-sm font-medium text-left w-[15%]">
                                <span>User</span>
                            </th>

                            <th className="text-sm font-medium text-left w-[8%]">
                                <span>Status</span>
                            </th>

                            <th className="text-sm font-medium text-left w-[10%]">
                                <span>Date due</span>
                            </th>

                            {/* 
                            {userProfile?.role == USERROLES.USER && (
                                <th className="text-sm font-medium text-left w-[8%]">
                                    <span>Action</span>
                                </th>
                            )} */}

                            {(userProfile?.role == USERROLES.ADMIN || userProfile?.role == USERROLES.MANAGER || userProfile?.role == USERROLES.USER) && (
                                <th className="text-sm font-medium text-left w-[8%]">
                                    <span>Action</span>
                                </th>
                            )}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y-[1px] font-Manrope-Regular">
                        {invoiceData.map((invoice: PaidInvoiceType, index: number) => {

                            // Due date
                            const { day: dayDue, monthShort: monthShortDue, year: yearDue } = getFormattedDate(new Date(invoice.due_date))

                            return (
                                // Trade Item Data
                                <tr
                                    key={index}
                                    className="font-Manrope-Regular text-[15px] [&>*]:p-2 [&>*]:py-3 cursor-pointer"
                                    onClick={() => handleInvoiceClick({ status: true, data: invoice })}
                                >
                                    {/* Title */}
                                    <td className={`w-full truncate capitalize`}>
                                        <span>{invoice.title}</span>
                                    </td>

                                    {/* Price */}
                                    <td className="w-full truncate capitalize">
                                        <span>{Number(invoice.price).toLocaleString()}</span>
                                    </td>

                                    {/* Email */}
                                    <td className="w-full truncate text-[#AFAFAF]">
                                        <span>{invoice.to_email}</span>
                                    </td>

                                    {/* Invoice status */}
                                    <td className={`w-full truncate capitalize`}>
                                        {<span
                                            className={`${invoice.paid ? 'text-green-700' : 'text-brandColor'} self-end`}
                                        >
                                            {invoice.paid ? "Paid" : "Pending"}
                                        </span>}
                                    </td>

                                    {/* Due date */}
                                    <td className="w-full truncate text-[#AFAFAF]">
                                        <span>{`${dayDue} ${monthShortDue}, ${yearDue}`}</span>
                                    </td>

                                    {(userProfile?.role == USERROLES.USER) &&
                                        (
                                            invoice.paid == false ? (
                                                <td className="w-full truncate text-[#AFAFAF]">
                                                    <button onClick={() => navigate("pay", { state: { invoice } })} className="px-2 py-1 text-white bg-brandColor rounded">Pay now</button>
                                                </td>
                                            ) : (
                                                <img className="w-[40px] h-[48px]" src={checkBoxIcon} alt="sel" />
                                            )
                                        )
                                    }

                                    {/* Trash icon */}
                                    {(userProfile?.role == USERROLES.ADMIN || userProfile?.role == USERROLES.MANAGER) && deleteInvoice && (
                                        <td className="w-full truncate text-error" onClick={(e: any) => {
                                            // Stop propagation
                                            e.stopPropagation();
                                            deleteInvoice(invoice.inv_id)
                                        }}>
                                            <TrashSVG />
                                        </td>
                                    )}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div >
        </>
    )
}