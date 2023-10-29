// jshint esversion:6
import { Link } from "react-router-dom"

export const InvoicePage: React.FC = () => {
    return (
        <div className="pt-3">
            <div className="sm:m-5 bg-white p-9 rounded-lg h-[80vh]">
                <h1 className="font-Inter-Bold sm:text-center text-2xl">Invoice Payment</h1>

                <div className="flex flex-col sm:flex-row justify-center gap-5 mt-5">
                    {/* Generate invoice */}
                    <Link to={"create"}
                        className="py-[0.8rem]  w-[150px] border border-brandColor text-brandColor rounded-3xl flex justify-center items-center text-[15px]"
                    >Generate Invoice</Link>

                    {/* Make payments */}
                    <Link to={"pay"}
                        className="py-[0.8rem]  w-[150px] bg-brandColor text-white flex justify-center items-center rounded-3xl text-[15px]"
                    >Pay Now</Link>
                </div>
            </div>
        </div>
    )
}