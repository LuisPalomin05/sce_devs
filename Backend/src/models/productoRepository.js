const pool= require("../config/db");

const createProducto = async (nombre,precio,stock,id_categoria,tenantId) => {
      const [result] = await pool.query(
            `INSERT INTO producto (nombre, precio, stock, id_categoria, id_tenant) VALUES (?, ?, ?, ?, ?)`,
            [nombre, precio ?? 0, stock ?? 0, id_categoria ?? null, tenantId]
          );
return result.insertId;
}

const deleteProducto = async () => {

}

const updateProducto = async () =>{

}

const getProducto = async () =>{

}

const getAllFromProductos = async (filterTenantId) =>{
    const [rows] = await pool.query(`
  SELECT 
    p.id_producto,
    p.nombre,
    p.precio,
    p.stock,
    p.id_categoria,
    c.nombre AS categoria
  FROM producto p
  LEFT JOIN categoria c 
    ON p.id_categoria = c.id_categoria
  WHERE p.id_tenant = ?
`, [filterTenantId]);

return rows;
}

module.exports = {
  createProducto,
  getAllFromProductos
}