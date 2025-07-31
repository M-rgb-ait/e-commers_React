// import axios from "axios";
// import {  useState } from "react";
// import { Link } from "react-router-dom";

// export default function Forgitpassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
//         email,
//       });

//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage("error",error);
//     }
//   };

//   return (
//     <div>
//       <h2>enter an email</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder='enter an email'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button type="submit">submit</button>
//         <Link to='/CodeForgitpassword'>
//         <button className="bg-red-50 ms-5 me-5" type="submit">code</button>
//         </Link>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// };

import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
// import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
// import { authcontext } from "../../Context/AuthContext";

export default function Forgitpassword() {
  const navigate = useNavigate();
  // const {setUseToken} = useContext(authcontext);
  const [ErrorMassegs, setErrorMassegs] = useState(null);
  const [issuccess, setissuccess] = useState(false);
  const [isCliced, setisCliced] = useState(false);

  let user = {
    email: "",
  };

  function forgetuser(values) {
    setisCliced(true);
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then(function (res) {
        setissuccess(true);
        setisCliced(false);
        // setUseToken(response.data.token);
        console.log(res);
        setTimeout(() => {
          navigate("/CodeForgitpassword");
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
    onSubmit: forgetuser,

    validationSchema: yup.object().shape({
      email: yup.string().required("this is email"),
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

        <h1 className=" text-center text-green-600">forget New:</h1>

        <div className="relative z-0 w-full mb-10 group">
          <input
            autoComplete="username"
            type="email"
            value={regesterformik.values.email}
            onBlur={regesterformik.handleBlur}
            onChange={regesterformik.handleChange}
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

        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Send Code
        </button>
      </form>
    </>
  );
}
