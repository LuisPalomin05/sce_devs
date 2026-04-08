const prodRepository = require('../models/productoRepository');

const getAllProductos = async (req, res) => {
    try {
        const tenantId = req.headers["x-tenant-id"];

        if (!tenantId) {
            return res.status(400).json({ message: "Tenant requerido" });
        }

        prodRepository.getAllProductos(tenantId);

        res.status(200).json({ message: "listado producto exitoso" });

    } catch (error) {
        console.log("ERROR PRODUCTOS:", error);
        res.status(500).json({ message: "Error al obtener productos" });

    }
}


const createProduct = async ( req, res) => {

    try {
        const tenantId = req.headers["x-tenant-id"];
        const { nombre, precio, stock, id_categoria } = req.body;

        if (!tenantId) {
            return res.status(400).json({ message: "Tenant requerido" });
        }

        if (!nombre || typeof nombre !== "string") {
            return res.status(400).json({ message: "Nombre de producto requerido" });
        }

        const [result] = prodRepository.createProducto(nombre, precio, stock, id_categoria,tenantId);






        res.status(201).json({message:'nuevo insert de producto'});

    } catch (error) {
    console.error("ERROR CREAR PRODUCTO:", error);
    res.status(500).json({ message: "Error al crear producto" });
  
    }


}

// const getProductoById = async (req, res) => {
//     try {

//     } catch (error) {
//     console.log("ERROR PRODUCTOS:", error);
//     res.status(500).json({ message: "Error al obtener productos" });

//     }
// }

// const deleteProducto = async (req, res) => {
//     try {

//     } catch (error) {
//     console.log("ERROR PRODUCTOS:", error);
//     res.status(500).json({ message: "Error al obtener productos" });

//     }
// }

// const editProducto = async (req, res) => {
//     try {

//     } catch (error) {
//     console.log("ERROR PRODUCTOS:", error);
//     res.status(500).json({ message: "Error al obtener productos" });

//     }
// }

module.exports = {
    getAllProductos
}