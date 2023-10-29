// jshint esversion:6
import { PAYMENT_STATUS } from "@/data/admin/dashboard"
import { PaymentActivityType } from "@/data/admin/invoice"
import { PaymentActivity, PaymentActivityMV } from "."

const data: PaymentActivityType[] = [
    {
        name: "Paul Idenyi",
        invoiceID: "INV-0234",
        amount: "34654650",
        status: PAYMENT_STATUS.CANCELED,
        date: "12/34/2003"
    },
    {
        name: "Paul Idenyi",
        invoiceID: "INV-0234",
        amount: "345500",
        status: PAYMENT_STATUS.COMPLETED,
        date: "12/34/2003"
    },
    {
        name: "Paul Idenyi",
        invoiceID: "INV-0234",
        amount: "3444500",
        status: PAYMENT_STATUS.PENDING,
        date: "12/34/2003"
    },
    {
        name: "Paul Idenyi",
        invoiceID: "INV-0234",
        amount: "100000",
        status: PAYMENT_STATUS.CANCELED,
        date: "12/34/2003"
    },
]


export const PaymentActivityWrapper: React.FC = () => {
    return (
        <div>
            {/* Table Header */}
            <div className="flex justify-between font-CabinetGrotesk-Bold text-lg mb-3">
                <h4>Payment Activity</h4>
                {/* <Link to={""} className="py-0 border-b-[2px] border-black">See All</Link> */}
            </div>

            <div className="hidden sm:block">
                <PaymentActivity data={data} />
            </div>

            <div className="sm:hidden">
                <PaymentActivityMV data={data} />
            </div>
        </div>
    )
}