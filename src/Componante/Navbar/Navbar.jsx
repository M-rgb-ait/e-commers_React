import { Link, NavLink, useNavigate } from "react-router-dom";
import frestlogo from "../../assets/imgs/freshcart-logo.svg";
import { useContext } from "react";
import { authcontext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { useToken, setUseToken } = useContext(authcontext);
  const { numOfCartItems } = useContext(cartContext);
  const naviget = useNavigate();
  function handellogout() {
    localStorage.removeItem("token");
    setUseToken(null);
    naviget("/Login");
  }

  return (
    <>
      {/*
<div className="flex items-center gap-3 ms-auto">
      <ul className="flex items-center gap-3">
        <li>
        <i className="fa-brands fa-facebook cursor-pointer"></i>
        </li>
        <li>
        <i className="fa-brands fa-linkedin cursor-pointer"></i>
        </li>
        <li>
        <i className="fa-brands fa-github cursor-pointer"></i>
        </li>
        <li>
        <i className="fa-brands fa-figma cursor-pointer"></i>
        </li>
      </ul>

      <ul className="flex items-center gap-3">
        {useToken ?
        <li>
          <span className=" cursor-pointer" onClick={handellogout}>logout</span>
        </li>: <>
        <li>
          <NavLink to='/Register'>Register</NavLink>
        </li>
        <li>
          <NavLink to='/Login'>login</NavLink>
        </li>
        </>}
      </ul>
</div>
*/}

      {/* fixed z-50 right-0 left-0 */}
      <nav className=" bg-white dark:bg-gray-900 fixed z-50 right-0 left-0 top-0">
        <div className="flex flex-wrap items-center justify-between p-3 container mx-auto">
          <Link to="/">
            <img src={frestlogo} alt="fieslogo" />
          </Link>
          {useToken ? (
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <Link to="/Cart" className="relative">
                <i className="fa-solid fa-cart-shopping mr-4"></i>
                <span className="absolute top-0 right-0 -translate-y-1/2">
                  {numOfCartItems}
                </span>
              </Link>

              <li className="list-none">
                {/* <NavLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</NavLink> */}
                <span
                  className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={handellogout}
                >
                  logout
                </span>
              </li>

              <button
                data-collapse-toggle="navbar-user"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-user"
                aria-expanded="false"
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
          ) : (
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  className="block py-2 px-3 text-gray-900 rounded-sm dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  to="/Register"
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="block py-2 px-3 text-gray-900 rounded-sm dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  to="/Login"
                >
                  login
                </NavLink>
              </li>
            </ul>
          )}

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            {useToken ? (
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to="/"
                    className="block py-2 px-3 text-gray-900 rounded-sm md:p-1 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/prodect"
                    className="block py-2 px-3 text-gray-900 rounded-sm md:p-1 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    prodect
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Wishlist"
                    className="block py-2 px-3 text-gray-900 rounded-sm md:p-1 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Brands"
                    className="block py-2 px-3 text-gray-900 rounded-sm md:p-1 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Categores"
                    className="block py-2 px-3 text-gray-900 rounded-sm md:p-1 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Categores
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
