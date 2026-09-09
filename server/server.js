import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "data", "db.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Helper to read DB
function readDb() {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading db.json:", err);
    return {
      products: [],
      categories: [],
      orders: [],
      plugins: [],
      settings: {},
    };
  }
}

// Helper to write DB
function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing db.json:", err);
    return false;
  }
}

// ==================== AUTH API ====================
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  const db = readDb();
  const validUser = db.settings?.adminUser || "admin";
  const validPass = db.settings?.adminPass || "admin";

  if (username === validUser && password === validPass) {
    return res.json({
      success: true,
      user: {
        username: validUser,
        role: "administrator",
        displayName: "Quản Trị Viên (Admin)",
      },
      token: "wp-admin-token-secret-8888",
    });
  } else {
    return res
      .status(401)
      .json({
        success: false,
        message: "Sai tên đăng nhập hoặc mật khẩu! Mặc định là admin / admin",
      });
  }
});

// ==================== PRODUCTS API ====================
app.get("/api/products", (req, res) => {
  const db = readDb();
  let result = db.products || [];
  const { category, search, flashSale } = req.query;

  if (category && category !== "all") {
    result = result.filter((p) => p.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)),
    );
  }
  if (flashSale === "true") {
    result = result.filter((p) => p.isFlashSale);
  }

  res.json(result);
});

app.get("/api/products/:id", (req, res) => {
  const db = readDb();
  const product = db.products.find((p) => p.id === Number(req.params.id));
  if (!product)
    return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  res.json(product);
});

app.post("/api/products", (req, res) => {
  const db = readDb();
  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    slug: (req.body.name || "").toLowerCase().replace(/[^a-z0-9]/g, "-"),
    category: req.body.category || "nhap-khau",
    categoryName: req.body.categoryName || "Trái Cây Nhập Khẩu",
    price: Number(req.body.price) || 0,
    originalPrice:
      Number(req.body.originalPrice) || Number(req.body.price) || 0,
    stock: Number(req.body.stock) || 50,
    unit: req.body.unit || "1 Kg",
    origin: req.body.origin || "Nhập khẩu",
    sweetness: req.body.sweetness || "Tươi ngon tự nhiên",
    badge: req.body.badge || "",
    image:
      req.body.image ||
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewCount: 1,
    description: req.body.description || "Hoa quả tươi ngon tuyển chọn loại 1.",
    isFlashSale: !!req.body.isFlashSale,
    featured: !!req.body.featured,
  };

  db.products.unshift(newProduct);
  writeDb(db);
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  const db = readDb();
  const id = Number(req.params.id);
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1)
    return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

  db.products[index] = { ...db.products[index], ...req.body, id };
  writeDb(db);
  res.json(db.products[index]);
});

app.delete("/api/products/:id", (req, res) => {
  const db = readDb();
  const id = Number(req.params.id);
  const beforeLen = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length === beforeLen)
    return res.status(404).json({ message: "Không tìm thấy sản phẩm để xóa" });

  writeDb(db);
  res.json({ success: true, message: "Đã xóa sản phẩm thành công" });
});

// ==================== CATEGORIES API ====================
app.get("/api/categories", (req, res) => {
  const db = readDb();
  res.json(db.categories || []);
});

// ==================== ORDERS API ====================
app.get("/api/orders", (req, res) => {
  const db = readDb();
  res.json(db.orders || []);
});

app.post("/api/orders", (req, res) => {
  const db = readDb();
  const newOrder = {
    id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
    customer: req.body.customer,
    phone: req.body.phone,
    address: req.body.address,
    note: req.body.note || "",
    items: req.body.items || [],
    subtotal: req.body.subtotal || 0,
    discount: req.body.discount || 0,
    total: req.body.total || 0,
    paymentMethod: req.body.paymentMethod || "COD",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  db.orders.unshift(newOrder);
  writeDb(db);
  res.status(201).json(newOrder);
});

app.put("/api/orders/:id/status", (req, res) => {
  const db = readDb();
  const order = db.orders.find((o) => o.id === req.params.id);
  if (!order)
    return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

  order.status = req.body.status;
  writeDb(db);
  res.json(order);
});

// ==================== PLUGINS API ====================
app.get("/api/plugins", (req, res) => {
  const db = readDb();
  res.json(db.plugins || []);
});

app.put("/api/plugins/:id/toggle", (req, res) => {
  const db = readDb();
  const plugin = db.plugins.find((p) => p.id === req.params.id);
  if (!plugin)
    return res.status(404).json({ message: "Không tìm thấy plugin" });

  plugin.active = !plugin.active;
  writeDb(db);
  res.json(plugin);
});

app.put("/api/plugins/:id/settings", (req, res) => {
  const db = readDb();
  const plugin = db.plugins.find((p) => p.id === req.params.id);
  if (!plugin)
    return res.status(404).json({ message: "Không tìm thấy plugin" });

  plugin.settings = { ...plugin.settings, ...req.body };
  writeDb(db);
  res.json(plugin);
});

// ==================== SETTINGS API ====================
app.get("/api/settings", (req, res) => {
  const db = readDb();
  res.json(db.settings || {});
});

app.put("/api/settings", (req, res) => {
  const db = readDb();
  db.settings = { ...db.settings, ...req.body };
  writeDb(db);
  res.json(db.settings);
});

// ==================== START SERVER WITH VITE ====================
async function startServer() {
  // Integrate Vite dev server middleware
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
    root: path.join(__dirname, ".."),
  });

  app.use(vite.middlewares);

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🍓 FRUIT PARADISE STORE & WORDPRESS ADMIN CMS`);
    console.log(`🚀 Website đang chạy tại: http://localhost:${PORT}`);
    console.log(`🔑 Đăng nhập Admin WP: Tài khoản "admin" | Mật khẩu "admin"`);
    console.log(`======================================================\n`);
  });
}

startServer();
