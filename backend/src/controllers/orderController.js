import pool from "../config/db.js";

// Lấy danh sách tất cả đơn hàng kèm order_items
export const getAllOrders = async (req, res) => {
  try {
    const [orders] = await pool.query("SELECT * FROM orders ORDER BY createdAt DESC");
    const [items] = await pool.query("SELECT * FROM order_items");

    // Ghép items vào từng order
    const result = orders.map((o) => {
      const orderItems = items
        .filter((item) => item.order_id === o.id)
        .map((item) => ({
          id: Number(item.product_id),
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
        }));

      return {
        ...o,
        subtotal: Number(o.subtotal),
        discount: Number(o.discount),
        total: Number(o.total),
        items: orderItems,
      };
    });

    res.json(result);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi lấy đơn hàng", error: err.message });
  }
};

// Tạo mới đơn hàng
export const createOrder = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const orderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);
    const {
      customer,
      phone,
      address,
      note = "",
      items = [],
      subtotal = 0,
      discount = 0,
      total = 0,
      paymentMethod = "COD",
    } = req.body;

    const createdAt = new Date();

    await connection.query(
      `INSERT INTO orders 
      (id, customer, phone, address, note, subtotal, discount, total, paymentMethod, status, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        customer,
        phone,
        address,
        note,
        Number(subtotal) || 0,
        Number(discount) || 0,
        Number(total) || 0,
        paymentMethod,
        "pending",
        createdAt,
      ]
    );

    if (Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        await connection.query(
          `INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)`,
          [
            orderId,
            item.id || 0,
            item.name || "Sản phẩm",
            Number(item.price) || 0,
            Number(item.quantity) || 1,
          ]
        );
      }
    }

    await connection.commit();

    const createdOrder = {
      id: orderId,
      customer,
      phone,
      address,
      note,
      subtotal: Number(subtotal) || 0,
      discount: Number(discount) || 0,
      total: Number(total) || 0,
      paymentMethod,
      status: "pending",
      createdAt: createdAt.toISOString(),
      items,
    };

    res.status(201).json(createdOrder);
  } catch (err) {
    await connection.rollback();
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi tạo đơn hàng", error: err.message });
  } finally {
    connection.release();
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const [check] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
    if (check.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    await pool.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);

    const [updatedRows] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
    const [items] = await pool.query("SELECT * FROM order_items WHERE order_id = ?", [id]);

    const updated = {
      ...updatedRows[0],
      subtotal: Number(updatedRows[0].subtotal),
      discount: Number(updatedRows[0].discount),
      total: Number(updatedRows[0].total),
      items: items.map((i) => ({
        id: Number(i.product_id),
        name: i.name,
        price: Number(i.price),
        quantity: Number(i.quantity),
      })),
    };

    res.json(updated);
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi cập nhật đơn hàng", error: err.message });
  }
};
