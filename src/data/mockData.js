// Point this at your real API. Matches the createProduct controller:
// expects multipart/form-data with title, description, price, category,
// brand, stock, discount, featured, specifications (JSON string), image (file)
export const API_BASE_URL = "/api/products";

export const ORDER_STATUSES = ["Pending", "Fulfilled", "Refunded"];

export const revenueData = [
  { day: "Mon", revenue: 4200, orders: 38 },
  { day: "Tue", revenue: 3800, orders: 34 },
  { day: "Wed", revenue: 5100, orders: 47 },
  { day: "Thu", revenue: 4700, orders: 41 },
  { day: "Fri", revenue: 6300, orders: 55 },
  { day: "Sat", revenue: 7400, orders: 63 },
  { day: "Sun", revenue: 6800, orders: 58 },
];

export const initialOrders = [
  { id: "ORD-10482", customer: "Ayesha Khan", items: 3, total: 128.5, status: "Fulfilled", date: "Jul 17" },
  { id: "ORD-10481", customer: "Bilal Ahmed", items: 1, total: 42.0, status: "Pending", date: "Jul 17" },
  { id: "ORD-10480", customer: "Sara Malik", items: 5, total: 310.75, status: "Fulfilled", date: "Jul 16" },
  { id: "ORD-10479", customer: "Usman Tariq", items: 2, total: 76.2, status: "Refunded", date: "Jul 16" },
  { id: "ORD-10478", customer: "Hina Sheikh", items: 4, total: 189.99, status: "Pending", date: "Jul 16" },
  { id: "ORD-10477", customer: "Zain Raza", items: 1, total: 25.0, status: "Fulfilled", date: "Jul 15" },
  { id: "ORD-10476", customer: "Fatima Noor", items: 2, total: 64.4, status: "Fulfilled", date: "Jul 15" },
  { id: "ORD-10475", customer: "Ahmed Raza", items: 6, total: 402.1, status: "Pending", date: "Jul 14" },
];

export const initialProducts = [
  { id: "CT-OL-01", name: "Canvas Tote — Olive", category: "Bags", price: 30, stock: 86, sold: 214 },
  { id: "CM-SET-04", name: "Ceramic Mug Set", category: "Kitchen", price: 24, stock: 42, sold: 178 },
  { id: "LT-BL-02", name: "Linen Throw Blanket", category: "Home", price: 60, stock: 12, sold: 96 },
  { id: "DL-BR-07", name: "Desk Lamp — Brass", category: "Lighting", price: 55, stock: 5, sold: 61 },
  { id: "WV-RG-03", name: "Woven Jute Rug", category: "Home", price: 90, stock: 0, sold: 38 },
  { id: "PL-VS-09", name: "Stoneware Vase", category: "Decor", price: 34, stock: 27, sold: 52 },
];

export const initialCustomers = [
  { id: "CUS-001", name: "Ayesha Khan", email: "ayesha.khan@mail.com", phone: "+92 300 1234567", orders: 12, spent: 1420.5, joined: "Feb 2025" },
  { id: "CUS-002", name: "Bilal Ahmed", email: "bilal.ahmed@mail.com", phone: "+92 301 2345678", orders: 4, spent: 312.0, joined: "May 2025" },
  { id: "CUS-003", name: "Sara Malik", email: "sara.malik@mail.com", phone: "+92 302 3456789", orders: 21, spent: 2870.75, joined: "Nov 2024" },
  { id: "CUS-004", name: "Usman Tariq", email: "usman.tariq@mail.com", phone: "+92 303 4567890", orders: 2, spent: 118.2, joined: "Jul 2025" },
  { id: "CUS-005", name: "Hina Sheikh", email: "hina.sheikh@mail.com", phone: "+92 304 5678901", orders: 8, spent: 940.4, joined: "Jan 2025" },
];

// Keyed by route path so Topbar/Sidebar can look up the label from useLocation().
export const pageTitles = {
  "/adminDashboard": "Dashboard",
  "/orders": "Orders",
  "/customers": "Customers",
  "/add-product": "Products",
  "/setting": "Settings",
};
