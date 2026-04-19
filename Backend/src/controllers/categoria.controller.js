const catRepository = require("../models/categoriaRepository");

const createCategorias = async (req, res) => {
  try {
    const tenantId = parseInt(req.headers["x-tenant-id"]);

    if (!tenantId) {
      return res.status(400).json({ error: "Tenant requerido" });
    }

    const { nombre } = req.body;

    if (!nombre || typeof nombre !== "string") {
      return res.status(400).json({ error: "Nombre de categoria requerido" });
    }

    await catRepository.createCategoria(tenantId, nombre);

    res.status(201).json({ message: "Categoria creada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "error al crear categoria" });
  }
};

const getAllCategorias = async (req, res) => {
  try {
    const tenantId = parseInt(req.headers["x-tenant-id"]);

    if (!tenantId) {
      return res.status(400).json({ error: "Tenant requerido" });
    }

    const rows = await catRepository.getCategoriaByTenantId(tenantId);

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
  getAllCategorias,
  createCategorias,
};
