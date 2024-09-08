import { Link, NavLink } from "react-router-dom";
import logo from "/public/logo/logo.png";
import { FaCartShopping, FaHeart, FaCircleUser } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import CustomDropdown from "../curtomDropdown/CurstomDropdown";


const Header = () => {

    // getting the current user
    const userData = useAppSelector(selectCurrentUser);
    const currentUser = userData?.user;
    const dispatch = useAppDispatch();

    console.log("Current user =>", currentUser)

    // handle logout
    const handleLogout = () => {
        dispatch(logout());
    }


    // navigation menu
    const navMenu = <>
        <NavLink
            to={"/"}
            className={({ isActive }) => {
                return isActive ? "active-menu-link font-primary" : "menu-link font-primary"
            }}>
            Home
        </NavLink>

        <NavLink
            to={"/products"}
            className={({ isActive }) => {
                return isActive ? "active-menu-link font-primary" : "menu-link font-primary"
            }}>
            Products
        </NavLink>

        <NavLink
            to={"/about"}
            className={({ isActive }) => {
                return isActive ? "active-menu-link font-primary" : "menu-link font-primary"
            }}>
            About
        </NavLink>
    </>



    return (
        <div className="w-full flex justify-center items-center px-5 py-2">
            <div className="container mx-auto flex justify-center items-center">
                {/* logo */}
                <div className="w-1/4">
                    <Link to={"/"}>
                        <img
                            src={logo}
                            alt="logo"
                            className="w-[50%]"
                        />
                    </Link>
                </div>

                {/* nav link */}
                <div className="w-2/4 flex justify-center items-center gap-8">
                    {navMenu}
                </div>

                {/* cart icon */}
                <div className="w-1/4 flex justify-end items-center gap-7">
                    <FaCartShopping className="text-bodyText text-xl" />
                    <FaHeart className="text-bodyText text-xl" />
                    {
                        currentUser ?
                            <Button
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                            :
                            <Link to={"/login"}>
                                <Button>
                                    Login
                                </Button>
                            </Link>
                    }


                    <CustomDropdown
                        trigger={
                            <button>
                                <FaCircleUser className="text-3xl text-bodyText" />
                            </button>
                        }
                    />

                </div>
            </div>
        </div>
    );
};

export default Header;