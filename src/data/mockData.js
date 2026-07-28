export const API_BASE_URL = "/products";

export const AUTH_BASE_URL = "/authentication";

export const ORDERS_API_URL = "/orders";

export const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export const revenueData = [
  { day: "Mon", revenue: 4200, orders: 38 },
  { day: "Tue", revenue: 3800, orders: 34 },
  { day: "Wed", revenue: 5100, orders: 47 },
  { day: "Thu", revenue: 4700, orders: 41 },
  { day: "Fri", revenue: 6300, orders: 55 },
  { day: "Sat", revenue: 7400, orders: 63 },
  { day: "Sun", revenue: 6800, orders: 58 },
];

export const pageTitles = {
  "/adminDashboard": "Dashboard",
  "/orders": "Orders",
  "/customers": "Customers",
  "/add-product": "Products",
  "/setting": "Settings",
};
