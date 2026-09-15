import pool from "../config/db.js";

// Lấy toàn bộ cài đặt website
export const getSettings = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM settings");
    const settingsObj = {};

    for (const row of rows) {
      try {
        // Thử parse JSON (cho vouchers, object, mảng...)
        settingsObj[row.setting_key] = JSON.parse(row.setting_value);
      } catch {
        // Nếu là số hoặc chuỗi thường
        if (!isNaN(row.setting_value) && row.setting_value.trim() !== "") {
          settingsObj[row.setting_key] = Number(row.setting_value);
        } else {
          settingsObj[row.setting_key] = row.setting_value;
        }
      }
    }

    res.json(settingsObj);
  } catch (err) {
    console.error("Error fetching settings:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi lấy cấu hình", error: err.message });
  }
};

// Cập nhật cài đặt website
export const updateSettings = async (req, res) => {
  try {
    const newSettings = req.body;

    for (const [key, value] of Object.entries(newSettings)) {
      const valStr = typeof value === "object" ? JSON.stringify(value) : String(value);
      await pool.query(
        `INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
        [key, valStr]
      );
    }

    // Trả lại dữ liệu settings mới nhất
    return getSettings(req, res);
  } catch (err) {
    console.error("Error updating settings:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi lưu cấu hình", error: err.message });
  }
};
