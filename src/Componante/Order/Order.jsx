import axios from "axios";
import { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useFormik } from "formik";

export default function Order() {
  const { restevalus, cartId } = useContext(cartContext);
  const [iscash, setIscash] = useState(true);

  const formakobj = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: function (values) {
      //if (iscash) {
      if (iscash) {
        createcashorder(values);
      } else {
        createCheckout(values);
      }
    },
  });

  function createcashorder(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("order create", { position: "top-right" });
          restevalus();
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  function createCheckout(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            url: "http://localhost:5173",
          },
        },
      )
      .then((res) => {
        window.open(res.data.session.url, "_self");
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <>
      <div className="container mx-auto p-6 mt-10">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-emerald-600 to-green-500 py-3 rounded-lg shadow-md">
          Create Order
        </h2>

        {/* Form */}
        <form
          className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          onSubmit={formakobj.handleSubmit}
        >
          {/* Details */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Order Details
            </label>
            <input
              onChange={formakobj.handleChange}
              value={formakobj.values.details}
              type="text"
              id="details"
              placeholder="Enter order details..."
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              onChange={formakobj.handleChange}
              value={formakobj.values.phone}
              type="tel"
              id="phone"
              placeholder="01xxxxxxxxx"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            />
          </div>

          {/* City */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              City
            </label>
            <input
              onChange={formakobj.handleChange}
              value={formakobj.values.city}
              type="text"
              id="city"
              placeholder="Enter your city..."
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => setIscash(true)}
              type="submit"
              className="w-full sm:w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg shadow-md transition"
            >
              Cash Order
            </button>

            <button
              onClick={() => setIscash(false)}
              type="submit"
              className="w-full sm:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-md transition"
            >
              Checkout
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
