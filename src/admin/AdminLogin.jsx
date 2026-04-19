import background from "../../public/assets/background_1.jpg";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import admins from "./admins";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const adminSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
  });

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: adminSchema,
    onSubmit: async (values) => {
      setIsPending(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 800)); //  API delay
        const adminFound = admins.find(
          (admin) =>
            admin.username === values.username &&
            admin.password === values.password,
        );

        if (adminFound) {
          localStorage.setItem("admin", "true");
          localStorage.setItem("adminName", adminFound.username);

          setIsSuccess(true);
          setErrorMsg(null);

          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        } else {
          setErrorMsg("Wrong username or password");
          setIsSuccess(false);
        }
      } catch {
        setErrorMsg("Something went wrong");
        setIsSuccess(false);
      } finally {
        setIsPending(false);
      }
    },
  });

  return (
    <section
      className="flex justify-center items-center min-h-screen px-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white/40 dark:bg-gray-800/40 backdrop-blur-md p-6 rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Admin Login
        </h1>

        {isSuccess && (
          <div className="p-2 mb-4 text-sm text-green-700 rounded bg-green-100">
            Admin login success!
          </div>
        )}

        {errorMsg && (
          <div className="p-2 mb-4 text-sm text-red-700 rounded bg-red-100">
            {errorMsg}
          </div>
        )}

        {/* Username */}
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Username
          </label>

          <input
            id="username"
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter username"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
          />

          {formik.touched.username && formik.errors.username && (
            <p className="text-sm text-red-600 mt-1">
              {formik.errors.username}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-5 relative">
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="********"
              className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
            />

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300"
            >
              {showPassword ? "🙈" : "👁️"}
            </div>
          </div>

          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 flex justify-center items-center"
        >
          {isPending ? "Loading..." : "Login"}
        </button>
      </form>
    </section>
  );
}
