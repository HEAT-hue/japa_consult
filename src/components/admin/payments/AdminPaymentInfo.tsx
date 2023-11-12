// jshint esversion:6
import PaymentIcon from "@/assets/payments/payment.png"
import PaidInvoiceIcon from "@/assets/admin/Done.svg"
import { getFormattedDate } from "@/utils/global"
import { PaymentResponse } from "@/data/admin/payments"
import { PAYMENT_STATUS } from "@/data/admin/dashboard"

type AdminInvoiceInfoProp = {
    paymentData: PaymentResponse
}

function getPaymentDate(date: Date) {
    const { day, monthShort, year } = getFormattedDate(new Date(date))
    return `${day} ${monthShort}, ${year}`
}

export const AdminPaymentInfo: React.FC<AdminInvoiceInfoProp> = ({ paymentData }) => {

    return (
        <div className="w-[300px] sm:p-5 bg-white flex flex-col items-center gap-y-5 rounded-lg">
            <h1 className="font-Inter-Bold text-lg">{paymentData.title ?? "Payment"}</h1>
            <div className="relative flex items-start">
                <img src={PaymentIcon} className="w-[70px] h-[60px]" alt="invoice" />

                {paymentData.status == PAYMENT_STATUS.PAID && (
                    <img src={PaidInvoiceIcon} alt="paid" />
                )}
            </div>

            {/* Status */}
            <p
                className={`${paymentData.status == PAYMENT_STATUS.PAID && 'text-green-700'} ${paymentData.status == PAYMENT_STATUS.PENDING && 'text-brandColor'} ${paymentData.status == PAYMENT_STATUS.CANCELLED && 'text-error'} self-end`}
            >
                {paymentData.status == PAYMENT_STATUS.PAID && (
                    <span>Paid</span>
                )}

                {paymentData.status == PAYMENT_STATUS.PENDING && (
                    <span>Pending</span>
                )}

                {paymentData.status == PAYMENT_STATUS.CANCELLED && (
                    <span>Cancelled</span>
                )}
            </p>

            {/* Invoice details */}
            <div className="w-full border-t border-t-placeholder py-3 flex flex-col gap-y-1 mt-[-1rem] text-sm">

                {/* Ref ID */}
                <div className=" flex justify-between">
                    <p className="text-placeholder">Ref ID:</p>
                    <span className="text-black">{paymentData.ref_id}</span>
                </div>

                {/* Rave Ref ID */}
                <div className=" flex justify-between">
                    <p className="text-placeholder">Rave Ref ID</p>
                    <span className="text-black">{paymentData.rave_txRef}</span>
                </div>

                {/* User */}
                <div className=" flex justify-between">
                    <p className="text-placeholder">Payer Email:</p>
                    <span className="text-black">{paymentData.payer_email}</span>
                </div>

                {/* Amount At */}
                {paymentData.status == PAYMENT_STATUS.PAID && (
                    <div className=" flex justify-between">
                        <p className="text-placeholder">Amount:</p>
                        <span className="text-black">{Number((paymentData as PaymentResponse).amount).toLocaleString()}</span>
                    </div>
                )}

                {/* Created At */}
                {paymentData.status == PAYMENT_STATUS.PAID && (
                    <div className=" flex justify-between">
                        <p className="text-placeholder">Paid At:</p>
                        {paymentData.paid_at != null ? (
                            <span className="text-black">{getPaymentDate((paymentData).paid_at)}</span>
                        ) : (
                            <span>N/A</span>
                        )}
                    </div>
                )}

                {/* Payment Type */}
                {paymentData.status == PAYMENT_STATUS.PAID && (
                    <div className=" flex justify-between">
                        <p className="text-placeholder">Mode:</p>
                        <span className="text-black">{(paymentData as PaymentResponse).payment_type}</span>
                    </div>
                )}

            </div>
        </div>
    )
}