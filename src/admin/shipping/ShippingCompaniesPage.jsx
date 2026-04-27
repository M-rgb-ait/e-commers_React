import { useState } from "react";
import initialShippingCompanies from "./initialShippingCompanies";

const getInitialData = () => {
  const data = localStorage.getItem("shipping_companies");
  return data ? JSON.parse(data) : initialShippingCompanies;
};

export default function ShippingCompaniesPage() {
  const [companies, setCompanies] = useState(getInitialData);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    type: "Local",
    phone: "",
  });

  const saveToStorage = (data) => {
    localStorage.setItem("shipping_companies", JSON.stringify(data));
  };

  // ➕ Add
  const openAdd = () => {
    setForm({
      name: "",
      email: "",
      country: "",
      type: "Local",
      phone: "",
    });
    setEditId(null);
    setOpen(true);
  };

  // ✏️ Edit
  const openEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    setOpen(true);
  };

  // 💾 Save
  const handleSave = () => {
    let updated;

    if (editId) {
      updated = companies.map((c) => (c.id === editId ? { ...c, ...form } : c));
    } else {
      updated = [...companies, { id: Date.now(), status: "active", ...form }];
    }

    setCompanies(updated);
    saveToStorage(updated);
    setOpen(false);
  };

  // ❌ Delete
  const handleDelete = (id) => {
    const updated = companies.filter((c) => c.id !== id);
    setCompanies(updated);
    saveToStorage(updated);
  };

  // 🔍 Search
  const filtered = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase()),
  );
  const totalCompanies = companies.length;

  const activeCount = companies.filter((c) => c.status === "active").length;

  const inactiveCount = companies.filter((c) => c.status !== "active").length;

  const countryStats = companies.reduce((acc, c) => {
    acc[c.country] = (acc[c.country] || 0) + 1;
    return acc;
  }, {});
  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-4">Shipping Companies</h2>

      {/* Search + Add */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 w-1/3 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={openAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Company
        </button>
      </div>
      {/* 📊 Analytics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded text-center">
          <p className="text-sm text-gray-600">Total Companies</p>
          <p className="text-2xl font-bold">{totalCompanies}</p>
        </div>

        <div className="bg-green-100 p-4 rounded text-center">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold">{activeCount}</p>
        </div>

        <div className="bg-red-100 p-4 rounded text-center">
          <p className="text-sm text-gray-600">Inactive</p>
          <p className="text-2xl font-bold">{inactiveCount}</p>
        </div>

        <div className="bg-purple-100 p-4 rounded text-center">
          <p className="text-sm text-gray-600">Countries</p>
          <p className="text-2xl font-bold">
            {Object.keys(countryStats).length}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-[900px] w-full border">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Country</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="text-center border-t hover:bg-gray-50">
                <td className="p-2 border font-medium">{c.name}</td>
                <td className="p-2 border">{c.email}</td>
                <td className="p-2 border">{c.country}</td>
                <td className="p-2 border">{c.type}</td>
                <td className="p-2 border">{c.phone}</td>

                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 text-xs text-white rounded ${
                      c.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => openEdit(c)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(c.id)}
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

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">
              {editId ? "Edit Company" : "Add Company"}
            </h3>

            <input
              placeholder="Name"
              className="border p-2 w-full mb-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email"
              className="border p-2 w-full mb-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              placeholder="Country"
              className="border p-2 w-full mb-2"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />

            <select
              className="border p-2 w-full mb-2"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option>Local</option>
              <option>International</option>
            </select>

            <input
              placeholder="Phone"
              className="border p-2 w-full mb-2"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-3 py-1 rounded"
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
