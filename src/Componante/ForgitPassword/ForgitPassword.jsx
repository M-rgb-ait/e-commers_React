import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setErrorMsg("");
      setSuccess(false);

      try {
        await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          values,
        );
        setSuccess(true);
        setTimeout(() => navigate("/CodeForgitpassword"), 1000);
      } catch (error) {
        setErrorMsg(error.response?.data?.message || "Something went wrong");
        setTimeout(() => setErrorMsg(""), 3000);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto p-6 mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Forgot Password
      </h1>

      {success && (
        <div className="p-2 mb-4 text-sm text-green-700 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400">
          Code sent successfully!
        </div>
      )}

      {errorMsg && (
        <div className="p-2 mb-4 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400">
          {errorMsg}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} noValidate>
        {/* Email Field */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="user@example.com"
              className={`w-full px-4 py-2 border rounded-lg text-sm text-gray-900 dark:text-gray-100 dark:bg-gray-700 
        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
        ${formik.touched.email && formik.errors.email ? "border-red-600" : "border-gray-300 dark:border-gray-600"}`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {formik.errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSubmitting ? "Sending..." : "Send Code"}
        </button>
      </form>
    </div>
  );
}
