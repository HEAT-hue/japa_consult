/* Please do not modify this file. This will affect the layout of the application */
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { HiBars3BottomLeft } from "react-icons/hi2";
import defaultAvatar from "@/assets/global/defaultAvatar.png";
import { AsideNavigation } from "@/components/user";
// import { useAppSelector } from "@/hooks/typedHooks";
import ProfileImage from "@/assets/global/defaultAvatar.png";
// import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export function UserLayout() {

    // Get Location
    const location = useLocation();
    const currentLocationPathname = location.pathname;
    console.log(currentLocationPathname.substring(0,11))

    // profile image selector from the state
    // const { userProfile } = useAppSelector((state) => state.auth);

    const navigateTo = useNavigate();

    // Handle the state of the aside navigation on mobile
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <div className="grid grid-rows-1 h-screen">
            
            {/******************** DESKTOP VIEW NAVIGATION *********************/}
            <header className="hidden sm:flex fixed top-0 inset-x-0 lg:left-[14rem] items-center pl-6 h-[60px] shadow-sm border-b-[1px] border-[#dcdcdc] bg-white z-[90]">
                {/* Hamburger menu */}
                <div className="hover:cursor-pointer lg:hidden"
                    onClick={() => setIsNavOpen(true)}
                >
                    <HiBars3BottomLeft size={35} />
                </div>

                {/* Navigation title */}
                <div className="font-bold text-[24px] font-CabinetGrotesk-Bold ml-9 lg:ml-0">
                    {currentLocationPathname == "/" && "Home"}
                    {currentLocationPathname == "/messages" && "Messages"}
                    {currentLocationPathname == "/files" && "Files"}
                    {currentLocationPathname.substring(0, 11) == '/files/file' && (
                        <div className="flex gap-x-3">
                            <Link to="/files">File</Link>
                            <span>&gt;</span>
                            <span className="capitalize">{currentLocationPathname.substring(12).toLowerCase()}</span>
                        </div>
                    )}
                    {currentLocationPathname == "/notes" && "Notes"}
                    {currentLocationPathname == "/notes/create" && "Notes"}
                    {currentLocationPathname == "/wallets" && "Wallet"}
                    {currentLocationPathname == "/rate" && "Calculate Rate"}
                    {currentLocationPathname == "/account" && "Accounts"}
                    {currentLocationPathname == "/wallets/transactions" && "Wallet Transactions"}
                    {currentLocationPathname == "/account/report" && "Report an Issue"}
                </div>

                {/* Navigation */}
                <nav className="w-full flex items-center flex-wrap text-base justify-end bg-red-00 h-full gap-[1.5rem] pr-[7%] lg:pr-[5%] ">
                    {/* Profile Avatar */}
                    <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
                        <img
                            src={defaultAvatar}
                            alt="profile pix"
                            className="w-full h-full hover:cursor-pointer rounded-full"
                        />
                    </div>
                </nav>
            </header>

            {/******************** MOBILE VIEW NAVIGATION *********************/}
            <header className="sm:hidden h-[60px] fixed top-0 inset-x-0 lg:left-[14rem] flex items-center justify-between px-6 shadow-sm bg-white z-[90]">
                {/* Hamburger menu */}
                <div className="cursor-pointer" onClick={() => setIsNavOpen(true)}>
                    <HiBars3BottomLeft size={35} />
                </div>

                {/* Navigation title */}
                <div className="font-bold text-[24px] font-CabinetGrotesk-Bold absolute left-[50%] translate-x-[-50%]">
                    {currentLocationPathname == "/" && "Home"}
                    {currentLocationPathname == "/messages" && "Messages"}
                    {currentLocationPathname == "/files" && "Files"}
                    {currentLocationPathname == "/files/file" && "Files"}
                    {currentLocationPathname.substring(0, 11) == '/files/file' && (
                        <div className="flex gap-x-3">
                            <Link to="/files">File</Link>
                            <span>&gt;</span>
                            <span className="capitalize">{currentLocationPathname.substring(12).toLowerCase()}</span>
                        </div>
                    )}
                    {currentLocationPathname == "/notes" && "Notes"}
                    {currentLocationPathname == "/notes/create" && "Notes"}
                    {currentLocationPathname == "/wallets" && "Wallet"}
                    {currentLocationPathname == "/rate" && "Calculate Rate"}
                    {currentLocationPathname == "/account" && "Accounts"}
                    {currentLocationPathname == "/wallets/transactions" && "Wallet Transactions"}
                    {currentLocationPathname == "/account/report" && "Report an Issue"}
                </div>

                {/* Navigation */}
                {/* Display those icons only on dashboard page */}
                {currentLocationPathname == "/home" && (
                    <nav className="flex items-center text-base bg-red-00 h-full gap-[1.5rem]">

                        {/* Profile Avatar */}
                        <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
                            <img
                                src={ProfileImage}
                                alt="profile pix"
                                className="w-full h-full hover:cursor-pointer"
                                onClick={() => navigateTo("/account")}
                            />
                        </div>
                    </nav>
                )}
            </header >

            {/* Side Navigation */}
            <div className={`fixed inset-y-0 lg:w-[14rem] w-[271px] ${!isNavOpen && "-left-full"} lg:left-0 z-[100]`}>
                <AsideNavigation closeNav={() => setIsNavOpen(false)} />
            </div >

            {/* Render Outlet, Each page */}
            <div className="px-7 lg:ml-[14rem] mt-[60px] overflow-scroll bg-[#F6F6F6]"  onClick={() => setIsNavOpen(false)} >
                <Outlet />
            </div >
        </div>
    );
}
