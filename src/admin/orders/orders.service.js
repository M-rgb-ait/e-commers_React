import initialOrders from "./initialOrders";

// 📥 Get Orders
export const getOrders = () => {
  const data = localStorage.getItem("orders");
  return data ? JSON.parse(data) : initialOrders;
};

// 💾 Save
export const saveOrders = (orders) => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

// ➕ Create Order
export const createOrder = (order) => {
  const orders = getOrders();

  const newOrder = {
    id: Date.now(),
    ...order,
    status: "pending",
    createdAt: new Date().toISOString().split("T")[0],
  };

  const updated = [...orders, newOrder];
  saveOrders(updated);

  return newOrder;
};

// 🔄 Update Status (Shipping Flow)
export const updateOrderStatus = (id, status) => {
  const orders = getOrders();

  const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));

  saveOrders(updated);
  return updated;
};

// ❌ Delete Order
export const deleteOrder = (id) => {
  const orders = getOrders();

  const updated = orders.filter((o) => o.id !== id);

  saveOrders(updated);
  return updated;
};
