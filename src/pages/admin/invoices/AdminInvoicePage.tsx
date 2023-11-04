// jshint esversion:6
import { Link } from "react-router-dom"
import PlusIcon from "@/assets/global/Plus.svg";
import { useGetAllInvoiceQuery } from "@/app/services/admin/invoice";
import { useGetPendingInvoiceQuery } from "@/app/services/admin/invoice";
import { useGetPaidInvoiceQuery } from "@/app/services/admin/invoice";
import { CSSProperties, useState } from "react";
// import { BeatLoader } from "react-spinners";
import { INVOICE_NAVIGATION } from "@/data/global";
import { PaidInvoiceType } from "@/data/admin/invoice/invoice";

// const override: CSSProperties = {
//     display: "inline-block",
//     margin: "0 auto",
//     borderColor: "red",
// };


export const AdminInvoicePage: React.FC = () => {

    const { data: AllInvoiceData, isLoading: isAllInvoiceLoading } = useGetAllInvoiceQuery()
    const { data: PendingInvoiceData, isLoading: isPendingInvoiceLoading } = useGetPendingInvoiceQuery()
    const { data: PaidInvoiceData, isLoading: isPaidInvoiceLoading } = useGetPaidInvoiceQuery()

    const [invoiceType, setInvoiceType] = useState<INVOICE_NAVIGATION>(INVOICE_NAVIGATION.ALL);
    const [invoiceData, setInvoiceData] = useState<PaidInvoiceType[]>([])

    function handleNavigationClick(navigation: INVOICE_NAVIGATION) {
        switch (navigation) {
            case INVOICE_NAVIGATION.ALL: {
                if (AllInvoiceData) {
                    setInvoiceData(AllInvoiceData)
                }
                setInvoiceType(INVOICE_NAVIGATION.ALL)
                break;
            }
            case INVOICE_NAVIGATION.PENDING: {
                if (PendingInvoiceData) {
                    setInvoiceData(PendingInvoiceData)
                }
                setInvoiceType(INVOICE_NAVIGATION.PENDING)
                break;
            }
            case INVOICE_NAVIGATION.PAID: {
                if (PaidInvoiceData) {
                    setInvoiceData(PaidInvoiceData)
                }
                setInvoiceType(INVOICE_NAVIGATION.PAID)
                break;
            }
            default:
                if (AllInvoiceData) {
                    setInvoiceData(AllInvoiceData)
                }
                setInvoiceType(INVOICE_NAVIGATION.ALL)
                break;
        }
    }

    return (
        <div className="py-5">
            
            {/* Create Invoice */}
            <Link to={"create"}>
                <div className="w-[100px] h-[100px] bg-white flex items-center justify-center rounded-md border border-gray-200">
                    <img src={PlusIcon} alt="Add note" />
                </div>
                <p className="font-Inter-Regular text-sm mt-2">Create Invoice</p>
            </Link>


            {/* Invoive Navigation */}
            {/* <div className="flex gap-x-3 mt-5">
                <h3 onClick={() => handleNavigationClick(INVOICE_NAVIGATION.ALL)} className={`cursor-pointer w-max py-1 ${invoiceType == INVOICE_NAVIGATION.ALL && "border-b-[2px] border-brandColor"}`}>All Invoices</h3>
                <h3 onClick={() => handleNavigationClick(INVOICE_NAVIGATION.PAID)} className={`cursor-pointer w-max py-1 ${invoiceType == INVOICE_NAVIGATION.PAID && "border-b-[2px] border-brandColor"}`}>Paid Invoices</h3>
                <h3 onClick={() => handleNavigationClick(INVOICE_NAVIGATION.PENDING)} className={`cursor-pointer w-max py-1 ${invoiceType == INVOICE_NAVIGATION.PENDING && "border-b-[2px] border-brandColor"}`}>Pending Invoices</h3>
            </div> */}

            {/* Invoice Data Wrapper */}
        </div>
    )
}