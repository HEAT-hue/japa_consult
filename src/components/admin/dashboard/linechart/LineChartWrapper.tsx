// jshint esversion:6
// import { useState } from "react";
import { LineChart } from "./LineChart";

export const LineChartWrapper: React.FC = () => {

    const monthlabel = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const revenueData = [12000, 340000, 400000, 342000, 234000, 200212, 33000, 30900, 560040, 119200, 120090, 302992]

    return (
        <>
            {/* Line Chart */}
            <div className="w-max flex-shrink-0 border-[1px] bg-white rounded-2xl p-5">

                {/* Line Chart Header */}
                <div className="flex justify-between items-center mb-2">

                    {/* Left group */}
                    <div className="flex flex-col gap-y-1">

                        {/* Selected Line Category */}
                        {/* <select
                            id="select-card"
                            value={selectedChartCategory}
                            className="w-[170px] cursor-pointer bg-white  rounded outline-none focus:border-brandColor focus-visible:shadow-md font-CabinetGrotesk-Regular"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setSelectedChartCategory(e.target.value);
                            }}
                        >
                            <option value="funds" selected>Disbursed Funds</option>
                        </select> */}

                        {/* <div className="text-xs font-Manrope-Medium text-[#696969]">Total:  <span>&#8358;</span>{" "}<span>{totalDisbursements.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div> */}
                    </div>

                    {/* Right group */}
                    <div className="flex gap-x-3">

                        {/* Selected year Category */}
                        {/* <select
                            id="select-card"
                            className="w-[90px] px-2 cursor-pointer bg-inputFieldBg border-[1px] rounded outline-none focus:border-brandColor focus-visible:shadow-md font-CabinetGrotesk-Regular"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setSelectedYear(Number(e.target.value));
                            }}
                        >
                            <option value="2023" selected>2023</option>
                        </select> */}

                        {/* Send image */}
                        {/* <div className="p-1 bg-inputFieldBg rounded">
                            <img src={SendIcon} alt="Send icon" />
                        </div> */}

                        {/* Download icon */}
                        {/* <div className="p-1 bg-inputFieldBg rounded">
                            <img src={DownloadIcon} alt="Send icon" />
                        </div> */}
                    </div>
                </div>

                {/* Line Chart Body */}
                <div className="mb-3">
                    <LineChart monthlabel={monthlabel} withdrawalData={revenueData} />
                </div>

                {/* Line Chart Footer */}
                {/* <div className="bg-inputFieldBg p-1 border-[1px] rounded-lg">
                    <div className="flex justify-start items-center gap-x-5">
                        <select
                            id="select-card"
                            className="w-[90px] h-[20px] px-2 text-xs cursor-pointer bg-inputFieldBg outline-none focus:border-brandColor focus-visible:shadow-md font-CabinetGrotesk-Regular"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                // setSelectedMonth(e.target.value);
                                setMonthlabel(e.target.value.split(","))
                            }}
                        >
                            <option value="Jan,Feb,Mar,Apr" selected>Jan-Apr</option>
                            <option value="May,Jun,Jul,Aug" selected>May-Aug</option>
                            <option value="Sep,Oct,Nov,Dec" selected>Sep-Dec</option>
                        </select>
                        <div className="w-[1px] h-[15px] bg-[#8B909A]"></div>
                    </div>

                </div> */}

            </div>
        </>
    );
}