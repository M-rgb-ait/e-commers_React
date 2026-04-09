import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CodeForgitpassword() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: { resetCode: "" },
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setErrorMsg("");
      setSuccess(false);

      try {
        await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          values,
        );
        setSuccess(true);
        setTimeout(() => navigate("/ReasetPassword"), 1000);
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
        Enter Code
      </h1>

      {success && (
        <div className="p-2 mb-4 text-sm text-green-700 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400">
          Code verified successfully!
        </div>
      )}

      {errorMsg && (
        <div className="p-2 mb-4 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400">
          {errorMsg}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} noValidate>
        {/* Reset Code Input */}
        <div className="mb-5">
          <label
            htmlFor="resetCode"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Reset Code
          </label>
          <div className="relative">
            <input
              type="text"
              id="resetCode"
              name="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter the code"
              className={`w-full px-4 py-2 border rounded-lg text-sm text-gray-900 dark:text-gray-100 dark:bg-gray-700 
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                ${formik.touched.resetCode && formik.errors.resetCode ? "border-red-600" : "border-gray-300 dark:border-gray-600"}`}
            />
            {formik.touched.resetCode && formik.errors.resetCode && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {formik.errors.resetCode}
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
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </button>
      </form>
    </div>
  );
}
