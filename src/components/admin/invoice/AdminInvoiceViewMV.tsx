// jshint esversion:6
import { PaidInvoiceType } from "@/data/admin/invoice/invoice"
import { getFormattedDate } from "@/utils/global"
import { InvoiceInfotype } from "@/pages/admin/invoices/AdminInvoicePage"
import { useAppSelector } from "@/hooks/typedHooks"
import { USERROLES } from "@/data/global/auth"
import { useNavigate } from "react-router-dom"

type InvoiceView = {
    invoiceData: PaidInvoiceType[]
    handleInvoiceClick: (data: InvoiceInfotype) => void
}

export const AdminInvoiceViewMV: React.FC<InvoiceView> = ({ invoiceData, handleInvoiceClick }) => {

    const { userProfile } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-col gap-y-5 mt-5 divide-y [&>*:first-child]:pt-0 cursor-pointer">
                {invoiceData.map((invoice: PaidInvoiceType, index: number) => {

                    // Due date
                    const { day: dayDue, monthShort: monthShortDue, year: yearDue } = getFormattedDate(new Date(invoice.due_date))

                    return (
                        <div key={index} className="pt-5" onClick={() => handleInvoiceClick({ status: true, data: invoice })}>

                            {/* Invoice info */}
                            <div className="font-Inter-Regular">
                                <div className="w-full flex justify-between items-center">
                                    <p className="font-Inter-Bold">{invoice.title}</p>
                                    {<span
                                        className={`${invoice.paid ? 'text-green-700' : 'text-brandColor'} self-end`}
                                    >
                                        {invoice.paid ? "Paid" : "Pending"}
                                    </span>}
                                </div>
                                <div className="mt-1 flex flex-col gap-y-1">
                                    <p className="text-sm flex gap-x-2">
                                        <span>To:</span>
                                        <span className="text-placeholder">{invoice.to_email}</span>
                                    </p>
                                    <p className="text-sm flex gap-x-2">
                                        <span>Due:</span>
                                        <span className="text-placeholder">{`${dayDue} ${monthShortDue}, ${yearDue}`}</span>
                                    </p>
                                    <p className="text-sm flex gap-x-2">
                                        <span>Amount:</span>
                                        <span className="">{Number(invoice.price).toLocaleString()}</span>
                                    </p>
                                    {userProfile?.role == USERROLES.USER &&
                                        invoice.paid == false && (
                                            <div className="w-full text-right truncate text-[#AFAFAF]">
                                                <button onClick={() => navigate("pay", { state: { invoice } })} className="px-2 py-1 text-white bg-brandColor rounded">Pay now</button>
                                            </div>
                                        )}
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        </>
    )
}