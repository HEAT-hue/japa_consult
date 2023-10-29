// jshint esversion:6
import { TotalRevenueOverviewBox } from "@/components/global/overviewBox"
import { PaymentActivityWrapper } from "@/components/admin/dashboard/payment"
import { UserDocumentUploadDoughnutChart } from "@/components/user/dashboard"
import { TotalNotesReceivedOverviewBox } from "@/components/global/overviewBox"
import { TotalNotesCreatedOverviewBox } from "@/components/global/overviewBox"

export const DashboardPage: React.FC = () => {
    return (
        <div className="py-5">
            <div className="flex items-start flex-wrap overflow-auto gap-3 gap-y-5">

                {/* Overview boxes */}
                <div className="flex flex-col sm:flex-row items-start gap-3">
                    <div className="flex gap-x-3 flex-nowrap overflow-x-scroll [&>*]:shrink-0">
                        <TotalRevenueOverviewBox />
                        <TotalNotesCreatedOverviewBox />
                    </div>

                    <div className="flex items-start gap-x-3 flex-nowrap overflow-x-scroll [&>*]:shrink-0">
                        <TotalNotesReceivedOverviewBox />

                        {/* Document Pie chart */}
                        <UserDocumentUploadDoughnutChart />
                    </div>
                </div>
            </div>

            {/* Payment Activity */}
            <div className="mt-5">
                <PaymentActivityWrapper />
            </div>
        </div>
    )
}   