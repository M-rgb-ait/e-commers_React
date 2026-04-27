import { updateOrderStatus } from "./allfun";

// 🚚 Assign shipping company automatically
export const assignShippingCompany = (order) => {
  const map = {
    Egypt: "Egypt Post",
    UAE: "Aramex",
    Germany: "DHL Express",
  };

  return map[order.country] || "DHL Express";
};

// 📦 Mark as Shipped
export const shipOrder = (id) => {
  return updateOrderStatus(id, "shipped");
};

// 📬 Mark as Delivered
export const deliverOrder = (id) => {
  return updateOrderStatus(id, "delivered");
};
