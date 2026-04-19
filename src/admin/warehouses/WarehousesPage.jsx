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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Warehouses Management</h2>

      {/* 📊 Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded text-center shadow">
          <p className="text-sm text-gray-600">Active Warehouses</p>
          <p className="text-2xl font-bold text-green-700">{activeCount}</p>
        </div>

        <div className="bg-red-100 p-4 rounded text-center shadow">
          <p className="text-sm text-gray-600">Inactive Warehouses</p>
          <p className="text-2xl font-bold text-red-700">{inactiveCount}</p>
        </div>

        <div className="bg-blue-100 p-4 rounded text-center shadow">
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
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-sm">
            <th>Name</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Used</th>
            <th>Manager</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((w) => (
            <tr key={w.id} className="text-center border-t">
              <td>{w.name}</td>
              <td>{w.location}</td>
              <td>{w.capacity}</td>
              <td>{w.used}</td>
              <td>{w.manager}</td>

              <td>
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    w.status === "active" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {w.status}
                </span>
              </td>

              <td className="space-x-2">
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
