import '../assets/almacen.css';
import { Download, PencilLine, AlignHorizontalDistributeCenter, LayersPlus } from 'lucide-react';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Almacen = () => {
    const [producto, setProducto] = useState([]);

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
                            producto.map((item) => {
                                return (
                                    <div className='StorageTableItem'>
                                        <div className='NombProductoTable'>
                                            <div className='itemProd'>
                                                <AlignHorizontalDistributeCenter />

                                            </div>
                                            <div className='NombProducto'>
                                                <p>ARANDELA PLANA GALVANIZADA 5/8</p>
                                                <small>P001-A58</small>
                                            </div>
                                        </div>
                                        <div className='catProducto'>
                                            <p>PERNO</p>

                                        </div>
                                        <div className='stockProducto'>
                                            45
                                        </div>
                                        <div className='estateProducto success'>
                                            Disponible
                                        </div>
                                        <div className='actionProducto'>
                                            <PencilLine />
                                        </div>
                                    </div>
                                )
                            })
                        }

                        <div className='StorageTableItem'>
                            <div className='NombProductoTable'>
                                <div className='itemProd'>
                                    <AlignHorizontalDistributeCenter />

                                </div>
                                <div className='NombProducto'>
                                    <p>ARANDELA PLANA GALVANIZADA 5/8</p>
                                    <small>P001-A58</small>
                                </div>
                            </div>
                            <div className='catProducto'>
                                <p>PERNO</p>

                            </div>
                            <div className='stockProducto'>
                                45
                            </div>
                            <div className='estateProducto success'>
                                Disponible
                            </div>
                            <div className='actionProducto'>
                                <PencilLine />
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default Almacen;