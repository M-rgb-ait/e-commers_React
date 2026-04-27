import { useState } from "react";
import initialProducts from "./products";
import suppliersData from "../suppliers/suppliers"; // 👈 مهم نغير الاسم

/* =========================
   SAFE LOCALSTORAGE
========================= */

const safeJSON = (key, fallback = []) => {
  try {
    const data = localStorage.getItem(key);
    if (!data || data === "[]") return fallback;
    return JSON.parse(data);
  } catch {
    return fallback;
  }
};

/* =========================
   STATIC WAREHOUSES
========================= */

const warehouses = [
  { id: 1, name: "Main Warehouse" },
  { id: 2, name: "Alex Warehouse" },
  { id: 3, name: "Cairo Warehouse" },
];

/* =========================
   INIT DATA
========================= */

const getInitialData = () => {
  const data = localStorage.getItem("products");

  if (!data || data === "[]") {
    localStorage.setItem("products", JSON.stringify(initialProducts));
    return initialProducts;
  }

  return JSON.parse(data);
};

/* =========================
   COMPONENT
========================= */

export default function ProductsPage() {
  const [products, setProducts] = useState(getInitialData);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // 🔥 FIX: استخدم الملف مباشرة (مش localStorage)
  const suppliers = suppliersData;

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    warehouseId: "",
    supplierId: "",
  });

  /* =========================
     STORAGE
  ========================= */

  const saveToStorage = (data) => {
    localStorage.setItem("products", JSON.stringify(data));
  };

  /* =========================
     HELPERS
  ========================= */

  const getSupplierName = (id) => {
    const supplier = suppliers.find((s) => Number(s.id) === Number(id));
    return supplier?.name || "Unknown Supplier";
  };

  const getWarehouseName = (id) => {
    const warehouse = warehouses.find((w) => Number(w.id) === Number(id));
    return warehouse?.name || "No Warehouse";
  };

  /* =========================
     STATS
  ========================= */

  const activeCount = products.filter((p) => p.stock > 0).length;
  const inactiveCount = products.filter((p) => p.stock === 0).length;
  const totalCount = products.length;

  /* =========================
     CRUD
  ========================= */

  const openAdd = () => {
    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      warehouseId: "",
      supplierId: "",
    });
    setEditId(null);
    setOpen(true);
  };

  const openEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      warehouseId: product.warehouseId,
      supplierId: product.supplierId,
    });

    setEditId(product.id);
    setOpen(true);
  };

  const handleSave = () => {
    const newProduct = {
      id: editId || Date.now(),
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      status: Number(form.stock) > 0 ? "active" : "inactive",
      warehouseId: Number(form.warehouseId),
      supplierId: Number(form.supplierId),
    };

    let updated;

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

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveToStorage(updated);
  };

  /* =========================
     FILTER
  ========================= */

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  /* =========================
     UI
  ========================= */

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Products Management</h2>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-3 text-center">
          Active: {activeCount}
        </div>
        <div className="bg-red-100 p-3 text-center">
          Inactive: {inactiveCount}
        </div>
        <div className="bg-blue-100 p-3 text-center">Total: {totalCount}</div>
      </div>

      {/* SEARCH + ADD */}
      <div className="flex gap-3 mb-4">
        <input
          className="border p-2 w-1/3"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={openAdd} className="bg-blue-600 text-white px-4 py-2">
          + Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Warehouse</th>
              <th>Supplier</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="text-center border-t">
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>

                <td>
                  <span
                    className={`px-2 py-1 text-white text-xs rounded ${
                      p.stock > 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {p.stock > 0 ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>{getWarehouseName(p.warehouseId)}</td>
                <td>{getSupplierName(p.supplierId)}</td>

                <td className="flex justify-center gap-2">
                  <button
                    onClick={() => openEdit(p)}
                    className="bg-yellow-500 px-2 py-1"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 px-2 py-1 text-white"
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
          <div className="bg-white p-5 w-[400px]">
            <h3 className="text-lg mb-3">
              {editId ? "Edit Product" : "Add Product"}
            </h3>

            {["name", "category", "price", "stock"].map((k) => (
              <input
                key={k}
                className="border p-2 w-full mb-2"
                placeholder={k}
                value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              />
            ))}

            {/* Warehouse */}
            <select
              className="border p-2 w-full mb-2"
              value={form.warehouseId}
              onChange={(e) =>
                setForm({
                  ...form,
                  warehouseId: e.target.value,
                })
              }
            >
              <option value="">Select Warehouse</option>
              {warehouses.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>

            {/* Supplier */}
            <select
              className="border p-2 w-full mb-2"
              value={form.supplierId}
              onChange={(e) =>
                setForm({
                  ...form,
                  supplierId: e.target.value,
                })
              }
            >
              <option value="">Select Supplier</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)}>Cancel</button>

              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-3 py-1"
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
