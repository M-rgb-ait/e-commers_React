import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import * as yup from 'yup';

export default function CodeForgitpassword() {
  const navigate = useNavigate();
  const [ErrorMassegs, setErrorMassegs] = useState(null);
  const [issuccess, setissuccess] = useState(false);
  const [isCliced, setisCliced] = useState(false);

  let user = {
    resetCode: "",
  };

  function codeuser(values) {
    setisCliced(true);
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .then(function (res) {
        setissuccess(true);
        setisCliced(false);
        console.log(res);

        setTimeout(() => {
          navigate("/ReasetPassword");
        }, 1000);
      })
      .catch(function (x) {
        setErrorMassegs(x.response.data.message);
        setisCliced(false);
        console.log(x);
        setTimeout(() => {
          setErrorMassegs(null);
        }, 2000);
      });
  }

  //hook
  const regesterformik = useFormik({
    initialValues: user,
    onSubmit: codeuser,
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

        <h1 className=" text-center text-green-600">Code New:</h1>

        <div className="relative z-0 w-full mb-10 group">
          <input
            autoComplete="username"
            type="text"
            value={regesterformik.values.text}
            onBlur={regesterformik.handleBlur}
            onChange={regesterformik.handleChange}
            name="resetCode"
            id="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="text"
            className="peer-focus:font-medium absolute text-sm dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            text address
          </label>
          {regesterformik.errors.text && regesterformik.touched.text ? (
            <div
              className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {regesterformik.errors.text}
            </div>
          ) : (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg">yes</div>
          )}
        </div>

        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Code email
        </button>
      </form>
    </>
  );
}
