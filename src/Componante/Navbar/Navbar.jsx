import { Link, NavLink, useNavigate } from "react-router-dom";
import frestlogo from "../../assets/imgs/logo.png";
import { useContext, useState } from "react";
import { authcontext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { useToken, setUseToken } = useContext(authcontext);
  const { numOfCartItems } = useContext(cartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    setUseToken(null);
    setMenuOpen(false); // تغلق القائمة عند تسجيل الخروج
    navigate("/Login");
  }

  const navLinkClass = ({ isActive }) =>
    `block py-2 px-3 rounded-sm md:p-1 ${
      isActive
        ? "text-blue-500 font-semibold dark:text-blue-400"
        : "text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400"
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 fixed z-50 right-0 left-0 top-0 shadow-md">
      <div className="flex flex-wrap items-center justify-between p-3 container mx-auto">
        {/* الشعار */}
        <Link to="/">
          <img src={frestlogo} alt="freshcart logo" className="h-8" />
        </Link>

        {/* أيقونة السلة وزر الهامبرغر */}
        <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
          {/* أيقونة السلة تظهر فقط إذا المستخدم مسجّل دخول */}
          {useToken && (
            <Link to="/Cart" className="relative">
              <i className="fa-solid fa-cart-shopping mr-2 md:mr-4"></i>
              {numOfCartItems > 0 && (
                <span className="absolute top-0 right-0 -translate-y-1/2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {numOfCartItems}
                </span>
              )}
            </Link>
          )}

          {/* Logout يظهر على الديسكتوب فقط */}
          {useToken && (
            <span
              className="hidden md:block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white rounded"
              onClick={handleLogout}
            >
              Logout
            </span>
          )}

          {/* زر الهامبرغر */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* قائمة الروابط */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {useToken ? (
              <>
                <li>
                  <NavLink to="/" className={navLinkClass}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/prodect" className={navLinkClass}>
                    Prodect
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Wishlist" className={navLinkClass}>
                    Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Brands" className={navLinkClass}>
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Categores" className={navLinkClass}>
                    Categores
                  </NavLink>
                </li>
                {/* Logout يظهر داخل القائمة على الموبايل فقط */}
                <li className="md:hidden">
                  <span
                    className="cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-gray-200 rounded"
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/Register" className={navLinkClass}>
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Login" className={navLinkClass}>
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
