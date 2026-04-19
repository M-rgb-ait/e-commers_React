import { useNavigate } from "react-router-dom";
import SuppliersPage from "./suppliers/supplierspage";
import ProductsPage from "./products/ProductsPage";
import WarehousesPage from "./warehouses/WarehousesPage";
import WarehouseBalancesPage from "./WarehouseBalances/WarehouseBalancesPage";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const adminName = localStorage.getItem("adminName");

  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminName");
    navigate("/admin-login");
  };

  return (
    <div style={{ padding: "30px", margin: "70px" }}>
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <p>Welcome {adminName}</p>
      <SuppliersPage />
      <ProductsPage />
      <WarehousesPage />
      <WarehouseBalancesPage />
    </div>
  );
}
