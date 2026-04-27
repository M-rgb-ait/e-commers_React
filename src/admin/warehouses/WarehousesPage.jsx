import { useState } from "react";
import initialWarehouses from "./warehouses";

const getInitialData = () => {
  const data = localStorage.getItem("warehouses");
  return data ? JSON.parse(data) : initialWarehouses;
};

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState(getInitialData);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    location: "",
    capacity: "",
    used: "",
    manager: "",
  });

  const saveToStorage = (data) => {
    localStorage.setItem("warehouses", JSON.stringify(data));
  };

  // 📊 Stats
  const activeCount = warehouses.filter((w) => w.status === "active").length;
  const inactiveCount = warehouses.filter(
    (w) => w.status === "inactive",
  ).length;
  const totalCount = warehouses.length;

  // ➕ Add
  const openAdd = () => {
    setForm({
      name: "",
      location: "",
      capacity: "",
      used: "",
      manager: "",
    });
    setEditId(null);
    setOpen(true);
  };

  // ✏️ Edit
  const openEdit = (w) => {
    setForm(w);
    setEditId(w.id);
    setOpen(true);
  };

  // 💾 Save
  const handleSave = () => {
    let updated;

    if (editId) {
      updated = warehouses.map((w) =>
        w.id === editId ? { ...w, ...form } : w,
      );
    } else {
      const newWarehouse = {
        ...form,
        id: Date.now(),
        capacity: Number(form.capacity),
        used: Number(form.used),
        status: "active",
      };

      updated = [...warehouses, newWarehouse];
    }

    setWarehouses(updated);
    saveToStorage(updated);
    setOpen(false);
  };

  // ❌ Delete
  const handleDelete = (id) => {
    const updated = warehouses.filter((w) => w.id !== id);
    setWarehouses(updated);
    saveToStorage(updated);
  };

  // 🔍 Search
  const filtered = warehouses.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Warehouses Management</h2>

      {/* 📊 Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded text-center shadow-sm">
          <p className="text-sm text-gray-600">Active Warehouses</p>
          <p className="text-2xl font-bold text-green-700">{activeCount}</p>
        </div>

        <div className="bg-red-100 p-4 rounded text-center shadow-sm">
          <p className="text-sm text-gray-600">Inactive Warehouses</p>
          <p className="text-2xl font-bold text-red-700">{inactiveCount}</p>
        </div>

        <div className="bg-blue-100 p-4 rounded text-center shadow-sm">
          <p className="text-sm text-gray-600">Total Warehouses</p>
          <p className="text-2xl font-bold text-blue-700">{totalCount}</p>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search warehouses..."
        className="border p-2 w-1/3 rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add */}
      <button
        onClick={openAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 ml-3"
      >
        + Add Warehouse
      </button>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[900px] w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Capacity</th>
              <th className="p-2 border">Used</th>
              <th className="p-2 border">Manager</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((w) => (
              <tr key={w.id} className="text-center border-t">
                <td className="p-2 border">{w.name}</td>
                <td className="p-2 border">{w.location}</td>
                <td className="p-2 border">{w.capacity}</td>
                <td className="p-2 border">{w.used}</td>
                <td className="p-2 border">{w.manager}</td>

                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      w.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {w.status}
                  </span>
                </td>

                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => openEdit(w)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(w.id)}
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

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">
              {editId ? "Edit Warehouse" : "Add Warehouse"}
            </h3>

            <input
              placeholder="Name"
              className="border p-2 w-full mb-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Location"
              className="border p-2 w-full mb-2"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            <input
              type="number"
              placeholder="Capacity"
              className="border p-2 w-full mb-2"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            />

            <input
              type="number"
              placeholder="Used"
              className="border p-2 w-full mb-2"
              value={form.used}
              onChange={(e) => setForm({ ...form, used: e.target.value })}
            />

            <input
              placeholder="Manager"
              className="border p-2 w-full mb-2"
              value={form.manager}
              onChange={(e) => setForm({ ...form, manager: e.target.value })}
            />

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
