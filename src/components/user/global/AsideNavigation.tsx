// jshint esversion:6
import { NavLink, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useAppDispatch } from "@/hooks/typedHooks";
import { AuthSliceActions } from "@/features/global/authSlice";
import React, { useState } from "react";
import { Modal } from "@/components/global";
// import { Signout } from "@/assets/global/signout.png";
import { Signout } from "@/components/global/SignOut";

/* Nav links Icons */
import BrandLogo from "@/assets/auth/LogoMakr-6zrJ19.png.png";

type AsideNavigationProps = {
    closeNav: () => void
}

export function AsideNavigation({ closeNav }: AsideNavigationProps) {

    // GET a navigator
    const navigate = useNavigate();

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch()

    function logout() {
        dispatch(AuthSliceActions.logout());
        navigate("/login");
    }

    return (
        <>
            <aside
                className={`w-full h-full bg-SideNav pt-[30px] relative font-CabinetGrotesk-Bold`}
                aria-label="Sidebar"
            >
                {/* Navigation Logo and Close Icon */}
                <div className="flex justify-between items-center px-[15%]">
                    {/* Navigation logo */}
                    <NavLink to={"/home"}>
                        <div className="flex items-center w-[100px] h-[60px]" onClick={closeNav}>
                            <div>
                                <img src={BrandLogo} alt="logo" className="h-full w-full" />
                            </div>
                        </div>
                    </NavLink>

                    {/* Close icon */}
                    <div className="lg:hidden cursor-pointer" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                        <RxCross1
                            size={20}
                            className="z-20 top-8 lg:hidden"
                            onClick={closeNav}
                        />
                    </div>
                </div>

                {/* NavLinks */}
                <ul className="font-medium transition duration-500 flex flex-col space-y-3 sm:space-y-2 mx-auto pt-5">

                    {/* Dashboard home page */}
                    <li className={`ease-in-out transition duration-500 hover:bg-[#a3fdc7]`}>
                        <NavLink
                            to="/home"
                            onClick={closeNav}
                        >
                            {({ isActive }) => (
                                <div className={`flex py-[18px] pl-[14%] sm:justify-start text-brandColor ease-in-out transition duration-500 ${isActive && "bg-[#C3F99F] border-l-[6px] border-brandColor "}`}>
                                    {/* <img src={isActive ? DashboardIconDark : DashboardIcon} alt="home page" /> */}
                                    <span className="pl-3">Home</span>
                                </div>
                            )}
                        </NavLink>
                    </li>

                    {/* Users page */}
                    <li className={`ease-in-out transition duration-500 hover:bg-[#a3fdc7]`}>
                        <NavLink
                            to="/users"
                            onClick={() => {
                                closeNav();
                            }}
                        >
                            {({ isActive }) => (
                                <div className={`flex py-[18px] pl-[14%] sm:justify-start text-brandColor ease-in-out transition duration-500 ${isActive && "bg-[#C3F99F] border-l-[6px] border-brandColor "}`}>
                                    {/* <img src={isActive ? SellGiftCardsIconDark : SellGiftCardsIcon} alt="Sell gift card page" /> */}
                                    <span className="pl-3">Users</span>
                                </div>
                            )}
                        </NavLink>
                    </li>

                    {/* Messages */}
                    <li className={`ease-in-out transition duration-500 hover:bg-[#a3fdc7]`}>
                        <NavLink
                            to="/messages"
                            onClick={closeNav}
                        >

                            {({ isActive }) => (
                                <div className={`flex py-[18px] pl-[14%] sm:justify-start text-brandColor ease-in-out transition duration-500 ${isActive && "bg-[#C3F99F] border-l-[6px] border-brandColor "}`}>
                                    {/* <img src={isActive ? TradeHistoryIconDark : TradeHistoryIcon} alt="Trade Histroy" /> */}
                                    <span className="pl-3">Messages</span>
                                </div>
                            )}

                        </NavLink>
                    </li>

                    {/* Notes */}
                    <li className={`ease-in-out transition duration-500 hover:bg-[#a3fdc7]`}>
                        <NavLink
                            to="/notes"
                            onClick={closeNav}
                        >
                            {({ isActive }) => (
                                <div className={`flex py-[18px] pl-[14%] sm:justify-start text-brandColor ease-in-out transition duration-500 ${isActive && "bg-[#C3F99F] border-l-[6px] border-brandColor "}`}>
                                    {/* <img src={isActive ? TransactionsIconDark : TransactionsIcon} alt="Wallet" /> */}
                                    <span className="pl-3">Notes</span>
                                </div>
                            )}

                        </NavLink>
                    </li>

                    {/* Files */}
                    <li className={`ease-in-out transition duration-500 hover:bg-[#a3fdc7]`}>
                        <NavLink
                            to="/files"
                            onClick={closeNav}
                        >

                            {({ isActive }) => (
                                <div className={`flex py-[18px] pl-[14%] sm:justify-start text-brandColor ease-in-out transition duration-500 ${isActive && "bg-[#C3F99F] border-l-[6px] border-brandColor "}`}>
                                    {/* <img src={isActive ? CalculateRateIconDark : CalculateRateIcon} alt="Calculate rate" /> */}
                                    <span className="pl-3">Files</span>
                                </div>
                            )}

                        </NavLink>
                    </li>

                    {/* Invoice */}
                    <li className={`ease-in-out transition duration-500 hover:bg-[#a3fdc7]`}>
                        <NavLink
                            to="/invoice"
                            onClick={closeNav}
                        >

                            {({ isActive }) => (
                                <div className={`flex py-[18px] pl-[14%] sm:justify-start text-brandColor ease-in-out transition duration-500 ${isActive && "bg-[#C3F99F] border-l-[6px] border-brandColor "}`}>
                                    {/* <img src={isActive ? CalculateRateIconDark : CalculateRateIcon} alt="Calculate rate" /> */}
                                    <span className="pl-3">Invoice</span>
                                </div>
                            )}

                        </NavLink>
                    </li>

                    {/* Logout */}
                    <li
                        className={`relative top-7 flex py-[18px] pl-[15%] cursor-pointer`}
                        onClick={() => { closeNav(); setIsLogoutModalOpen(true) }}
                    >
                        {/* <img src={LogoutIcon} alt="Log out" /> */}
                        <p className="flex whitespace-nowrap pl-3 text-[#C93636]  font-[600]">Sign Out</p>
                    </li>

                </ul>
            </aside>

            {/* Sign out Modal */}
            {
                isLogoutModalOpen && (
                    <Modal closeModal={() => setIsLogoutModalOpen(false)}>
                        <Signout next={logout} cancel={() => setIsLogoutModalOpen(false)} />
                    </Modal>
                )
            }
        </>

    );
}