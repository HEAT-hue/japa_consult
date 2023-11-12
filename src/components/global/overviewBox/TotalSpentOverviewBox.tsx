// jshint esversion:6
import { useGetPaidInvoiceQuery } from "@/app/services/admin/invoice"
import RevenueIcon from "@/assets/user/wallet.svg";

export const TotalSpentOverviewBox: React.FC = () => {

    const { data: PaidInvoiceData, isLoading: isTotalRevenueLoading } = useGetPaidInvoiceQuery();

    let totalRevenue = 0;

    PaidInvoiceData?.forEach((invoice) => {
        if (invoice.paid) {
            totalRevenue += invoice.price
        }
    })

    return (
        <>
            <div className="w-[250px] rounded-xl bg-[#E1AE3C]/30 p-4 border">

                {/* Icon */}
                <div className="w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-white">
                    <img src={RevenueIcon} alt={"wallet"} />
                </div>

                {/* Title */}
                <h2 className="font-Inter-Bold text-sm mt-3">Total Spent</h2>

                {/* Amount */}
                <div className="flex justify-between items-center gap-x-2">
                    <p className="text-lg font-Inter-Bold">{isTotalRevenueLoading ? "..." : totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-green-700 truncate">{isTotalRevenueLoading ? "..." : "+0% this month"}</p>
                </div>

            </div>
        </>
    )
}