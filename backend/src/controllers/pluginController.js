import pool from "../config/db.js";

// Lấy danh sách tất cả plugins
export const getAllPlugins = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM plugins");
    const formatted = rows.map((pl) => {
      let settings = {};
      try {
        settings = typeof pl.settings === "string" ? JSON.parse(pl.settings) : (pl.settings || {});
      } catch {
        settings = {};
      }
      return {
        ...pl,
        active: Boolean(pl.active),
        settings,
      };
    });
    res.json(formatted);
  } catch (err) {
    console.error("Error fetching plugins:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi lấy danh sách plugins", error: err.message });
  }
};

// Bật/tắt plugin
export const togglePlugin = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM plugins WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy plugin" });
    }

    const current = rows[0];
    const newActive = current.active ? 0 : 1;

    await pool.query("UPDATE plugins SET active = ? WHERE id = ?", [newActive, id]);

    let settings = {};
    try {
      settings = typeof current.settings === "string" ? JSON.parse(current.settings) : (current.settings || {});
    } catch {
      settings = {};
    }

    res.json({
      ...current,
      active: Boolean(newActive),
      settings,
    });
  } catch (err) {
    console.error("Error toggling plugin:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi đổi trạng thái plugin", error: err.message });
  }
};

// Cập nhật cài đặt plugin
export const updatePluginSettings = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM plugins WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy plugin" });
    }

    const current = rows[0];
    let existingSettings = {};
    try {
      existingSettings = typeof current.settings === "string" ? JSON.parse(current.settings) : (current.settings || {});
    } catch {
      existingSettings = {};
    }

    const mergedSettings = { ...existingSettings, ...req.body };
    const settingsJson = JSON.stringify(mergedSettings);

    await pool.query("UPDATE plugins SET settings = ? WHERE id = ?", [settingsJson, id]);

    res.json({
      ...current,
      active: Boolean(current.active),
      settings: mergedSettings,
    });
  } catch (err) {
    console.error("Error updating plugin settings:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi cập nhật cấu hình plugin", error: err.message });
  }
};
