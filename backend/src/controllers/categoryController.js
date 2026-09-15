import pool from "../config/db.js";

// Lấy danh sách danh mục
export const getAllCategories = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi lấy danh mục", error: err.message });
  }
};
