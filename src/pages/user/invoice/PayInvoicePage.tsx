// jshint esversion:6
import { useLocation } from "react-router-dom"
import { Navigate } from "react-router-dom";
import { PAYMENT_METHOD } from "@/data/global/payment";
import { useState } from "react";
import cardIcon from "@/assets/payments/creditcard.svg";
import cardIconDark from "@/assets/payments/creditcardDark.svg";
import bankIcon from "@/assets/payments/bank.svg";
import bankDarkIcon from "@/assets/payments/bankDark.svg";
import { BankTransferPay, CardTransferPay } from "@/components/user/payments";
import { PaidInvoiceType } from "@/data/admin/invoice/invoice";


export const PayInvoicePage: React.FC = () => {
    // Get State from Page
    const { state } = useLocation();

    const invoice = (state?.invoice as PaidInvoiceType)

    if (state == null || !invoice) {
        return <Navigate to={"/invoice"} />
    }

    const [paymentMethod, setPaymentmethod] = useState<PAYMENT_METHOD>(PAYMENT_METHOD.CARD)


    return (
        <>
            <div className="pt-9 sm:pt-3">
                <div className="bg-white p-7 px-5 sm:p-9 mx-[-15px] rounded h-[85vh] overflow-scroll">
                    {/* Invoice details */}
                    <div className="flex flex-col gap-y-1">
                        <h1 className="text-xl font-Inter-Bold">{invoice.title}</h1>

                        <div className="flex">
                            <span>&#8358;</span>
                            <p>{`${Number(invoice.price).toLocaleString()}`}</p>
                        </div>
                    </div>

                    <h1 className="text-lg text-center font-Inter-Bold mt-2">Select method of Payment</h1>

                    {/* Payment method navigation */}
                    <div className="mt-3 w-full flex justify-center [&>*]:flex-shrink-0 cursor-pointer">

                        {/* Card Transfer */}
                        <div onClick={() => setPaymentmethod(PAYMENT_METHOD.CARD)} className={`w-[160px] p-3 rounded-l border border-brandColor flex items-center gap-x-2 ${paymentMethod == PAYMENT_METHOD.CARD ? "text-white bg-brandColor" : "text-pry bg-white"}`}>
                            <img src={paymentMethod == PAYMENT_METHOD.CARD ? cardIcon : cardIconDark} alt="" />

                            <p>Credit card</p>
                        </div>

                        {/* Bank Transfer */}
                        <div onClick={() => setPaymentmethod(PAYMENT_METHOD.BANK_TRANSFER)} className={`w-[160px] p-3 rounded-r border border-brandColor flex items-center gap-x-2 ${paymentMethod == PAYMENT_METHOD.BANK_TRANSFER ? "text-white bg-brandColor" : "text-pry bg-white"}`}>
                            <img src={paymentMethod == PAYMENT_METHOD.BANK_TRANSFER ? bankIcon : bankDarkIcon} alt="" />

                            <p>Bank Transfer</p>
                        </div>
                    </div>

                    {/* Payment method */}
                    <section className="mt-5">
                        {paymentMethod == PAYMENT_METHOD.BANK_TRANSFER && (
                            <BankTransferPay invoice={invoice} />
                        )}

                        {paymentMethod == PAYMENT_METHOD.CARD && (
                            <div className="pt-5">
                                <CardTransferPay invoice={invoice} />
                            </div>
                        )}
                    </section>

                </div>
            </div>
        </>
    )
}