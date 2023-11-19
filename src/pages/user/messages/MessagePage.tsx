// jshint esversion:6
import { useEffect } from "react"
import UnderDevelopmentImg from "@/assets/global/underDevelopment.png";

export const UserMessagePage: React.FC = () => {

    useEffect(() => {
        var Tawk_API: any = Tawk_API || {};
        (function () {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/6558d8cfd600b968d314908d/1hfhgtrjb';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode?.insertBefore(s1, s0);
        })();
    }, [])

    return (
        <>
            <div className="h-[80vh] flex flex-col justify-center items-center gap-">
                <img src={UnderDevelopmentImg} className="w-[300px] h-[300px]" alt="Page coming soon..." />

                <p className="mt-2 text-gray-500 text-lg">Drop a message for us</p>
            </div>
        </>
    )
}