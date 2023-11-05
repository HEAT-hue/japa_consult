// jshint esversion:6
import { PaidInvoiceType } from "@/data/admin/invoice/invoice"
import { getFormattedDate } from "@/utils/global"
import { AdminInvoiceInfo } from "."
import { useState } from "react"
import { Modal } from "@/components/global"

type InvoiceView = {
    invoiceData: PaidInvoiceType[]
}

type InvoiceInfotype = {
    status: boolean,
    data: PaidInvoiceType | undefined
}

export const AdminInvoiceView: React.FC<InvoiceView> = ({ invoiceData }) => {

    const [invoiceInfo, setInvoiceInfo] = useState<InvoiceInfotype>({ status: false, data: undefined });

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

                            console.log(invoice);

                            return (
                                // Trade Item Data
                                <tr
                                    key={index}
                                    className="font-Manrope-Regular text-[15px] [&>*]:p-2 [&>*]:py-3 cursor-pointer"
                                    onClick={() => setInvoiceInfo({ status: true, data: invoice })}
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

            {/* More Info about Invoice */}
            {invoiceInfo.status && invoiceInfo.data && (
                <Modal bare closeModal={() => setInvoiceInfo({ status: false, data: undefined })}>
                    <AdminInvoiceInfo invoice={invoiceInfo.data} />
                </Modal>
            )}
        </>
    )
}