import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authcontext } from "../../Context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUseToken } = useContext(authcontext); // استخدام context
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be at most 12 characters"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsPending(true);
      try {
        const res = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values,
        );

        // حفظ التوكن في localStorage و context
        localStorage.setItem("token", res.data.token);
        setUseToken(res.data.token);

        setIsSuccess(true);
        setErrorMsg(null);

        // بعد تسجيل الدخول، نوجه المستخدم للصفحة الرئيسية
        setTimeout(() => {
          navigate("/");
        }, 500);
      } catch (err) {
        setErrorMsg(err.response?.data?.message || "Error occurred");
      } finally {
        setIsPending(false);
      }
    },
  });

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Login
        </h1>

        {isSuccess && (
          <div className="p-2 mb-4 text-sm text-green-700 rounded bg-green-100">
            Success!
          </div>
        )}
        {errorMsg && (
          <div className="p-2 mb-4 text-sm text-red-700 rounded bg-red-100">
            {errorMsg}
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="user@example.com"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
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

        {/* Forgot password */}
        <div className="text-right mb-4">
          <Link
            to="/forgitpassword"
            className="text-sm text-blue-700 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 flex justify-center items-center"
        >
          {!isPending ? (
            "Login"
          ) : (
            <ColorRing
              visible={true}
              height="24"
              width="24"
              ariaLabel="loading"
              colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
            />
          )}
        </button>

        {/* Register link */}
        <p className="text-sm text-center text-gray-700 dark:text-gray-200 mt-4">
          Dont have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-700 dark:text-pink-300 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </section>
  );
}
