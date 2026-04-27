import { useState } from "react";
import initialSuppliers from "./suppliers";

// 🟢 Load from localStorage or fallback
const getInitialData = () => {
  const data = localStorage.getItem("suppliers");
  return data ? JSON.parse(data) : initialSuppliers;
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(getInitialData);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  // 🔍 Search + Filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "local",
    country: "",
    supplies: [],
  });

  // 💾 Save
  const saveToStorage = (data) => {
    localStorage.setItem("suppliers", JSON.stringify(data));
  };

  // 🟢 Add
  const openAdd = () => {
    setForm({
      name: "",
      email: "",
      type: "local",
      country: "",
      supplies: [],
    });
    setEditId(null);
    setOpen(true);
  };

  // 🟡 Edit
  const openEdit = (supplier) => {
    setForm({
      ...supplier,
      supplies: supplier.supplies || [],
    });
    setEditId(supplier.id);
    setOpen(true);
  };

  // 💾 Save
  const handleSave = () => {
    let updated;

    if (editId) {
      updated = suppliers.map((s) => (s.id === editId ? { ...s, ...form } : s));
    } else {
      const newSupplier = {
        ...form,
        id: Date.now(),
        status: "active",
        rating: 4.0,
      };

      updated = [...suppliers, newSupplier];
    }

    setSuppliers(updated);
    saveToStorage(updated);
    setOpen(false);
  };

  // ❌ Delete
  const handleDelete = (id) => {
    const updated = suppliers.filter((s) => s.id !== id);
    setSuppliers(updated);
    saveToStorage(updated);
  };

  // 🟣 All available supplies for filter
  const allSupplies = [...new Set(suppliers.flatMap((s) => s.supplies || []))];

  // 🔍 Filtered Data
  const filteredSuppliers = suppliers.filter((sup) => {
    const matchSearch =
      sup.name.toLowerCase().includes(search.toLowerCase()) ||
      sup.email.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "all" || sup.supplies?.includes(filter);

    return matchSearch && matchFilter;
  });

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Suppliers Management</h2>

      {/* 🔍 Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="border p-2 w-full md:w-1/3 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full md:w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Supplies</option>
          {allSupplies.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Add Button */}
      <button
        onClick={openAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add Supplier
      </button>

      {/* 🟢 TABLE WRAPPER RESPONSIVE FIX */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Country</th>
              <th>Supplies</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSuppliers.map((sup) => (
              <tr
                key={sup.id}
                className="text-center border-t hover:bg-gray-50"
              >
                <td>{sup.name}</td>
                <td>{sup.email}</td>
                <td>{sup.type === "local" ? "Local 🇪🇬" : "Foreign"}</td>
                <td>{sup.country}</td>

                {/* Supplies */}
                <td>
                  {sup.supplies?.map((item, i) => (
                    <span
                      key={i}
                      className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded m-1 text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </td>

                {/* Actions */}

                <td className="p-2 border">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => openEdit(sup)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(sup.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🟣 Modal (زي ما هو) */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">
              {editId ? "Edit Supplier" : "Add Supplier"}
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

            <select
              className="border p-2 w-full mb-2"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="local">Local</option>
              <option value="foreign">Foreign</option>
            </select>

            <input
              placeholder="Country"
              className="border p-2 w-full mb-2"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />

            {/* Supplies */}
            <div className="mb-3">
              <p className="font-bold mb-1">Supplies</p>

              {[
                "Electronics",
                "Fashion",
                "Home & Kitchen",
                "Food & Beverages",
              ].map((item) => (
                <label key={item} className="block text-sm">
                  <input
                    type="checkbox"
                    checked={form.supplies.includes(item)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({
                          ...form,
                          supplies: [...form.supplies, item],
                        });
                      } else {
                        setForm({
                          ...form,
                          supplies: form.supplies.filter((s) => s !== item),
                        });
                      }
                    }}
                  />{" "}
                  {item}
                </label>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-600 text-white rounded"
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
