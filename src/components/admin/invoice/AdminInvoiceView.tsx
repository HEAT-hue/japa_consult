// jshint esversion:6
import { PaidInvoiceType } from "@/data/admin/invoice/invoice"
import { getFormattedDate } from "@/utils/global"
import { InvoiceInfotype } from "@/pages/admin/invoices/AdminInvoicePage"

type InvoiceView = {
    invoiceData: PaidInvoiceType[]
    handleInvoiceClick: (data: InvoiceInfotype) => void
}

export const AdminInvoiceView: React.FC<InvoiceView> = ({ invoiceData, handleInvoiceClick }) => {

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
                                    <td className={`w-full truncate capitalize`}>
                                        <span>{invoice.title}</span>
                                    </td>
                                    <td className="w-full truncate capitalize">
                                        <span>{Number(invoice.price).toLocaleString()}</span>
                                    </td>
                                    <td className="w-full truncate text-[#AFAFAF]">
                                        <span>{invoice.to_email}</span>
                                    </td>
                                    <td className={`w-full truncate capitalize`}>
                                        {<span
                                            className={`${invoice.paid ? 'text-green-700' : 'text-brandColor'} self-end`}
                                        >
                                            {invoice.paid ? "Paid" : "Pending"}
                                        </span>}
                                    </td>
                                    <td className="w-full truncate text-[#AFAFAF]">
                                        <span>{`${dayDue} ${monthShortDue}, ${yearDue}`}</span>
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