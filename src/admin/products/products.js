const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Electronics",
    price: 1200,
    stock: 15,
    status: "active",
    warehouseId: 1, // Main Warehouse
    supplierId: 2, // Global Importers Ltd.
  },
  {
    id: 2,
    name: "Samsung TV 55 inch",
    category: "Electronics",
    price: 800,
    stock: 10,
    status: "active",
    warehouseId: 3, // Cairo Warehouse
    supplierId: 3, // Asia Supply Hub
  },
  {
    id: 3,
    name: "Nike Air Force",
    category: "Fashion",
    price: 120,
    stock: 0,
    status: "inactive",
    warehouseId: 2, // Alex Warehouse
    supplierId: 5, // Euro Wholesale Group
  },
  {
    id: 4,
    name: "MacBook Pro M3",
    category: "Electronics",
    price: 2200,
    stock: 7,
    status: "active",
    warehouseId: 1, // Main Warehouse
    supplierId: 7, // American Trade Partners
  },
  {
    id: 5,
    name: "Air Fryer XL",
    category: "Home & Kitchen",
    price: 150,
    stock: 25,
    status: "active",
    warehouseId: 3, // Cairo Warehouse
    supplierId: 4, // Delta Market Supplies
  },
  {
    id: 6,
    name: "Sony Headphones WH-1000XM5",
    category: "Electronics",
    price: 400,
    stock: 12,
    status: "active",
    warehouseId: 1, // Main Warehouse
    supplierId: 11, // Smart Tech Supplies
  },
  {
    id: 7,
    name: "Adidas Hoodie",
    category: "Fashion",
    price: 90,
    stock: 30,
    status: "active",
    warehouseId: 2, // Alex Warehouse
    supplierId: 10, // Mena Wholesale Network
  },
  {
    id: 8,
    name: "Blender Kitchen Pro",
    category: "Home & Kitchen",
    price: 75,
    stock: 18,
    status: "active",
    warehouseId: 3, // Cairo Warehouse
    supplierId: 6, // Nile Valley Suppliers
  },
  {
    id: 9,
    name: "Coffee Machine Deluxe",
    category: "Home & Kitchen",
    price: 200,
    stock: 5,
    status: "active",
    warehouseId: 1, // Main Warehouse
    supplierId: 5, // Euro Wholesale Group
  },
  {
    id: 10,
    name: "Gaming Chair Pro",
    category: "Electronics",
    price: 350,
    stock: 0,
    status: "inactive",
    warehouseId: 2, // Alex Warehouse
    supplierId: 8, // Red Sea Logistics
  },
];

export default products;
