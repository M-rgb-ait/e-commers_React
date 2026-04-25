import products from "./products/products";
import suppliers from "./suppliers/suppliers";
import warehouses from "./warehouses/warehouses";
import initialWarehouseBalances from "./WarehouseBalances/warehouseBalances";

const getProducts = () => {
  const data = localStorage.getItem("products");
  return data ? JSON.parse(data) : products;
};

const getSuppliers = () => {
  const data = localStorage.getItem("suppliers");
  return data ? JSON.parse(data) : suppliers;
};

const getWarehouses = () => {
  const data = localStorage.getItem("warehouses");
  return data ? JSON.parse(data) : warehouses;
};

const getBalances = () => {
  const data = localStorage.getItem("warehouse_balances");
  return data ? JSON.parse(data) : initialWarehouseBalances;
};

export default function DashboardPage() {
  const products = getProducts();
  const suppliers = getSuppliers();
  const warehouses = getWarehouses();
  const balances = getBalances();

  const totalProducts = products.length;
  const totalSuppliers = suppliers.length;
  const totalWarehouses = warehouses.length;

  const totalStock = balances.reduce((sum, b) => sum + Number(b.quantity), 0);

  // 🏬 Warehouse totals
  const warehouseTotals = balances.reduce((acc, b) => {
    acc[b.warehouse] = (acc[b.warehouse] || 0) + Number(b.quantity);
    return acc;
  }, {});

  const mostWarehouse =
    Object.entries(warehouseTotals).sort((a, b) => b[1] - a[1])[0] || null;

  // 🏭 Supplier counts (FIXED)
  const supplierCounts = products.reduce((acc, p) => {
    acc[p.supplierId] = (acc[p.supplierId] || 0) + 1;
    return acc;
  }, {});

  const topSupplierEntry =
    Object.entries(supplierCounts).sort((a, b) => b[1] - a[1])[0] || null;

  const topSupplier = topSupplierEntry
    ? suppliers.find((s) => s.id === Number(topSupplierEntry[0]))
    : null;

  // 📦 Stock filters
  const outOfStock = balances.filter((b) => Number(b.quantity) === 0);

  const lowStock = balances.filter(
    (b) => Number(b.quantity) > 0 && Number(b.quantity) <= 5,
  );

  const inStock = balances.filter((b) => Number(b.quantity) > 5);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {/* 📊 Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded text-center font-bold shadow-sm">
          <p className="text-sm text-gray-600">Products</p>
          <p className="text-xl">{totalProducts}</p>
        </div>

        <div className="bg-green-100 p-4 rounded text-center font-bold shadow-sm">
          <p className="text-sm text-gray-600">Suppliers</p>
          <p className="text-xl">{totalSuppliers}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded text-center font-bold shadow-sm">
          <p className="text-sm text-gray-600">Warehouses</p>
          <p className="text-xl">{totalWarehouses}</p>
        </div>

        <div className="bg-purple-100 p-4 rounded text-center font-bold shadow-sm">
          <p className="text-sm text-gray-600">Total Stock</p>
          <p className="text-xl">{totalStock}</p>
        </div>
      </div>

      {/* 🔴 Out of Stock */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-red-600 mb-3">🔴 Out of Stock</h3>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>Product</th>
              <th>Warehouse</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {outOfStock.map((b) => (
              <tr key={b.id} className="text-center border-t">
                <td>{b.product}</td>
                <td>{b.warehouse}</td>
                <td className="text-red-600 font-bold">{b.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🟠 Low Stock */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-orange-500 mb-3">
          🟠 Low Stock (≤ 5)
        </h3>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>Product</th>
              <th>Warehouse</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {lowStock.map((b) => (
              <tr key={b.id} className="text-center border-t">
                <td>{b.product}</td>
                <td>{b.warehouse}</td>
                <td className="text-orange-500 font-bold">{b.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🟢 In Stock */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-green-600 mb-3">🟢 In Stock</h3>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>Product</th>
              <th>Warehouse</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {inStock.map((b) => (
              <tr key={b.id} className="text-center border-t">
                <td>{b.product}</td>
                <td>{b.warehouse}</td>
                <td className="text-green-600 font-bold">{b.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🏭 Top Supplier */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-3 text-blue-700">
          🏭 Top Supplier
        </h3>

        {topSupplier ? (
          <div className="bg-gray-100 p-4 rounded">
            <p>
              <span className="font-bold">Name:</span> {topSupplier.name}
            </p>
            <p>
              <span className="font-bold">Country:</span> {topSupplier.country}
            </p>
            <p>
              <span className="font-bold">Products Supplied:</span>{" "}
              {topSupplierEntry?.[1] || 0}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No supplier data found.</p>
        )}
      </div>

      {/* 🏬 Most Warehouse */}
      <div>
        <h3 className="text-xl font-bold mb-3 text-green-700">
          🏬 Warehouse With Most Stock
        </h3>

        {mostWarehouse ? (
          <div className="bg-gray-100 p-4 rounded">
            <p>
              <span className="font-bold">Warehouse:</span> {mostWarehouse[0]}
            </p>
            <p>
              <span className="font-bold">Total Quantity:</span>{" "}
              {mostWarehouse[1]}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No warehouse balances found.</p>
        )}
      </div>
    </div>
  );
}
