import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Minimum 3 characters")
      .max(12, "Maximum 12 characters"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Minimum 6 characters")
      .max(12, "Maximum 12 characters"),
    rePassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setErrorMessage(null);

      try {
        await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values,
        );
        setIsSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        setErrorMessage(err.response?.data?.message || "Something went wrong");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-md rounded-lg dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
        Register New Account
      </h1>

      {isSuccess && (
        <div className="p-2 mb-4 text-sm text-green-700 bg-green-100 rounded-lg text-center">
          Registration successful! Redirecting...
        </div>
      )}

      {errorMessage && (
        <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 rounded-lg text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Mohamed"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-600 mt-1 text-sm">
              {formik.errors.name}
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="example@email.com"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-600 mt-1 text-sm">
              {formik.errors.email}
            </div>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="01012345678"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-600 mt-1 text-sm">
              {formik.errors.phone}
            </div>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
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
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute mt-3 right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300 select-none"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-600 mt-1 text-sm">
              {formik.errors.password}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            type={showRePassword ? "text" : "password"}
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="********"
            className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
          />
          <span
            onClick={() => setShowRePassword(!showRePassword)}
            className="absolute mt-3 right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300 select-none"
          >
            {showRePassword ? "🙈" : "👁️"}
          </span>
          {formik.touched.rePassword && formik.errors.rePassword && (
            <div className="text-red-600 mt-1 text-sm">
              {formik.errors.rePassword}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
