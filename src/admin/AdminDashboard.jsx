import { useNavigate } from "react-router-dom";
import SuppliersPage from "./suppliers/supplierspage";
import ProductsPage from "./products/ProductsPage";
import WarehousesPage from "./warehouses/WarehousesPage";
import WarehouseBalancesPage from "./WarehouseBalances/WarehouseBalancesPage";
import DashboardPage from "./DashboardPage";
import ShippingCompaniesPage from "./shipping/ShippingCompaniesPage";
import OrdersPage from "./orders/OrdersPage";
// import StockMovementPage from "./StockMovement";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const adminName = localStorage.getItem("adminName");

  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminName");
    navigate("/admin-login");
  };

  return (
    <div className="max-w-7xl mx-auto px-3 py-3 mt-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
          <p className="text-gray-500 mt-1">
            Welcome, <span className="font-semibold">{adminName}</span>
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          Logout
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        <div className="bg-white rounded-xl shadow p-3 border">
          <SuppliersPage />
        </div>

        <div className="bg-white rounded-xl shadow p-3 border">
          <ProductsPage />
        </div>

        <div className="bg-white rounded-xl shadow p-3 border">
          <WarehousesPage />
        </div>

        <div className="bg-white rounded-xl shadow p-3 border">
          <WarehouseBalancesPage />
        </div>

        <div className="bg-white rounded-xl shadow p-3 border">
          <DashboardPage />
        </div>
        <div className="bg-white rounded-xl shadow p-3 border">
          <ShippingCompaniesPage />
        </div>
        <div className="bg-white rounded-xl shadow p-3 border">
          <OrdersPage />
        </div>
      </div>
    </div>
  );
}
