import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authcontext } from "../../Context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUseToken } = useContext(authcontext);
  const [ErrorMassegs, setErrorMassegs] = useState(null);
  const [issuccess, setissuccess] = useState(false);
  const [isCliced, setisCliced] = useState(false);

  let user = {
    email: "",
    password: "",
  };

  async function Loginuser(values) {
    setisCliced(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)

      .then(function (response) {
        setissuccess(true);
        setisCliced(false);
        localStorage.setItem("token", response.data.token);
        setUseToken(response.data.token);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch(function (x) {
        setErrorMassegs(x.response.data.message);
        setisCliced(false);

        setTimeout(() => {
          setErrorMassegs(null);
        }, 2000);
      });
  }

  //hook
  const regesterformik = useFormik({
    initialValues: user,
    onSubmit: Loginuser,

    validationSchema: yup.object().shape({
      email: yup.string().required("this is email"),
      password: yup.string().required().min(6).max(12),
    }),
  });

  return (
    <>
      <form
        onSubmit={regesterformik.handleSubmit}
        className="max-w-md mx-auto p-5 mt-14"
      >
        {issuccess ? (
          <div
            className="p-2 mb-4 text-sm text-green-700 rounded-lg dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            success
          </div>
        ) : (
          ""
        )}

        {ErrorMassegs ? (
          <div
            className="p-2 mb-4 text-sm text-red-700 rounded-lg dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {ErrorMassegs}
          </div>
        ) : (
          ""
        )}

        <h1 className=" text-center text-green-600">login New:</h1>

        <div className="relative z-0 w-full mb-10 mt-10 group">
          <input
            autoComplete="username"
            type="email"
            value={regesterformik.values.email}
            onBlur={regesterformik.handleBlur}
            onChange={(events) => {
              regesterformik.setFieldValue("email", events.target.value);
              if (!regesterformik.touched.email) {
                regesterformik.setFieldTouched("email", true);
              }
            }}
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {regesterformik.errors.email && regesterformik.touched.email ? (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {regesterformik.errors.email}
            </div>
          ) : (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg">yes</div>
          )}
        </div>

        <div className="relative z-0 w-full mb-10 mt-10 group">
          <input
            autoComplete="new-password"
            type="password"
            value={regesterformik.values.password}
            onBlur={regesterformik.handleBlur}
            onChange={(events) => {
              regesterformik.setFieldValue("password", events.target.value);
              if (!regesterformik.touched.password) {
                regesterformik.setFieldTouched("password", true);
              }
            }}
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {regesterformik.errors.password && regesterformik.touched.password ? (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {regesterformik.errors.password}
            </div>
          ) : (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg">yes</div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {!isCliced ? (
              "Login"
            ) : (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={[" #fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )}
          </button>

          <Link to="/Forgitpassword">
            <h2 className=" cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              forgitpassword
            </h2>
          </Link>
        </div>
      </form>
    </>
  );
}
