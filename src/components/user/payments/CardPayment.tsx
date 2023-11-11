// jshint esversion:6
import { FormEvent, useState, useEffect } from "react"
import { useCardPaymentHook } from "@/hooks/user/payment/cardPaymentHook"
import { PaidInvoiceType } from "@/data/admin/invoice/invoice"
import { Toast } from "@/components/global"
import { useNavigate } from "react-router-dom"

type CardDetailsType = {
    "cardno": string,
    "cvv": string,
    "expirymonth": string,
    "expiryyear": string,
    "pin": string
}

type CardTransferPayProp = {
    invoice: PaidInvoiceType
}

let timeoutId: any;

export const CardTransferPay: React.FC<CardTransferPayProp> = ({ invoice }) => {

    const navigate = useNavigate();

    // payment successful
    // const [paymentSuccessful, setPaymentSuccessful] = 

    // Define Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Set the card payments
    const [cardDetails, setCardDetails] = useState<CardDetailsType>({ cardno: "", cvv: '', expirymonth: '', expiryyear: '', pin: '' })

    // Card Payment hook
    const { cardTransferPay, isLoading, } = useCardPaymentHook();

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        }
    }, [])

    async function payWithCard() {
        const response = await cardTransferPay({ invoiceId: invoice.inv_id, ...cardDetails });

        if (!response.success) {
            setErrorMessage(response.message);
            timeoutId = setTimeout(() => {
                setErrorMessage(undefined);
            }, 3000)

            return;
        }

        console.log(response);

        // Successful payment, navigate to verify otp
        navigate("verify", { state: { invoice, paymentData: response.data } });

    }

    // const handleCardDisplay = () => {
    //     const rawText = [cardDetails.cardno.split(' ').join('')] // Remove old space
    //     const creditCard: string[] = [] // Create card as array
    //     rawText.forEach((t, i) => {
    //         if (i % 4 === 0 && i !== 0) creditCard.push(' ') // Add space
    //         creditCard.push(t)
    //     })
    //     return creditCard.join('') // Transform card array to string
    // }

    return (
        <div className="w-[320px] mx-auto">
            <form className="flex flex-col gap-y-4" onSubmit={(e: FormEvent) => {
                e.preventDefault();
                payWithCard();
            }}>
                {/* Card N0 */}
                <div>
                    <input
                        placeholder="Card number"

                        className="w-full border border-grey-300 rounded p-2 outline-none focus:border-brandColor" type="text" required

                        value={cardDetails.cardno}

                        maxLength={16}

                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardDetails((prev) => ({ ...prev, cardno: e.target.value }))}

                        // Ensure only digits from 1 to 9 is entered and nothing else
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/\s+/g, '');
                        }}

                    />
                </div>

                {/* Month - Year */}
                <div className="flex gap-x-5">
                    <div className="flex gap-x-2 items-center">
                        <input
                            placeholder="MM"

                            className=" w-[50px] flex justify-center border border-grey-300 rounded p-2 outline-none focus:border-brandColor" type="text" required

                            value={cardDetails.expirymonth}

                            maxLength={2}

                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardDetails((prev) => ({ ...prev, expirymonth: e.target.value }))}

                            // Ensure only digits from 1 to 9 is entered and nothing else
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/\s+/g, '');
                            }}

                        />

                        <span>/</span>

                        <input
                            placeholder="YY"

                            className=" w-[50px] flex justify-center border border-grey-300 rounded p-2 outline-none focus:border-brandColor" type="text" required

                            value={cardDetails.expiryyear}

                            maxLength={2}

                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardDetails((prev) => ({ ...prev, expiryyear: e.target.value }))}

                            // Ensure only digits from 1 to 9 is entered and nothing else
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/\s+/g, '');
                            }}

                        />
                    </div>

                    {/* CVV */}
                    <div>
                        <input
                            placeholder="CVV"

                            className="w-full border border-grey-300 rounded p-2 outline-none focus:border-brandColor" type="password" required

                            value={cardDetails.cvv}

                            maxLength={3}

                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardDetails((prev) => ({ ...prev, cvv: e.target.value }))}

                            // Ensure only digits from 1 to 9 is entered and nothing else
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/\s+/g, '');
                            }}

                        />
                    </div>
                </div>

                <div>
                    {/* CVV */}
                    <div>
                        <input
                            placeholder="Card Pin"

                            className="w-full border border-grey-300 rounded p-2 outline-none focus:border-brandColor" type="password" required

                            value={cardDetails.pin}

                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardDetails((prev) => ({ ...prev, pin: e.target.value }))}

                            // Ensure only digits from 1 to 9 is entered and nothing else
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/\s+/g, '');
                            }}

                        />
                    </div>
                </div>

                <button className="bg-brandColor font-Inter-Medium py-3 text-white rounded" type="submit">{isLoading ? "Paying..." : "Pay Now"}</button>
            </form>

            {errorMessage && (
                <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
            )}

        </div>
    )
}