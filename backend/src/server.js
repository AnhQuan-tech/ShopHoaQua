import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import pluginRoutes from "./routes/pluginRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/plugins", pluginRoutes);
app.use("/api/settings", settingRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start Server (chỉ lắng nghe khi không phải serverless Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🍉 FRUIT PARADISE STORE - BACKEND RESTful API`);
    console.log(`🚀 Máy chủ Backend đang chạy tại: http://localhost:${PORT}`);
    console.log(`🗄️  CSDL MySQL: ${process.env.DB_NAME || "shop_hoa_qua"} (Port ${process.env.DB_PORT || 3306})`);
    console.log(`🔑 Đăng nhập Admin WP: Tài khoản "admin" | Mật khẩu "admin"`);
    console.log(`======================================================\n`);
  });
}

export default app;
