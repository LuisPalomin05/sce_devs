const dashboardRepository = require("../models/dashboardRepository");

const getDashboard = async (req, res) => {
    try {
        const tenantId = req.headers["x-tenant-id"];

        const dashboardData = await dashboardRepository.getDashboardData(tenantId);
        const { ventasHoy, ventasMes, productos, usuarios, grafico, pedidosRaw } = dashboardData;

        const ayer = await dashboardRepository.getVentasAyer(tenantId);
        const mesPasado = await dashboardRepository.getVentasMesPasado(tenantId);

        const calcPorcentaje = (actual, anterior) => {
            if (anterior === 0) return 100;
            return Number(((actual - anterior) / anterior * 100).toFixed(1));
        };

        const pedidos = pedidosRaw.map(p => ({
            titulo: `Pedido #${p.id}`,
            cliente: `Total: S/ ${p.total}`,
            fecha: "Hace poco"
        }));

        const actividadRaw = await dashboardRepository.getActividadReciente(tenantId);

        console.log('Actividad raw:', actividadRaw);

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

        // Agregar alertas de stock bajo
        const stockBajo = await dashboardRepository.getStockBajo(tenantId);

        console.log('Stock bajo:', stockBajo);

        stockBajo.forEach(p => {
            actividad.push({
                tipo: "alerta",
                texto: `Stock bajo: ${p.nombre} (${p.stock} unidades)`,
                fecha: new Date().toISOString()
            });
        });

        console.log('Actividad final:', actividad);

        res.json({
            ventasHoy,
            ventasMes,
            productos,
            usuarios,
            grafico,
            pedidos,
            actividad,
            porcentajeHoy: calcPorcentaje(ventasHoy, ayer),
            porcentajeMes: calcPorcentaje(ventasMes, mesPasado)
        });

    } catch (error) {
        console.log("ERROR DASHBOARD:", error);
        res.status(500).json({ message: "Error dashboard" });
    }
};

module.exports = { getDashboard };