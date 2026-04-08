const pool = require("../config/db");

// 📋 GET todas las ventas del tenant
exports.getVentas = async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];
    const userId = req.user?.id_usuario;

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant requerido" });
    }

    const [ventas] = await pool.query(`
      SELECT 
        v.id_venta,
        v.total,
        v.created_at,
        u.nombres,
        u.apellidos,
        COUNT(vd.id_detalle) AS cantidad_items
      FROM venta v
      LEFT JOIN usuario u ON v.id_usuario = u.id_usuario
      LEFT JOIN venta_detalle vd ON v.id_venta = vd.id_venta
      WHERE v.id_tenant = ?
      GROUP BY v.id_venta
      ORDER BY v.created_at DESC
    `, [tenantId]);

    res.json(ventas);
  } catch (error) {
    console.error("ERROR VENTAS:", error);
    res.status(500).json({ message: "Error al obtener ventas" });
  }
};

// 🔍 GET una venta con detalles
exports.getVentaById = async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];
    const { id } = req.params;

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant requerido" });
    }

    const [venta] = await pool.query(`
      SELECT 
        v.id_venta,
        v.total,
        v.created_at,
        v.id_usuario,
        u.nombres,
        u.apellidos
      FROM venta v
      LEFT JOIN usuario u ON v.id_usuario = u.id_usuario
      WHERE v.id_venta = ? AND v.id_tenant = ?
    `, [id, tenantId]);

    if (venta.length === 0) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    const [detalles] = await pool.query(`
      SELECT 
        vd.id_detalle,
        vd.id_producto,
        vd.cantidad,
        vd.precio_unitario,
        vd.subtotal,
        p.nombre
      FROM venta_detalle vd
      JOIN producto p ON vd.id_producto = p.id_producto
      WHERE vd.id_venta = ?
    `, [id]);

    res.json({
      ...venta[0],
      detalles
    });
  } catch (error) {
    console.error("ERROR VENTA BY ID:", error);
    res.status(500).json({ message: "Error al obtener venta" });
  }
};

// ➕ POST crear venta
exports.createVenta = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const tenantId = req.headers["x-tenant-id"];
    const userId = req.user?.id;
    const { detalles } = req.body;

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant requerido" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    if (!detalles || detalles.length === 0) {
      return res.status(400).json({ message: "Detalles de venta requeridos" });
    }

    // Calcular total
    let total = 0;
    for (const detalle of detalles) {
      total += parseFloat(detalle.subtotal) || 0;
    }

    await connection.beginTransaction();

    // Crear venta
    const [ventaResult] = await connection.query(
      `INSERT INTO venta (id_usuario, id_tenant, total, created_at) 
       VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
      [userId, tenantId, total]
    );

    const ventaId = ventaResult.insertId;

    // Insertar detalles
    for (const detalle of detalles) {
      await connection.query(
        `INSERT INTO venta_detalle (id_venta, id_producto, cantidad, precio_unitario, subtotal) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          ventaId,
          detalle.id_producto,
          detalle.cantidad,
          detalle.precio_unitario,
          detalle.subtotal
        ]
      );

      // Descontar stock del producto
      await connection.query(
        `UPDATE producto SET stock = stock - ? WHERE id_producto = ?`,
        [detalle.cantidad, detalle.id_producto]
      );
    }

    await connection.commit();

    const [ventaCreada] = await pool.query(
      `SELECT v.id_venta, v.total, v.created_at FROM venta v WHERE v.id_venta = ?`,
      [ventaId]
    );

    res.status(201).json(ventaCreada[0]);
  } catch (error) {
    await connection.rollback();
    console.error("ERROR CREATE VENTA:", error);
    res.status(500).json({ message: "Error al crear venta" });
  } finally {
    connection.release();
  }
};

// ❌ DELETE venta
exports.deleteVenta = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const tenantId = req.headers["x-tenant-id"];
    const { id } = req.params;

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant requerido" });
    }

    // Verificar que la venta existe y pertenece al tenant
    const [venta] = await pool.query(
      `SELECT id_venta FROM venta WHERE id_venta = ? AND id_tenant = ?`,
      [id, tenantId]
    );

    if (venta.length === 0) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    await connection.beginTransaction();

    // Obtener detalles para devolver stock
    const [detalles] = await connection.query(
      `SELECT id_producto, cantidad FROM venta_detalle WHERE id_venta = ?`,
      [id]
    );

    // Devolver stock
    for (const detalle of detalles) {
      await connection.query(
        `UPDATE producto SET stock = stock + ? WHERE id_producto = ?`,
        [detalle.cantidad, detalle.id_producto]
      );
    }

    // Eliminar detalles
    await connection.query(`DELETE FROM venta_detalle WHERE id_venta = ?`, [id]);

    // Eliminar venta
    await connection.query(`DELETE FROM venta WHERE id_venta = ?`, [id]);

    await connection.commit();

    res.json({ message: "Venta eliminada correctamente" });
  } catch (error) {
    await connection.rollback();
    console.error("ERROR DELETE VENTA:", error);
    res.status(500).json({ message: "Error al eliminar venta" });
  } finally {
    connection.release();
  }
};
