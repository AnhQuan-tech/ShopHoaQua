import pool from "../config/db.js";

// Đăng nhập Admin
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [userRows] = await pool.query("SELECT setting_value FROM settings WHERE setting_key = 'adminUser'");
    const [passRows] = await pool.query("SELECT setting_value FROM settings WHERE setting_key = 'adminPass'");

    const validUser = userRows.length > 0 ? userRows[0].setting_value : "admin";
    const validPass = passRows.length > 0 ? passRows[0].setting_value : "admin";

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
      return res.status(401).json({
        success: false,
        message: "Sai tên đăng nhập hoặc mật khẩu! Mặc định là admin / admin",
      });
    }
  } catch (err) {
    console.error("Error logging in admin:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi đăng nhập", error: err.message });
  }
};
