import '../assets/almacen.css';
import { Download, PencilLine, AlignHorizontalDistributeCenter, LayersPlus } from 'lucide-react';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Almacen = () => {
    const [producto, setProducto] = useState([
  { id: 1, nombre: "Perno hexagonal galvanizado 1/2 x 2\"", categoria: "Pernos", stock: 120, estado: "Disponible" },
  { id: 2, nombre: "Tuerca hexagonal 1/2\"", categoria: "Tuercas", stock: 200, estado: "Agotado" },
  { id: 3, nombre: "Arandela plana 1/2\"", categoria: "Arandelas", stock: 350, estado: "Agotado" },
  { id: 4, nombre: "Tornillo drywall 6 x 1\"", categoria: "Tornillos", stock: 500, estado: "Disponible" },
  { id: 5, nombre: "Tornillo autoperforante punta broca", categoria: "Tornillos", stock: 180, estado: "Disponible" },
{ id: 20, nombre: "Disco de corte 4.5\"", categoria: "Herramientas", stock: 5, estado: "Bajo stock" },
{ id: 21, nombre: "Silicona industrial transparente", categoria: "Construcción", stock: 0, estado: "Agotado" }
]);


const getEstadoClass = (estado) => {
  if (estado === "Disponible") return "success";
  if (estado === "Bajo stock") return "warning";
  if (estado === "Agotado") return "danger";
};

    return (
        <div className='storageContent'>
            <div className='storageHeader'>
                <div className='storageTittle'>
                    <p >Inventario de Almacen</p>
                    <small>Control de stock en tiempo real y gestion de suministro</small>
                </div>
                <div className='btnExportReport'>
                    <Download />
                    <p>Exportar Reporte</p>
                </div>
                <Link to={'/dashboard/almacen/create'} className='btnExportReport'>
                    <LayersPlus />
                    <p>Agregar Nuevo</p>
                </Link>

            </div>
            <div className="filtros">
                <ul>
                    <li>Todos</li>
                    <li>Pernos</li>
                    <li>Tuercas</li>
                    <li>Barras</li>
                    <li>Maquinaria</li>

                </ul>
            </div>
            <div className='TableContendorStorage'>
                <div className='StorageTable'>
                    <div className='StorageTableHeader'>
                        <p>NOMBRE DEL PRODUCTO</p>
                        <p>CATEGORIA</p>
                        <p>STOCK</p>
                        <p>ESTADO</p>
                        <p>ACCIONES</p>
                    </div>
                    <div className='StorageTableBody'>
                        {
                            producto.length == 0 ? (<p className='alertaProd'>
                                No hay productos por mostrar. <Link to={'/dashboard/almacen/create'}>Agregar Aqui</Link>
                            </p>) : (
                                producto.map((item) => {
                                    return (
                                        <div key={item.id} className='StorageTableItem'>
                                            <div className='NombProductoTable'>
                                                <div className='itemProd'>
                                                    <AlignHorizontalDistributeCenter />

                                                </div>
                                                <div className='NombProducto'>
                                                    <p>{item.nombre}</p>
                                                    <small>P001-A58</small>
                                                </div>
                                            </div>
                                            <div className='catProducto'>
                                                <p>{item.categoria}</p>

                                            </div>
                                            <div className='stockProducto'>
                                                {item.stock}
                                            </div>
                                            <div className={`estateProducto ${getEstadoClass(item.estado)}`}>
                                                {item.estado}
                                            </div>
                                            <Link to={`/dashboard/almacen/edit/${item.id}`} className="actionProducto">
                                                <PencilLine />
                                            </Link>
                                        </div>
                                    )
                                })
                            )
                        }

                    </div>
                </div>
            </div>


        </div>
    )
}

export default Almacen;