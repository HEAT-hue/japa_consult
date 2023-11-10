// jshint esversin:6
import { useBankTransferPayHook } from "@/hooks/user/payment/bankTransferPayHook"
import { CSSProperties, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { BankTransferPaymentResponse } from "@/data/users/payments";
import { ReceiptSVG } from "@/components/global/svg/invoice";
import { PaidInvoiceType } from "@/data/admin/invoice/invoice";
import copyIcon from "@/assets/payments/copyIcon.svg";
import { convertMsToTime } from "@/utils/global";
import { useLazyVerifyTransferQuery } from "@/app/services/user/payments";
import { Toast } from "@/components/global";
import { getErrorMessage } from "@/utils/global";
import { PaymentNotification } from ".";
import { Modal } from "@/components/global";
import { useNavigate } from "react-router-dom";

type BankTransferPayProp = {
    invoice: PaidInvoiceType
}

const override: CSSProperties = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "red",
};

let timeoutId: any;

export const BankTransferPay: React.FC<BankTransferPayProp> = ({ invoice }) => {

    const invoiceId = invoice.inv_id;

    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const [bankDetails, setBankDetails] = useState<BankTransferPaymentResponse | undefined>(undefined);

    // Verfy Transfer
    const [verifyTransfer, { isLoading: isVerificationLoading, isSuccess: isVerifyTransferSuccess }] = useLazyVerifyTransferQuery()

    const { bankTransferPay, isLoading, isError } = useBankTransferPayHook();

    useEffect(() => {
        (async function () {
            const response = await bankTransferPay({ invoiceId })

            if (!response.success) {
                setErrorMessage(response.message)
                return;
            }

            // Success
            setBankDetails(response.data as BankTransferPaymentResponse);
        })()

        return () => {
            clearTimeout(timeoutId);
        }
    }, [])

    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center">
                <div className="my-[5rem] mx-auto">
                    <BeatLoader
                        color={"#E1AE3C"}
                        loading={true}
                        cssOverride={override}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="h-[30vh] flex flex-col justify-center items-center gap-y-5">

                {/* No file found Icon */}
                <div className="text-error">
                    <ReceiptSVG width={64} height={64} />
                </div>

                {/* No files found */}
                <p className="flex items-center justify-center gap-x-2 text-placeholder text-xl">{errorMessage}</p>
            </div>
        )
    }

    async function verifyUserTransfer() {
        try {
            const data = await verifyTransfer({ refId: bankDetails?.ref_id ?? "" }).unwrap();
            console.log(data)
        } catch (error) {

            setErrorMessage(getErrorMessage(error));

            timeoutId = setTimeout(() => (
                setErrorMessage(undefined)
            ), 3000)
        }
    }

    return (
        <>
            <div className="w-[350px] bg-[#F6F6F6] mx-auto p-6 flex flex-col gap-y-4 rounded-md">
                <div>
                    <h2 className="text-xs font-Inter-Regular">Bank Name</h2>
                    <p className="font-Inter-Bold text-lg">{bankDetails?.bank_name ?? "No Bank name"}</p>
                </div>
                <div>
                    <h2 className="text-xs font-Inter-Regular">Account Number</h2>
                    <div className="flex justify-between">
                        <p className="font-Inter-Bold text-lg">{bankDetails?.bank_account ?? "No acct"}</p>
                        <img className="cursor-pointer" src={copyIcon} alt="copy" />
                    </div>
                </div>
                <div>
                    <h2 className="text-xs font-Inter-Regular">Amount</h2>
                    <p className="font-Inter-Bold text-lg">{Number(invoice.price).toLocaleString()}</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-y-5">
                {/* Expiry */}
                <div className="text-center mt-3">
                    <p>Expires in <span className="text-brandColor">{convertMsToTime(bankDetails?.expires_in ?? 1699487109095)}</span> </p>
                </div>

                {/* Button confirmation */}
                <button onClick={verifyUserTransfer} className="w-[300px] rounded border border-brandColor py-2 px-9 text-brandColor">{isVerificationLoading ? "Verifying..." : "I’ve made the transfer"}</button>
            </div>


            {/* Error message */}
            {errorMessage && (
                <>
                    <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
                    <Modal closeModal={() => setErrorMessage(undefined)}>
                        <PaymentNotification error errorMessage={errorMessage} buttonTitle="Close" action={() => setErrorMessage(undefined)} />
                    </Modal>
                </>
            )}

            {isVerifyTransferSuccess && (
                <Modal closeModal={() => navigate("/invoice")}>
                    <PaymentNotification buttonTitle="Close" action={() => navigate("/invoice")} />
                </Modal>
            )}
        </>
    )
}