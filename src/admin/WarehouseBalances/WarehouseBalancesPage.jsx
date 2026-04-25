import { useState } from "react";
import initialWarehouseBalances from "./warehouseBalances";

const getInitialData = () => {
  const data = localStorage.getItem("warehouse_balances");
  return data ? JSON.parse(data) : initialWarehouseBalances;
};

export default function WarehouseBalancesPage() {
  const [balances, setBalances] = useState(getInitialData);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    product: "",
    warehouse: "",
    quantity: "",
  });

  const saveToStorage = (data) => {
    localStorage.setItem("warehouse_balances", JSON.stringify(data));
  };

  // ➕ Add
  const openAdd = () => {
    setForm({
      product: "",
      warehouse: "",
      quantity: "",
    });
    setEditId(null);
    setOpen(true);
  };

  // ✏️ Edit
  const openEdit = (item) => {
    setForm({
      product: item.product,
      warehouse: item.warehouse,
      quantity: item.quantity,
    });
    setEditId(item.id);
    setOpen(true);
  };

  // 💾 Save
  const handleSave = () => {
    let updated;

    const newItem = {
      ...form,
      quantity: Number(form.quantity),
    };

    if (editId) {
      updated = balances.map((b) =>
        b.id === editId ? { ...b, ...newItem } : b,
      );
    } else {
      updated = [
        ...balances,
        {
          id: Date.now(),
          ...newItem,
        },
      ];
    }

    setBalances(updated);
    saveToStorage(updated);
    setOpen(false);
  };

  // ❌ Delete
  const handleDelete = (id) => {
    const updated = balances.filter((b) => b.id !== id);
    setBalances(updated);
    saveToStorage(updated);
  };

  // 🔍 Search
  const filtered = balances.filter(
    (b) =>
      b.product.toLowerCase().includes(search.toLowerCase()) ||
      b.warehouse.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Warehouse Balances</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search product or warehouse..."
        className="border p-2 w-1/3 rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add */}
      <button
        onClick={openAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 ml-3"
      >
        + Add Balance
      </button>
      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[800px] w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Warehouse</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="text-center border-t">
                <td className="p-2 border">{b.product}</td>
                <td className="p-2 border">{b.warehouse}</td>
                <td className="p-2 border font-bold">{b.quantity}</td>

                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      b.quantity > 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {b.quantity > 0 ? "In Stock" : "Empty"}
                  </span>
                </td>

                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => openEdit(b)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(b.id)}
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
              {editId ? "Edit Balance" : "Add Balance"}
            </h3>

            <input
              placeholder="Product Name"
              className="border p-2 w-full mb-2"
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
            />

            <input
              placeholder="Warehouse"
              className="border p-2 w-full mb-2"
              value={form.warehouse}
              onChange={(e) => setForm({ ...form, warehouse: e.target.value })}
            />

            <input
              type="number"
              placeholder="Quantity"
              className="border p-2 w-full mb-2"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
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
