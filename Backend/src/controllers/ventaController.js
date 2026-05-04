const ventaRepository = require("../models/ventaRepository");
const pool = require("../config/db");

exports.getVentas = async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant requerido" });
    }

    const ventas = await ventaRepository.getVentas(tenantId);
    res.json(ventas);
  } catch (error) {
    console.error("ERROR VENTAS:", error);
    res.status(500).json({ message: "Error al obtener ventas" });
  }
};

exports.getVentaById = async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];
    const { id } = req.params;

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant requerido" });
    }

    const venta = await ventaRepository.getVentaById(id, tenantId);

    if (!venta) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    res.json(venta);
  } catch (error) {
    console.error("ERROR VENTA BY ID:", error);
    res.status(500).json({ message: "Error al obtener venta" });
  }
};

exports.createVenta = async (req, res) => {
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

    let total = 0;
    for (const detalle of detalles) {
      total += parseFloat(detalle.subtotal) || 0;
    }

    const ventaId = await ventaRepository.createVenta({
      total,
      id_usuario: userId,
      id_tenant: tenantId,
      detalles
    });

    const [ventaCreada] = await pool.query(
      "SELECT v.id_venta, v.total, v.created_at FROM venta v WHERE v.id_venta = ?",
      [ventaId]
    );

    res.status(201).json(ventaCreada[0]);
  } catch (error) {
    console.error("ERROR CREATE VENTA:", error);
    res.status(500).json({ message: "Error al crear venta" });
  }
};

exports.deleteVenta = async (req, res) => {
  try {
    const tenantId = req.headers["x-tenant-id"];
    const { id } = req.params;

    if (!tenantId) {
      return res.status(400).json({ message: "Tenant requerido" });
    }

    const deleted = await ventaRepository.deleteVenta(id, tenantId);

    if (!deleted) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    res.json({ message: "Venta eliminada correctamente" });
  } catch (error) {
    console.error("ERROR DELETE VENTA:", error);
    res.status(500).json({ message: "Error al eliminar venta" });
  }
};
