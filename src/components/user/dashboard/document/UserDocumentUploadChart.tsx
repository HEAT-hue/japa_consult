// jshint esversion:6
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useGetFilesHook } from '@/hooks/user/files';
import { FOLDER_NAME } from '@/data/users/files';

ChartJS.register(ArcElement, Tooltip, Legend);

export const UserDocumentUploadDoughnutChart: React.FC = () => {

    const { data: AllFiles } = useGetFilesHook({ folderName: undefined })

    const data = {
        labels: ['General', 'Billing', 'Contracts', 'Academics', 'Visa'],
        datasets: [{
            label: 'Documents Uploaded',
            data: [getTotalFilesInFolder(FOLDER_NAME.GENERAL), getTotalFilesInFolder(FOLDER_NAME.BILLING), getTotalFilesInFolder(FOLDER_NAME.CONTRACT), getTotalFilesInFolder(FOLDER_NAME.ACADMEMICS), getTotalFilesInFolder(FOLDER_NAME.VISA)],
            backgroundColor: [
                '#68EE76',
                '#8D79F6',
                '#F25F33 ',
                '#FEBD38',
                '#0d4d3d '
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            }
        },
        cutout: "50%"

    }

    function getTotalFilesInFolder(folder: FOLDER_NAME): number {
        const files = AllFiles?.filter((file) => {
            return file.folder == folder
        })

        return files?.length ?? 0
    }

    return (
        <div className='bg-white p-5 rounded-lg'>

            <h3 className="mb-3 text-center font-Inter-Bold">Documents Uploaded</h3>

            <div className='w-max flex items-center gap-x-3 '>


                {/* Chart */}
                <div className='w-[130px] h-[130px]' >
                    <Doughnut
                        data={data}
                        options={options}
                    />
                </div >

                {/* legend */}
                <div>
                    <div className="flex gap-x-2 items-center">
                        <div className="w-[10px] h-[10px] bg-[#68EE76] rounded-full"></div>
                        <p className="text-xs">General</p>
                    </div>

                    <div className="flex gap-x-2 items-center">
                        <div className="w-[10px] h-[10px] bg-[#8D79F6] rounded-full"></div>
                        <p className="text-xs">Billing</p>
                    </div>

                    <div className="flex gap-x-2 items-center">
                        <div className="w-[10px] h-[10px] bg-[#F25F33] rounded-full"></div>
                        <p className="text-xs">Contracts</p>
                    </div>

                    <div className="flex gap-x-2 items-center">
                        <div className="w-[10px] h-[10px] bg-[#FEBD38] rounded-full"></div>
                        <p className="text-xs">Academics</p>
                    </div>

                    <div className="flex gap-x-2 items-center">
                        <div className="w-[10px] h-[10px] bg-[#0d4d3d] rounded-full"></div>
                        <p className="text-xs">Visa</p>
                    </div>
                </div>
            </div>
        </div>
    )
}