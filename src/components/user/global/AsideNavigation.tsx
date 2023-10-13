// jshint esversion:6
import { NavLink, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import BrandLogo from "../../../../assets/logos/desktopIconHeader.png"
import { useAppDispatch } from "@/hooks/typedHooks";
import { AuthSliceActions } from "@/features/global/authSlice";
import React, { useState } from "react";
import { Modal } from "@/components/global";
import { Signout } from "@/components/global/SignOut";

/* Nav links Icons */
import DashboardIcon from "../../../../assets/navbar/icon/dashboard.svg"
import DashboardIconDark from "../../../../assets/navbar/icon/dashboard-dark.svg";
import SellGiftCardsIcon from "../../../../assets/navbar/icon/card-coin.svg";
import SellGiftCardsIconDark from "../../../../assets/navbar/icon/card-coin-dark.svg";
import TradeHistoryIcon from "../../../../assets/navbar/icon/receipt-2.svg";
import TradeHistoryIconDark from "../../../../assets/navbar/icon/receipt-2-dark.svg"
import AccountIcon from "../../../../assets/navbar/icon/user.svg";
import AccountIconDark from "../../../../assets/navbar/icon/user-dark.svg";
import TransactionsIcon from "../../../../assets/navbar/icon/card-send.svg";
import TransactionsIconDark from "../../../../assets/navbar/icon/card-send-dark.svg";
import CalculateRateIcon from "../../../../assets/navbar/icon/percentage-square.svg";
import CalculateRateIconDark from "../../../../assets/navbar/icon/percentage-square-dark.svg";
import LogoutIcon from "../../../../assets/navbar/icon/logout.svg"

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
                                    <img src={isActive ? DashboardIconDark : DashboardIcon} alt="home page" />
                                    <span className="pl-3">Dashboard</span>
                                </div>
                            )}
                        </NavLink>
                    </li>

                    {/* Sell gift cards page */}
                    <li className={`ease-in-out transition duration-500 hover:bg-[#a3fdc7]`}>
                        <NavLink
                            to="/giftcards"
                            onClick={() => {
                                closeNav();
                            }}
                        >
                            {({ isActive }) => (
                                <div className={`flex py-[18px] pl-[14%] sm:justify-start text-brandColor ease-in-out transition duration-500 ${isActive && "bg-[#C3F99F] border-l-[6px] border-brandColor "}`}>
                                    <img src={isActive ? SellGiftCardsIconDark : SellGiftCardsIcon} alt="Sell gift card page" />
                                    <span className="pl-3">Sell Gift Cards</span>
                                </div>
                            )}
                        </NavLink>
                    </li>

                    {/* Trade History link */}
                    <li className={`ease-in-out transition duration-500 hover:bg-[#a3fdc7]`}>
                        <NavLink
                            to="/trades"
                            onClick={closeNav}
                        >

                            {({ isActive }) => (
                                <div className={`flex py-[18px] pl-[14%] sm:justify-start text-brandColor ease-in-out transition duration-500 ${isActive && "bg-[#C3F99F] border-l-[6px] border-brandColor "}`}>
                                    <img src={isActive ? TradeHistoryIconDark : TradeHistoryIcon} alt="Trade Histroy" />
                                    <span className="pl-3">Trade History</span>
                                </div>
                            )}

                        </NavLink>
                    </li>

                    {/* Wallet Link */}
                    <li className={`sm:hidden ease-in-out transition duration-500 hover:bg-[#a3fdc7]`}>
                        <NavLink
                            to="/wallets"
                            onClick={closeNav}
                        >
                            {({ isActive }) => (
                                <div className={`flex py-[18px] pl-[14%] sm:justify-start text-brandColor ease-in-out transition duration-500 ${isActive && "bg-[#C3F99F] border-l-[6px] border-brandColor "}`}>
                                    <img src={isActive ? TransactionsIconDark : TransactionsIcon} alt="Wallet" />
                                    <span className="pl-3">Wallet</span>
                                </div>
                            )}

                        </NavLink>
                    </li>

                    {/* Calculate Rate Link */}
                    <li className={`sm:hidden ease-in-out transition duration-500 hover:bg-[#a3fdc7]`}>
                        <NavLink
                            to="/rate"
                            onClick={closeNav}
                        >

                            {({ isActive }) => (
                                <div className={`flex py-[18px] pl-[14%] sm:justify-start text-brandColor ease-in-out transition duration-500 ${isActive && "bg-[#C3F99F] border-l-[6px] border-brandColor "}`}>
                                    <img src={isActive ? CalculateRateIconDark : CalculateRateIcon} alt="Calculate rate" />
                                    <span className="pl-3">Calculate Rates</span>
                                </div>
                            )}

                        </NavLink>
                    </li>

                    {/* Transactions Link */}
                    <li className={`hidden sm:block ease-in-out transition duration-500 hover:bg-[#a3fdc7]`}>
                        <NavLink
                            to="/transactions"
                            onClick={closeNav}
                        >

                            {({ isActive }) => (
                                <div className={`flex py-[18px] pl-[14%] sm:justify-start text-brandColor ease-in-out transition duration-500 ${isActive && "bg-[#C3F99F] border-l-[6px] border-brandColor "}`}>
                                    <img src={isActive ? TransactionsIconDark : TransactionsIcon} alt="Withdraw" />
                                    <span className="pl-3">Transactions</span>
                                </div>
                            )}

                        </NavLink>
                    </li>

                    {/* Account Link */}
                    <li className={`ease-in-out transition duration-500 hover:bg-[#a3fdc7]`}>
                        <NavLink
                            to="/account"
                            onClick={closeNav}
                        >

                            {({ isActive }) => (
                                <div className={`flex py-[18px] pl-[14%] sm:justify-start text-brandColor ease-in-out transition duration-500 ${isActive && "bg-[#C3F99F] border-l-[6px] border-brandColor "}`}>
                                    <img src={isActive ? AccountIconDark : AccountIcon} alt="Account" />
                                    <span className="pl-3">Account</span>
                                </div>
                            )}

                        </NavLink>
                    </li>

                    {/* Logout */}
                    <li
                        className={`relative top-7 flex py-[18px] pl-[15%] cursor-pointer`}
                        onClick={() => { closeNav(); setIsLogoutModalOpen(true) }}
                    >
                        <img src={LogoutIcon} alt="Log out" />
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