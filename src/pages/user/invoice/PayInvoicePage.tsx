// jshint esversion:6
import { useLocation } from "react-router-dom"
import { Navigate } from "react-router-dom";
import UnderDevelopmentImg from "@/assets/global/underDevelopment.png";

export const PayInvoicePage: React.FC = () => {
    // Get State from Page
    const { state } = useLocation();

    const invoice = state?.invoice

    if (state == null || !invoice) {
        return <Navigate to={"/invoice"} />
    }



    return (
        <>
            <div className="pt-9 sm:pt-3">
                <div className="bg-white p-7 px-5 sm:p-9 rounded h-[85vh] overflow-scroll">
                    <h1 className="text-xl text-center font-Inter-Bold">Select method of Payment</h1>

                    <div className="h-[50vh] mt-9 flex flex-col justify-center items-center gap-">
                        <img src={UnderDevelopmentImg} className="w-[300px] h-[300px]" alt="Page coming soon..." />

                        <p className="mt-2 text-gray-500 text-lg">Page currently under development....</p>
                    </div>
                </div>
            </div>
        </>
    )
}