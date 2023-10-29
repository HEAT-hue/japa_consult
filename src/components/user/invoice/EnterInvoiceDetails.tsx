// jshint esversion:6
import { INVOICE_TYPE } from "@/data/users/invoice"
import { useState, useEffect } from "react"
import { useAppSelector } from "@/hooks/typedHooks"

type SelectInvoiceProp = {
    invoiceType?: INVOICE_TYPE | undefined
    amount?: string | undefined
    setAmount: React.Dispatch<React.SetStateAction<string | undefined>>
    next: () => void
    prev: () => void
}

export const EnterInvoiceDetails: React.FC<SelectInvoiceProp> = ({ invoiceType, amount, setAmount, prev }) => {

    const [enteredAmount, setEnteredAmount] = useState<string | undefined>(amount);

    // Get user email
    const { userProfile } = useAppSelector((state) => state.auth);

    console.log(userProfile);

    const [errorState, setErrorState] = useState<boolean>(false);

    // Clear error state
    useEffect(() => {
        if (enteredAmount) {
            setErrorState(false);
        }
    }, [enteredAmount])

    function submit() {
        if (!enteredAmount) {
            setErrorState(true);
            return;
        }

        // Set the amount
        setAmount(enteredAmount);

        // Call next form
        // next();
    }

    return (
        <>
            <h1 className="font-Inter-Bold text-center text-2xl">Enter Invoice Details</h1>

            <div className="flex justify-center gap-x-3 mt-9">
                <div className="w-[300px] sm:w-[400px] flex flex-col gap-y-5">

                    {/* Email Input */}
                    <div className="flex flex-col sm:flex-row gap-y-1 justify-between sm:items-center">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="w-full sm:w-[280px] border rounded p-2 text-[#666666]" value={userProfile?.email} disabled />
                    </div>

                    {/* Invoice Type */}
                    <div className="flex flex-col sm:flex-row gap-y-1 justify-between sm:items-center">
                        <label htmlFor="email">Invoice Type:</label>
                        <input type="text" className="w-full sm:w-[280px] border rounded p-2 text-[#666666]" value={invoiceType} disabled />
                    </div>

                    {/* Invoice Type */}
                    <div className="flex flex-col sm:flex-row gap-y-1 justify-between sm:items-center">
                        <label htmlFor="email">Amount</label>
                        <input
                            type="tel"

                            // Ensure only digits from 1 to 9 is entered and nothing else
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
                            }}

                            // Set the Amount
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setEnteredAmount(e.target.value);
                            }}

                            className={`w-full sm:w-[280px] border ${errorState && "border-error"} outline-none focus:border-brandColor rounded p-2 text-[#666666]`} value={Number(enteredAmount ?? 0).toLocaleString()} />
                    </div>

                    {/* Next Form */}
                    <div className="w-full flex gap-x-5 mt-4">
                        <button type="button" onClick={prev} className="font-Inter-Bold bg-white text-brandColor border border-brandColor p-3 text-sm rounded w-max">Go Back</button>
                        <button type="button" onClick={submit} className="font-Inter-Bold bg-brandColor text-white p-3 text-sm rounded w-max">Generate</button>
                    </div>
                </div>
            </div>
        </>
    )
}