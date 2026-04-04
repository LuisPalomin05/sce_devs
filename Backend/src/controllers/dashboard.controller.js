const pool = require("../config/db");

const getDashboard = async (req, res) => {
    try {
    const tenantId = req.headers["x-tenant-id"];

        const [results] = await pool.query("CALL sp_dashboard(?)", [tenantId]);

        const ventasHoy = results[0][0].ventasHoy;
        const ventasMes = results[1][0].ventasMes;
        const productos = results[2][0].productos;
        const usuarios = results[3][0].usuarios;

        const grafico = results[4];
        const pedidosRaw = results[5];

        const [ayer] = await pool.query(`
      SELECT IFNULL(SUM(total),0) AS total
      FROM venta
      WHERE DATE(created_at) = CURDATE() - INTERVAL 1 DAY
      AND id_tenant = ?
    `, [tenantId]);

        const [mesPasado] = await pool.query(`
      SELECT IFNULL(SUM(total),0) AS total
      FROM venta
      WHERE MONTH(created_at) = MONTH(CURDATE() - INTERVAL 1 MONTH)
      AND YEAR(created_at) = YEAR(CURDATE())
      AND id_tenant = ?
    `, [tenantId]);

        const calcPorcentaje = (actual, anterior) => {
            if (anterior === 0) return 100;
            return Number(((actual - anterior) / anterior * 100).toFixed(1));
        };

        const pedidos = pedidosRaw.map(p => ({
            titulo: `Pedido #${p.id}`,
            cliente: `Total: S/ ${p.total}`,
            fecha: "Hace poco"
        }));

        const [actividadRaw] = await pool.query(`
  SELECT 'venta' AS tipo, created_at, total, id_venta AS id
  FROM venta
  WHERE id_tenant = ?
  
  UNION ALL
  
  SELECT 'usuario' AS tipo, created_at, NULL AS total, id_usuario AS id
  FROM usuario
  ORDER BY created_at DESC
  LIMIT 5
`, [tenantId]);

        const actividad = actividadRaw.map(a => {
            if (a.tipo === "venta") {
                return {
                    tipo: "venta",
                    texto: `Venta realizada S/ ${a.total}`,
                    fecha: a.created_at
                };
            } else {
                return {
                    tipo: "usuario",
                    texto: `Nuevo usuario registrado`,
                    fecha: a.created_at
                };
            }
        });

        res.json({
            ventasHoy,
            ventasMes,
            productos,
            usuarios,
            grafico,
            pedidos,
            actividad,

            porcentajeHoy: calcPorcentaje(ventasHoy, ayer[0].total),
            porcentajeMes: calcPorcentaje(ventasMes, mesPasado[0].total),

            actividad: [
                "Nueva venta registrada",
                "Usuario creado"
            ]
        });

    } catch (error) {
        console.log("ERROR DASHBOARD:", error);
        res.status(500).json({ message: "Error dashboard" });
    }
};

module.exports = { getDashboard };