import { useState } from "react";
import initialOrders from "./initialOrders";
import { createOrder, deleteOrder } from "./orders.service";
import { deliverOrder, shipOrder } from "./shipping.service";

const getData = () => {
  const data = localStorage.getItem("orders");
  return data ? JSON.parse(data) : initialOrders;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(getData());
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    customer: "",
    product: "",
    warehouse: "",
    shippingCompany: "",
    total: "",
  });

  // 🔍 Search
  const filtered = orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingCompany.toLowerCase().includes(search.toLowerCase()),
  );

  // ➕ Add Order
  const handleAdd = () => {
    const newOrder = createOrder({
      ...form,
      products: [{ name: form.product, qty: 1 }],
    });

    const updated = [...orders, newOrder];
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));

    setOpen(false);
  };

  //  Delete
  const handleDelete = (id) => {
    const updated = deleteOrder(id);
    setOrders(updated);
  };

  //  Ship
  const handleShip = (id) => {
    const updated = shipOrder(id);
    setOrders(updated);
  };

  //  Deliver
  const handleDeliver = (id) => {
    const updated = deliverOrder(id);
    setOrders(updated);
  };

  const totalOrders = orders.length;

  // 💰 Total Revenue
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);

  const deliveredCount = orders.filter((o) => o.status === "delivered").length;

  // 📦 Average Order Value
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const successRate =
    totalOrders > 0 ? ((deliveredCount / totalOrders) * 100).toFixed(1) : 0;
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Orders Management</h2>

      {/* 🔍 Search + Add */}
      <div className="flex gap-3 mb-4">
        <input
          className="border p-2 w-1/3 rounded"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Order
        </button>
      </div>
      {/* 📊 Analytics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded text-center">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>

        <div className="bg-green-100 p-4 rounded text-center">
          <p className="text-sm text-gray-600">Revenue</p>
          <p className="text-2xl font-bold">${totalRevenue}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded text-center">
          <p className="text-sm text-gray-600">Avg Order</p>
          <p className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</p>
        </div>

        <div className="bg-purple-100 p-4 rounded text-center">
          <p className="text-sm text-gray-600">Delivered</p>
          <p className="text-2xl font-bold">{deliveredCount}</p>
        </div>
        <div className="bg-green-200 p-4 rounded text-center">
          <p className="text-sm text-gray-600">Success Rate</p>
          <p className="text-2xl font-bold">{successRate}%</p>
        </div>
      </div>
      {/* 📦 Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full border">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Warehouse</th>
              <th className="p-2 border">Shipping</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="text-center border-t">
                <td className="p-2 border">{o.customer}</td>
                <td className="p-2 border">
                  {o.products.map((p) => p.name).join(", ")}
                </td>
                <td className="p-2 border">{o.warehouse}</td>
                <td className="p-2 border">{o.shippingCompany}</td>

                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      o.status === "delivered"
                        ? "bg-green-600"
                        : o.status === "shipped"
                          ? "bg-blue-600"
                          : "bg-yellow-500"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>

                <td className="p-2 border">${o.total}</td>

                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleShip(o.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Ship
                  </button>

                  <button
                    onClick={() => handleDeliver(o.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Deliver
                  </button>

                  <button
                    onClick={() => handleDelete(o.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ➕ Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-3">Add Order</h3>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Customer"
              onChange={(e) => setForm({ ...form, customer: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-2"
              placeholder="Product"
              onChange={(e) => setForm({ ...form, product: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-2"
              placeholder="Warehouse"
              onChange={(e) => setForm({ ...form, warehouse: e.target.value })}
            />

            <input
              className="border p-2 w-full mb-2"
              placeholder="Shipping Company"
              onChange={(e) =>
                setForm({ ...form, shippingCompany: e.target.value })
              }
            />

            <input
              className="border p-2 w-full mb-2"
              placeholder="Total"
              type="number"
              onChange={(e) => setForm({ ...form, total: e.target.value })}
            />

            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-400 px-3 py-1 rounded text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleAdd}
                className="bg-green-600 px-3 py-1 rounded text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
