import { useState } from "react";
import initialProducts from "./products";

const getInitialData = () => {
  const data = localStorage.getItem("products");
  return data ? JSON.parse(data) : initialProducts;
};

export default function ProductsPage() {
  const [products, setProducts] = useState(getInitialData);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    warehouse: "",
    supplier: "",
  });

  const saveToStorage = (data) => {
    localStorage.setItem("products", JSON.stringify(data));
  };

  // 📊 Stats
  const activeCount = products.filter((p) => p.stock > 0).length;
  const inactiveCount = products.filter((p) => p.stock === 0).length;
  const totalCount = products.length;

  // ➕ Add
  const openAdd = () => {
    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      warehouse: "",
      supplier: "",
    });
    setEditId(null);
    setOpen(true);
  };

  // ✏️ Edit
  const openEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      warehouse: product.warehouse,
      supplier: product.supplier,
    });

    setEditId(product.id);
    setOpen(true);
  };

  // 💾 Save
  const handleSave = () => {
    let updated;

    const newProduct = {
      id: editId || Date.now(),
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      status: Number(form.stock) > 0 ? "active" : "inactive",
    };

    if (editId) {
      updated = products.map((p) => (p.id === editId ? newProduct : p));
    } else {
      updated = [...products, newProduct];
    }

    setProducts(updated);
    saveToStorage(updated);
    setOpen(false);
    setEditId(null);
  };

  // ❌ Delete
  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveToStorage(updated);
  };

  // 🔍 Search
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Products Management</h2>

      {/* 📊 Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-3 rounded text-center">
          Active: {activeCount}
        </div>
        <div className="bg-red-100 p-3 rounded text-center">
          Inactive: {inactiveCount}
        </div>
        <div className="bg-blue-100 p-3 rounded text-center">
          Total: {totalCount}
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="border p-2 w-1/3 rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add */}
      <button
        onClick={openAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 ml-3"
      >
        + Add Product
      </button>

      {/* Table */}
      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[900px] w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Warehouse</th>
              <th className="p-2 border">Supplier</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="text-center border-t">
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.category}</td>
                <td className="p-2 border">${p.price}</td>
                <td className="p-2 border">{p.stock}</td>

                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      p.stock > 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {p.stock > 0 ? "active" : "inactive"}
                  </span>
                </td>

                <td className="p-2 border">{p.warehouse}</td>
                <td className="p-2 border">{p.supplier}</td>

                <td className="p-2 border">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
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

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-4">
              {editId ? "Edit Product" : "Add Product"}
            </h3>

            {Object.keys(form).map((key) => (
              <input
                key={key}
                placeholder={key}
                className="border p-2 w-full mb-2"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            ))}

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
