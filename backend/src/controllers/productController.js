import pool from "../config/db.js";

// Lấy danh sách sản phẩm (hỗ trợ lọc category, tìm kiếm search, flashSale)
export const getAllProducts = async (req, res) => {
  try {
    const { category, search, flashSale } = req.query;
    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];

    if (category && category !== "all") {
      query += " AND category = ?";
      params.push(category);
    }

    if (search) {
      query += " AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ?)";
      const term = `%${search.toLowerCase()}%`;
      params.push(term, term);
    }

    if (flashSale === "true") {
      query += " AND isFlashSale = 1";
    }

    query += " ORDER BY createdAt DESC";

    const [rows] = await pool.query(query, params);

    // Format boolean fields và số
    const formatted = rows.map((p) => ({
      ...p,
      id: Number(p.id),
      price: Number(p.price),
      originalPrice: Number(p.originalPrice),
      stock: Number(p.stock),
      rating: Number(p.rating),
      reviewCount: Number(p.reviewCount),
      isFlashSale: Boolean(p.isFlashSale),
      featured: Boolean(p.featured),
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi lấy danh sách sản phẩm", error: err.message });
  }
};

// Lấy chi tiết 1 sản phẩm theo ID
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    const p = rows[0];
    res.json({
      ...p,
      id: Number(p.id),
      price: Number(p.price),
      originalPrice: Number(p.originalPrice),
      stock: Number(p.stock),
      rating: Number(p.rating),
      reviewCount: Number(p.reviewCount),
      isFlashSale: Boolean(p.isFlashSale),
      featured: Boolean(p.featured),
    });
  } catch (err) {
    console.error("Error fetching product by id:", err);
    res.status(500).json({ message: "Lỗi máy chủ", error: err.message });
  }
};

// Thêm sản phẩm mới
export const createProduct = async (req, res) => {
  try {
    const id = Date.now();
    const {
      name,
      category = "nhap-khau",
      categoryName = "Trái Cây Nhập Khẩu",
      price = 0,
      originalPrice,
      stock = 50,
      unit = "1 Kg",
      origin = "Nhập khẩu",
      sweetness = "Tươi ngon tự nhiên",
      badge = "",
      image = "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
      description = "Hoa quả tươi ngon tuyển chọn loại 1.",
      isFlashSale = false,
      featured = false,
    } = req.body;

    const slug = (name || "").toLowerCase().replace(/[^a-z0-9]/g, "-");
    const numPrice = Number(price) || 0;
    const numOriginalPrice = Number(originalPrice) || numPrice;
    const numStock = Number(stock) || 0;

    await pool.query(
      `INSERT INTO products 
      (id, name, slug, category, categoryName, price, originalPrice, stock, unit, origin, sweetness, badge, image, rating, reviewCount, description, isFlashSale, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        name,
        slug,
        category,
        categoryName,
        numPrice,
        numOriginalPrice,
        numStock,
        unit,
        origin,
        sweetness,
        badge,
        image,
        5.0,
        1,
        description,
        isFlashSale ? 1 : 0,
        featured ? 1 : 0,
      ]
    );

    const [createdRows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    const p = createdRows[0];

    res.status(201).json({
      ...p,
      id: Number(p.id),
      price: Number(p.price),
      originalPrice: Number(p.originalPrice),
      stock: Number(p.stock),
      rating: Number(p.rating),
      reviewCount: Number(p.reviewCount),
      isFlashSale: Boolean(p.isFlashSale),
      featured: Boolean(p.featured),
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi tạo sản phẩm", error: err.message });
  }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const [exist] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    if (exist.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    const current = exist[0];
    const {
      name = current.name,
      category = current.category,
      categoryName = current.categoryName,
      price = current.price,
      originalPrice = current.originalPrice,
      stock = current.stock,
      unit = current.unit,
      origin = current.origin,
      sweetness = current.sweetness,
      badge = current.badge,
      image = current.image,
      description = current.description,
      isFlashSale = current.isFlashSale,
      featured = current.featured,
    } = req.body;

    const slug = (name || "").toLowerCase().replace(/[^a-z0-9]/g, "-");

    await pool.query(
      `UPDATE products SET
       name = ?, slug = ?, category = ?, categoryName = ?, price = ?, originalPrice = ?,
       stock = ?, unit = ?, origin = ?, sweetness = ?, badge = ?, image = ?,
       description = ?, isFlashSale = ?, featured = ?
       WHERE id = ?`,
      [
        name,
        slug,
        category,
        categoryName,
        Number(price) || 0,
        Number(originalPrice) || Number(price) || 0,
        Number(stock) || 0,
        unit,
        origin,
        sweetness,
        badge,
        image,
        description,
        isFlashSale ? 1 : 0,
        featured ? 1 : 0,
        id,
      ]
    );

    const [updatedRows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    const p = updatedRows[0];

    res.json({
      ...p,
      id: Number(p.id),
      price: Number(p.price),
      originalPrice: Number(p.originalPrice),
      stock: Number(p.stock),
      rating: Number(p.rating),
      reviewCount: Number(p.reviewCount),
      isFlashSale: Boolean(p.isFlashSale),
      featured: Boolean(p.featured),
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi cập nhật sản phẩm", error: err.message });
  }
};

// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm để xóa" });
    }

    res.json({ success: true, message: "Đã xóa sản phẩm thành công" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi xóa sản phẩm", error: err.message });
  }
};
