const catRepository = require('../models/categoriaRepository');

// const getAllCategorias = async (req, res) => {
//     try {

//     } catch (error) {
//     console.error("ERROR CATEGORIAS:", err);
//     res.status(500).json({ error: err.message });
//     }
// }

const getCategoriaByTenantId = async (req, res) => {
    try {
        const tenantId = parseInt(req.headers["x-tenant-id"]);

        if (!tenantId) {
            return res.status(400).json({ error: "Tenant requerido" });
        }

        const rows = await catRepository(tenantId);

        res.status(200).json({ message: "categoria asignada" });

    } catch (error) {
        console.error("ERROR CATEGORIAS:", err);
        res.status(500).json({ error: err.message });
    }
}

// const deleteCategoria = async (req, res) => {
//     try {

//     } catch (error) {
//     console.error("ERROR CATEGORIAS:", err);
//     res.status(500).json({ error: err.message });
//     }
// }

// const editCategoria = async (req, res) => {
//     try {

//     } catch (error) {
//     console.error("ERROR CATEGORIAS:", err);
//     res.status(500).json({ error: err.message });
//     }
// }

module.exports = {
    getCategoriaByTenantId
}