import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "/public/logo/logo.png";
import { FaCartShopping, FaHeart, FaCircleUser, FaBars } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import CustomDropdown from "../customDropDown/CustomDropDown";
import { selectCartProducts } from "@/redux/features/cart/cartSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userData = useAppSelector(selectCurrentUser);
  const currentUser = userData?.user;
  const dispatch = useAppDispatch();
  const allCartProducts = useAppSelector(selectCartProducts);

  const handleLogout = () => {
    dispatch(logout());
  };

  const adminLinks = [
    { name: "Product management", link: "/product-management" },
    { name: "Add product", link: "/add-product" },
  ];

  const navMenu = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive
            ? "active-menu-link font-primary"
            : "menu-link font-primary"
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/products"}
        className={({ isActive }) =>
          isActive
            ? "active-menu-link font-primary"
            : "menu-link font-primary"
        }
      >
        Products
      </NavLink>
      <NavLink
        to={"/about"}
        className={({ isActive }) =>
          isActive
            ? "active-menu-link font-primary"
            : "menu-link font-primary"
        }
      >
        About
      </NavLink>
    </>
  );

  return (
    <div className="w-full flex justify-center items-center lg:px-5 py-2 z-[99] bg-white relative">
      <div className="container mx-auto flex flex-wrap justify-between items-center z-[98] bg-white">
        {/* Logo */}
        <div className="flex items-center">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-24 md:w-32" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars className="text-2xl" />
          </button>
        </div>

        {/* Nav links for desktop */}
        <div className="hidden md:flex justify-center items-center gap-8">
          {navMenu}
        </div>

        {/* Cart, heart, login/logout for desktop */}
        <div className="hidden md:flex items-center gap-7">
          {/* cart */}
          <Link to={"/cart"}>
            <FaCartShopping className="text-bodyText text-xl" />
          </Link>
          <FaHeart className="text-bodyText text-xl" />
          {currentUser ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Link to={"/login"}>
              <Button>Login</Button>
            </Link>
          )}
          <CustomDropdown
            trigger={
              <button className="focus:outline-none">
                <FaCircleUser className="text-3xl hover:scale-105 duration-300" />
              </button>
            }
            label={currentUser?.name}
            menuGroup={adminLinks}
          />
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="w-full md:hidden mt-4 absolute bg-white top-8 left-[50%] translate-x-[-50%] px-5 py-5">
            <div className="flex flex-col gap-4">
              {navMenu}
              <Link to="/cart" className="flex items-center gap-2">
                <FaCartShopping className="text-bodyText text-xl" />
                <span>Cart</span>
              </Link>
              <Link to={"/cart"} className="relative">
                <FaCartShopping className="text-bodyText text-xl" />
                {allCartProducts.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {allCartProducts.length}
                  </span>
                )}
              </Link>
              <Link to="/wishlist" className="flex items-center gap-2">
                <FaHeart className="text-bodyText text-xl" />
                <span>Wishlist</span>
              </Link>
              {currentUser && (
                <>
                  {adminLinks.map((link, index) => (
                    <Link key={index} to={link.link} className="flex items-center gap-2">
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </>
              )}
              {currentUser ? (
                <button onClick={handleLogout} className="flex items-center gap-2">
                  <FaCircleUser className="text-bodyText text-xl" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link to="/login" className="flex items-center gap-2">
                  <FaCircleUser className="text-bodyText text-xl" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;