import { useState } from "react"
import '../assets/almacen.css';
import { Save, ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';




const CreateProducto = () => {

    const [isEdit, setEdit] = useState(false)


    return (
        <div className="CrearProd">
            <div className='TittleCreate'>
                <div><small>Almacen</small> <ChevronRight size={10} /> <small className="success">Crear Producto</small></div>
                <p>Crear Producto</p>
                <small>Anade un nuevo producto a el almacen</small>

            </div>
            <div className="InputCreate">

                <div className="InputItenCreate"><label htmlFor="descripcion">Descripcion</label><input type="text" name="descripcion" placeholder="Ej. ARANDELA PLANA ZINCADA 1/2" /></div>
                <div className="GroupItem">
                    <div className="InputItenCreate"><label htmlFor="percio">Precio</label><input type="text" name="precio" placeholder="0.00" /></div>
                    <div className="InputItenCreate"><label htmlFor="cantidad">Cantidad</label><input type="text" name="cantidad" placeholder="0" /></div>
                </div>
                <div className="descriptionCreate">
                    <div className="descpTittle">
                        <p>Descripcion</p>
                        <small>Ingresa una descripcion del producto</small>
                    </div>

                    <textarea name="" id="" placeholder="Especifique dimensiones, tamaño, origen, acabados o informacion adicional">

                    </textarea>
                </div>
            </div>

            <div className="btnCreateContent">
                <div className="bnk"></div>
                <div className="btnsCreate">
                    <Link to={'/dashboard/almacen'} className="createBtn">CANCELAR</Link>
                    <button className='createBtn' type="submit"> <Save /> GUARDAR</button>

                </div>
            </div>

        </div>
    )
}

export default CreateProducto;